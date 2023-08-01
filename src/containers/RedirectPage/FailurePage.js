import React from "react";

export default ({ title }) => {
  return (
    <div className="text-danger">
      <h1 className="display-4">{title.toUpperCase()}</h1>
      <p>Your transaction failed, please try again or contact site support.</p>
    </div>
  );
};
