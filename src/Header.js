import React from "react";
import { NavLink, Route, useParams, useRouteMatch } from "react-router-dom";

function Header(props) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/user">
            User
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin">
            Admin
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/starwars">
            Starwars
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
