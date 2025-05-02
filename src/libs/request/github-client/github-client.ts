import { NormalizedOptions } from "ky";
import { RequestClient } from "../client";
import { KyResponseInterceptor } from "../types";

const GITHUB_API_BASE = "https://api.github.com";
const TOKEN = process.env.GITHUB_ACCESS_TOKEN;

export const githubClient = new RequestClient(GITHUB_API_BASE, {
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {}),
  },
  timeout: 15000,
  retry: {
    limit: 2,
    methods: ["get"],
    statusCodes: [408, 429, 500, 502, 503, 504],
  },
});

const responseInterceptor: KyResponseInterceptor = async (
  request: Request,
  options: NormalizedOptions,
  response: Response,
) => {
  if (!response.ok) {
    console.warn(`GitHub API请求失败: ${request.url}, 状态码: ${response.status}`);
  }
  return response;
};

githubClient.addResponseInterceptor(responseInterceptor);
