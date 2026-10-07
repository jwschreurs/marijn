import { getSiteContent } from '@/lib/content';
import Link from 'next/link';
import type { Training } from '@/data/site';

export async function TrainingCard({ training }: { training: Training }) {
  const { copy } = await getSiteContent();
  return (
    <article className="card">
      <p className="card-meta">{training.duration}</p>
      <h2>{training.title}</h2>
      <p className="card-target">{training.audience}</p>
      <p>{training.summary}</p>
      <Link href={`/trainingen/${training.slug}`} className="text-link">{copy.trainingCard.link1}</Link>
    </article>
  );
}
