import React from "react";
import { Link } from "react-router-dom";
import { logger } from "common/logger";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";
import { either, isEmpty, isNil } from "ramda";
import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";

const NavBar = () => {
  const userName = getFromLocalStorage("currentUser");
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <nav className="bg-white border-b">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="font-sans text-3xl font-semibold">
            <Link className="cursor-pointer" to="/">
              Polly
            </Link>
          </h1>
          <div className="flex items-center justify-end gap-x-4">
            {isLoggedIn ? (
              <>
                <span
                  className="inline-flex items-center px-2 pt-1 text-xl font-regular leading-5 text-bb-gray-600
                  text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
                  focus:text-bb-gray-700"
                >
                  {userName}
                </span>
                <a
                  onClick={handleLogout}
                  className="inline-flex items-center px-1 pt-1 text-xl
                  font-semibold leading-5 text-bb-gray-600 text-opacity-50
                  transition duration-150 ease-in-out border-b-2
                  border-transparent hover:text-bb-gray-600 focus:outline-none
                  focus:text-bb-gray-700 cursor-pointer"
                >
                  Logout
                </a>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-1 pt-1 text-xl
                font-semibold leading-5 text-bb-gray-600 text-opacity-50
                transition duration-150 ease-in-out border-b-2
                border-transparent hover:text-bb-gray-600 focus:outline-none
                focus:text-bb-gray-700 cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
