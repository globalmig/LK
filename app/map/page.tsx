import Contact from "@/components/Contact";
import GoogleMap from "@/components/GoogleMap";
import Hero from "@/components/Hero";
import React from "react";

export default function Map() {
  return (
    <>
      <section className=" mb-40">
        <Hero title={"오시는 길"} subtitle={"LK 관세사무소 위치를 안내드립니다."} img={"/img/bg_work_solutions04.jpg"} />

        <GoogleMap />
      </section>

      <section>
        <Contact />
      </section>
    </>
  );
}
