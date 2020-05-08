declare module "promisify-file-reader" {
  export function text(file: File): Promise<string>;
}
