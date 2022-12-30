import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMediaFile } from 'types/IMediaFile';
import { getTextFile, updateTextFile } from './thunks';

interface MediaState {
  openedPlayers: IMediaFile[];
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
    updateOpenedPlayers(state, action: PayloadAction<IMediaFile>) {
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

    // builder.addCase(updateTextFile.pending, (state) => {});
    builder.addCase(updateTextFile.fulfilled, (state, action) => {
      state.openedPlayers.forEach((player) => {
        if (player.id === action.payload.id) {
          player.data = action.payload.data;
        }
      });
    });
    // builder.addCase(updateTextFile.rejected, (state, action) => {});
  },
});

export const { setOpenedPlayers, updateOpenedPlayers } = mediaSlice.actions;
export default mediaSlice.reducer;
