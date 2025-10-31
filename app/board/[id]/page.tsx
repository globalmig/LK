// app/board/[id]/page.tsx
import Hero from "@/components/Hero";
import Link from "next/link";
import React from "react";

interface BoardItem {
  id: number;
  title: string;
  date: string;
  description: string;
  password: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <>
      <section>
        <Hero title={"문의내용"} subtitle={"궁금하신 점이 있으시면 편하게 문의 남겨주세요."} img={"/img/bg_work_solutions03.jpg"} />
      </section>

      <section className="mx-auto w-full max-w-[1000px] flex flex-col items-end px-4 gap-5 ">
        <div className="w-full mt-10 flex flex-col gap-6 text-center">
          <h2>제목입니다</h2>
          <p className="text-end text-zinc-600 text-sm">날짜</p>
          <div className="border-t pt-10 pb-60">
            <p>내용입니다</p>
          </div>

          <div className="w-full flex justify-end gap-4 md:flex-row flex-col mt-5 mb-32">
            <Link href={`/board/edit/${id}`} className="block py-3 px-5 w-full md:w-32  text-center border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700">
              수정하기
            </Link>
            <button type="submit" className="block py-3 px-5 w-full md:w-32 text-center border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700">
              삭제하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
