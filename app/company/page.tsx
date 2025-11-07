import Contact from "@/components/Contact";
import Figure01 from "@/components/Figure01";
import Figure02 from "@/components/Figure02";
import Hero from "@/components/Hero";
import React from "react";
import Image from "next/image";

export default function company() {
  return (
    <>
      <section>
        <Hero title={"회사소개"} subtitle={"소수 관리 LK 관세사무소입니다."} img={"/img/bg_work_search.jpg"} priority />
        {/* TODO: 회사 소개 */}
      </section>

      <section className="">
        <Figure02
          direction={"left"}
          title={"대표 관세사 이은경"}
          description={[
            "경북대학교 지리학과 졸업",
            "서울대학교 환경대학원 환경계획학과 석사",
            "서강대학교 경제대학원 석사",
            "제37회 관세사 시험 합격",
            "관세사 자격증 취득",
            "원산지관리사 자격증 취득",
            "前 ○○관세법인 근무",
            "現 LK 관세사무소 대표 관세사",
            "現 한국관세사회 등록관세사",
          ]}
          imgSrc={"/img/프로필사진.jpg"}
        />
      </section>
      <section className="relative min-h-[720px] md:min-h-[800px] text-white py-14 md:py-20 flex items-center">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/img/bg_ceo.jpg" alt="Hero Image" fill sizes="100vw" className="object-cover object-top blur-sm" />
          {/* 반투명 오버레이 */}
          <div className="absolute inset-0 bg-[#1b2030]/80 md:bg-[#1b2030]/70 pointer-events-none" />
          {/* 하단 가독성 보강용 그라디언트(선택) */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* 콘텐츠 */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <h2 className="leading-snug text-3xl md:text-4xl border-l-4 px-4 mb-10 md:mb-20">많은 고객보다, 소수만 맡아 대표가 직접 책임지겠습니다.</h2>

          <pre className="whitespace-pre-wrap break-words text-base sm:text-[17px] md:text-lg leading-relaxed md:leading-8 text-white/90 tracking-wide  mx-auto md:mx-0 w-full">
            LK 관세사무소는 규모의 확장을 목표로 하지 않습니다. 대신, 맡은 고객사 한 분, 한 분의 통관 관련 업무를 대표 관세사가 직접 책임지고 수행하겠습니다.
            {"\n\n"}
            업무를 직원에게 분배하기보다, 수출입 전 과정에서 발생할 수 있는 모든 변수들을 제가 직접 처리하고 해결하겠습니다. 통관 업무는 단순한 행정 절차가 아닙니다. 통관 업무는 기업의 물류와 비용,
            신뢰와 직결된 중요한 과정임을 항상 염두에 두고 고객사의 일을 제가 직접 책임지고 처리하겠습니다.
            {"\n\n"}
            LK 관세사무소는 대형 법인처럼 화려하지는 않지만, 언제나 고객사의 입장에서 업무를 수행하고 끝까지 책임지는 관세 파트너가 되겠습니다.
            {"\n\n"}
            LK 관세사무소는 규모는 작지만, 대표 관세사가 직접 모든 업무를 수행하며, 풍부한 실무 경험을 바탕으로 정확하고 책임있는 서비스를 제공합니다.
            {"\n\n"}
            LK 관세사무소는 사세 확장을 위한 광고나 외형 경쟁보다, 고객사의 실질적인 성과에 집중하는 사무소가 되겠습니다.
            {"\n\n"}
            <span className="block mt-8 md:mt-10 text-right font-semibold">
              LK 관세사무소 대표 관세사 <strong>이 은 경</strong>
            </span>
          </pre>
        </div>
      </section>

      <section>
        <Contact />
      </section>
    </>
  );
}
