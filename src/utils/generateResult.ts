import { Result } from '@interfaces/api.interface';

export const generateResult = <T>(
  success: boolean,
  error: string | null,
  data?: T
): Result<T> => {
  if (success) {
    return { success, data: data! };
  } else {
    return { success: false, error: error ?? 'Unknown error' };
  }
};
