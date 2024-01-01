import React from "react";
import UserContextProvider from "./context/UserContextProvider.jsx";
import Routes from "./routes/routes.jsx";
const App = () => {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
};

export default App;
