"use client";
import Hero from "@/components/Hero";
import PageNation from "@/components/PageNation";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface BoardItem {
  id: number;
  title: string;
  date: string;
}

export default function Board() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemsPerPage = 10; // 페이지당 아이템 수
  const currentPage = Number(searchParams.get("page")) || 1;

  const boardItems: BoardItem[] = [
    { id: 1, title: "첫 번째 게시글", date: "2024-01-15" },
    { id: 2, title: "두 번째 게시글", date: "2024-01-16" },
    { id: 3, title: "세 번째 게시글", date: "2024-01-17" },
    { id: 4, title: "네 번째 게시글", date: "2024-01-17" },
    { id: 5, title: "다섯 번째 게시글", date: "2024-01-17" },
    { id: 6, title: "여섯 번째 게시글", date: "2024-01-17" },
    { id: 7, title: "일곱 번째 게시글", date: "2024-01-17" },
    { id: 8, title: "여덟 번째 게시글", date: "2024-01-17" },
    { id: 9, title: "아홉 번째 게시글", date: "2024-01-17" },
    { id: 10, title: "열 번째 게시글", date: "2024-01-17" },
    { id: 11, title: "여섯 번째 게시글", date: "2024-01-17" },
    { id: 12, title: "일곱 번째 게시글", date: "2024-01-17" },
    { id: 13, title: "여덟 번째 게시글", date: "2024-01-17" },
    { id: 14, title: "아홉 번째 게시글", date: "2024-01-17" },
    { id: 15, title: "열 번째 게시글", date: "2024-01-17" },
  ];

  const totalItems = boardItems.length;

  // 현재 페이지에 표시할 아이템만 필터링
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = boardItems.slice(startIndex, endIndex);

  return (
    <>
      <section>
        <Hero title={"상담문의"} subtitle={"궁금하신 점이 있으시면 편하게 문의 남겨주세요."} img={"/img/bg_work_solutions03.jpg"} />
      </section>

      <section className="mx-auto w-full max-w-[1000px] flex flex-col items-end px-4 gap-5">
        <table className="w-full mt-10 table-auto border-collapse border border-slate-400 text-center">
          <thead className="bg-slate-600 text-white text-lg">
            <tr>
              <th className="border border-slate-300 px-4 py-3 w-[80px]">No</th>
              <th className="border border-slate-300 px-4 py-3 w-[80%]">제목</th>
              <th className="border border-slate-300 px-4 py-3 w-[200px]">날짜</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="cursor-pointer hover:bg-gray-100" onClick={() => router.push(`/board/${item.id}`)}>
                <td className="border border-slate-300 px-4 py-4">{item.id}</td>
                <td className="border border-slate-300 px-4 py-4 text-left">{item.title}</td>
                <td className="border border-slate-300 px-4 py-4">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PageNation totalItems={totalItems} itemsPerPage={itemsPerPage} />

        <Link href={"/board/write"} className="block py-3 px-5 w-full md:w-32 mt-5 mb-32 text-center border border-slate-400 bg-slate-800 text-white rounded hover:bg-slate-700">
          문의하기
        </Link>
      </section>
    </>
  );
}
