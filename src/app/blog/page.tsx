import { BlogList } from "@/components/blog-list";

export default function BlogPage() {
  return (
    <main className="blog-page flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-12 text-center text-4xl font-bold">我的博客</h1>
        <BlogList />
      </div>
    </main>
  );
}
