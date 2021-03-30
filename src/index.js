import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./ducks/reducers";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Footer from './UI/Components/Navigation/Footer'

const firebaseConfig = {
    apiKey: "AIzaSyCgH9UUfywPqApnt4vV7BYRLHC8-hKosfA",
    authDomain: "aca-capstone-app.firebaseapp.com",
    projectId: "aca-capstone-app",
    storageBucket: "aca-capstone-app.appspot.com",
    messagingSenderId: "591433856762",
    appId: "1:591433856762:web:55d834c687bd24c7a0fb43",
    measurementId: "G-318KV38LKF"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
          <Footer />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);