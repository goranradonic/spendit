import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import { Store } from "./store/store";
import { Home } from "./pages/home/home";


const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <Store>
                <Home />
              </Store>
            );
          }} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
};
export default App;
