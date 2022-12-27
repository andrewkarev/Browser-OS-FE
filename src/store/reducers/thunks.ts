import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import WindowOperation from 'common/windowOperation';
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
    }: { itemPath: string; windowId: string; operation: WindowOperation },
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

export const addFile = createAsyncThunk(
  'desktop/addFile',
  async (
    { windowPath, windowId, title }: { windowPath: string; windowId: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(
        `?path=${windowPath}&operation=addFile`,
        { title }
      );

      return {
        windowItems: response,
        windowId,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const deleteFile = createAsyncThunk(
  'desktop/deleteFile',
  async ({ itemPath, windowId }: { itemPath: string; windowId: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(`?path=${itemPath}&operation=delete`);

      return {
        windowItems: response,
        windowId,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const addFolder = createAsyncThunk(
  'desktop/addFolder',
  async (
    { windowPath, windowId, title }: { windowPath: string; windowId: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(
        `?path=${windowPath}&operation=addFolder`,
        { title }
      );

      return {
        windowItems: response,
        windowId,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const removeFolder = createAsyncThunk(
  'desktop/removeFolder',
  async (
    { folderPath, windowId }: { folderPath: string; windowId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(
        `?path=${folderPath}&operation=removeFolder`
      );

      return {
        windowItems: response,
        windowId,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const renameFile = createAsyncThunk(
  'desktop/renameFile',
  async (
    { filePath, windowId, title }: { filePath: string; windowId: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(
        `?path=${filePath}&operation=renameFile`,
        { title }
      );

      return {
        windowItems: response,
        windowId,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const renameDirectory = createAsyncThunk(
  'desktop/renameDirectory',
  async (
    { folderPath, windowId, title }: { folderPath: string; windowId: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(
        `?path=${folderPath}&operation=renameDirectory`,
        { title }
      );

      return {
        windowItems: response,
        windowId,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);
