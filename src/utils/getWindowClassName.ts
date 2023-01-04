export const getWindowClassName = (isMaximized: boolean, isMinimized: boolean) => {
  if (isMaximized && !isMinimized) return 'windowMaximized';
  if (isMinimized) return 'windowMinimized';

  return 'window';
};
