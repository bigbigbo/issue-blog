import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getIssueById, Issue } from "@/services/github";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt, FaTag } from "react-icons/fa";

// 在服务器端获取博客数据
async function getBlogPost(id: string): Promise<Issue | null> {
  return await getIssueById(parseInt(id));
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  // 格式化日期
  const formattedDate = new Date(post.created_at).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="blog-page flex min-h-screen flex-col items-center p-6 md:p-12">
      <div className="mx-auto w-full max-w-4xl">
        <Link href="/blog" className="mb-8 flex items-center text-blue-400 hover:text-blue-500">
          <FaArrowLeft className="mr-2" />
          返回博客列表
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-8">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
            <div className="mb-4 flex flex-wrap items-center text-gray-400">
              <div className="mr-6 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="mb-2 flex items-center">
                <Image
                  src={post.user.avatar_url}
                  alt={post.user.login}
                  className="mr-2 h-6 w-6 rounded-full"
                  width={24}
                  height={24}
                />
                <span>{post.user.login}</span>
              </div>
            </div>

            {post.labels.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {post.labels.map((label) => (
                  <span
                    key={label.id}
                    className="inline-flex items-center rounded px-3 py-1 text-sm"
                    style={{
                      backgroundColor: `#${label.color}20`,
                      color: `#${label.color}`,
                    }}
                  >
                    <FaTag className="mr-1" />
                    {label.name}
                  </span>
                ))}
              </div>
            )}
          </header>

          <MarkdownRenderer content={post.body} />
        </article>
      </div>
    </main>
  );
}
