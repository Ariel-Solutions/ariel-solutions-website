"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

type Banner = {
  title?: string;
  header?: string;
  description?: string;
  image: string;
};

type Props = {
  banners: Banner[];
};

export default function BannerSwiper({ banners }: Props) {
  const swiperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = new Swiper(swiperRef.current, {
      loop: true,
      effect: "fade",

      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".banner-swiper .swiper-pagination",
        clickable: true,
      },
    });

    return () => swiper.destroy(true, true);
  }, []);

  return (
    <div className="swiper banner-swiper" ref={swiperRef}>
      <div className="swiper-wrapper">
        {banners.map((banner, i) => (
          <div className="swiper-slide" key={i}>
            <div
              className="position-relative overflow-hidden"
              style={{ minHeight: "600px" }}
            >
              <Image
                src={banner.image}
                alt={banner.title || "banner"}
                fill
                priority={i === 0}
                style={{ objectFit: "cover", filter: "brightness(0.6)" }}
              />

              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
                <div className="container text-white px-4 px-md-5">
                  {banner.title && (
                    <span
                      className="text-uppercase mb-3 fw-normal">
                      {banner.title}
                    </span>
                  )}
                  {banner.header && (
                    <h1 className="fw-bold mb-3 display-5">{banner.header}</h1>
                  )}
                  {banner.description && (
                    <p
                      className="lead mb-0"
                      style={{ maxWidth: "560px", opacity: 0.9 }}
                    >
                      {banner.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="swiper-pagination"></div>
    </div>
  );
}
