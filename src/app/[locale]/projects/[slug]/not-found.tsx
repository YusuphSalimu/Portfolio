import { Link } from "@/i18n/routing";

export default function ProjectNotFound() {
  return (
    <main className="page-shell not-found" id="main-content">
      <p className="eyebrow">404 / Project not found</p>
      <h1>This project isn’t available.</h1>
      <p>It may be unpublished or the address may be incorrect.</p>
      <Link className="button button--primary" href="/projects">Browse projects</Link>
    </main>
  );
}
