/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { Credentials } from "./credentials";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Artist from "./pages/Artist";
function App() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState([]);
  const [value, setValue] = useState("");

  const [artistId, setArtistId] = useState("");
  const [artistImg, setArtistImg] = useState("");

  const handleArtistId = (id) => {
    setArtistId(id);
    console.log(artistId);
  };

  const handleArtistImg = (img) => {
    setArtistImg(img);
    console.log(artistImg);
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
            ></Home>
          }
        ></Route>
        <Route
          path='/album/:id'
          element={
            <Details
              token={token}
              artistId={artistId}
              artistImg={artistImg}
              handleArtistId={handleArtistId}
              handleArtistImg={handleArtistImg}
            ></Details>
          }
        ></Route>
        <Route
          path='/artist/:id'
          element={
            <Artist token={token} artistId={artistId} artistImg={artistImg} />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
