export const getContextMenuOptionClassName = (isDisabled: boolean, isBackground: boolean) => {
  if (isDisabled) return 'menuitemDisabled';
  if (isBackground) return 'menuitemBackground';

  return 'menuitem';
};
