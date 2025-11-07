// app/board/[id]/page.tsx
"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  contact: string;
  id: string;
  title: string;
  content: string;
  created_at: string;
  // updated_at?: string;
  // views?: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null); // ✅ null이면 아직 비번 안 푼 상태
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ 비밀번호 확인 + 게시글 불러오기
  const handleCheckPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/posts/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        if (res.status === 403) {
          setError("비밀번호가 올바르지 않습니다.");
        } else if (res.status === 404) {
          setError("게시글을 찾을 수 없습니다.");
        } else {
          setError("게시글을 불러오는 중 오류가 발생했습니다.");
        }
        return;
      }

      const data = await res.json();
      setPost(data); // ✅ 이 시점에 post가 생김 → 상세 화면으로 전환
    } catch (err) {
      console.error("비밀번호 확인 오류:", err);
      setError("게시글을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 아직 post가 없으면 → 비밀번호 입력 화면
  if (!post) {
    return (
      <>
        <section>
          <Hero title={"문의내용"} subtitle={"게시글 비밀번호를 입력해주세요."} img={"/img/bg_work_solutions03.jpg"} priority />
        </section>

        <section className="mx-auto w-full max-w-[1000px] flex flex-col items-center px-4 gap-5 min-h-96 mb-32 ">
          <form onSubmit={handleCheckPassword} className="w-full max-w-md mt-10 flex flex-col gap-6 border border-slate-200 rounded-xl p-6 shadow-sm bg-white">
            {error && <div className="w-full p-3 bg-red-50 border border-red-300 text-red-700 rounded">{error}</div>}

            <p className="text-sm text-slate-600">
              게시글 작성 시 입력한 비밀번호 또는 <span className="font-semibold">관리자 공통 비밀번호</span>를 입력하면 내용을 확인할 수 있습니다.
            </p>

            <div className="flex flex-col gap-2">
              <label htmlFor="post_password" className="font-semibold">
                비밀번호
              </label>
              <input
                id="post_password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="비밀번호를 입력해주세요"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => router.push("/board")} className="py-2 px-4 border border-slate-300 rounded hover:bg-slate-100 text-sm" disabled={loading}>
                목록으로
              </button>
              <button
                type="submit"
                className="py-2 px-4 border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-sm"
                disabled={loading}
              >
                {loading ? "확인 중..." : "확인"}
              </button>
            </div>
          </form>
        </section>
      </>
    );
  }

  // ✅ 비번 통과 + post 있음 → 상세 화면
  return (
    <>
      <section>
        <Hero title={"문의내용"} subtitle={"궁금하신 점이 있으시면 편하게 문의 남겨주세요."} img={"/img/bg_work_solutions03.jpg"} />
      </section>

      <section className="mx-auto w-full max-w-[1000px] flex flex-col items-end px-4 gap-5 ">
        <div className="w-full mt-10 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-center">{post.title}</h2>

          <p className="text-end text-zinc-600 text-sm">{new Date(post.created_at).toLocaleDateString()}</p>

          <div className="border-t pt-10 pb-60">
            <p className="whitespace-pre-line break-keep">{post.content}</p>
          </div>

          <div className="border-t pt-10 pb-20 flex">
            <p className="font-bold">연락처: </p>
            <p className="whitespace-pre-line break-keep ml-4">{post.contact}</p>
          </div>

          <div className="w-full flex justify-end gap-4 md:flex-row flex-col mt-5 mb-32">
            <Link href={`/board/edit/${post.id}`} className="block py-3 px-5 w-full md:w-32 text-center border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700">
              수정하기
            </Link>
            <button
              type="button"
              onClick={async () => {
                const pw = window.prompt("게시글 비밀번호를 입력해주세요.");
                if (!pw) return;

                try {
                  const res = await fetch(`/api/posts/${post.id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password: pw }),
                  });

                  if (!res.ok) {
                    if (res.status === 403) {
                      alert("비밀번호가 올바르지 않습니다.");
                    } else {
                      alert("삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                    }
                    return;
                  }

                  alert("게시글이 삭제되었습니다.");
                  router.push("/board");
                } catch (err) {
                  console.error("삭제 오류:", err);
                  alert("삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                }
              }}
              className="block py-3 px-5 w-full md:w-32 text-center border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700"
            >
              삭제하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
