import React from 'react';
import './App.css';
import { People } from './features/people/People';
import Grid from '@mui/material/Grid';
import { Container, Paper } from '@mui/material';
import { Employees } from './features/employees/Employees';
function App() {
  return (
    <div className="App">
      <Container>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={6}>
            <Paper sx={{ px: 4, py: 2 }}>
              <People />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ px: 4, py: 2 }}>
              <Employees />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
