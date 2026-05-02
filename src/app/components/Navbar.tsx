import Image from "next/image";
import Link from "next/link";
import { links, bussinessInfo } from "../data/data";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom">
            <div className="container">

                {/* Brand */}
                <Link href="/" className="navbar-brand d-flex align-items-center gap-3">
                    <Image
                        src="/logo.svg"
                        alt="Techsolve Logo"
                        width={64}
                        height={64}
                    />
                    <div>
                        <p className="fw-semibold mb-0 lh-sm text-dark" style={{ fontSize: "0.95rem" }}>
                            {bussinessInfo.header}
                        </p>
                        <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                            {bussinessInfo.title}
                        </p>
                    </div>
                </Link>

                {/* Mobile toggle */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#primaryNavigation"
                    aria-controls="primaryNavigation"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                {/* Nav links */}
                <div className="collapse navbar-collapse" id="primaryNavigation">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
                        {links
                            .filter((link) => link.href !== "/contact")
                            .map((link) => (
                                <li key={link.href} className="nav-item">
                                    <Link href={link.href} className="nav-link text-dark px-3">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}

                        {/* CTA button for /contact */}
                        <li className="nav-item ms-lg-2">
                            <Link
                                href="/contact"
                                className="btn btn-dark rounded-pill px-4 small"
                            >
                                Contact Now
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}