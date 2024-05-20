/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { Credentials } from "./credentials";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState([]);
  const [value, setValue] = useState("");
  const [trackId, setTrackId] = useState("ciao");

  const handleTrackId = (id) => {
    setTrackId(id);
    console.log(trackId);
  };

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(Credentials.ClientId + ":" + Credentials.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              token={token}
              value={value}
              setValue={setValue}
              result={result}
              setResult={setResult}
              handleTrackId={handleTrackId}
            ></Home>
          }
        ></Route>
        <Route
          path='/album/:id'
          element={<Details token={token} trackId={trackId}></Details>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
