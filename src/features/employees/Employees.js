import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addEmployee,
  deleteEmployee,
  selectEmployees,
  setEmployees,
} from './employeesSlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
} from '@mui/material';
import { MORE_PEOPLE, PEOPLE } from '../../mocks/peopleMocks';
import Grid from '@mui/material/Grid';

export function Employees() {
  const employees = useSelector(selectEmployees);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    age: undefined,
  });

  const dispatch = useDispatch();

  const getPeople = () => {
    dispatch(setEmployees(PEOPLE));
  };

  const handleDelete = (index) => {
    dispatch(deleteEmployee(index));
  };

  return (
    <div data-testid="employees-card">
      <Typography variant="h3" component="h3" mb={4}>
        Employees
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row, index) => (
              <TableRow key={row.lastName + index}>
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button sx={{ mt: 4 }} variant="contained" onClick={() => getPeople()}>
        Get employees
      </Button>

      <Grid container spacing={2} mt={4}>
        <Grid item xs={6}>
          <TextField
            sx={{ mb: 1 }}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            onChange={(event) =>
              setNewEmployee((prevValue) => ({
                ...prevValue,
                firstName: event.target.value,
              }))
            }
          />

          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            onChange={(event) =>
              setNewEmployee((prevValue) => ({
                ...prevValue,
                lastName: event.target.value,
              }))
            }
          />

          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Age"
            variant="outlined"
            type="number"
            onChange={(event) =>
              setNewEmployee((prevValue) => ({
                ...prevValue,
                age: event.target.value,
              }))
            }
          />

          <Button
            sx={{ mt: 4 }}
            variant="contained"
            onClick={() => {
              dispatch(addEmployee(newEmployee));
              setNewEmployee({ firstName: '', lastName: '', age: undefined });
            }}
          >
            Add an employee
          </Button>
          <p> Total : {employees.length}</p>
        </Grid>
      </Grid>
    </div>
  );
}
