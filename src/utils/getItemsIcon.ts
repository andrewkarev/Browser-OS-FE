import { itemIcons, defaultIcon } from 'data/itemsIcons';

export const getItemIcon = (extension: string) => {
  const filteredIcons = itemIcons.filter((icon) =>
    icon.extensions.includes(extension.toLowerCase())
  );

  return filteredIcons.length ? filteredIcons[0].src : defaultIcon.src;
};
