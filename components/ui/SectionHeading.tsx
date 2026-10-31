export function SectionHeading({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="kicker">{kicker}</p>
      <h2 className="mt-4 display text-4xl sm:text-5xl lg:text-7xl">{title}</h2>
      {copy && <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">{copy}</p>}
    </div>
  );
}
