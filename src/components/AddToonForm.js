import React, { useState, useEffect } from "react";

const AddToonForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [votes, setVotes] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [hello, setHello] = useState("");

  const addToon = async (e) => {
    e.preventDefault();
    console.log(gender, pictureUrl);

    const result = await fetch(
      `https://api4all.azurewebsites.net/api/people/`,
      {
        method: "post",
        body: JSON.stringify({
          firstName,
          lastName,
          occupation,
          gender,
          pictureUrl,
          votes,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const body = await result.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api4all.azurewebsites.net/api/pictures/`
      );
      const body = await result.json();
      let picUrl = body.map((toon) => {
        return {
          value: toon.url,
          display: toon.name,
        };
      });
      setPictures(picUrl);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="panel panel-default">
        <form>
          <h3>Add toon character</h3>
          <div className="form-group">
            <label>First Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Occupation:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Occupation"
              value={occupation}
              onChange={(event) => setOccupation(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Picture URL:</label>
            <select
              value={pictureUrl}
              onChange={(event) => setPictureUrl(event.target.value)}
            >
              {pictures.map((pic) => (
                <option key={pic.value} value={pic.value}>
                  {pic.display}
                </option>
              ))}
            </select>
          </div>

          <button onClick={() => addToon()} className="btn btn-success">
            Add
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddToonForm;
