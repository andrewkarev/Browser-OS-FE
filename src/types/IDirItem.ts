export interface IDirItem {
  name: string;
  type: 'file' | 'directory';
  extension: string | null;
  path: string;
}
