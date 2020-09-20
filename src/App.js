import React from 'react';
import './App.css';
import DataTable from './components/dataTable/dataTable';
import { Provider } from 'react-redux';
import store from './components/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <DataTable />
    </Provider >
  );
}

export default App;
