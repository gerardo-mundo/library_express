import { Result } from '@interfaces/api.interface';

export const generateResult = <T>(
  ok: boolean,
  error: string | null,
  data?: T
): Result<T> => {
  if (ok) {
    return { ok, data: data! };
  } else {
    return { ok: false, error: error ?? 'Unknown error' };
  }
};
