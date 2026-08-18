type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
  headingLevel?: 'h1' | 'h2';
};

export function SectionTitle({
  eyebrow,
  title,
  text,
  align = 'left',
  headingLevel: Heading = 'h1',
}: SectionTitleProps) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading>{title}</Heading>
      {text ? <p className="section-text">{text}</p> : null}
    </div>
  );
}
