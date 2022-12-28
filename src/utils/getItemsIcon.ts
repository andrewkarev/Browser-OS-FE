import { itemIcons, defaultIcon } from 'data/itemsIcons';

export const getItemIcon = (extension: string) => {
  const filteredIcons = itemIcons.find((icon) => icon.extensions.includes(extension.toLowerCase()));

  return filteredIcons ? filteredIcons.src : defaultIcon.src;
};
