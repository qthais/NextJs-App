import { Fugaz_One, Open_Sans } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import { AuthProVider } from "@/context/AuthContext";
import Logout from "@/components/Logout";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });
export const metadata = {
  title: "Broodl",
  description: "Track your daily mood every day",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
        <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>Broodl</h1>
      </Link>
      <Logout/>
    </header>
  )
  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-400 ' + fugaz.className}>Create with ❤️</p>
    </footer>
  )
  return (
    <html lang="en">
      <AuthProVider>
        <body className={'w-full max-w-[1000px] mx-auto text-sm:text-base min-h-screen flex flex-col text-slate-800 ' + opensans.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProVider>
    </html>
  );
}
