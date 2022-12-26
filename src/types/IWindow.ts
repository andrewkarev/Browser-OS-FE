import { IDirectory } from './IDirectory';

export interface IWindow {
  window: IDirectory;
  history: string[];
  currentPath: string;
}
