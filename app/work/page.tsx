"use client";
import Contact from "@/components/Contact";
import Figure01 from "@/components/Figure01";
import Hero from "@/components/Hero";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

type WorkType = "export" | "import" | "fta" | "drawback" | "inspection" | "compliance";

export default function WorkPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [isType, setType] = useState<WorkType>("export");

  // ✅ URL ?type= 값으로 초기 타입 세팅 (클라이언트에서만)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type") as WorkType | null;
    const allowed: WorkType[] = ["export", "import", "fta", "drawback", "inspection", "compliance"];

    if (typeParam && allowed.includes(typeParam)) {
      setType(typeParam);
    }
  }, []);

  // ✅ 상태 + URL 둘 다 변경
  const SelectType = useCallback(
    (value: WorkType) => {
      setType(value);

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        params.set("type", value);

        // /work?type=import 이런 식으로 URL 갱신 (스크롤 유지)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }

      console.log("next:", value);
    },
    [router, pathname]
  );

  useEffect(() => {
    console.log("isType changed:", isType);
  }, [isType]);

  const btnBase = "border-[1.2px] border-gray-300 shadow-md rounded-xl py-6 transition break-keep";
  const btnClass = (active: boolean) => (active ? `${btnBase} bg-black text-white hover:bg-black hover:text-white` : `${btnBase} bg-white hover:bg-blue-50 hover:text-black`);

  return (
    <>
      <section>
        <Hero title={"업무영역"} subtitle={"LK 관세사무소 업무 영역입니다."} img={"/img/bg_work_solutions.jpg"} priority />
      </section>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-[1440px] mx-auto mt-10 md:mt-20 px-4">
        <button className={btnClass(isType === "export")} aria-pressed={isType === "export"} onClick={() => SelectType("export")}>
          수출통관
        </button>
        <button className={btnClass(isType === "import")} aria-pressed={isType === "import"} onClick={() => SelectType("import")}>
          수입통관
        </button>
        <button className={btnClass(isType === "fta")} aria-pressed={isType === "fta"} onClick={() => SelectType("fta")}>
          FTA 컨설팅
        </button>
        <button className={btnClass(isType === "drawback")} aria-pressed={isType === "drawback"} onClick={() => SelectType("drawback")}>
          관세환급
        </button>
        <button className={btnClass(isType === "inspection")} aria-pressed={isType === "inspection"} onClick={() => SelectType("inspection")}>
          식품검역 등 요건대행
        </button>
        {/* compliance 타입 버튼도 쓰고 싶으면 여기에 추가 */}
        {/* 
        <button
          className={btnClass(isType === "compliance")}
          aria-pressed={isType === "compliance"}
          onClick={() => SelectType("compliance")}
        >
          컴플라이언스
        </button>
        */}
      </div>

      {/* 수출통관 */}
      {isType === "export" && (
        <section className="pt-10 mb-32 max-w-[1440px] mx-auto flex flex-col gap-20">
          <Figure01
            direction="left"
            title="수출통관이란?"
            description="수출하고자 하는 물품을 세관에 수출신고한 후 신고수리를 받아 물품을 외국무역선(기)에 적재하기까지의 절차를 말합니다."
            imgSrc="/img/bg_slider02.jpg"
          />

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>수출통관 절차</h2>
              <p className="text-black/50">LK Customs Service</p>
            </div>

            <div className="relative w-full h-[450px] md:h-[600px]">
              <Image src="/img/수출통관_절차.png" alt="수출통관 절차" fill quality={100} className="object-contain" sizes="(max-width: 768px) 100vw, 1200px" />
            </div>
          </div>

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>LK 관세사무소가 제공하는 서비스</h2>
              <p className="text-black/50">LK Customs Service</p>
            </div>

            <ul className="border-2 p-10 md:px-24 my-10 rounded-xl list-disc leading-loose gap-6 flex flex-col break-keep">
              <li>정확한 품목분류로 합리적인 세율 적용과 효율적인 수출통관 절차를 지원합니다.</li>
              <li>수출물품의 HS Code에 해당하는 관련 법규를 면밀히 검토하여 통관 과정에서 발생할 수 있는 리스크를 사전에 차단합니다.</li>
              <li>포워더, 보세창고 등 물류 관련 업체와 긴밀히 협업하여 고객사의 수출통관 과정을 One-Stop 서비스로 지원합니다.</li>
            </ul>
          </div>
        </section>
      )}

      {/* 수입통관 */}
      {isType === "import" && (
        <section className="pt-10 mb-32 max-w-[1440px] mx-auto flex flex-col gap-20">
          <Figure01
            direction="left"
            title="수입통관이란?"
            description="수입하고자 하는 물품을 세관장에게 신고하고, 세관장은 관세법 및 기타 법령에 따라 적법하고 정당하게 이루어진 경우에 이를 신고수리하고, 신고인에게 수입신고필증을 교부하여 수입물품이 반출될 수 있도록 하는 일련의 과정을 말합니다."
            imgSrc="/img/bg_import.jpg"
          />

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>수입통관 절차</h2>
              <p className="text-black/50">LK Customs Service</p>
            </div>

            <div className="relative w-full h-[450px] md:h-[600px]">
              <Image src="/img/수입통관_절차.png" alt="수입통관 절차" fill quality={100} className="object-contain" sizes="(max-width: 768px) 100vw, 1200px" />
            </div>
          </div>

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>LK 관세사무소가 제공하는 서비스</h2>
              <p className="text-black/50">LK Customs Service</p>
            </div>

            <ul className="border-2 p-10 md:px-24 my-10 rounded-xl list-disc leading-loose gap-6 flex flex-col break-keep">
              <li>복잡한 수입통관 절차 전반을 체계적으로 관리하여, 불필요한 지연이나 추가비용이 발생하지 않도록 지원합니다.</li>
              <li>수입물품의 HS code 및 세율을 정확히 검토하고, 해당 수입물품에 관련된 법령에 따른 세관장 확인요건에 따라 관련 정부기관의 승인·허가등을 취득합니다.</li>
              <li>포워더, 보세창고등과의 원활한 협업을 통해 고객사의 수입화물이 신속히 통관될수 있도록 전 과정을 지원합니다.</li>
              <li>관세, 부가세, 감면 및 환급 가능 여부까지 함께 검토하여, 합리적인 수입비용 구조를 지원합니다.</li>
            </ul>
          </div>
        </section>
      )}

      {/* FTA 컨설팅 */}
      {isType === "fta" && (
        <section className="pt-10 mb-32 max-w-[1440px] mx-auto flex flex-col gap-20">
          <Figure01
            direction="left"
            title="FTA 컨설팅이란?"
            description="우리나라는 전세계 국가들과 활발히 자유무역협정(FTA)을 체결하여 현재 발효된 FTA는 22건, 59개국입니다.
LK 관세사무소는 이러한 FTA 협정을 통해 고객사가 수출입 거래에서 최대한의 관세 혜택을 누릴수 있도록 전문적인 컨설팅을 제공합니다.
"
            imgSrc="/img/country.png"
          />

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>LK 관세사무소가 제공하는 서비스</h2>
              <p className="text-black/50">LK Customs Service</p>
            </div>

            <ul className="border-2 p-10 md:px-24 my-10 rounded-xl list-disc leading-loose gap-6 flex flex-col break-keep">
              <li>
                <strong>수출 단계</strong>에서는 고객사가 FTA 협정의 혜택을 받기위해 원산지증명서를 발행하는 과정에서 모든 법적·제도적 조건을 충분히 활용할 수 있도록 지원합니다.
              </li>
              <li>
                <strong>수입 단계</strong>에서는 고객사가 상대국의 원산지증명서를 취득해 관세를 절감할수 있도록 컨설팅을 제공합니다.
              </li>
              <li>
                <strong>인증수출자 취득 지원</strong>: 고객사가 품목별, 업체별 인증수출자 자격을 획득할 수 있도록 실무 전반을 지원합니다.
              </li>
              <li>
                <strong>사후검증 대비 컨설팅</strong>: 원산지증명서 발급후 상대국 세관의 사후검증에 철저히 대비할수 있도록 구체적인 대응 전략을 제시합니다.
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* 관세환급 */}
      {isType === "drawback" && (
        <section className="pt-10 mb-32 max-w-[1440px] mx-auto flex flex-col gap-20">
          <Figure01
            direction="left"
            title="관세환급이란?"
            description={`• 관세환급은 환급특례법에 규정된 요건을 충족하면 수입시 납부한 관세 등을 되돌려주는 것입니다.\n\n• 수입 원재료를 수출 또는 외화획득용 원재료로 사용한 경우에는 신청에 의해 수입하는 때 납부한 관세를 수출자 또는 생산자에게 되돌려 줍니다.`}
            imgSrc="/img/bg_taxes.jpg"
          />

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>관세환급 절차</h2>
              <p className="text-black/50">Customs Refund Process</p>
            </div>

            <div className="relative w-full h-[450px] md:h-[600px]">
              <Image src="/img/관세환급_절차.png" alt="수입통관 절차" fill quality={100} className="object-contain" sizes="(max-width: 768px) 100vw, 1200px" />
            </div>
          </div>

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>LK 관세사무소가 제공하는 서비스</h2>
              <p className="text-black/50">LK Customs Service</p>
            </div>

            <ul className="border-2 p-10 md:px-24 my-10 rounded-xl list-disc leading-loose gap-6 flex flex-col break-keep">
              <li>고객사가 수출등을 이행한후 세관으로부터 관세환급을 받기 위해서는 관세등 납부증명요건, 수출요건, 기간요건, 환급대상원재료요건등 관세환급 요건을 모두 갖추어야합니다.</li>
              <li>
                이러한 과정에서 고객사는 환급액이 과다하면 이후에 과다환급으로 인한 추징 우려가 있으며, 반대로 환급 요건을 정확히 갖추지 못하면 국가가 제공하는 관세환급 혜택을 받지 못할 우려도
                있습니다.
              </li>
              <li>저희는 고객사가 이러한 환급 요건을 정확히 갖추어 관세환급을 받을수 있도록 고객사 맞춤형 환급 컨설팅을 제공합니다.</li>
            </ul>
          </div>
        </section>
      )}

      {/* 식품검역등 요건대행 */}
      {isType === "inspection" && (
        <section className="pt-10 mb-32 max-w-[1440px] mx-auto flex flex-col gap-20">
          <Figure01
            direction="left"
            title="식품검역등 요건대행이란?"
            description={`식품, 식품첨가물, 또는 식품등에 접촉하는 기구·용기·포장등은 수입식품안전관리특별법에 따라 지방식품의약품안전처장에게 신고하여야합니다.`}
            imgSrc="/img/bg_food.jpg"
          />

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>식품등 수입시 업무 절차</h2>
              <p className="text-black/50">Import Procedures for Food and Related Products</p>
            </div>

            <div className="relative w-full h-[200px] md:h-[200px]">
              <Image src="/img/식품_절차.png" alt="식품 절차" fill quality={100} className="object-contain" sizes="(max-width: 768px) 100vw, 1200px" />
            </div>

            <h4>[ 검사유형 ]</h4>
            <ul className="flex flex-col gap-5">
              <li>1. 정밀검사: 물리적·화학적 또는 미생물학적 방법에 따라 실시하는 검사 (처리기간 10일)</li>
              <li>2. 서류검사: 신고서류등을 검토하여 그 적합여부를 판단하는 검사 (처리기간 2일) </li>
              <li>3. 현장검사: 제품의 성질·상태·맛·냄새·색깔·표시·포장상태 및 정밀검사 이력등을 종합하여 그 적합 여부를 판단하는 검사 (처리기간 3일)</li>
              <li>4. 무작위 표본검사: 식약처장의 표본추출계획에 따라 물리적·화학적 또는 미생물학적 방법으로 실시하는 검사 (처리기간 5일)</li>
            </ul>
          </div>

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>LK 관세사무소가 제공하는 서비스</h2>
              <p className="text-black/50">LK Customs Service</p>
            </div>

            <ul className="border-2 p-10 md:px-24 my-10 rounded-xl list-disc leading-loose gap-6 flex flex-col break-keep">
              <li>식품 및 식품첨가물, 기구·용기·포장등 식품관련 품목의 수입시 ‘수입식품안전관리특별법’에 따른 신고·검사 절차를 정확히 이행할수 있도록 전 과정을 대행·지원합니다.</li>
              <li>수입 전 단계에서 제품의 성분, 용도, 포장재질, 표시사항등을 사전에 검토하여 부적합 판정 위험을 방지합니다</li>
              <li>반복 수입품목의 검사 이력과 적합 사례를 분석하여, 고객사가 안정적으로 수입업무를 지속할수 있도록 효율적인 절차 설계와 컨설팅을 제공합니다.</li>
            </ul>
          </div>
        </section>
      )}

      {/* 식품검역등 요건대행 (compliance) */}
      {isType === "compliance" && (
        <section className="pt-10 mb-32 max-w-[1440px] mx-auto flex flex-col gap-20">
          <Figure01
            direction="left"
            title="식품검역등 요건대행이란?"
            description={`식품, 식품첨가물, 또는 식품등에 접촉하는 기구·용기·포장등은 수입식품안전관리특별법에 따라 지방식품의약품안전처장에게 신고하여야합니다.`}
            imgSrc="/img/bg_slider02.jpg"
          />

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>식품등 수입시 업무 절차</h2>
              <p className="text-black/50">Import Procedures for Food and Related Products</p>
            </div>

            <div className="relative w-full h-[200px] md:h-[200px]">
              <Image src="/img/식품_절차.png" alt="식품 절차" fill quality={100} className="object-contain" sizes="(max-width: 768px) 100vw, 1200px" />
            </div>

            <h4>[ 검사유형 ]</h4>
            <ul className="flex flex-col gap-5">
              <li>1. 정밀검사: 물리적·화학적 또는 미생물학적 방법에 따라 실시하는 검사 (처리기간 10일)</li>
              <li>2. 서류검사: 신고서류등을 검토하여 그 적합여부를 판단하는 검사 </li>
              <li>3. 현장검사: 제품의 성질·상태·맛·냄새·색깔·표시·포장상태 및 정밀검사 이력등을 종합하여 그 적합 여부를 판단하는 검사</li>
              <li>4. 무작위 표본검사: 식약처장의 표본추출계획에 따라 물리적·화학적 또는 미생물학적 방법으로 실시하는 검사 (처리기간 5일)</li>
            </ul>
          </div>

          <div className="px-4">
            <div className="border-l-8 border-sky-700 my-0 md:my-20 pl-8">
              <h2>LK 관세사무소가 제공하는 서비스</h2>
              <p className="text-black/50">LK Customs Service</p>
            </div>

            <ul className="border-2 p-10 md:px-24 my-10 rounded-xl list-disc leading-loose gap-6 flex flex-col break-keep">
              <li>식품 및 식품첨가물, 기구·용기·포장등 식품관련 품목의 수입시 ‘수입식품안전관리특별법’에 따른 신고·검사 절차를 정확히 이행할수 있도록 전 과정을 대행·지원합니다.</li>
              <li>수입 전 단계에서 제품의 성분, 용도, 포장재질, 표시사항등을 사전에 검토하여 부적합 판정 위험을 방지합니다</li>
              <li>반복 수입품목의 검사 이력과 적합 사례를 분석하여, 고객사가 안정적으로 수입업무를 지속할수 있도록 효율적인 절차 설계와 컨설팅을 제공합니다.</li>
            </ul>
          </div>
        </section>
      )}

      <section>
        <Contact />
      </section>
    </>
  );
}
