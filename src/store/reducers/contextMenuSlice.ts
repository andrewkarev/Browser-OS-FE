import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates } from 'types/Coordinates';
import { IDirItem } from 'types/IDirItem';
import { IMenuItem } from 'types/IMenuItem';

interface contextMenuState {
  isContextMenuOpened: boolean;
  coordinates: Coordinates;
  menuItems: IMenuItem[];
  selectedItem: { item: IDirItem; windowId: string } | null;
}

const initialState: contextMenuState = {
  isContextMenuOpened: false,
  coordinates: { x: 0, y: 0 },
  menuItems: [],
  selectedItem: null,
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
    setSelectedItem(state, action: PayloadAction<{ item: IDirItem; windowId: string } | null>) {
      state.selectedItem = action.payload;
    },
  },
});

export const { setCoordinates, setIsContextMenuOpened, setMenuItems, setSelectedItem } =
  contextMenuSlice.actions;
export default contextMenuSlice.reducer;
