import Reveal from "./Reveal";

export type Testimonial = { quote: string; name: string; role: string };

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section className="content-section" id="testimonials" aria-labelledby="testimonials-title">
      <Reveal>
        <p className="eyebrow">Kind words</p>
        <h2 className="section-title" id="testimonials-title">Testimonials</h2>
        <div className="testimonial-grid">
          {items.map((item) => (
            <figure className="glass-surface testimonial-card" key={`${item.name}-${item.quote}`}>
              <blockquote>{item.quote}</blockquote>
              <figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
