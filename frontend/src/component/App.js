// React
import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
// Import
import { GET_PROFILE } from "../apollo/query/user";

function DisplayLocations() {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  console.log("accessToken", accessToken)
  const { loading, error, data } = useQuery(GET_PROFILE, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>My first Apollo app 🚀</h2>
        <DisplayLocations />
      </header>
    </div>
  );
}

export default App;
