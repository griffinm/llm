export const urls: Record<string, (...args: any[]) => string> = {
  home: () => '/',
  chat: (id: string) => `/chat/${id}`,
}
