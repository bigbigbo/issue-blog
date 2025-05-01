import BackgroundEffect from "@/components/BackgroundEffect";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <BackgroundEffect />
      <div className="pointer-events-none fixed inset-0 bg-white/[0.02] backdrop-blur-2xl" />
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-4">
        <Profile />
      </div>
    </main>
  );
}
