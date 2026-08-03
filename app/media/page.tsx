import Hero from "@/components/Hero";
import React from "react";

export default function Media() {
  return (
    <>
      <section className="mb-40">
        <Hero title={"SBS 비즈 출연영상"} subtitle={"LK 관세사무소가 SBS Biz에 소개된 영상을 확인해보세요"} img={"/img/bg_work_solutions02.jpg"} priority />
      </section>
      <section className="flex flex-col justify-center items-center mb-40 gap-4 max-w-[1440px] mx-auto px-4">
        <div className="flex flex-col items-center gap-2 mb-2 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-sky-500 uppercase">Media</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">SBS 비즈 출연영상</h2>
          <p className="text-sm text-zinc-500">
            LK 관세사무소가 SBS Biz 「세상의 모든 정보 오! 굿데이」에 소개되었습니다 <br /> 방송일: 2026년 7월 19일
          </p>
        </div>
        <video src="https://pub-8733e90ae8ff4abf9c071a7150d3a4b2.r2.dev/0719_video.mp4" controls autoPlay muted playsInline className="w-full max-w-[800px] rounded-md" />
      </section>
    </>
  );
}
