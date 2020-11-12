import React, { useState } from "react";
import facade from "./apiFacade";
import LogIn, { LoggedIn } from "./LogIn.js";
import Header from "./Header.js";
import Starwars from "./Starwars.js";
import Admin from "./Admin.js";
import User from "./User.js";
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  //const [role, setRole] = useState("");

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
          <Starwars />
        </Route>
        {!loggedIn ? (
          <div>
            <Route exact path="/">
              <LogIn login={login} />
              <p>{error}</p>
              <h3>Hejsa, hvis du ikke er Lukas, så velkommen:</h3>
                  <p>Dette er velkomstsiden til vores startcode.<br/>
                  Log ind som user/testuser eller admin/testadmin.<br/>
                  Som user og admin kan man tilgå begge brugerheadere.<br/>
                  Afhængigt af hvilken rolle man har, får man fremvist en<br/>
                  besked, der fortæller om man er logget ind som bruger eller admin.<br/><br/>
                  Man kan tilgå Starwars-route uanset om man er logget ind.<br/>
                  Komponentet fetcher fra swapi.com, fra fem forskellige endpoints. Et for hver linje.<br/>
                </p>
            </Route>
          </div>
        ) : (
          <div>
            <div>
              <Route exact path="/">
                <LoggedIn />
                <button onClick={logout}>Logout</button>
              </Route>
            </div>
            <div>
              <Route path="/user">
                {facade.getRole() === "user" ? (
                  <User />
                ) : (
                  <p>Du er ikke logget ind som user</p>
                )}
              </Route>
            </div>
            <div>
              <Route path="/admin">
                {facade.getRole() === "admin" ? (
                  <Admin />
                ) : (
                  <p>Du er ikke logget ind som admin</p>
                )}
              </Route>
            </div>
          </div>
        )}
      </Switch>
    </div>
  );
}
export default App;
