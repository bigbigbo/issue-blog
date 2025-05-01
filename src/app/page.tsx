import BackgroundEffect from "@/components/BackgroundEffect";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundEffect />
      <div className="fixed inset-0 backdrop-blur-2xl bg-white/[0.02] pointer-events-none" />
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Profile />
      </div>
    </main>
  );
}
