// app/board/edit/[id]/page.tsx
"use client";

import Hero from "@/components/Hero";
import { useParams } from "next/navigation";
import React from "react";

export default function EditPage() {
  const { id } = useParams<{ id: string }>(); // ← 여기서 id값 받기

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");
    const password = formData.get("password");

    // console.log({ id, title, content, password });

    // 여기서 fetch(`/api/board/${id}`, { method: "PUT", body: ... }) 식으로 수정 요청 가능
  };

  return (
    <>
      <section>
        <Hero title={"문의 수정"} subtitle={"등록된 문의 내용을 수정할 수 있습니다."} img={"/img/bg_work_solutions03.jpg"} />
      </section>

      <section className="mx-auto w-full max-w-[1000px] flex flex-col items-end px-4 gap-5 ">
        <form onSubmit={handleSubmit} className="w-full mt-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              제목
            </label>
            <input type="text" id="title" name="title" className="w-full border border-slate-400 rounded px-3 py-2" placeholder="문의 제목을 입력하세요" required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-semibold">
              문의 내용
            </label>
            <textarea id="content" name="content" className="w-full border border-slate-400 rounded px-3 py-2 h-80" placeholder="문의 상세 내용을 입력하세요" required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              비밀번호
            </label>
            <input type="password" id="password" name="password" className="w-full border border-slate-400 rounded px-3 py-2" placeholder="비밀번호를 입력해주세요" required />
          </div>

          <div className="w-full flex justify-end">
            <button type="submit" className="block py-3 px-5 w-full md:w-32 mt-5 mb-32 text-center border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700">
              수정하기
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
