import Link from 'next/link';
import { getSiteContent } from '@/lib/content';
import { publicPosts } from '@/lib/articles';
import { SectionTitle } from '@/components/SectionTitle';

export async function generateMetadata() {
  const { copy } = await getSiteContent();
  return { title: copy.blog.title1, description: copy.blog.text1 };
}

export default async function BlogPage() {
  const { copy, blogPosts } = await getSiteContent();
  const posts = publicPosts(blogPosts);
  return <main>
    <section className="section page-hero"><div className="container narrow">
      <SectionTitle title={copy.blog.title1} text={copy.blog.text1} align="center" />
    </div></section>
    <section className="section"><div className="container narrow detail-stack">
      {!posts.length && <p>{copy.blog.paragraph1}</p>}
      {posts.map(post => <article key={post.id} className="content-card article-copy">
        <time dateTime={post.date}>{new Date(`${post.date}T12:00:00Z`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam' })}</time>
        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.summary}</p>
        <Link href={`/blog/${post.slug}`} className="text-link" aria-label={`${copy.blog.link1}: ${post.title}`}>{copy.blog.link1}</Link>
      </article>)}
    </div></section>
  </main>;
}
