import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar/Sidebar"
import GlobalStylesProvider from "./providers/GlobalStylesProvider";
import ContentProvider from "./providers/ContentProvider";
import { ClerkProvider} from '@clerk/nextjs'
import { auth } from "@clerk/nextjs/server";
import NextTopLoader from "nextjs-toploader";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {userId} = auth()
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <NextTopLoader
          height={2}
          color="green"
          easing="cubic-bezier(.53,.21,0,1)"
          zIndex={1600}


        />
        <ContentProvider>
        <GlobalStylesProvider>
        { userId && <Sidebar/>}
          <div className="w-full ">{children}</div>
        </GlobalStylesProvider>
        </ContentProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
