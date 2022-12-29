import { itemIcons } from 'data/itemsIcons';

export const getFileType = (extension: string) => {
  const filteredIcons = itemIcons.find((icon) => icon.extensions.includes(extension.toLowerCase()));

  return filteredIcons ? filteredIcons.type : null;
};
