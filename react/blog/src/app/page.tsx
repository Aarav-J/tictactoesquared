import Image from "next/image";
import Timer from "./components/Timer";

import Link from "next/link";
import "./globals.css"
// import 'tailwindcss/tailwind.css'
// import localFont from 'next/font/local';

// export const geistSans = localFont({
// 	src: './fonts/GeistVF.woff',
// 	variable: '--font-geist-sans',
// 	weight: '100 900',
// });

// export const geistMono = localFont({
// 	src: './fonts/GeistMonoVF.woff',
// 	variable: '--font-geist-mono',
// 	weight: '100 900',
// });

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center bg-background font-geist">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-screen">
          <div className="w-full gap-14 flex flex-col py-6 lg:py-10">
              <div className="w-full flex flex-col px-10 lg:px-20 xl:px-40">
                <h1 className="ml-2 mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl text-main justify-center">Aarav's Blog</h1>
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-widest text-text font-extrabold ">Coming Soon!</h1>
              </div>
              <Timer/>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-screen">
        <Image
            src="/keyboard.png"
            width={0}
            height={0}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 70vw, 65%"
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }} 
            alt="Picture of an image with my bitmoji hitting a keyboard"
          />
        </div>

    </div>
    
  );
}
