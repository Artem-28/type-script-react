import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import './App.css';
import './styles/formStyle.css'
import Navbar from './conponents/Menu/Navbar/Navbar';
import Routes from './Routes/Routes';
import firebase from 'firebase/app'
import { firebaseConfig } from './fbConfig';
import { store } from './store/redusers/rootReduser';


firebase.initializeApp(firebaseConfig);


const App: React.FC = () => {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
