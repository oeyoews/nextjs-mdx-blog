type Config = {
  url?: string | null;
  options?: RequestInit;
};

const customFetch = (
  finalURL: string,
  options?: RequestInit,
): Promise<Response> => {
  const defaultOptions: RequestInit = {
    mode: 'cors',
    next: { revalidate: 3600 },
    headers: { 'Content-Type': 'application/json' },
  };
  const mergedOptions: RequestInit = { ...defaultOptions, ...options };
  return fetch(finalURL, mergedOptions);
};

export const create = (baseURL: string) => {
  return function (config: Config) {
    const { url, options } = config;
    const finalURL = url ? baseURL + url : baseURL;
    return customFetch(finalURL, options);
  };
};
