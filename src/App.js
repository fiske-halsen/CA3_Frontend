import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import LogIn, { LoggedIn } from "./LogIn.js";
import Header from "./Header.js";
import Starwars from "./Starwars.js";
import Admin from "./Admin.js";
import User from "./User.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true), setError(""))
      .catch((err) => {
        setError("Wrong username or password");
      });
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/starwars">
          <Starwars/>
        </Route>
        {!loggedIn ? (
          <div>
            <Route exact path="/">
              <LogIn login={login} />
              <p>{error}</p>
            </Route>
          </div>
        ) : (
          <div>
            <Route exact path="/">
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </Route>

            <Route path="/user">
              <User />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </div>
        )}
      </Switch>
    </div>
  );
}
export default App;
