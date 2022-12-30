import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMediaPlayer } from 'types/IMediaPlayer';
import { getTextFile } from './thunks';

interface MediaState {
  openedPlayers: IMediaPlayer[];
}

const initialState: MediaState = {
  openedPlayers: [],
};

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setOpenedPlayers(state, action: PayloadAction<string>) {
      const updatedPlayers = state.openedPlayers.filter((player) => player.id !== action.payload);
      state.openedPlayers = updatedPlayers;
    },
    updateOpenedPlayers(state, action: PayloadAction<IMediaPlayer>) {
      state.openedPlayers.forEach((player) => {
        if (player.id === action.payload.id) {
          player.isPlayerMaximized = action.payload.isPlayerMaximized;
        }
      });
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getMediaFile.pending, (state) => {});
    builder.addCase(getTextFile.fulfilled, (state, action) => {
      state.openedPlayers.push({
        ...action.payload,
        isPlayerMaximized: false,
      });
    });
    // builder.addCase(getMediaFile.rejected, (state, action) => {});
  },
});

export const { setOpenedPlayers, updateOpenedPlayers } = mediaSlice.actions;
export default mediaSlice.reducer;
