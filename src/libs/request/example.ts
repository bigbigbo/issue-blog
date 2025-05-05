import request, { RequestClient } from "./index";
import type { KyRequestInterceptor, KyResponseInterceptor } from "./types";

// 示例1：使用默认实例进行请求
async function fetchData() {
  try {
    // GET 请求
    const users = await request.get("https://api.example.com/users").json<{ id: number; name: string }[]>();
    console.log(users);

    // POST 请求，发送 JSON 数据
    const newUser = await request
      .post("https://api.example.com/users", {
        data: { name: "John Doe", email: "john@example.com" },
      })
      .json<{ id: number; name: string }>();
    console.log(newUser);

    // 带查询参数的请求
    const filteredUsers = await request
      .get("https://api.example.com/users", {
        params: { role: "admin", status: "active" },
      })
      .json<{ id: number; name: string }[]>();
    console.log(filteredUsers);

    // 带自定义请求头的请求
    const protectedData = await request
      .get("https://api.example.com/protected", {
        headers: {
          Authorization: "Bearer YOUR_TOKEN",
        },
      })
      .json();
    console.log(protectedData);
  } catch (error) {
    console.error("请求失败:", error);
  }
}

// 示例2：创建自定义实例（如API客户端）
function createApiClient() {
  const apiClient = new RequestClient("https://api.example.com", {
    timeout: 5000,
    retry: 3,
    headers: {
      "X-API-Key": "your-api-key",
    },
  });

  // 添加请求拦截器
  const requestInterceptor: KyRequestInterceptor = async (request) => {
    // 添加认证信息
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  };
  apiClient.addRequestInterceptor(requestInterceptor);

  // 添加响应拦截器
  const responseInterceptor: KyResponseInterceptor = async (request, options, response) => {
    // 处理特定状态码
    if (response.status === 401) {
      // 尝试刷新 token
      try {
        const newToken = await refreshToken();
        if (newToken) {
          // 使用新 token 重试原始请求
          const newRequest = new Request(request);
          newRequest.headers.set("Authorization", `Bearer ${newToken}`);
          return fetch(newRequest);
        }
      } catch (error) {
        console.error("刷新令牌失败:", error);
        // 重定向到登录页或其他处理
        window.location.href = "/login";
      }
    }
    return response;
  };
  apiClient.addResponseInterceptor(responseInterceptor);

  return apiClient;
}

// 辅助函数：刷新令牌
async function refreshToken(): Promise<string | null> {
  try {
    const response = await fetch("https://api.example.com/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken"),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data.token;
    }
    return null;
  } catch (error) {
    console.error("刷新令牌时出错:", error);
    return null;
  }
}

// 示例3：使用自定义实例
async function useCustomApiClient() {
  const apiClient = createApiClient();

  try {
    // 基本请求
    const users = await apiClient.get("/users").json();
    console.log(users);

    // 带参数的 POST 请求
    const createUserResult = await apiClient
      .post("/users", {
        data: { name: "Alice", email: "alice@example.com" },
      })
      .json();
    console.log(createUserResult);
  } catch (error) {
    console.error("API 请求失败:", error);
  }
}

// 导出示例函数
export { createApiClient, fetchData, useCustomApiClient };
