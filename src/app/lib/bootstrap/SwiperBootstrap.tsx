"use client";

import { useEffect } from "react";
import { initSwipers, destroySwipers } from './initSwipers'

export default function SwiperBootstrap() {
  useEffect(() => {
    initSwipers([
      {
        selector: ".banner-swiper",
        options: {
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
        },
      },
    ]);

    return () => destroySwipers();
  }, []);

  return null;
}