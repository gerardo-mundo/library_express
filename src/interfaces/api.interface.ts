export interface IApiResponse<T> {
  ok: boolean;
  message: string;
  data: T | null;
  error?: string;
  details?: any;
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };
