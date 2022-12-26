import { IWindow } from 'types/IWindow';

export const getCurrentWindowPath = (currentWindowId: string, openedWindows: IWindow[]) => {
  const currentWindow = openedWindows.find((window) => window.window.id === currentWindowId);

  return currentWindow?.currentPath || '';
};
