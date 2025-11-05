"use client";
import Hero from "@/components/Hero";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { postAPI, Post } from "@/lib/api";
import { AxiosError } from "axios";

export default function Board() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 게시글 목록 불러오기
  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await postAPI.getList(pageNum, 10);
      console.log("📌 받은 게시글 목록:", data.posts);

      // 🔍 각 게시글의 ID 타입 확인
      // data.posts?.forEach((post) => {
      //   console.log(`게시글 "${post.title}" ID:`, post.id, "(타입:", typeof post.id, ")");
      // });

      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("게시글을 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // 게시글 삭제
  const handleDelete = async (id: string) => {
    const password = prompt("비밀번호를 입력하세요:");
    if (!password) return;

    console.log("🗑️ 삭제 요청 ID:", id);

    try {
      await postAPI.delete(id, { password });
      alert("문의가 삭제되었습니다.");
      fetchPosts(page);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.error || "문의 삭제에 실패했습니다.");
      } else {
        alert("문의 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <section>
        <Hero title={"문의 게시판"} subtitle={"고객님의 문의사항을 확인하실 수 있습니다."} img={"/img/bg_work_solutions03.jpg"} />
      </section>

      <section className="mx-auto w-full max-w-[1000px] px-4 py-10">
        <div className="flex justify-end mb-6">
          <Link href="/board/write" className="py-2 px-6 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors">
            문의 작성
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">불러오는 중...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">등록된 문의가 없습니다.</p>
          </div>
        ) : (
          <>
            {/* 게시글 목록 */}
            <div className="space-y-4 mb-10">
              {posts.map((post) => (
                <Link href={`/board/${post.id}`} prefetch={false} className="text-blue-600 hover:text-blue-800" onClick={() => console.log("🔗 링크 클릭, 이동할 ID:", post.id)}>
                  <div key={post.id} className="p-6 border border-slate-300 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-slate-800">{post.title}</h3>
                      {/* <span className="text-sm text-gray-500">조회 {post.views}</span> */}
                    </div>

                    {/* <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p> */}

                    {/* 🔍 디버깅: ID 값 표시 */}
                    {/* <p className="text-xs text-gray-400 mb-2">ID: {post.id}</p> */}

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>
                        {new Date(post.created_at).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <div className="flex gap-2">
                        상세보기
                        {/* <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800">
                        삭제
                      </button> */}
                      </div>
                    </div>
                  </div>{" "}
                </Link>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mb-32">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-slate-400 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                >
                  이전
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-4 py-2 border rounded ${page === pageNum ? "bg-slate-800 text-white border-slate-800" : "border-slate-400 hover:bg-slate-100"}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-slate-400 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
