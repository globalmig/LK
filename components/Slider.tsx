"use client";
import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Slider() {
  return (
    <div className="relative w-full h-80 md:h-[640px]">
      <Swiper
        slidesPerView={1} // ← 여기!
        spaceBetween={0} // ← 간격 0
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ type: "progressbar" }}
        navigation
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper white-text w-full h-full"
      >
        <SwiperSlide className="relative">
          <Image src="/img/bg_slider01.jpg" alt="Slide 1" fill priority sizes="100vw" quality={85} className="object-cover" />
          <div className="bg-black/40 w-full h-full absolute"></div>
          <div className="relative px-4 break-keep">
            <h2>소수 고객 집중 관리 관세 파트너, LK관세사무소</h2>
            <p>고객의 성공이 곧 우리의 성공입니다.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <Image src="/img/bg_slider02.jpg" alt="Slide 3" fill priority sizes="100vw" quality={85} className="object-cover" />
          <div className="bg-black/40 w-full h-full absolute"></div>
          <div className="relative px-4 break-keep">
            <h2>복잡한 통관 절차, 믿을 수 있는 전문가와 함께하세요.</h2>
            <p>국제 무역의 든든한 파트너로서, 정확하고 신속한 통관 서비스를 제공합니다.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <Image src="/img/bg_slider03.jpg" alt="Slide 3" fill priority sizes="100vw" quality={85} className="object-cover" />
          <div className="bg-black/40 w-full h-full absolute"></div>
          <div className="relative px-4 break-keep">
            <h2>수출입 절차, 믿을 수 있는 전문가와 함께하세요.</h2>
            <p>처음부터 끝까지 함께하는 관세 파트너로, 고객의 안심을 책임집니다.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
