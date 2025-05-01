import BackgroundEffect from "@/components/BackgroundEffect";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import Link from "next/link";
import { FaBook } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <BackgroundEffect />
      <div className="pointer-events-none fixed inset-0 bg-white/[0.02] backdrop-blur-2xl" />
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <Profile />
        <div className="mt-12">
          <Link
            href="/blog"
            className="flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-all hover:bg-blue-700"
          >
            <FaBook className="mr-2" />
            查看我的博客
          </Link>
        </div>
      </div>
    </main>
  );
}
