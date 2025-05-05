import type { Input, NormalizedOptions, Options } from "ky";

export interface RequestOptions extends Omit<Options, "method" | "searchParams" | "json" | "body"> {
  method?: string;
  url: Input;
  params?: Record<string, string | number | boolean> | URLSearchParams;
  data?: unknown;
  headers?: Record<string, string> | Headers;
}

export type KyRequestInterceptor = (
  request: Request,
  options: NormalizedOptions,
) => Request | Response | void | Promise<Request | Response | void>;

export type KyResponseInterceptor = (
  request: Request,
  options: NormalizedOptions,
  response: Response,
) => Response | void | Promise<Response | void>;
