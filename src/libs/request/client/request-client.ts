import ky, { Input, Options, ResponsePromise } from "ky";
import { KyRequestInterceptor, KyResponseInterceptor, RequestOptions } from "../types";

export class RequestClient {
  private baseUrl: string = "";
  private defaultOptions: Options = {};
  private requestInterceptors: KyRequestInterceptor[] = [];
  private responseInterceptors: KyResponseInterceptor[] = [];
  private instance!: typeof ky;

  constructor(baseUrl: string = "", options: Options = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      timeout: 10000,
      retry: 1,
      hooks: {
        beforeRequest: [],
        afterResponse: [],
        beforeRetry: [],
        beforeError: [],
      },
      ...options,
    };

    this.init();
  }

  private init() {
    this.instance = ky.create({
      prefixUrl: this.baseUrl,
      ...this.defaultOptions,
      hooks: {
        beforeRequest: [
          async (request, options) => {
            for (const interceptor of this.requestInterceptors) {
              const result = await interceptor(request, options);
              if (result instanceof Request) {
                return result;
              }
              if (result instanceof Response) {
                return result;
              }
            }
          },
          ...(this.defaultOptions.hooks?.beforeRequest || []),
        ],
        afterResponse: [
          async (request, options, response) => {
            let modifiedResponse = response;
            for (const interceptor of this.responseInterceptors) {
              const result = await interceptor(request, options, modifiedResponse);
              if (result instanceof Response) {
                modifiedResponse = result;
              }
            }
            return modifiedResponse;
          },
          ...(this.defaultOptions.hooks?.afterResponse || []),
        ],
        beforeRetry: [...(this.defaultOptions.hooks?.beforeRetry || [])],
        beforeError: [...(this.defaultOptions.hooks?.beforeError || [])],
      },
    });
  }

  /**
   * 添加请求拦截器
   */
  public addRequestInterceptor(interceptor: KyRequestInterceptor) {
    this.requestInterceptors.push(interceptor);
    // 重新初始化实例以应用新的拦截器
    this.init();
    return () => this.removeRequestInterceptor(interceptor);
  }

  /**
   * 移除请求拦截器
   */
  public removeRequestInterceptor(interceptor: KyRequestInterceptor) {
    const index = this.requestInterceptors.indexOf(interceptor);
    if (index !== -1) {
      this.requestInterceptors.splice(index, 1);
      this.init();
    }
  }

  /**
   * 添加响应拦截器
   */
  public addResponseInterceptor(interceptor: KyResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
    this.init();
    return () => this.removeResponseInterceptor(interceptor);
  }

  /**
   * 移除响应拦截器
   */
  public removeResponseInterceptor(interceptor: KyResponseInterceptor) {
    const index = this.responseInterceptors.indexOf(interceptor);
    if (index !== -1) {
      this.responseInterceptors.splice(index, 1);
      this.init();
    }
  }

  public request<T = unknown>({
    method = "get",
    url,
    params,
    data,
    headers,
    ...rest
  }: RequestOptions): ResponsePromise<T> {
    const options: Options = {
      method,
      headers,
      ...rest,
    };

    if (params) {
      options.searchParams = params;
    }

    // 处理请求体
    if (data) {
      if (typeof data === "object" && !(data instanceof FormData) && !(data instanceof URLSearchParams)) {
        options.json = data;
      } else {
        options.body = data as BodyInit;
      }
    }

    return this.instance(url, options) as ResponsePromise<T>;
  }

  /**
   * GET 请求
   */
  public get<T = unknown>(url: Input, options: Omit<RequestOptions, "url" | "method"> = {}): ResponsePromise<T> {
    return this.request<T>({ method: "get", url, ...options });
  }

  /**
   * POST 请求
   */
  public post<T = unknown>(url: Input, options: Omit<RequestOptions, "url" | "method"> = {}): ResponsePromise<T> {
    return this.request<T>({ method: "post", url, ...options });
  }

  /**
   * PUT 请求
   */
  public put<T = unknown>(url: Input, options: Omit<RequestOptions, "url" | "method"> = {}): ResponsePromise<T> {
    return this.request<T>({ method: "put", url, ...options });
  }

  /**
   * PATCH 请求
   */
  public patch<T = unknown>(url: Input, options: Omit<RequestOptions, "url" | "method"> = {}): ResponsePromise<T> {
    return this.request<T>({ method: "patch", url, ...options });
  }

  /**
   * DELETE 请求
   */
  public delete<T = unknown>(url: Input, options: Omit<RequestOptions, "url" | "method"> = {}): ResponsePromise<T> {
    return this.request<T>({ method: "delete", url, ...options });
  }
}
