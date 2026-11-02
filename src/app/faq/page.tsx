import Link from 'next/link';
import { getSiteContent } from '@/lib/content';
import { SectionTitle } from '@/components/SectionTitle';

export async function generateMetadata() {
  const { copy } = await getSiteContent();
  return { title: copy.faq.title1, description: copy.faq.text1 };
}

export default async function FaqPage() {
  const { copy, faqItems } = await getSiteContent();
  return <main>
    <section className="section page-hero"><div className="container narrow">
      <SectionTitle title={copy.faq.title1} text={copy.faq.text1} align="center" />
    </div></section>
    <section className="section"><div className="container narrow detail-stack">
      {faqItems.map(item => <article key={item.id} className="content-card">
        <h2>{item.question}</h2><div className="article-copy">{item.answer.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      </article>)}
      <div className="content-card"><p>{copy.faq.paragraph1}</p><Link href="/contact" className="button secondary">{copy.faq.link1}</Link></div>
    </div></section>
  </main>;
}
