// src/components/PetList.jsx
import React from 'react';

const PetList = (props) => {
  console.log("Received petList:", props.petList); // Debug log

  const pets = props.petList.map((pet) => (
    <li key={pet._id} onClick={() => props.handleEditPet(pet)}>
      {pet.name}
    </li>
  ));

  return (
    <div>
      <h1>Pet List</h1>
      {!props.petList.length ? <h2>No Pets Yet!</h2> : <ul>{pets}</ul>}
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Pet'}
      </button>
    </div>
  );
};

export default PetList;
