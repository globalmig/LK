import React from "react";
import Image from "next/image";
import Link from "next/link";

const workItems = [
  {
    title: "수출통관 대행",
    imgSrc: "/img/bg_work_search.jpg",
    description: "해외로 물품을 판매하거나 반출하시나요?",
    link: "/work?type=export",
  },
  {
    title: "수입통관 대행",
    imgSrc: "/img/bg_import.jpg",
    description: "해외에서 물품을 들여오시나요?",
    link: "/work?type=import",
  },
  {
    title: "FTA 컨설팅",
    imgSrc: "/img/bg_slider03.jpg",
    description: "FTA 혜택을 최대한 활용하고 싶으신가요?",
    link: "/work?type=fta",
  },
  {
    title: "관세환급",
    imgSrc: "/img/bg_taxes.jpg",
    description: "수입 원재료로 제품을 수출하셨나요?",
    link: "/work?type=drawback",
  },
  {
    title: "식품검역등 요건대행",
    imgSrc: "/img/bg_food.jpg",
    description: "식품이나 용기·포장을 수입하시나요?",
    link: "/work?type=inspection",
  },
];

export default function Work() {
  return (
    <div className="px-4  max-w-[1440px] mx-auto  flex flex-col justify-center">
      <div className="border-l-8 border-sky-700 mb-10 md:mb-20 pl-8 opacity-70">
        <h2 className="mb-4">저희 LK 관세사무소의 </h2>
        <h2 className="">사업영역을 소개합니다.</h2>
      </div>

      <div className="flex md:flex-row flex-col gap-2 w-full">
        {workItems.map((item, index) => (
          <Link key={index} href={item.link} className="grow border border-gray-300 rounded-lg flex-1 hover:flex-[3] duration-700 ease-in-out back relative overflow-hidden h-96">
            <Image src={item.imgSrc} alt={item.title} fill className="h-full rounded-md absolute object-cover" />
            <div className="absolute w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="p-4 relative flex flex-col justify-end h-full text-white">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
