import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="py-10 bg-slate-800 text-white/60 text-center mx-auto">
      <Link href={"/"} className="flex justify-center font-bold pb-6 opacity-40">
        <Image src={"/logo_white.png"} alt="LK관세사무소" width={140} height={40} className="hidden md:block" />
        <Image src={"/logo_white.png"} alt="LK관세사무소" width={80} height={40} className="md:hidden block" />
      </Link>

      <p className="text-sm">주소: 서울시 강남구 테헤란로 20길 18 부봉빌딩 6층, 608호</p>
      <p className="text-sm">전화: 02-552-2893</p>
      <p className="text-sm">이메일: lek9740@naver.com</p>
      <p className="mt-4 text-sm">© 2025 LK 관세사무소 INDUSTRY. All rights reserved.</p>
      <p className="text-sm">DESIGN & Development BY GLOBAL MIG</p>
    </div>
  );
}
