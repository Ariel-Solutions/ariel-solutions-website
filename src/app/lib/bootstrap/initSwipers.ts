import Swiper from "swiper/bundle";

type SwiperInstanceConfig = {
  selector: string;
  options: any;
};

const instances: Swiper[] = [];

export function initSwipers(configs: SwiperInstanceConfig[]) {
  configs.forEach(({ selector, options }) => {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return;

    const swiper = new Swiper(el, options);
    instances.push(swiper);
  });
}

export function destroySwipers() {
  instances.forEach((s) => s.destroy(true, true));
  instances.length = 0;
}