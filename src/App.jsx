// src/App.jsx
import { useState, useEffect } from "react";
import * as petService from './services/petService';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import PetForm from './components/PetForm';
import './App.css';

const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();
        console.log("Fetched pets:", pets); // Debug log

        if (pets.error) {
          throw new Error(pets.error);
        }

        setPetList(pets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  const updateSelected = (pet) => {
    setSelected(pet);
    setIsFormOpen(true); // Open the form when a pet is selected
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
    if (isFormOpen) setSelected(null); // Clear selected pet when closing the form
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);

      if (newPet.error) {
        throw new Error(newPet.error);
      }

      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPet = (pet) => {
    setSelected(pet);
    setIsFormOpen(true);
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);

      if (updatedPet.error) {
        throw new Error(updatedPet.error);
      }

      const updatedPetList = petList.map((pet) => (pet._id === petId ? updatedPet : pet));
      setPetList(updatedPetList);
      setIsFormOpen(false);
      setSelected(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PetList 
        petList={petList} 
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        handleEditPet={handleEditPet}
        isFormOpen={isFormOpen}
      />
      {isFormOpen && (
        <PetForm 
          handleAddPet={handleAddPet} 
          handleUpdatePet={handleUpdatePet} 
          selected={selected} 
        />
      )}
      {!isFormOpen && selected && <PetDetail {...selected} />}
    </>
  );
};

export default App;
