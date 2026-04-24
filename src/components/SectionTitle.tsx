type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
};

export function SectionTitle({ eyebrow, title, text, align = 'left' }: SectionTitleProps) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {text ? <p className="section-text">{text}</p> : null}
    </div>
  );
}
