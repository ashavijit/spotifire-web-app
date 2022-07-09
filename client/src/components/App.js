import React, { useState, useEffect } from "react";
import LoginScreen from "./LoginScreen";
import LoggedIn from "./LoggedIn";
import { token } from "../spotify/index";
import GlobalStyle from "../style/GlobalStyle";

function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(token);
  }, [setState]);

  return (
    <div>
      <GlobalStyle />
      {state ? <LoggedIn /> : <LoginScreen />}
    </div>
  );
}

export default App;
