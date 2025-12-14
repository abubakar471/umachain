import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
})

export const metadata = {
  title: "Umacoin",
  description: "Don't want to miss another opportunity like you missed Umacoin? Buy Umacoin now while you still can.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up" afterSignOutUrl="/">
      <html lang="en">
        <body
          className={`${poppins.className} antialiased`}
        >
          {children}
          <NextTopLoader color="#FDE300" />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: '#363636',
                color: '#fff',
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
