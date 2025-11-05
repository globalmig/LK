"use client";

import Hero from "@/components/Hero";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postAPI } from "@/lib/api";
import { AxiosError } from "axios";

export default function EditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    password: "",
  });

  // 기존 게시글 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await postAPI.getDetail(id);
        console.log("✅ 수정할 게시글 로드:", data);

        setFormData({
          title: data.title,
          content: data.content,
          password: "",
        });
      } catch (error: any) {
        console.error("게시글 불러오기 실패:", error);
        alert("게시글을 불러올 수 없습니다.");
        router.push("/board");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  // 수정 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setSubmitting(true);

    try {
      console.log("📝 수정 요청:", { id, ...formData });

      await postAPI.update(id, {
        title: formData.title,
        content: formData.content,
        password: formData.password,
      });

      alert("문의가 수정되었습니다.");
      router.push(`/board/${id}`);
    } catch (err) {
      console.error("수정 실패:", err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.error || "문의 수정에 실패했습니다.";
        setError(errorMessage);
        alert(errorMessage);
      } else {
        setError("문의 수정에 실패했습니다.");
        alert("문의 수정에 실패했습니다.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <section>
          <Hero title={"문의 수정"} subtitle={"문의 내용을 수정합니다."} img={"/img/bg_work_solutions03.jpg"} />
        </section>
        <section className="mx-auto w-full max-w-[1000px] flex flex-col items-end px-4 gap-5">
          <div className="w-full mt-10 flex flex-col gap-6 text-center">
            <p className="py-20">⏳ 불러오는 중...</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <Hero title={"문의 수정"} subtitle={"문의 내용을 수정합니다."} img={"/img/bg_work_solutions03.jpg"} />
      </section>

      <section className="mx-auto w-full max-w-[1000px] flex flex-col items-end px-4 gap-5">
        <form onSubmit={handleSubmit} className="w-full mt-10 flex flex-col gap-6">
          {/* 에러 메시지 표시 */}
          {error && <div className="w-full p-4 bg-red-50 border border-red-300 text-red-700 rounded">{error}</div>}

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              제목
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-slate-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="문의 제목을 입력하세요"
              disabled={submitting}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-semibold">
              문의 내용
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full border border-slate-400 rounded px-3 py-2 h-80 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="문의 상세 내용을 입력하세요"
              disabled={submitting}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border border-slate-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="비밀번호를 입력해주세요"
              disabled={submitting}
              required
            />
            <p className="text-sm text-gray-600">* 수정하려면 게시글 작성 시 입력한 비밀번호를 입력해주세요.</p>
          </div>

          <div className="w-full flex justify-end gap-4 md:flex-row flex-col mt-5 mb-32">
            <button type="button" onClick={() => router.back()} className="block py-3 px-5 w-full md:w-32 text-center border border-slate-400 rounded hover:bg-slate-100" disabled={submitting}>
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="block py-3 px-5 w-full md:w-32 text-center border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "수정 중..." : "수정하기"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
