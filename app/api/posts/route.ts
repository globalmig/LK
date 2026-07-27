import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/db";
import bcrypt from "bcryptjs";

// 게시글 목록 조회
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;

  try {
    // 전체 개수 조회
    const countRows = await d1Query<{ count: number }>("SELECT COUNT(*) as count FROM posts");
    const count = countRows[0]?.count ?? 0;

    // 게시글 목록 조회 (비밀번호 제외)
    const data = await d1Query(
      "SELECT id, title, content, contact, created_at, updated_at, views FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    return NextResponse.json({
      posts: data,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
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

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await d1Query(
      "INSERT INTO posts (id, title, content, contact, password_hash, created_at, updated_at, views) VALUES (?, ?, ?, ?, ?, ?, ?, 0)",
      [id, title, content, contact, passwordHash, now, now]
    );

    return NextResponse.json(
      { id, title, content, contact, created_at: now, updated_at: now, views: 0 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "게시글 작성에 실패했습니다." }, { status: 500 });
  }
}
