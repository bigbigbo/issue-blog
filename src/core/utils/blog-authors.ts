const configuredBlogAuthors =
  process.env.NEXT_PUBLIC_BLOG_AUTHORS ?? process.env.NEXT_PUBLIC_BLOG_AUTHOR ?? process.env.GITHUB_REPO_OWNER ?? "";

export const blogAuthors = configuredBlogAuthors
  .split(",")
  .map((author) => author.trim())
  .filter(Boolean);

export function isBlogAuthor(login: string): boolean {
  return blogAuthors.length === 0 || blogAuthors.includes(login);
}
