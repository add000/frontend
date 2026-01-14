// API Configuration
const API_CONFIG = {
  // สำหรับ development ใช้ backend ที่รัน local
  development: {
    baseURL: 'http://localhost:3005',
    timeout: 10000
  },
  // สำหรับ production ใช้ backend บน Vercel
  production: {
    baseURL: 'https://backend-psi-two-33.vercel.app',
    timeout: 10000
  }
};

// เลือก config ตาม environment
const isDevelopment = process.env.NODE_ENV === 'development' || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost');
const config = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

// ฟังก์ชันสำหรับสร้าง URL สำหรับ API calls
export const createApiUrl = (endpoint) => {
  const baseUrl = config.baseURL;
  // ตรวจสอบว่า endpoint ขึ้นต้นด้วย / หรือไม่
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// ฟังก์ชันสำหรับ fetch พร้อม headers มาตรฐาน
export const apiFetch = async (endpoint, options = {}) => {
  const url = createApiUrl(endpoint);
  
  // ดึง token จาก localStorage ถ้ามี (แค่บน client-side)
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    // ถ้า response ไม่สำเร็จ ให้โยน error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Export config สำหรับใช้งานอื่นๆ
export default config;
