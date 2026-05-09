import Image from "next/image";
import Link from "next/link";
import { bussinessInfo, links } from "../data/data";


export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row align-items-start py-5 g-5">

                    {/* Brand & Contact */}
                    <div className="col-12 col-lg-5">
                        <Link
                            href="/"
                            className="d-flex align-items-center gap-4 mb-4 text-decoration-none"
                        >
                            <Image
                                src="/logo.svg"
                                alt="Ariel Solutions Logo"
                                width={64}
                                height={64}
                            />
                            <div>
                                <p className="text-white fw-semibold mb-0 lh-sm">
                                    {bussinessInfo.header}
                                </p>
                                <p className="text-secondary mb-0" style={{ fontSize: "0.8rem" }}>
                                    {bussinessInfo.title}
                                </p>
                            </div>
                        </Link>
                        <p
                            className="text-secondary small mb-4"
                            style={{ maxWidth: "320px", lineHeight: "1.7" }}
                        >
                            {bussinessInfo.describe}
                        </p>
                    </div>

                    <div
                        className="col-12 col-lg-7 ps-lg-5"
                        style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <p
                            className="text-white fw-bold small mb-4 text-uppercase"
                            style={{ letterSpacing: "0.08em" }}
                        >
                            Quick Links
                        </p>
                        <ul className="list-unstyled row row-cols-2 g-0 mb-0">
                            {links.map((link) => (
                                <li key={link.href} className="col mb-3">
                                    <Link
                                        href={link.href}
                                        className="text-secondary text-decoration-none small d-flex align-items-center gap-2"
                                    >
                                        <span
                                            className="rounded-circle bg-secondary d-inline-block flex-shrink-0"
                                            style={{ width: "4px", height: "4px" }}
                                        />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div
                    className="d-flex flex-column flex-sm-row align-items-center justify-content-between py-3 gap-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                    <small className="text-secondary">
                        &copy; {new Date().getFullYear()} Ariel Solutions. All rights reserved.
                    </small>

                    <small className="text-secondary">
                        <Link href="/privacy-policy" className="text-decoration-none text-secondary">
                            Privacy Policy
                        </Link>
                    </small>
                </div>
            </div>
        </footer>
    );
}