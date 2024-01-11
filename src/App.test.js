import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import exp from 'constants';
import { PEOPLE } from './mocks/peopleMocks';
import employeesSlice, {
  addEmployee,
  deleteEmployee,
  setEmployees,
} from './features/employees/employeesSlice';
import {
  addPerson,
  clearList as clearPeople,
} from './features/people/peopleSlice';
import { clearList as clearEmployees } from './features/employees/employeesSlice';

describe('Given the component is rendered', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('Should render employees and people cards', () => {
    expect(wrapper.getByTestId('employees-card')).toBeInTheDocument();
    expect(wrapper.getByTestId('people-card')).toBeInTheDocument();
  });

  afterEach(async () => {
    await act(async () => {
      store.dispatch(clearPeople());
      store.dispatch(clearEmployees());
    });
  });

  describe('When getPeople button is clicked', () => {
    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(wrapper.getByText('Get people'));
      });
    });

    afterEach(async () => {
      await act(async () => {
        store.dispatch(clearPeople());
        store.dispatch(clearEmployees());
      });
    });

    it('Should set people in store', () => {
      expect(store.getState().people.people).toEqual(PEOPLE);
    });

    it('Should set employees in store', () => {
      expect(store.getState().employees.employees).toEqual(PEOPLE);
    });
  });

  describe('When getEmployees button is clicked', () => {
    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(wrapper.getByText('Get employees'));
      });
    });

    afterEach(async () => {
      await act(async () => {
        store.dispatch(clearPeople());
        store.dispatch(clearEmployees());
      });
    });

    it('Should set people in store', () => {
      expect(store.getState().people.people).toEqual(PEOPLE);
    });

    it('Should set employees in store', () => {
      expect(store.getState().employees.employees).toEqual(PEOPLE);
    });
  });

  describe('When a new Person is added ', () => {
    const newPerson = {
      firstName: 'some-first-name',
      lastName: 'some-last-name',
      age: 55,
      sex: 'X',
    };
    beforeEach(async () => {
      await act(async () => {
        store.dispatch(addPerson(newPerson));
      });
    });

    it('Should also add that person to employees', () => {
      expect(
        store.getState().employees.employees.includes(newPerson),
      ).toBeTruthy();
    });
  });

  describe('When a new Employee is added ', () => {
    const newEmployee = {
      firstName: 'some-first-name-2',
      lastName: 'some-last-name-2',
      age: 22,
      sex: 'X',
    };
    beforeEach(async () => {
      await act(async () => {
        store.dispatch(addEmployee(newEmployee));
      });
    });

    it('Should also add that employee to people', () => {
      expect(store.getState().people.people.includes(newEmployee)).toBeTruthy();
    });
  });
});

describe('Given people and employees are set', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    await act(async () => {
      store.dispatch(setEmployees(PEOPLE));
    });
  });

  afterEach(async () => {
    await act(async () => {
      store.dispatch(clearPeople());
      store.dispatch(clearEmployees());
    });
  });

  it('Should also set people', () => {
    expect(store.getState().people.people).toEqual(PEOPLE);
  });

  describe('When an employee is deleted', () => {
    const personToDelete = PEOPLE[1];

    it('Should also delete the same person in person store', async () => {
      await act(async () => {
        store.dispatch(deleteEmployee(PEOPLE.indexOf(personToDelete)));
      });

      expect(store.getState().employees.employees.length).toEqual(
        PEOPLE.length - 1,
      );
      expect(
        store.getState().employees.employees.indexOf(personToDelete),
      ).toEqual(-1);

      expect(store.getState().people.people.length).toEqual(PEOPLE.length - 1);
      expect(store.getState().people.people.indexOf(personToDelete)).toEqual(
        -1,
      );
    });
  });
});
