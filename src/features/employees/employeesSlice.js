import { createSlice } from '@reduxjs/toolkit';

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
  },
  reducers: {
    addEmployee: (state, action) => {
      const newEmployees = [...state.employees, action.payload];

      state.employees = newEmployees;
    },
    deleteEmployee: (state, action) => {
      const newEmployees = [...state.employees];
      newEmployees.splice(action.payload, 1);

      state.employees = newEmployees;
    },
    setEmployees: (state, action) => {
      state.employees = [...state.employees, ...action.payload];
    },
    clearList: (state) => {
      state.employees = [];
    },
  },
});

export const { clearList, setEmployees, addEmployee, deleteEmployee } =
  employeesSlice.actions;

export const selectEmployees = (state) => state.employees.employees;

export default employeesSlice.reducer;
