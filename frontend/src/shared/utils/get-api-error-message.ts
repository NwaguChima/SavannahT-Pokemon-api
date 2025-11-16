import type { AxiosError } from 'axios';

export function getApiErrorMessage(error: unknown, customMessage?: string) {
  const axiosError = error as AxiosError<any>;

  const data = axiosError?.response?.data;

  const possibleMessages = [
    data?.responseMessage,
    data?.error?.message,
    data?.message,
    data?.errors,
    data && typeof data === 'string' ? data : null,
    axiosError?.message,
  ].filter(Boolean);

  const first = possibleMessages[0];

  const message = Array.isArray(first) ? first.join(', ') : first;

  return message || customMessage || 'An error occurred, please try again.';
}
