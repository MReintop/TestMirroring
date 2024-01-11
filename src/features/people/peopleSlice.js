import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PEOPLE } from '../../mocks/peopleMocks';

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async (_, { dispatch }) => {
    const response = await new Promise((resolve) => resolve(PEOPLE));
    dispatch(setPeople(response));
  },
);

export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    people: [],
  },
  reducers: {
    addPerson: (state, action) => {
      const newPeople = [...state.people, action.payload];

      state.people = newPeople;
    },
    deletePerson: (state, action) => {
      const newPeople = [...state.people];
      newPeople.splice(action.payload, 1);

      state.people = newPeople;
    },
    setPeople: (state, action) => {
      state.people = [...state.people, ...action.payload];
    },
    clearList: (state) => {
      state.people = [];
    },
  },
});

export const { clearList, setPeople, addPerson, deletePerson } =
  peopleSlice.actions;

export const selectPeople = (state) => state.people.people;

export default peopleSlice.reducer;
