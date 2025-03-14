export interface IApiResponse<T> {
  ok: boolean;
  message: string;
  data: T | null;
  error?: string;
  details?: any;
}
