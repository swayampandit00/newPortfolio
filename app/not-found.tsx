import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center section-pad text-center">
      <div>
        <p className="kicker">404</p>
        <h1 className="display mt-4 text-6xl">Signal lost</h1>
        <p className="mt-4 text-muted">This coordinate does not exist in the lab.</p>
        <Link href="/" className="mt-8 inline-block text-xs tracking-[0.24em] uppercase text-accent">
          Return home
        </Link>
      </div>
    </div>
  );
}
