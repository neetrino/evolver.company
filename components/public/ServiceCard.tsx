type ServiceCardProps = {
  title: string;
  description: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <article className="service-card">
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-text">{description}</p>
    </article>
  );
}
