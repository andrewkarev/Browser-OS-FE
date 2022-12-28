import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates } from 'types/Coordinates';
import { IDirItem } from 'types/IDirItem';
import { IMenuItem } from 'types/IMenuItem';

interface contextMenuState {
  isContextMenuOpened: boolean;
  coordinates: Coordinates;
  menuItems: IMenuItem[];
  selectedItem: IDirItem | null;
  currentWindowId: string | null;
  itemToCopy: IDirItem | null;
}

const initialState: contextMenuState = {
  isContextMenuOpened: false,
  coordinates: { x: 0, y: 0 },
  menuItems: [],
  selectedItem: null,
  currentWindowId: null,
  itemToCopy: null,
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    setCoordinates(state, action: PayloadAction<Coordinates>) {
      state.coordinates = action.payload;
    },
    setIsContextMenuOpened(state, action: PayloadAction<boolean>) {
      state.isContextMenuOpened = action.payload;
    },
    setMenuItems(state, action: PayloadAction<IMenuItem[]>) {
      state.menuItems = action.payload;
    },
    setSelectedItem(state, action: PayloadAction<IDirItem | null>) {
      state.selectedItem = action.payload;
    },
    setCurrentWindowId(state, action: PayloadAction<string | null>) {
      state.currentWindowId = action.payload;
    },
    setItemToCopy(state, action: PayloadAction<IDirItem | null>) {
      state.itemToCopy = action.payload;
    },
  },
});

export const {
  setCoordinates,
  setIsContextMenuOpened,
  setMenuItems,
  setSelectedItem,
  setCurrentWindowId,
  setItemToCopy,
} = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
