import React from "react";
import NavItem from "./NavItem";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Polly" path="/" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <NavLink
              to="/login"
              className="inline-flex items-center px-1 pt-1 text-lg
             font-bold leading-5 text-nitro-gray-800 text-opacity-50
             transition duration-150 ease-in-out border-b-2
             border-transparent hover:text-nitro-gray-800 focus:outline-none
             focus:text-bb-gray-700 cursor-pointer"
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
