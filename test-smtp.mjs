import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const smtpHost = (process.env.SMTP_HOST || '').trim();
const smtpUser = (process.env.SMTP_USER || '').trim();
const smtpPass = (process.env.SMTP_PASS || '').trim();
const smtpPort = parseInt((process.env.SMTP_PORT || '587').trim(), 10);
const recipient = (process.env.CONTACT_EMAIL || '').trim();

console.log('=== SMTP Diagnostic ===');
console.log('SMTP_HOST:', smtpHost);
console.log('SMTP_PORT:', smtpPort);
console.log('SMTP_USER:', smtpUser);
console.log('SMTP_PASS exists:', !!smtpPass);
console.log('SMTP_PASS length:', smtpPass.length);
console.log('CONTACT_EMAIL:', recipient);

// Check raw vs trimmed to see if \r was present
const rawPass = process.env.SMTP_PASS || '';
console.log('Raw SMTP_PASS length:', rawPass.length);
console.log('Trimmed SMTP_PASS length:', smtpPass.length);
console.log('Has trailing \\r:', rawPass.endsWith('\r'));
console.log('Has trailing space:', rawPass.endsWith(' '));

if (!smtpHost || !smtpUser || !smtpPass) {
  console.error('ERROR: Missing SMTP credentials. Check .env file.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

console.log('\n=== Testing transporter.verify() ===');
try {
  await transporter.verify();
  console.log('SUCCESS: SMTP authentication verified!');
} catch (err) {
  console.error('FAILED: transporter.verify() error:', err.message);
  console.error('Full error code:', err.code);
  console.error('Full error response:', err.response);
  process.exit(1);
}

console.log('\n=== Sending test email ===');
try {
  const info = await transporter.sendMail({
    from: `"Kugan Test via Portfolio" <${smtpUser}>`,
    replyTo: 'test@example.com',
    to: recipient,
    subject: '[Portfolio Contact] AI Engineer Portfolio Test',
    text: 'New contact message from portfolio website:\n\nName: Kugan Test\nEmail: test@example.com\nSubject: AI Engineer Portfolio Test\n\nMessage:\nThis is a real email delivery test.',
    html: '<div style="font-family: sans-serif; padding: 20px;"><h2>Test Email</h2><p>This is a real email delivery test from the portfolio contact form.</p></div>',
  });

  console.log('SUCCESS: Email sent!');
  console.log('Message ID:', info.messageId);
  console.log('Accepted:', info.accepted);
  console.log('Response:', info.response);
} catch (err) {
  console.error('FAILED: sendMail error:', err.message);
  console.error('Error code:', err.code);
  console.error('Error response:', err.response);
  process.exit(1);
}

console.log('\n=== All tests passed! ===');
