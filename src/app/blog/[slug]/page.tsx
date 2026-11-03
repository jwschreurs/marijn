import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content';
import { ArticleBody } from '@/components/ArticleBody';

type Props = { params: Promise<{ slug: string }> };
async function findPost(params: Props['params']) {
  const { slug } = await params;
  const content = await getSiteContent();
  const post = content.blogPosts.find(item => item.slug === slug && item.published);
  if (!post) notFound();
  return { post, copy: content.copy };
}
export async function generateMetadata({ params }: Props) {
  const { post } = await findPost(params);
  return { title: post.title, description: post.summary };
}
export default async function BlogPostPage({ params }: Props) {
  const { post, copy } = await findPost(params);
  return <main className="section"><div className="container narrow detail-stack">
    <Link href="/blog" className="text-link">{copy.blog.link2}</Link>
    <article className="content-card article-copy">
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{new Date(`${post.date}T12:00:00Z`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam' })}</time>
      <p className="muted">{post.summary}</p>
      <ArticleBody body={post.body} richBody={post.richBody} />
    </article>
  </div></main>;
}
