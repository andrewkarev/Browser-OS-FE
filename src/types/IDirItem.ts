import ItemType from 'common/itemType';

export interface IDirItem {
  name: string;
  type: ItemType;
  extension: string | null;
  path: string;
}
