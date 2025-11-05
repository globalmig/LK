// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // 이미 쓰고 있는 공용 supabase 클라이언트
import bcrypt from "bcryptjs";

// ✅ 게시글 존재 확인용 (제목만 반환, 내용은 POST로만)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, created_at") // 제목과 날짜만
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("게시글 조회 오류:", err);
    return NextResponse.json({ error: "게시글을 불러오는데 실패했습니다." }, { status: 500 });
  }
}
// ✅ 게시글 상세 조회 (비번 없이도 호출 가능 / 필요 없으면 나중에 막아도 됨)
// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const { data, error } = await supabase.from("posts").select("id, title, content, created_at, updated_at, views").eq("id", id).single();

//     if (error || !data) {
//       return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
//     }

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("게시글 상세 조회 오류:", err);
//     return NextResponse.json({ error: "게시글을 불러오는데 실패했습니다." }, { status: 500 });
//   }
// }

// ✅ 비밀번호 검증 + 게시글 조회 (상세 페이지 진입용)
//  - 게시글 비번 or ADMIN_PASSWORD 중 하나 맞으면 통과
// export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const { password } = await request.json();

//     if (!password) {
//       return NextResponse.json({ error: "비밀번호를 입력해주세요." }, { status: 400 });
//     }

//     const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//     const { data: post, error } = await supabase.from("posts").select("id, title, content, created_at, updated_at, views, password_hash").eq("id", id).single();

//     if (error || !post) {
//       return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
//     }

//     let isValid = false;

//     // 관리자 공통 비밀번호 우선 체크
//     if (ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
//       isValid = true;
//     } else {
//       // 게시글 비밀번호 검증
//       isValid = await bcrypt.compare(password, post.password_hash);
//     }

//     if (!isValid) {
//       return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 403 });
//     }

//     // password_hash 제거하고 반환
//     const { password_hash, ...safePost } = post;

//     return NextResponse.json(safePost);
//   } catch (err) {
//     console.error("게시글 비밀번호 검증 중 오류:", err);
//     return NextResponse.json({ error: "게시글을 불러오는 중 오류가 발생했습니다." }, { status: 500 });
//   }
// }

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "비밀번호를 입력해주세요." }, { status: 400 });
    }

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    const { data: post, error } = await supabase.from("posts").select("id, title, content, created_at, updated_at, views, password_hash").eq("id", id).single();

    if (error || !post) {
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
    const { title, content, password } = await request.json();

    if (!title || !content || !password) {
      return NextResponse.json({ error: "제목, 내용, 비밀번호를 모두 입력해주세요." }, { status: 400 });
    }

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // 1) 비밀번호 해시 가져오기
    const { data: post, error } = await supabase.from("posts").select("id, password_hash").eq("id", id).single();

    if (error || !post) {
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
    const { data: updated, error: updateError } = await supabase
      .from("posts")
      .update({
        title,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id, title, content, created_at, updated_at, views")
      .single();

    if (updateError) {
      console.error("게시글 수정 오류:", updateError);
      return NextResponse.json({ error: "게시글 수정에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json(updated);
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
    const { data: post, error } = await supabase.from("posts").select("id, password_hash").eq("id", id).single();

    if (error || !post) {
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
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", id);

    if (deleteError) {
      console.error("게시글 삭제 오류:", deleteError);
      return NextResponse.json({ error: "게시글 삭제에 실패했습니다." }, { status: 500 });
    }

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
