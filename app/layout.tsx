import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: `Mihai Peteu – Los Angeles-based Software Engineer`,
  description: `Software Designer/Developer specializing in Vue.js, React, Typescript and Node`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Footer() {
  return (
    <footer className="bg-accent-1 border-t py-10 border-accent-2">
      <div className="container mx-auto px-5">
        <h3 className="text-xl lg:text-xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
          This project's <a
            href="{REPO_URL}"
            className="bg-slate-100 p-2 underline duration-400 transition-all"
          >github repository</a>.
        </h3>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
