export const cleanErrorMessage = (value: string): string => {
  return value.split('|||')[1].trim();
};
