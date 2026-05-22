/** 把未知错误转换成可展示的消息。 */
export function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
