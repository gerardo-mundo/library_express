export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error?: string;
  details?: any;
}

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
