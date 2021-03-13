import React from "react";

const DeleteToon = ({ match }) => {
  const id = match.params.id;

  const onDelete = async () => {
    console.log(`Delete ${id}`);
    const result = await fetch(
      `https://api4all.azurewebsites.net/api/people/${id}`,
      {
        method: "delete",
      }
    );
  };

  return (
    <button className="btn btn-success" onClick={onDelete}>
      Delete
    </button>
  );
};

export default DeleteToon;
