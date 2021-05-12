import React from "react";
import NavItem from "./NavItem";
import { NavLink } from "react-router-dom";
import { getFromLocalStorage } from "helpers/storage";
import { either, isEmpty, isNil } from "ramda";

const NavBar = () => {
  const userName = getFromLocalStorage("currentUser");
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Polly" path="/" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <p
              className={
                userName ? "inline-block font-semibold text-xl mx-3" : "hidden"
              }
            >
              {userName}
            </p>
            <NavLink
              to="/login"
              className={
                isLoggedIn
                  ? "hidden"
                  : "inline-flex items-center px-1 pt-1 text-lg font-bold leading-5 transition duration-150 ease-in-out border-b-2 border-transparent cursor-pointer"
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
