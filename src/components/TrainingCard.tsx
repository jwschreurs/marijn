import Link from 'next/link';
import type { Training } from '@/data/site';

export function TrainingCard({ training }: { training: Training }) {
  return (
    <article className="card">
      <p className="card-meta">{training.duration}</p>
      <h2>{training.title}</h2>
      <p className="card-target">{training.audience}</p>
      <p>{training.summary}</p>
      <Link href={`/trainingen/${training.slug}`} className="text-link">
        Bekijk training
      </Link>
    </article>
  );
}
