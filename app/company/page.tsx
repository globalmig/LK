import Contact from "@/components/Contact";
import Figure01 from "@/components/Figure01";
import Hero from "@/components/Hero";
import React from "react";

export default function company() {
  return (
    <>
      <section>
        <Hero title={"회사소개"} subtitle={"소수 관리 LK 관세사무소입니다."} img={"/img/bg_work_search.jpg"} />
        {/* TODO: 회사 소개 */}
      </section>

      <section className="mb-32">
        <Figure01 direction={"left"} title={"제목01"} description={"설명2"} imgSrc={"/img/bg_work_search.jpg"} />
        <Figure01 direction={"right"} title={"제목01"} description={"설명2"} imgSrc={"/img/bg_work_search.jpg"} />
        <Figure01 direction={"left"} title={"제목01"} description={"설명2"} imgSrc={"/img/bg_work_search.jpg"} />
        <Figure01 direction={"right"} title={"제목01"} description={"설명2"} imgSrc={"/img/bg_work_search.jpg"} />
      </section>

      <section>
        <Contact />
      </section>
    </>
  );
}
