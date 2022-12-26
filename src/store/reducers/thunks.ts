import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from 'services';
import { IDirectory } from 'types/IDirectory';

export const getItems = createAsyncThunk(
  'desktop/getItems',
  async (currentItemPath: string, { rejectWithValue }) => {
    try {
      return await api.get<AxiosError, IDirectory>(`?path=${currentItemPath}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const updateWindow = createAsyncThunk(
  'desktop/updateWindow',
  async (
    {
      itemPath,
      windowId,
      operation,
    }: { itemPath: string; windowId: string; operation: 'updating' | 'move' },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get<AxiosError, IDirectory>(`?path=${itemPath}`);

      return {
        windowItems: response,
        windowId,
        itemPath,
        operation,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);
