const setToLocalStorage = ({ authToken, email, userId, userName }) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
  localStorage.setItem("currentUser", userName);
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export { setToLocalStorage, getFromLocalStorage };
