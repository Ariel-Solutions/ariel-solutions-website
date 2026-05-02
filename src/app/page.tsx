import BannerSwiper from "./components/swipers/BannerSwiper";
import SectionSwiper from "./components/swipers/SectionSwiper";
import Link from "next/link";
import Image from "next/image";
import { getBanners, mapBanners } from "./lib/contentful/banners";
import { getBlogs, mapBlogs } from "./lib/contentful/blogs";
import { getAboutUs, mapAboutUs } from "./lib/contentful/about-us";
import { getOurTeam, mapOurTeam } from "./lib/contentful/teamMember";
import { bussinessInfo } from "./data/data";
import { renderRichText } from "./lib/contentful/renderRichText";

export default async function Home() {
  const [bannerData, blogData, aboutUsData, ourTeamData] = await Promise.all([
    getBanners(),
    getBlogs(),
    getAboutUs(),
    getOurTeam(),
  ]);

  const banners = mapBanners(bannerData);
  const blogs = mapBlogs(blogData).slice(0, 3);
  const aboutUs = mapAboutUs(aboutUsData);
  const ourTeam = mapOurTeam(ourTeamData);

  return (
    <main>

      <BannerSwiper banners={banners} />


      <section className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <div className="position-relative w-100 rounded-4 overflow-hidden" style={{ aspectRatio: "3/2" }}>
                <Image
                  src={aboutUs[0].image}
                  alt={aboutUs[0].title}
                  fill
                  className="object-fit-cover"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <p className="text-primary text-uppercase fw-semibold small mb-1">{aboutUs[0].title}</p>
              <h2 className="fw-bold mb-3">{aboutUs[0].header}</h2>
              {renderRichText(aboutUs[0].content)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-primary text-uppercase fw-semibold small mb-1">Our People</p>
            <p className="text-secondary mx-auto" style={{ maxWidth: "520px" }}>
              Learn more about our people at {bussinessInfo.header}
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {ourTeam.map((person) => (
              <div className="col-12 col-sm-6 col-lg-4" key={person.id}>
                <Link href={`/people/${person.slug ?? person.id}`} className="text-decoration-none text-body">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="ratio ratio-4x3 rounded-top overflow-hidden">
                      <Image src={person.avatar} alt={person.name} fill className="object-fit-cover" />
                    </div>
                    <div className="card-body">
                      <h4 className="card-title h6 fw-semibold mb-1">{person.name}</h4>
                      <p className="text-primary fw-semibold small mb-0">{person.position}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-primary text-uppercase fw-semibold small mb-1">Blog</p>
            <h2 className="fw-bold mb-2">Latest Updates</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: "520px" }}>
              Stay informed with the newest insights, stories, and progress.
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="fw-semibold mb-2">No articles yet</h4>
              <p className="text-secondary mb-1">
                Insights from {bussinessInfo.header} are coming soon.
              </p>
              <p className="text-muted small mb-0">
                {bussinessInfo.describe}
              </p>
            </div>
          ) : (
            <>
              <div className="row row-cols-1 row-cols-md-3 g-4 d-none d-md-flex">
                {blogs.map((blog) => (
                  <div className="col" key={blog.id}>
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>

              <div className="d-md-none">
                <SectionSwiper>
                  {blogs.map((blog) => (
                    <div className="swiper-slide" key={blog.id}>
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </SectionSwiper>
              </div>
            </>
          )}

          <div className="text-center mt-5">
            <Link href="/blogs" className="btn btn-primary px-5">
              See More
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ── Blog Card ── */
function BlogCard({ blog }: { blog: any }) {
  return (
    <div className="card border-0 h-100">
      <div className="position-relative rounded-3 overflow-hidden" style={{ height: "220px" }}>
        {blog.thumbnail ? (
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-fit-cover"
          />
        ) : (
          <div className="w-100 h-100 bg-secondary bg-opacity-25" />
        )}
      </div>
      <div className="card-body px-0 pt-3 pb-0">
        <h4 className="card-title h6 fw-semibold mb-1">
          <Link
            href={`/blogs/${blog.slug}`}
            className="stretched-link text-decoration-none text-body"
          >
            {blog.title}
          </Link>
        </h4>
        {blog.description && (
          <p className="text-secondary small mb-0">
            {blog.description.slice(0, 80)}…
          </p>
        )}
      </div>
    </div>
  );
}
