import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://64204d6e25cb65721046935d.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewContacts = createAsyncThunk(
  'contacts/addNewContacts',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/contacts', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteApiContact = createAsyncThunk(
  'contacts/deleteApiContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
