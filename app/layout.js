'use client';
import Navigation from "./components/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Prompt } from "next/font/google";
import Footer from "./components/footer";
import { usePathname } from 'next/navigation';


const prompt = Prompt({
  subsets: ['thai', 'latin'], // รองรับภาษาไทย
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});



export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hiddenPaths = ['/login', '/register', '/dashboard/admin'];
  const shouldHide = hiddenPaths.includes(pathname);
  

  return (
    <html lang="en">
    <head>
      <title>Frontend</title>
      <meta name="viewport saturate-200" content="width=device-width, initial-scale=1" />
      <style jsx global>{`
        /* ซ่อน scrollbar สำหรับ Webkit browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* ซ่อน scrollbar สำหรับ Firefox */
        html {
          scrollbar-width: none;
        }
        
        /* ซ่อน scrollbar แต่ยังสามารถเลื่อนได้ */
        body {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        
        body::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </head>
      <body className={prompt.className} style={{ backgroundImage: 'url(/bg1.jpg)', backgroundSize: 'fit', backgroundPosition: 'center' }}>
        {!shouldHide && (
            <Navigation />
        )}
        
          {children}

        {!shouldHide && (
          <Footer />
        )}
      </body>
    </html>
  );
}
