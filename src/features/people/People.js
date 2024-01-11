import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPerson,
  deletePerson,
  fetchPeople,
  selectPeople,
} from './peopleSlice';
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
import Grid from '@mui/material/Grid';

export function People() {
  const [newPerson, setNewPerson] = useState({
    firstName: '',
    lastName: '',
    age: undefined,
  });

  const people = useSelector(selectPeople);
  const dispatch = useDispatch();

  const getPeople = () => {
    dispatch(fetchPeople());
  };

  const handleDelete = (index) => {
    dispatch(deletePerson(index));
  };

  return (
    <div data-testid="people-card">
      <Typography variant="h3" component="h3" mb={4}>
        People
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
            {people.map((row, index) => (
              <TableRow key={row.firstName + index}>
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
        Get people
      </Button>

      <Grid container spacing={2} mt={4}>
        <Grid item xs={6}>
          <TextField
            sx={{ mb: 1 }}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            onChange={(event) =>
              setNewPerson((prevValue) => ({
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
              setNewPerson((prevValue) => ({
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
              setNewPerson((prevValue) => ({
                ...prevValue,
                age: event.target.value,
              }))
            }
          />

          <Button
            sx={{ mt: 4 }}
            variant="contained"
            onClick={() => {
              dispatch(addPerson(newPerson));
              setNewPerson({ firstName: '', lastName: '', age: undefined });
            }}
          >
            Add a person
          </Button>
          <p> Total : {people.length}</p>
        </Grid>
      </Grid>
    </div>
  );
}
