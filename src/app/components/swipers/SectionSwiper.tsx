"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  children: React.ReactNode;
}

export default function SectionSwiper({ children }: Props) {
  const swiperRef = useRef<Swiper | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    swiperRef.current = new Swiper(containerRef.current, {
      modules: [Pagination],
      slidesPerView: 1.1,
      spaceBetween: 16,
      pagination: {
        el: containerRef.current.querySelector(".swiper-pagination") as HTMLElement,
        clickable: true,
      },
    });

    return () => {
      swiperRef.current?.destroy(true, true);
    };
  }, []);

  return (
    <div className="swiper pb-5" ref={containerRef}>
      <div className="swiper-wrapper">{children}</div>
      <div className="swiper-pagination"></div>
    </div>
  );
}