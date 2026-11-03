import type { ReactNode } from 'react';
import { plainTextToRich, type RichNode } from '@/lib/rich-text';

function renderNode(node: RichNode, key: number): ReactNode {
  const children = node.content?.map(renderNode);
  switch (node.type) {
    case 'doc': return children;
    case 'paragraph': return <p key={key}>{children?.length ? children : <br />}</p>;
    case 'heading': return node.attrs?.level === 3 ? <h3 key={key}>{children}</h3> : <h2 key={key}>{children}</h2>;
    case 'bulletList': return <ul key={key}>{children}</ul>;
    case 'orderedList': return <ol key={key} start={node.attrs?.start}>{children}</ol>;
    case 'listItem': return <li key={key}>{children}</li>;
    case 'hardBreak': return <br key={key} />;
    case 'text': {
      let text: ReactNode = node.text;
      for (const mark of node.marks ?? []) {
        if (mark.type === 'bold') text = <strong>{text}</strong>;
        if (mark.type === 'italic') text = <em>{text}</em>;
        if (mark.type === 'link') text = <a href={mark.attrs?.href}>{text}</a>;
      }
      return <span key={key}>{text}</span>;
    }
  }
}

export function ArticleBody({ body, richBody }: { body: string; richBody?: RichNode }) {
  return <div className="blog-prose">{renderNode(richBody ?? plainTextToRich(body), 0)}</div>;
}
