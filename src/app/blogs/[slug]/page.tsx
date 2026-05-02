import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogs, mapBlogs } from "../../lib/contentful/blogs";
import ServiceGallerySwiper from "../../components/swipers/ServiceGallerySwiper";
import { renderRichText } from "../../lib/contentful/renderRichText";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getBlogs();
  const blogs = mapBlogs(data);
  const blog = blogs.find((b: any) => b.slug === slug);

  if (!blog) return notFound();

  return (
    <main>
      <section
        className="bg-dark text-white position-relative overflow-hidden py-5"
        style={{ minHeight: "360px" }}
      >
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover opacity-25"
          />
        )}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        <div
          className="container position-relative py-4 d-flex flex-column justify-content-end"
          style={{ minHeight: "360px" }}
        >
          <Link
            href="/blogs"
            className="d-inline-flex align-items-center gap-1 mb-4 text-decoration-none text-info small fw-semibold"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Posts
          </Link>
          <h1 className="display-4 fw-bold mb-3">{blog.title}</h1>
          {blog.description && (
            <p className="lead text-white-50 mb-0" style={{ maxWidth: "560px" }}>
              {blog.description}
            </p>
          )}
        </div>
      </section>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <hr
              className="border-primary opacity-100 mb-4"
              style={{ width: "48px", borderWidth: "3px" }}
            />
            <p className="text-secondary lh-lg" style={{ whiteSpace: "pre-line" }}>
              {renderRichText(blog.content)}
            </p>
          </div>
        </div>

        {blog.images?.length > 0 && (
          <ServiceGallerySwiper images={blog.images} title={blog.title} />
        )}

        <div className="mt-5 p-4 p-md-5 text-center bg-dark text-white rounded-4">
          <h3 className="fw-bold mb-2">Want to know more?</h3>
          <p className="text-white-50 mb-4">Get in touch with our team today.</p>
          <Link href="/contact" className="btn btn-primary px-4 py-2 fw-semibold">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
