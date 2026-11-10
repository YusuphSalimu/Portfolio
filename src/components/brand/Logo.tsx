import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand-logo" href={href} aria-label="Yusuph Salimu home">
      <span className="brand-logo__mark" aria-hidden="true">&gt;_</span>
      <span>yusuph.dev</span>
    </Link>
  );
}
