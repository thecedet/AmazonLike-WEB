import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import Routers from "./router"
import { setAuthToken } from "./helpers/Auth"

function App() {
  const token = localStorage.getItem("token");
  if(token) {
    setAuthToken(token)
  }

  return (
    <div className='App'>
      <Routers />
    </div>
  );
}

export default App;
