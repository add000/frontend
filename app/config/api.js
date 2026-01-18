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

// API functions สำหรับจัดการผู้ใช้
export const usersAPI = {
  // ดึงข้อมูลผู้ใช้ทั้งหมด
  getAll: () => apiFetch('/api/users'),
  
  // ดึงข้อมูลผู้ใช้ตาม ID
  getById: (id) => apiFetch(`/api/users/${id}`),
  
  // สร้างผู้ใช้ใหม่
  create: (data) => apiFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  // อัปเดตข้อมูลผู้ใช้
  update: (id, data) => apiFetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // ลบผู้ใช้
  delete: (id) => apiFetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
};

// API functions สำหรับจัดการบทบาทและสิทธิ์
export const rolesAPI = {
  // ดึงข้อมูลบทบาททั้งหมด
  getAll: () => apiFetch('/api/roles'),
  
  // ดึงข้อมูลบทบาทตาม ID
  getById: (id) => apiFetch(`/api/roles/${id}`),
  
  // สร้างบทบาทใหม่
  create: (data) => apiFetch('/api/roles', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  // อัปเดตบทบาท
  update: (id, data) => apiFetch(`/api/roles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // ลบบทบาท
  delete: (id) => apiFetch(`/api/roles/${id}`, {
    method: 'DELETE'
  }),
  
  // ดึงสิทธิ์ของบทบาท
  getPermissions: (id) => apiFetch(`/api/roles/${id}/permissions`),
  
  // กำหนดสิทธิ์ให้บทบาท
  assignPermissions: (id, permissionIds) => apiFetch(`/api/roles/${id}/permissions`, {
    method: 'POST',
    body: JSON.stringify({ permission_ids: permissionIds })
  })
};

export const permissionsAPI = {
  // ดึงข้อมูลสิทธิ์ทั้งหมด
  getAll: () => apiFetch('/api/permissions'),
  
  // ดึงข้อมูลสิทธิ์แบบจัดกลุ่ม
  getGrouped: () => apiFetch('/api/permissions/grouped'),
  
  // ดึงข้อมูลสิทธิ์ตาม ID
  getById: (id) => apiFetch(`/api/permissions/${id}`),
  
  // สร้างสิทธิ์ใหม่
  create: (data) => apiFetch('/api/permissions', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  // อัปเดตสิทธิ์
  update: (id, data) => apiFetch(`/api/permissions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // ลบสิทธิ์
  delete: (id) => apiFetch(`/api/permissions/${id}`, {
    method: 'DELETE'
  })
};

// Export config สำหรับใช้งานอื่นๆ
export default config;
