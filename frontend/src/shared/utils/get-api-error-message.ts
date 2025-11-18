import type { AxiosError } from 'axios';

export function getApiErrorMessage(
  error: unknown,
  customMessage?: string
): string {
  const axiosError = error as AxiosError<unknown>;
  const data = axiosError.response?.data;

  const extractStringMessage = (value: unknown): string | undefined => {
    if (!value) return undefined;
    if (typeof value === 'string') return value;

    if (Array.isArray(value)) {
      const strings = value
        .filter((item): item is string => typeof item === 'string')
        .slice(0, 5);
      return strings.length > 0 ? strings.join(', ') : undefined;
    }

    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>;

      if (typeof obj.message === 'string') return obj.message;
      if (Array.isArray(obj.message)) {
        return obj.message
          .filter((m): m is string => typeof m === 'string')
          .join(', ');
      }

      if (obj.error && typeof obj.error === 'object') {
        const errorObj = obj.error as Record<string, unknown>;
        if (typeof errorObj.message === 'string') return errorObj.message;
      }

      if (typeof obj.responseMessage === 'string') return obj.responseMessage;
      if (typeof obj.detail === 'string') return obj.detail;
      if (typeof obj.error === 'string') return obj.error;

      if (obj.errors) {
        if (typeof obj.errors === 'string') return obj.errors;
        if (Array.isArray(obj.errors)) {
          return obj.errors
            .filter((e): e is string => typeof e === 'string')
            .join(', ');
        }
        if (typeof obj.errors === 'object') {
          const fieldErrors = Object.values(obj.errors).flat();
          const messages = fieldErrors.filter(
            (e): e is string => typeof e === 'string'
          );
          return messages.length > 0 ? messages.join(', ') : undefined;
        }
      }
    }

    return undefined;
  };

  const messageFromData =
    data !== undefined ? extractStringMessage(data) : undefined;

  const fallbackMessage =
    axiosError.message &&
    axiosError.message !== 'Request failed with status code undefined'
      ? axiosError.message
      : undefined;

  const finalMessage = messageFromData ?? fallbackMessage;

  return (
    finalMessage || customMessage || 'An error occurred, please try again.'
  );
}
