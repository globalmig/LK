import React from "react";
import Image from "next/image";

interface Figure01Props {
  title: string;
  description: string | string[];
  imgSrc: string;
  direction: "left" | "right";
}

export default function Figure02(item: Figure01Props) {
  const isArray = Array.isArray(item.description);

  return (
    <div className={`w-full mx-auto py-12 px-4 ${item.direction === "left" ? "md:flex-row" : "md:flex-row-reverse"} bg-[#f0f1f3]`}>
      <div className="w-full max-w-[1440px]  flex flex-col md:flex-row items-center justify-center gap-10 mx-auto">
        {/* 이미지 영역 */}
        <div className="relative w-full md:w-[40%] h-[400px] md:h-[600px]">
          <Image src={item.imgSrc} alt={item.title || "figure_02"} fill className="object-cover object-top rounded-lg shadow-lg" priority />
        </div>

        {/* 텍스트 영역 */}
        <div className={`w-full md:w-[50%] text-slate-800 ${item.direction === "left" ? "text-left" : "text-right"} text-center flex flex-col`}>
          <h3 className="text-2xl md:text-4xl  leading-snug">
            <strong className="text-cyan-800">이은경</strong> 대표 관세사
          </h3>
          <p className="text-4xl m-5 mb-10 font-bold text-black/20">Profile</p>
          <div className="w-10 h-[0.4px] mx-auto mb-6 bg-black/20"></div>
          {/* 배열이면 리스트, 아니면 문단 */}
          {Array.isArray(item.description) ? (
            <ul className="list-disc list-inside text-lg text-center">
              {item.description.map((desc, i) => (
                <li key={i} className="mt-4">
                  {desc}
                </li>
              ))}
              <p className="p-0 m-0">- 전문분야: 수출입통관, FTA</p>
              <p className="p-0 m-0">- 이전가격심사 전문관세사</p>
            </ul>
          ) : (
            <pre className="whitespace-pre-wrap break-words leading-relaxed text-lg">{item.description}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
