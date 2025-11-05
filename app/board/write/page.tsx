"use client";

import Hero from "@/components/Hero";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { postAPI } from "@/lib/api";

export default function Write() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // 더블 클릭 방지

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const password = formData.get("password") as string | null;

    if (!title || !content || !password) {
      alert("제목, 내용, 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ 실제 API 호출
      const newPost = await postAPI.create({
        title,
        content,
        password,
      });

      alert("문의가 등록되었습니다.");

      // ✅ 글 상세 페이지로 이동 (라우트에 맞게 수정)
      router.push(`/board/${newPost.id}`);
      // 또는 목록으로 가고 싶으면: router.push("/board");
    } catch (error) {
      console.error(error);
      alert("문의 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section>
        <Hero title={"문의 등록"} subtitle={"궁금하신 점이 있으시면 편하게 문의 남겨주세요."} img={"/img/bg_work_solutions03.jpg"} />
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="block py-3 px-5 w-full md:w-32 mt-5 mb-32 text-center border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-60"
            >
              {isSubmitting ? "등록중..." : "등록하기"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
