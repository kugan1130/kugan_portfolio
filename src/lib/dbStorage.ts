import { PortfolioData } from '../types';
import { initialPortfolioData } from '../data/portfolioData';

const DB_NAME = 'KuganPortfolioStorage';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_store';
const RECORD_KEY = 'portfolio_data_v1';

// Open IndexedDB Connection
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// In-Memory Fallback Cache
let memoryCache: PortfolioData | null = null;

// Async Load Data
export async function asyncLoadPortfolioData(): Promise<PortfolioData> {
  if (memoryCache) {
    return memoryCache;
  }

  // 1. Try IndexedDB first (Handles large video uploads effortlessly)
  try {
    const db = await openDB();
    const data = await new Promise<PortfolioData | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(RECORD_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });

    if (data && data.candidate && data.projects) {
      if (!data.candidate.email || data.candidate.email === 'kugakugan.tech@gmail.com') {
        data.candidate.email = 'kugankugan.tech@gmail.com';
      }
      if (!data.candidate.resumeUrl || data.candidate.resumeUrl === '/storage/resume/KUGAN_K_Resume.pdf') {
        data.candidate.resumeUrl = '/assets/resume/KUGAN_K_Resume.pdf';
      }
      if (!data.candidate.photoUrl || data.candidate.photoUrl === '/kugan_profile.png' || data.candidate.photoUrl === '/assets/profile/kugan_profile.png' || data.candidate.photoUrl === '/storage/kugan_profile.jpeg') {
        data.candidate.photoUrl = '/assets/profile/kugan_profile.jpeg';
      }
      data.candidate.location = 'Chennai, Tamil Nadu, India';

      if (Array.isArray(data.projects)) {
        data.projects = data.projects.map((p: any) => {
          const defaultProj = initialPortfolioData.projects.find(ip => ip.id === p.id);
          if (defaultProj && defaultProj.videoUrl && (!p.videoUrl || p.videoUrl.trim() === '')) {
            p.videoUrl = defaultProj.videoUrl;
          } else if (p.videoUrl && p.videoUrl.startsWith('/storage/')) {
            p.videoUrl = p.videoUrl.replace('/storage/', '/assets/');
          }
          return p;
        });
      }

      if (Array.isArray(data.certifications)) {
        data.certifications = data.certifications.map((c: any) => {
          const defaultCert = initialPortfolioData.certifications.find(ic => ic.id === c.id);
          if (defaultCert && defaultCert.imageUrl) {
            c.imageUrl = defaultCert.imageUrl;
          }
          return c;
        });
      }

      if (Array.isArray(data.timeline)) {
        data.timeline = data.timeline.map((t: any) => {
          const defaultItem = initialPortfolioData.timeline.find(it => it.id === t.id);
          if (defaultItem && defaultItem.imageUrl) {
            t.imageUrl = defaultItem.imageUrl;
          }
          return t;
        });
      }

      memoryCache = data;
      return data;
    }
  } catch (err) {
    console.warn('IndexedDB load failed, falling back to localStorage:', err);
  }

  // 2. Fallback to LocalStorage
  try {
    const STORAGE_KEYS = [
      'kugan_portfolio_data_v8',
      'kugan_portfolio_data_v7',
      'kugan_portfolio_data_v6',
      'kugan_portfolio_data_v5',
      'kugan_portfolio_data'
    ];

    for (const key of STORAGE_KEYS) {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.candidate && parsed.projects) {
          parsed.candidate.location = 'Chennai, Tamil Nadu, India';
          memoryCache = parsed;
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn('LocalStorage load failed:', err);
  }

  // 3. Fallback to Initial Data
  memoryCache = initialPortfolioData;
  return initialPortfolioData;
}

// Async Save Data
export async function asyncSavePortfolioData(data: PortfolioData): Promise<void> {
  memoryCache = data;

  // Save to IndexedDB (No 5MB quota limit!)
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, RECORD_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    console.log('Portfolio data safely persisted in IndexedDB');
  } catch (err) {
    console.error('Failed to save in IndexedDB:', err);
  }

  // Best-effort backup to localStorage (if under 5MB)
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem('kugan_portfolio_data_v8', serialized);
  } catch (err) {
    console.warn('LocalStorage quota exceeded (saved in IndexedDB instead)');
  }
}

// Reset Data
export async function asyncResetPortfolioData(): Promise<PortfolioData> {
  memoryCache = initialPortfolioData;

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(RECORD_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to clear IndexedDB:', err);
  }

  try {
    const STORAGE_KEYS = [
      'kugan_portfolio_data_v8',
      'kugan_portfolio_data_v7',
      'kugan_portfolio_data_v6',
      'kugan_portfolio_data_v5',
      'kugan_portfolio_data'
    ];
    for (const key of STORAGE_KEYS) {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.warn('Failed to clear localStorage:', err);
  }

  return initialPortfolioData;
}
