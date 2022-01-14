import React from 'react';
import { Provider } from 'react-redux';
// import store from './redux/store';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'redux/reducers';
import { db } from "../src/auth/FirebaseAuth"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <Router> */}
        <HashRouter>
          <Switch>
            <Route path="/" component={Views} />
          </Switch>
        </HashRouter>
        {/* </Router> */}
      </Provider>
    </div>
  );
}

export default App;
