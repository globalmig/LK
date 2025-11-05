import Contact from "@/components/Contact";
import GoogleMap from "@/components/GoogleMap";
import Slider from "@/components/Slider";
import Work from "@/components/Work";
import React from "react";



export default function main() {
  
  return (
    <div>
      <section>
        <Slider />
      </section>
      <section className="py-14 md:py-20">
        <Work />
      </section>
      <section className="max-w-[1440px] mx-auto py-14 md:py-20 mb-4 border-t">
        <h2 className="px-4">오시는 길</h2>
        <GoogleMap />
      </section>
      <section>
        <Contact />
      </section>
    </div>
  );
}
