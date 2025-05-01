# 请求工具 (Request Utility)

这是一个基于 ky 库封装的请求工具，同时支持客户端和服务端请求，具有拦截器功能。

## 特性

- 基于 [ky](https://github.com/sindresorhus/ky) 的轻量级 HTTP 客户端
- 同时支持客户端和服务端请求
- 简洁的 API 设计
- 请求和响应拦截器
- 自动处理 JSON 数据
- 支持类型推断
- 自动重试机制
- 超时处理

## 基本用法

### 导入

```typescript
import request from "@/libs/request";
```

### 示例用法

```typescript
// GET 请求
const users = await request.get("https://api.example.com/users").json();

// 带参数的 GET 请求
const filteredUsers = await request
  .get("https://api.example.com/users", {
    params: { role: "admin", status: "active" },
  })
  .json();

// POST 请求
const newUser = await request
  .post("https://api.example.com/users", {
    data: { name: "John Doe", email: "john@example.com" },
  })
  .json();

// 带自定义请求头的请求
const protectedData = await request
  .get("https://api.example.com/protected", {
    headers: {
      Authorization: "Bearer YOUR_TOKEN",
    },
  })
  .json();
```

## 高级用法

### 创建自定义实例

```typescript
import { RequestClient } from "@/libs/request";

const apiClient = new RequestClient("https://api.example.com", {
  timeout: 5000,
  retry: 3,
  headers: {
    "X-API-Key": "your-api-key",
  },
});

// 使用自定义实例
const users = await apiClient.get("/users").json();
```

### 添加拦截器

#### 请求拦截器

```typescript
apiClient.addRequestInterceptor(async (request, options) => {
  // 添加认证信息
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
  return request;
});
```

#### 响应拦截器

```typescript
apiClient.addResponseInterceptor(async (request, options, response) => {
  // 处理特定状态码
  if (response.status === 401) {
    // 尝试刷新 token 或其他处理逻辑
    return refreshTokenAndRetry(request);
  }
  return response;
});
```

### 移除拦截器

```typescript
// 添加拦截器并获取移除函数
const removeInterceptor = apiClient.addRequestInterceptor(myInterceptor);

// 稍后移除拦截器
removeInterceptor();

// 或者直接移除
apiClient.removeRequestInterceptor(myInterceptor);
```

## API

### 请求方法

- `request<T>({ method, url, params, data, headers, ...rest })`: 通用请求方法
- `get<T>(url, options)`: 发送 GET 请求
- `post<T>(url, options)`: 发送 POST 请求
- `put<T>(url, options)`: 发送 PUT 请求
- `patch<T>(url, options)`: 发送 PATCH 请求
- `delete<T>(url, options)`: 发送 DELETE 请求

### RequestOptions 参数

```typescript
interface RequestOptions {
  method?: string;
  url: string | URL | Request;
  params?: Record<string, string | number | boolean> | URLSearchParams;
  data?: unknown;
  headers?: Record<string, string> | Headers;
  // 其他 ky 支持的选项
  timeout?: number;
  retry?: number | object;
  // ...
}
```

### 拦截器类型

```typescript
// 请求拦截器
type KyRequestInterceptor = (
  request: Request,
  options: NormalizedOptions,
) => Request | Response | void | Promise<Request | Response | void>;

// 响应拦截器
type KyResponseInterceptor = (
  request: Request,
  options: NormalizedOptions,
  response: Response,
) => Response | void | Promise<Response | void>;
```

## 完整示例

查看 [example.ts](./example.ts) 文件获取完整使用示例。
