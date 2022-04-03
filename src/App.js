import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchRoutines, userInfo } from "./api";
import {
  Navbar,
  Home,
  Routines,
  MyRoutines,
  Activities,
  Login,
  Register,
  Add,
  Update,
} from "./Components";

function App() {
  const [token, setToken] = useState("");
  const [userdata, setUserdata] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [singleRoutine, setSingleRoutine] = useState({});

  useEffect(() => {
    fetchUser();
    fetchRoutines().then((routines) => {
      setRoutines(routines);
    });
  }, [token]);

  const fetchUser = async () => {
    const IsToken = localStorage.getItem("token");
    if (IsToken) {
      setToken(IsToken);
      const infoU = await userInfo(IsToken);
      const id = infoU._id;
      setUserdata(infoU);
    }
  };

  return (
    <div className="App">
      <Navbar
        userdata={userdata}
        setToken={setToken}
        setUserdata={setUserdata}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home setUserdata={setUserdata} userdata={userdata} />}
        />
        <Route
          exact
          path="/routines"
          element={
            <Routines
              setSingleRoutine={setSingleRoutine}
              routines={routines}
              setRoutines={setRoutines}
              setUserdata={setUserdata}
              userdata={userdata}
              token={token}
              setToken={setToken}
            />
          }
        />

        <Route path="/add" element={<Add setRoutines={setRoutines} />} />

        <Route
          path="/update/:id"
          element={
            <Update
              singleRoutine={singleRoutine}
              setRoutines={setRoutines}
              userdata={userdata}
              setUserdata={setUserdata}
              token={token}
              setToken={setToken}
            />
          }
        />

        <Route
          exact
          path="/myroutines"
          element={
            <MyRoutines
              routines={routines}
              setRoutines={setRoutines}
              setUserdata={setUserdata}
              userdata={userdata}
              token={token}
              setToken={setToken}
            />
          }
        />

        <Route
          exact
          path="/activities"
          element={
            <Activities
              routines={routines}
              setRoutines={setRoutines}
              setUserdata={setUserdata}
              userdata={userdata}
              token={token}
              setToken={setToken}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              setToken={setToken}
              setUserdata={setUserdata}
              action="register"
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              setUserdata={setUserdata}
              action="login"
            />
          }
        />
      </Routes>
    </div>
  );
}
export default App;
