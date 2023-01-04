import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import FileType from 'common/fileType';
import ItemType from 'common/itemType';
import WindowOperation from 'common/windowOperation';
import { api } from 'services';
import { IDirectory } from 'types/IDirectory';
import { IMediaFile } from 'types/IMediaFile';

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

export const renameItem = createAsyncThunk(
  'desktop/renameItem',
  async (
    { itemPath, windowId, title }: { itemPath: string; windowId: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(
        `?path=${itemPath}&operation=rename`,
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

export const copyItem = createAsyncThunk(
  'desktop/copyItem',
  async (
    { sourcePath, destPath, windowId }: { sourcePath: string; destPath: string; windowId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(
        `?path=${sourcePath}&operation=copy`,
        {
          destPath,
        }
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

export const cutItem = createAsyncThunk(
  'desktop/cutItem',
  async (
    {
      sourcePath,
      destPath,
      windowId,
      itemType,
    }: { sourcePath: string; destPath: string; windowId: string; itemType: ItemType },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<AxiosError, IDirectory>(`?path=${sourcePath}&operation=cut`, {
        destPath,
        itemType,
      });

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

export const getTextFile = createAsyncThunk(
  'desktop/getTextFile',
  async ({ filePath, fileType }: { filePath: string; fileType: FileType }, { rejectWithValue }) => {
    try {
      const response = await api.get<AxiosError, { fileTitle: string; data: string; id: string }>(
        `/text?path=${filePath}`
      );

      return {
        ...response,
        fileType,
        filePath,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const updateTextFile = createAsyncThunk(
  'desktop/updateTextFile',
  async (mediaFile: IMediaFile, { rejectWithValue }) => {
    try {
      return await api.post<AxiosError, IMediaFile>(`/text`, { ...mediaFile });
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const getVideoFile = createAsyncThunk(
  'desktop/getVideoFile',
  async ({ filePath, fileType }: { filePath: string; fileType: FileType }, { rejectWithValue }) => {
    try {
      const response = await api.get<AxiosError, { fileTitle: string; data: string; id: string }>(
        `/video?path=${filePath}`
      );

      return {
        ...response,
        fileType,
        filePath,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);
