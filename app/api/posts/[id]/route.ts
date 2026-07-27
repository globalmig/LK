// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { d1Query, type Post } from "@/lib/db";
import bcrypt from "bcryptjs";

// ✅ 게시글 존재 확인용 (제목만 반환, 내용은 POST로만)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const rows = await d1Query<Pick<Post, "id" | "title" | "created_at">>(
      "SELECT id, title, created_at FROM posts WHERE id = ?",
      [id]
    );
    const data = rows[0];

    if (!data) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("게시글 조회 오류:", err);
    return NextResponse.json({ error: "게시글을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

// ✅ 비밀번호 검증 + 게시글 조회 (상세 페이지 진입용)
//  - 게시글 비번 or ADMIN_PASSWORD 중 하나 맞으면 통과
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "비밀번호를 입력해주세요." }, { status: 400 });
    }

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    const rows = await d1Query<Post>(
      "SELECT id, title, content, contact, created_at, updated_at, views, password_hash FROM posts WHERE id = ?",
      [id]
    );
    const post = rows[0];

    if (!post) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    let isValid = false;

    // 관리자 공통 비밀번호 우선 체크
    if (ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
      isValid = true;
    } else {
      // 게시글 비밀번호 검증
      isValid = await bcrypt.compare(password, post.password_hash);
    }

    if (!isValid) {
      return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 403 });
    }

    // password_hash 제거하고 반환
    const { password_hash, ...safePost } = post;

    return NextResponse.json(safePost);
  } catch (err) {
    console.error("게시글 비밀번호 검증 중 오류:", err);
    return NextResponse.json({ error: "게시글을 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

// ✅ 게시글 수정 (비밀번호 검증 후 title/content 수정)
//  - 게시글 비번 or ADMIN_PASSWORD 둘 다 허용
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { title, content, password, contact } = await request.json();

    if (!title || !content || !password) {
      return NextResponse.json({ error: "제목, 내용, 비밀번호를 모두 입력해주세요." }, { status: 400 });
    }

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // 1) 비밀번호 해시 가져오기
    const rows = await d1Query<Pick<Post, "id" | "password_hash">>(
      "SELECT id, password_hash FROM posts WHERE id = ?",
      [id]
    );
    const post = rows[0];

    if (!post) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    // 2) 비밀번호 검증
    let isValid = false;

    if (ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
      isValid = true;
    } else {
      isValid = await bcrypt.compare(password, post.password_hash);
    }

    if (!isValid) {
      return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 403 });
    }

    // 3) 실제 수정
    const updatedAt = new Date().toISOString();
    await d1Query(
      "UPDATE posts SET title = ?, content = ?, contact = ?, updated_at = ? WHERE id = ?",
      [title, content, contact, updatedAt, id]
    );

    const updatedRows = await d1Query<Post>(
      "SELECT id, title, content, contact, created_at, updated_at, views FROM posts WHERE id = ?",
      [id]
    );

    return NextResponse.json(updatedRows[0]);
  } catch (err) {
    console.error("게시글 수정 중 오류:", err);
    return NextResponse.json({ error: "게시글 수정 중 오류가 발생했습니다." }, { status: 500 });
  }
}

// ✅ 게시글 삭제 (비밀번호 검증 후 삭제)
//  - 게시글 비번 or ADMIN_PASSWORD 둘 다 허용
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "비밀번호가 전달되지 않았습니다." }, { status: 400 });
    }

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // 1) 비밀번호 해시 가져오기
    const rows = await d1Query<Pick<Post, "id" | "password_hash">>(
      "SELECT id, password_hash FROM posts WHERE id = ?",
      [id]
    );
    const post = rows[0];

    if (!post) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    // 2) 비밀번호 검증
    let isValid = false;

    if (ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
      isValid = true;
    } else {
      isValid = await bcrypt.compare(password, post.password_hash);
    }

    if (!isValid) {
      return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 403 });
    }

    // 3) 삭제
    await d1Query("DELETE FROM posts WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("게시글 삭제 중 오류:", err);
    return NextResponse.json({ error: "게시글 삭제 중 오류가 발생했습니다." }, { status: 500 });
  }
}

// PUT으로 호출해도 PATCH 로직 재사용
export async function PUT(request: NextRequest, ctx: { params: { id: string } }) {
  return PATCH(request, ctx);
}
