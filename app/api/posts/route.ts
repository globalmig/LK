import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

// 게시글 목록 조회
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;

  try {
    // 전체 개수 조회
    const { count } = await supabase.from("posts").select("*", { count: "exact", head: true });

    // 게시글 목록 조회 (비밀번호 제외)
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, contact,  created_at, updated_at, views")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      posts: data,
      total: count,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: "게시글을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

// 게시글 생성
export async function POST(request: NextRequest) {
  try {
    const { title, content, password, contact } = await request.json();

    if (!title || !content || !contact || !password) {
      return NextResponse.json({ error: "제목, 내용, 비밀번호를 모두 입력해주세요." }, { status: 400 });
    }

    // 비밀번호 해시화
    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          contact,
          password_hash: passwordHash,
        },
      ])
      .select("id, title, contact, content, created_at, updated_at, views")
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "게시글 작성에 실패했습니다." }, { status: 500 });
  }
}
