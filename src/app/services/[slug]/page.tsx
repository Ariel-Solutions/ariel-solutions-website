import { getServices, mapServices } from "../../lib/contentful/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import ServiceGallerySwiper from "../../components/swipers/ServiceGallerySwiper";
import { renderRichText } from "../../lib/contentful/renderRichText";

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getServices();
  const services = mapServices(data);
  const service = services.find((s: any) => s.slug === slug);

  if (!service) return notFound();

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-dark text-white position-relative overflow-hidden py-5">
        {service.thumbnail && (
          <img
            src={service.thumbnail}
            alt={service.title}
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover opacity-25"
          />
        )}
        <div className="container position-relative py-4">
          <Link
            href="/services"
            className="d-inline-flex align-items-center gap-1 mb-4 text-decoration-none text-info small fw-semibold"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Services
          </Link>
          <h1 className="display-4 fw-bold mb-3">{service.title}</h1>
          {service.description && (
            <p className="lead text-white-50 mb-0" style={{ maxWidth: "560px" }}>
              {service.description}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <hr className="border-primary opacity-100 mb-4" style={{ width: "48px", borderWidth: "3px" }} />
            <p className="text-secondary lh-lg" style={{ whiteSpace: "pre-line" }}>
              {renderRichText(service.content)}
            </p>
          </div>
        </div>

        {/* Gallery Swiper */}
        {service.images?.length > 0 && (
          <ServiceGallerySwiper images={service.images} title={service.title} />
        )}

        {/* CTA */}
        <div className="mt-5 p-4 p-md-5 text-center bg-dark text-white rounded-4">
          <h3 className="fw-bold mb-2">Interested in this service?</h3>
          <p className="text-white-50 mb-4">Let's talk about how we can help you.</p>
          <Link href="/contact" className="btn btn-primary px-4 py-2 fw-semibold">
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}
