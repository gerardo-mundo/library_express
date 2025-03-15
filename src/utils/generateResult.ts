import { Result } from '@interfaces/api.interface';

export const generateResult = (
  success: boolean,
  error?: string,
  data?: any
): Result<any> => {
  if (success) {
    return { success, data };
  } else {
    return { success: false, error: error ?? '' };
  }
};
