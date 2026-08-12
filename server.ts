import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes FIRST
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    // Server-side validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({ success: false, error: 'Subject is required.' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const recipient = process.env.CONTACT_EMAIL || 'kugankugan.tech@gmail.com';
    const trimmedName = name.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    const formattedSubject = `[Portfolio Contact] ${trimmedSubject}`;
    const plainTextBody = `New contact message from portfolio website:\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nMessage:\n${trimmedMessage}`;
    const sanitizedMessage = trimmedMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const htmlBody = `
      <div style="font-family: sans-serif; padding: 20px; color: #111; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #FF3D00; margin-top: 0;">New Direct Message from Portfolio</h2>
        <p><strong>From / Name:</strong> ${trimmedName}</p>
        <p><strong>Visitor Email:</strong> <a href="mailto:${trimmedEmail}">${trimmedEmail}</a></p>
        <p><strong>Subject:</strong> ${trimmedSubject}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${sanitizedMessage}</div>
      </div>
    `;

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    // 1. Resend API
    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.SENDER_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
            reply_to: trimmedEmail,
            to: [recipient],
            subject: formattedSubject,
            text: plainTextBody,
            html: htmlBody,
          }),
        });

        const resendData = await resendRes.json();
        if (resendRes.ok && resendData.id) {
          console.log(`[Contact API] Email delivered via Resend ID: ${resendData.id}`);
          return res.status(200).json({ success: true, message: 'Message sent successfully.' });
        } else {
          console.error('[Contact API Error] Resend API error:', resendData);
          return res.status(resendRes.status || 502).json({
            success: false,
            error: `Resend error: ${resendData?.message || 'Failed to send email.'}`,
          });
        }
      } catch (err: any) {
        console.error('[Contact API Exception] Resend failure:', err);
        return res.status(500).json({ success: false, error: `Resend delivery failed: ${err.message}` });
      }
    }

    // 2. SendGrid API
    if (sendgridApiKey) {
      try {
        const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sendgridApiKey}`,
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: recipient }] }],
            from: { email: process.env.SENDER_EMAIL || recipient, name: `${trimmedName} via Portfolio` },
            reply_to: { email: trimmedEmail, name: trimmedName },
            subject: formattedSubject,
            content: [
              { type: 'text/plain', value: plainTextBody },
              { type: 'text/html', value: htmlBody },
            ],
          }),
        });

        if (sgRes.ok) {
          console.log(`[Contact API] Email delivered via SendGrid.`);
          return res.status(200).json({ success: true, message: 'Message sent successfully.' });
        } else {
          const sgError = await sgRes.text();
          console.error('[Contact API Error] SendGrid error:', sgError);
          return res.status(sgRes.status || 502).json({
            success: false,
            error: `SendGrid error: Failed to send email.`,
          });
        }
      } catch (err: any) {
        console.error('[Contact API Exception] SendGrid failure:', err);
        return res.status(500).json({ success: false, error: `SendGrid delivery failed: ${err.message}` });
      }
    }

    // 3. SMTP Transport
    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const info = await transporter.sendMail({
          from: `"${trimmedName} via Portfolio" <${smtpUser}>`,
          replyTo: trimmedEmail,
          to: recipient,
          subject: formattedSubject,
          text: plainTextBody,
          html: htmlBody,
        });

        if (info && (info.messageId || (info.accepted && info.accepted.length > 0))) {
          console.log(`[Contact API] Email successfully delivered to ${recipient}. Message ID: ${info.messageId}`);
          return res.status(200).json({
            success: true,
            message: 'Message sent successfully.',
          });
        } else {
          console.error('[Contact API Error] SMTP provider rejected or failed to deliver the message:', info);
          return res.status(502).json({
            success: false,
            error: 'Email provider did not accept the message. Please try again or use the direct email link.',
          });
        }
      } catch (sendErr: any) {
        console.error('[Contact API SMTP Error]:', sendErr?.message || sendErr);
        return res.status(500).json({
          success: false,
          error: `Email delivery failed: ${sendErr?.message || 'SMTP service error'}. Please try again or click the direct email link.`,
        });
      }
    }

    // 4. Default fallback when no server-side credentials are provided in .env
    const mailBody = `From / Recruiter Name: ${trimmedName}\nVisitor Email: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nMessage:\n${trimmedMessage}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(`[Portfolio Contact] ${trimmedSubject}`)}&body=${encodeURIComponent(mailBody)}`;

    console.log(`[Contact API] Processing contact submission for ${recipient} (Fallback Mailto Mode)`);
    return res.status(200).json({
      success: true,
      mode: 'mailto',
      mailtoUrl,
      message: 'Message processed successfully.',
    });
  } catch (err: any) {
    console.error('[Contact API Error]:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Unable to send message. Please try again.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const publicPath = path.join(process.cwd(), 'public');

    // 1. Serve compiled production bundle from dist
    app.use(express.static(distPath));

    // 2. Serve static assets & media directly from public folder (ensures new/large uploads serve without rebuild)
    app.use('/assets', express.static(path.join(publicPath, 'assets')));
    app.use('/storage', express.static(path.join(publicPath, 'storage')));
    app.use(express.static(publicPath));

    // 3. Catch-all for SPA client routing (with 404 guard for media/asset requests)
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/assets/') || req.path.startsWith('/storage/') || /\.(png|jpg|jpeg|webp|svg|gif|mp4|webm|mov|pdf)$/i.test(req.path)) {
        return res.status(404).send('Asset not found');
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
