import React from 'react';

const PetDetail = ({ name, breed, age }) => {
  return (
    <div>
      <h1>Pet Details</h1>
      <p>Name: {name}</p>
      <p>Breed: {breed}</p>
      <p>Age: {age} years old</p>
    </div>
  );
};

export default PetDetail;
