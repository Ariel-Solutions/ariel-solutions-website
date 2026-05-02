import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTeamMemberBySlug } from "../../lib/contentful/teamMember";
import { renderRichText } from "../../lib/contentful/renderRichText";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const person = await getTeamMemberBySlug(slug);
  if (!person) notFound();

  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: "860px" }}>

        {/* Back link */}
        <Link
          href="/"
          className="d-inline-flex align-items-center gap-2 text-secondary text-decoration-none small mb-4"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to team
        </Link>

        <div className="row g-5 align-items-start">

          {/* Avatar */}
          <div className="col-12 col-md-4">
            <div
              className="position-relative rounded-4 overflow-hidden shadow-sm"
              style={{ aspectRatio: "3/4" }}
            >
              {person.avatar ? (
                <Image
                  src={person.avatar}
                  alt={person.name}
                  fill
                  className="object-fit-cover"
                  priority
                />
              ) : (
                <div className="w-100 h-100 bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center">
                  <svg width="64" height="64" fill="none" stroke="#aaa" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="col-12 col-md-8">
            <p className="text-primary text-uppercase fw-semibold small mb-1">
              {person.position}
            </p>
            <h1 className="fw-bold mb-3">{person.name}</h1>
            {person.bio && (
              <div className="text-secondary lh-lg mb-4">{renderRichText(person.bio)}</div>
            )}
            {/* Contact */}
            {(person.email || person.phone) && (
              <div className="d-flex flex-column gap-2">
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="d-inline-flex align-items-center gap-2 text-body text-decoration-none"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m2 7 10 7 10-7" />
                    </svg>
                    <span className="small">{person.email}</span>
                  </a>
                )}
                {person.phone && (
                  <a
                    href={`tel:${person.phone}`}
                    className="d-inline-flex align-items-center gap-2 text-body text-decoration-none"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.26 19a19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.9-8.56A2 2 0 0 1 3.34 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.85.56 2.81.69A2 2 0 0 1 21 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="small">{person.phone}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}