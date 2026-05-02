import Link from "next/link";
import { getServices, mapServices } from "../lib/contentful/services";

export default async function Services() {
  const data = await getServices();
  const services = mapServices(data);

  return (
    <main>
      {/* Hero */}
      <section className="bg-dark text-white py-5 mb-5 border-bottom border-primary">
        <div className="container py-4">
          <span className="text-uppercase text-primary fw-semibold small d-block mb-2 ls-wide">
            What We Offer
          </span>
          <h1 className="display-4 fw-bold mb-3">Our Services</h1>
          <p className="lead text-white-50" style={{ maxWidth: "520px" }}>
            We provide software and automation services that help businesses improve workflows, reduce manual tasks, and operate more efficiently.
          </p>
        </div>
      </section>

      {/* Cards */}
      <div className="container pb-5">
        <div className="row g-4">
          {services.map((service: any) => (
            <div className="col-sm-6 col-lg-4" key={service.id}>
              <Link
                href={`/services/${service.slug}`}
                className="text-decoration-none d-block h-100"
              >
                <div className="card h-100 shadow-sm border-0">
                  {service.thumbnail ? (
                    <img
                      src={service.thumbnail}
                      className="card-img-top"
                      alt={service.title}
                      style={{ height: "210px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white"
                      style={{ height: "210px" }}
                    >
                      <span className="fs-1 opacity-50">🛠</span>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold mb-2">{service.title}</h5>
                    <p className="card-text text-secondary small flex-grow-1">
                      {service.description.length > 115
                        ? service.description.slice(0, 115) + "…"
                        : service.description}
                    </p>
                    <span className="text-primary fw-semibold small d-inline-flex align-items-center gap-1 mt-2">
                      Learn more
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-5 text-secondary">
            <p className="fs-5">No services available yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}