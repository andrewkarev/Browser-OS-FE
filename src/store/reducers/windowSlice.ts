import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWindow } from 'types/IWindow';

interface WindowState {
  currentWindow: IWindow | null;
}

const initialState: WindowState = {
  currentWindow: null,
};

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setCurrentWindow(state, action: PayloadAction<IWindow | null>) {
      state.currentWindow = action.payload;
    },
  },
});

export const { setCurrentWindow } = windowSlice.actions;
export default windowSlice.reducer;
