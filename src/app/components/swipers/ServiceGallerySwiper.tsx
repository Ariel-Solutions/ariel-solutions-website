"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  images: string[];
  title: string;
}

export default function ServiceGallerySwiper({ images, title }: Props) {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".gallery-swiper", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      navigation: {
        nextEl: ".gallery-swiper .swiper-button-next",
        prevEl: ".gallery-swiper .swiper-button-prev",
      },
      pagination: {
        el: ".gallery-swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
      },
    });

    return () => {
      swiperRef.current?.destroy(true, true);
    };
  }, []);

  return (
    <div className="mt-5 pt-4 border-top">
      <h4 className="fw-bold mb-4">Gallery</h4>
      <div className="swiper gallery-swiper pb-5">
        <div className="swiper-wrapper">
          {images.map((img, i) => (
            <div className="swiper-slide" key={i}>
              <img
                src={img}
                alt={`${title} image ${i + 1}`}
                className="img-fluid rounded w-100"
                style={{ height: "220px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}
