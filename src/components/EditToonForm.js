import React, { useState, useEffect } from "react";
import axios from "axios";

const EditToonForm = ({ toonInfo, match }) => {
  const [firstName, setFirstName] = useState(toonInfo.firstName);
  const [lastName, setLastName] = useState(toonInfo.lastName);
  const [occupation, setOccupation] = useState(toonInfo.occupation);
  const [gender, setGender] = useState(toonInfo.gender);
  const [pictureUrl, setPictureUrl] = useState(toonInfo.pictureUrl);
  const [pictures, setPictures] = useState([]);

  const id = match.params.id;

  const editToon = async (event) => {
    event.preventDefault();
    const body = JSON.stringify({
      id,
      lastName,
      firstName,
      occupation,
      gender,
      pictureUrl,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `https://api4all.azurewebsites.net/api/people/${id}`,
      body,
      config
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api4all.azurewebsites.net/api/people/${id}`
      );
      const body = await result.json();
      console.log(body);
    };
    fetchData();

    const fetchDatas = async () => {
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
    fetchDatas();
  }, [id]);

  return (
    <div className="panel panel-default">
      <form>
        <h3>Edit toon character</h3>
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

        <button
          onClick={(event) => editToon(event)}
          className="btn btn-success"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditToonForm;
