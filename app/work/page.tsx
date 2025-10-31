import Contact from "@/components/Contact";
import Figure01 from "@/components/Figure01";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import React from "react";

export default function work() {
  return (
    <>
      <section>
        <Hero title={"업무영역"} subtitle={"LK 관세사무소 업무 영역입니다."} img={"/img/bg_work_solutions.jpg"} />
      </section>

      {/* <section className="my-10 pb-10">
        <Work />
      </section> */}

      <section className="pt-10 mb-32 border-t">
        <Figure01 direction={"left"} title={"수출통관"} description={"설명2"} imgSrc={"/img/bg_work_search.jpg"} />
        <Figure01 direction={"right"} title={"수입통관"} description={"설명2"} imgSrc={"/img/bg_work_search.jpg"} />
        <Figure01 direction={"left"} title={"FTA 컨설팅"} description={"설명2"} imgSrc={"/img/bg_work_search.jpg"} />
        <Figure01 direction={"right"} title={"관세환급"} description={"설명2"} imgSrc={"/img/bg_work_search.jpg"} />
      </section>

      <section>
        <Contact />
      </section>
    </>
  );
}
