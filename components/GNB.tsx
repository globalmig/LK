"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function GNB() {
  const [isSelected, setIsSelected] = useState(false);
  const toggleMenu = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSelected) {
        setIsSelected(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSelected]);

  return (
    <div className={`flex justify-between items-center absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-16 white-text py-12 px-4 z-50 ${isSelected ? "bg-slate-800" : "bg-none"}`}>
      <Link href={"/"} className="text-3xl md:text-3xl font-bold mb-6 mt-2 md:mt-6">
        <Image src={"/logo_white.png"} alt="LK관세사무소" width={140} height={40} className="hidden md:block" />
        <Image src={"/logo_white.png"} alt="LK관세사무소" width={80} height={40} className="md:hidden block" />
      </Link>
      <ul className="md:flex hidden">
        <Link href={"/company"} className="px-6">
          회사소개
        </Link>
        <Link href={"/work"} className="px-6">
          업무분야
        </Link>
        <Link href={"/board"} className="px-6">
          상담문의
        </Link>
        <Link href={"/map"} className="px-6">
          자료실
        </Link>
      </ul>
      <div className="flex md:hidden">
        <button className="flex flex-col gap-1 white-text" onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
        {isSelected && (
          <>
            <div className="bg-black/50 w-full h-full"></div>
            <ul className="flex flex-col absolute top-16 right-0 bg-slate-800 white-text w-full text-center border-rounded-b-md">
              <Link href={"/company"} className="py-8" onClick={toggleMenu}>
                회사소개
              </Link>
              <Link href={"/work"} className="py-8" onClick={toggleMenu}>
                업무영역
              </Link>
              <Link href={"/board"} className="py-8" onClick={toggleMenu}>
                상담문의
              </Link>
              <Link href={"/map"} className="py-8" onClick={toggleMenu}>
                자료실
              </Link>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
