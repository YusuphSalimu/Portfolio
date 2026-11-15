import { Mail, Phone } from "lucide-react";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default function ContactIcon({ name }: { name: string }) {
  if (name === "Email") return <Mail aria-hidden="true" />;
  if (name === "Phone") return <Phone aria-hidden="true" />;
  const [width, height, , , path] = (name === "LinkedIn" ? faLinkedinIn : faGithub).icon;
  return <svg viewBox={`0 0 ${width} ${height}`} fill="currentColor" aria-hidden="true">
    {Array.isArray(path) ? path.map((d) => <path d={d} key={d} />) : <path d={path} />}
  </svg>;
}
