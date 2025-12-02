import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Wrench, LayoutDashboard, PlusCircle } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pipelore | Gestão Inteligente",
  description: "Gerencie ordens de serviço com eficiência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-4 sm:px-6 h-16 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
                <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800">Pipelore</span>
            </div>
            
            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors p-2 sm:p-0">
                <LayoutDashboard className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link href="/new" className="flex items-center gap-2 hover:text-blue-600 transition-colors p-2 sm:p-0">
                <PlusCircle className="h-5 w-5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Nova Ordem</span>
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-300">
                AD
              </div>
            </div>
          </header>

          <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </main>
          
          <footer className="border-t py-6 text-center text-xs sm:text-sm text-slate-400 bg-white px-4">
            © 2024 Pipelore System. Todos os direitos reservados.
          </footer>
        </div>
      </body>
    </html>
  );
}