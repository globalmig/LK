"use client";

import { useState } from "react";
import { MessageCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (type: string) => {
    setOpen(open === type ? null : type);
  };

  return (
    <div className="relative min-h-[500px] py-16 w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start" style={{ backgroundImage: 'url("/img/bg_contact.jpg")' }}>
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-sky-950/80"></div>

      <div className="relative px-4 max-w-[1440px] w-full mx-auto text-white">
        <h3 className="text-sky-300 font-semibold text-lg">Contact Us</h3>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">1:1 상담 문의</h2>

        <div className="mt-6 space-y-3 text-gray-100 leading-relaxed">
          <p>“많은 고객보다는, 소수만 맡아 대표가 직접 고객의 업무를 수행하고 책임지겠습니다.”</p>
          <p>LK 관세사무소는 고객이 복잡한 수출입 절차에서 걱정 없이 비즈니스에만 집중할 수 있도록 돕는 든든한 파트너가 되겠습니다.</p>
          <p>LK 관세사무소에 궁금한 사항이 있으시면 문의주세요.</p>
        </div>

        {/* 연락 수단 */}
        <div className="mt-8 flex flex-col gap-4">
          {/* 아이콘 리스트 */}
          <div className="flex gap-6">
            <button onClick={() => toggle("kakao")} className={`p-3 rounded-full bg-white/10 hover:bg-white/20 transition ${open === "kakao" ? "bg-white/30" : ""}`} aria-label="카카오톡">
              <MessageCircle className="w-6 h-6" />
            </button>

            <button onClick={() => toggle("email")} className={`p-3 rounded-full bg-white/10 hover:bg-white/20 transition ${open === "email" ? "bg-white/30" : ""}`} aria-label="이메일">
              <Mail className="w-6 h-6" />
            </button>

            <button onClick={() => toggle("phone")} className={`p-3 rounded-full bg-white/10 hover:bg-white/20 transition ${open === "phone" ? "bg-white/30" : ""}`} aria-label="전화번호">
              <Phone className="w-6 h-6" />
            </button>
          </div>

          {/* 정보 노출 영역 */}
          <div className="mt-4 min-h-[40px]">
            {open === "kakao" && <p className="text-lg font-semibold animate-fade-slide text-sky-500">카톡 ID: lkcus</p>}
            {open === "email" && (
              <a href="mailto:admin@lkcustoms.co.kr" className="text-lg font-semibold underline text-sky-500 hover:text-sky-300 animate-fade-slide">
                admin@lkcustoms.co.kr
              </a>
            )}
            {open === "phone" && (
              <a href="tel:025522893" className="text-lg font-semibold text-sky-500 hover:text-sky-300 animate-fade-slide">
                02-552-2893
              </a>
            )}
          </div>
        </div>

        {/* 문의 버튼 */}
        <Link href={"/board"} className="inline-block  rounded-md py-3 px-16 mt-10 bg-white text-zinc-700  hover:bg-sky-300 hover:text-zinc-600 f text-center  font-bold shadow-sm">
          문의하기
        </Link>
      </div>
    </div>
  );
}
