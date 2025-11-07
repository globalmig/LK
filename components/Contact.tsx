import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <div className="min-h-[500px] w-full h-full flex flex-col justify-center items-start bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url("/img/bg_contact.jpg")' }}>
      <div className="bg-sky-950 w-full h-full opacity-80 absolute"></div>
      <div className="relative px-4 flex-1 flex flex-col justify-center max-w-[1440px]   w-full mx-auto text-white">
        <h3>Contact Us</h3>
        <h2 className="mt-4">1:1 상담 문의</h2>
        <p>“많은 고객보다는, 소수만 맡아 대표가 직접 고객의 업무를 수행하고 책임지겠습니다.”</p>
        <p>LK 관세사무소는 고객이 복잡한 수출입 절차에서 걱정 없이 비즈니스에만 집중할 수 있도록 돕는 든든한 파트너가 되겠습니다.</p>
        <p>LK 관세사무소에 궁금한 사항이 있으시면 문의주세요.</p>
        <p className="mt-4 hover:font-bold">
          카톡 ID: lkcus <br />
        </p>

        <p className="mt-4 hover:font-bold">admin@lkcustoms.co.kr</p>

        <p className="mt-4 hover:font-bold">02-552-2893</p>

        {/* <a href="mailto:admin@lkcustoms.co.kr" className="mt-4 hover:font-bold">
          admin@lkcustoms.co.kr
        </a>

        <a href="tel:025522893" className="mt-4 hover:font-bold">
          02-552-2893
        </a> */}

        <Link href={"/board"} className="border-2 rounded-md py-2 px-14 mt-10 bg-white text-zinc-700 hover:bg-gray-200 text-center font-semibold shadow-sm w-full md:max-w-[180px]">
          문의하기
        </Link>
      </div>
    </div>
  );
}
