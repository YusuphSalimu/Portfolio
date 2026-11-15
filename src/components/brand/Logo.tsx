import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand-logo" href={href} aria-label="Yusuph Salimu home">
      <span className="brand-logo__mark" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M10 10h8l6 12 6-12h8L28 29v10h-8V29Z" fill="currentColor" /></svg></span>
      <span>yusuph.dev</span>
    </Link>
  );
}
