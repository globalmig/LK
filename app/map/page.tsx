import Contact from "@/components/Contact";
import GoogleMap from "@/components/GoogleMap";
import Hero from "@/components/Hero";
import React from "react";
import Image from "next/image";

export default function Map() {
  return (
    <>
      <section className="mb-40">
        <Hero title={"자료실"} subtitle={"LK 관세사무소 블로그에서 자료들을 확인해보실 수 있습니다"} img={"/img/bg_work_solutions04.jpg"} />
      </section>
      <section className="flex flex-col justify-center items-center mb-40 gap-4">
        <h2>관련 자료를 확인해 보세요</h2>
        <a href="https://blog.naver.com/lek9740" target="_blank" rel="noopener noreferrer">
          <div className="flex flex-col justify-center items-center gap-4">
            <Image src={"/img/blog.webp"} width={100} height={100} alt={"블로그아이콘"} className="rounded-md" priority />
            <p className="text-sm  text-green-600/80">아이콘을 선택하면 이동합니다.</p>
          </div>
        </a>
      </section>

      <section>
        <Contact />
      </section>
    </>
  );
}
