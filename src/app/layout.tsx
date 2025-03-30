import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QuestionContextProvider from "@/contexts/question-context-provider";
import prisma from "@/lib/db";
import BackgroundPattern from "@/components/background-pattern";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });
const tajawal = Tajawal({ weight: "400", subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "أسئلة حروف",
  description: "بنك أسئلة يحتوي على أكثر من 1000 سؤال وإجابة بناء على الحرف",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const questions = await prisma.question.findMany();
  return (
    <html lang="en">
      <body
        className={`${tajawal.className} text-sm text-accent bg-[#E5E8EC] min-h-screen dark:bg-[#1A1A1A] `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QuestionContextProvider data={questions}>
            <BackgroundPattern />
            <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
              <Header />
              {children}
              <Footer />
              <Toaster position="bottom-right" />
            </div>
          </QuestionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
