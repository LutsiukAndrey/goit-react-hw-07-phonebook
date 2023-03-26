import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

import { addNewContacts, fetchContacts, deleteApiContact } from './thanks';

export const contactSlice = createSlice({
  name: '@@contacts',
  initialState: {
    contacts: {
      items: [],
      error: null,
      loading: false,
    },

    filter: '',
  },

  reducers: {
    addContact(state, action) {
      state.contacts.items.push(action.payload);
    },
    loadContacts(state, action) {
      state.contacts.items = action.payload;
    },

    deleteContact(state, action) {
      const index = state.contacts.items.findIndex(
        contact => contact.id === action.payload
      );
      console.log(index);
      state.contacts.items.splice(index, 1);
    },

    filterContact(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(addNewContacts.fulfilled, (state, action) => {
        state.contacts.items.unshift(action.payload);
      })
      .addCase(deleteApiContact.fulfilled, (state, action) => {
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.items.splice(index, 1);
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.loading = false;
          state.error = null;
        }
      );
  },
});

export const { loadContacts, addContact, filterContact, deleteContact } =
  contactSlice.actions;

export const contactReducer = contactSlice.reducer;

export const rootReducer = combineReducers({
  contacts: contactReducer,
});

export const store = configureStore({
  reducer: contactReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
