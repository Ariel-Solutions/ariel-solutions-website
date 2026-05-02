import Link from "next/link";
import { getBlogs, mapBlogs } from "../lib/contentful/blogs";

export default async function Blogs() {
  const data = await getBlogs();
  const blogs = mapBlogs(data);

  return (
    <main>
      <section className="bg-dark text-white py-5 mb-5 border-bottom border-primary">
        <div className="container py-4">
          <span className="text-uppercase text-primary fw-semibold small d-block mb-2">
            Latest Posts
          </span>
          <h1 className="display-4 fw-bold mb-3">Blogs</h1>
          <p className="lead text-white-50" style={{ maxWidth: "520px" }}>
            Insights, news and updates from our team.
          </p>
        </div>
      </section>

      <div className="container pb-5">
        <div className="row g-4">
          {blogs.map((blog: any) => (
            <div className="col-sm-6 col-lg-4" key={blog.id}>
              <Link
                href={`/blogs/${blog.slug}`}
                className="text-decoration-none d-block h-100"
              >
                <div className="card h-100 border-0 shadow-sm">
                  {blog.thumbnail ? (
                    <img
                      src={blog.thumbnail}
                      className="card-img-top"
                      alt={blog.title}
                      style={{ height: "210px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                      style={{ height: "210px" }}
                    >
                      <span className="fs-1 text-white opacity-50">📝</span>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold mb-2">{blog.title}</h5>
                    <p className="card-text text-secondary small flex-grow-1">
                      {blog.description.length > 115
                        ? blog.description.slice(0, 115) + "…"
                        : blog.description}
                    </p>
                    <span className="text-primary fw-semibold small d-inline-flex align-items-center gap-1 mt-2">
                      Read more
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

        {blogs.length === 0 && (
          <div className="text-center py-5 text-secondary">
            <p className="fs-5">No posts available yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}