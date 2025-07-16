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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
      <body className={prompt.className} style={{ backgroundImage: 'url(/bg1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {!shouldHide && <Navigation />}

          {children}

          <br />
          <br />
          <br />
        {!shouldHide && <Footer />}
      </body>
    </html>
  );
}

