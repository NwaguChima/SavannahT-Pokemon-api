export type Url<T> = BuildableUrl<T>;

type Params<Url> = {
  [key in UrlParam<Url>]: string;
};

type UrlParam<Path> = Path extends `${infer L}/${infer R}`
  ? UrlParam<L> | UrlParam<R>
  : Path extends `:${infer Param}`
  ? Param
  : never;

export type BuildableUrl<T> = {
  raw: string;
  build: (params?: Params<T>) => string;
};

const isNil = (val: unknown): val is null | undefined =>
  val === null || val === undefined;

function mapValues<T extends Record<string, any>, R>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => R
) {
  const result = {} as Record<keyof T, R>;
  for (const key in obj) {
    result[key] = fn(obj[key], key);
  }
  return result;
}

function generatePath(path: string, params: Record<string, any>) {
  return path.replace(/:(\w+)/g, (_, key) => {
    const value = params[key];
    if (value === undefined) {
      throw new Error(`Missing parameter '${key}' for path '${path}'`);
    }
    return String(value);
  });
}

export function url<T extends string>(path: T, host = ''): BuildableUrl<T> {
  const hasParams = path.includes(':');

  return {
    raw: host + path,
    build: (params?: Params<T>) => {
      if (!hasParams) {
        return host + path;
      }

      if (!params) {
        throw new Error(`Params required for URL: ${path}`);
      }

      return (
        host +
        generatePath(
          path,
          mapValues(params, (value) =>
            !isNil(value) ? encodeURIComponent(decodeURIComponent(value)) : ''
          )
        )
      );
    },
  };
}
