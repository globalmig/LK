import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10초
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 ${config.method?.toUpperCase()} 요청:`, config.url, config.data);
    return config;
  },
  (error) => {
    console.error("❌ 요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} 응답:`, response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error("❌ 응답 인터셉터 에러:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// 타입 정의
export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  views: number;
};

export type PostListResponse = {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
};

export type CreatePostRequest = {
  title: string;
  content: string;
  password: string;
};

export type UpdatePostRequest = {
  title: string;
  content: string;
  password: string;
};

export type DeletePostRequest = {
  password: string;
};

// API 함수들
export const postAPI = {
  // 게시글 목록 조회
  getList: async (page: number = 1, limit: number = 10): Promise<PostListResponse> => {
    const response = await api.get<PostListResponse>("/posts", {
      params: { page, limit },
    });
    return response.data;
  },

  // 게시글 상세 조회
  getDetail: async (id: string): Promise<Post> => {
    console.log("📌 getDetail 호출, ID:", id);
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  // 게시글 생성
  create: async (data: CreatePostRequest): Promise<Post> => {
    console.log("📌 create 호출:", data);
    const response = await api.post<Post>("/posts", data);
    return response.data;
  },

  // 게시글 수정
  update: async (id: string, data: UpdatePostRequest): Promise<Post> => {
    console.log("📌 update 호출, ID:", id, "Data:", data);
    const response = await api.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  // 게시글 삭제
  delete: async (id: string, data: DeletePostRequest): Promise<{ message: string }> => {
    console.log("📌 delete 호출, ID:", id, "Data:", data);
    const response = await api.delete<{ message: string }>(`/posts/${id}`, {
      data, // DELETE 요청의 body는 data 옵션으로 전달
    });
    return response.data;
  },
};

export default api;
