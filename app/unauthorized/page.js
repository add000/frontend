'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Unauthorized() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.replace('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-purple-900 opacity-50"></div>
      
      <div className="relative z-10 text-center p-8">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-red-500 bg-opacity-20 rounded-full mb-6">
            <i className="fas fa-lock text-red-500" style={{ fontSize: '4rem' }}></i>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">403</h1>
          <h2 className="text-3xl font-semibold text-red-400 mb-4">ไม่มีสิทธิ์เข้าถึง</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
            คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบหากต้องการขอสิทธิ์
          </p>
        </div>

        <div className="bg-black bg-opacity-30 rounded-2xl p-6 mb-8">
          <div className="text-white mb-4">
            <p className="text-sm text-gray-400 mb-2">จะกลับหน้าหลักอัตโนมัติใน</p>
            <div className="text-5xl font-bold text-red-400">{countdown}</div>
            <p className="text-gray-400">วินาที</p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/dashboard" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-home"></i>
            กลับหน้าหลัก
          </Link>
          <button 
            onClick={() => router.back()} 
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
            ย้อนกลับ
          </button>
          <Link 
            href="/login" 
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-sign-in-alt"></i>
            เข้าสู่ระบบใหม่
          </Link>
        </div>
      </div>
    </div>
  );
}
