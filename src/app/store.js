import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import peopleReducer from '../features/people/peopleSlice';
import employeesReducer, {
  addEmployee,
  deleteEmployee,
  setEmployees,
} from '../features/employees/employeesSlice';
import { setPeople } from '../features/people/peopleSlice';
import { addPerson } from '../features/people/peopleSlice';
import { deletePerson } from '../features/people/peopleSlice';

const mirrorPairs = [
  [setEmployees, setPeople],
  [addEmployee, addPerson],
  [deleteEmployee, deletePerson],
];

export const MirrorMap = new Map(
  mirrorPairs.reduce((result, currentPair) => {
    const newMapConf = [...result];
    newMapConf.push([
      currentPair[0],
      { redirectAction: currentPair[1], stopPropagation: false },
    ]);

    newMapConf.push([
      currentPair[1],
      { redirectAction: currentPair[0], stopPropagation: false },
    ]);

    return newMapConf;
  }, []),
);

export const Listeners = Array.from(MirrorMap.keys()).map((key) => ({
  actionCreator: key,
  effect: (action, { dispatch }) => {
    const { stopPropagation, redirectAction } = MirrorMap.get(key);

    if (!stopPropagation) {
      MirrorMap.set(redirectAction, {
        redirectAction: key,
        stopPropagation: true,
      });

      MirrorMap.set(key, {
        redirectAction: redirectAction,
        stopPropagation: true,
      });
      dispatch(redirectAction(action.payload));
    } else {
      MirrorMap.set(redirectAction, {
        redirectAction: key,
        stopPropagation: false,
      });

      MirrorMap.set(key, {
        redirectAction: redirectAction,
        stopPropagation: false,
      });
    }
  },
}));

const listenerMiddleware = createListenerMiddleware();

Listeners.forEach((item) => {
  listenerMiddleware.startListening(item);
});

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    employees: employeesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});
