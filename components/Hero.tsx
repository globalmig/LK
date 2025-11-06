import React from "react";
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  img: string;
}

export default function Hero(item: HeroProps) {
  return (
    <div className="relative h-80 md:h-[640px] flex flex-col justify-center bg-gray-200">
      <div className="absolute w-full h-full overflow-hidden">
        <Image src={item.img} alt="Hero Image" fill priority sizes="100vw" quality={85} className="blur-sm h-full object-cover object-center " />
      </div>
      <div className="bg-black/50 w-full h-full absolute"></div>
      <div className="relative white-text max-w-[1440px] px-4 w-full mx-auto">
        <h1>{item.title}</h1>
        <p>{item.subtitle}</p>
      </div>
    </div>
  );
}
