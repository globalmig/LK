import React from "react";
import Image from "next/image";

interface Figure01Props {
  title: string;
  description: string;
  imgSrc: string;
  direction: "left" | "right";
}

export default function Figure01(item: Figure01Props) {
  return (
    <div>
      <figure
        className={`w-full max-w-[1440px] mx-auto mt-10 md:mb-0  flex flex-col md:flex-row items-center gap-2 md:gap-10 px-4 ${item.direction === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}
      >
        {/* 부모 div에 relative + 크기 지정 */}
        <div className="relative w-full md:w-[60%] h-[400px] ">
          <Image src={`${item.imgSrc}`} alt="figure_01" fill className="object-cover rounded-lg object-top shadow-lg" />
        </div>

        <figcaption className={`text-sm w-full md:w-[40%] ${item.direction === "left" ? "text-start" : "text-end"} mt-2 text-gray-600`}>
          <h3>{item.title}</h3>
          <pre className="whitespace-pre-wrap break-words leading-relaxed text-lg">{item.description}</pre>
        </figcaption>
      </figure>
    </div>
  );
}
