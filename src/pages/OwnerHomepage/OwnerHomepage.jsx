import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

function PetForm({ onSubmit, onDelete }) {
  const [imageSelected, setSelectedImage] = useState("");
  const [publicId, setPublicId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState("");
  const [temper, setTemper] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState(false);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "jgklgkwm");

    axios
      .post("https://api.cloudinary.com/v1_1/dnstseshn/image/upload", formData)
      .then((response) => {
        console.log(response);
        setPublicId(response.data.public_id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    onSubmit({
      name,
      selectedCategory,
      type,
      age,
      temper,
      special_needs: specialNeeds,
      image: publicId,
    });

    // Reset the form fields
    setSelectedImage("");
    setPublicId("");
    setName("");
    setSelectedCategory("");
    setType("");
    setAge(0);
    setTemper("");
    setSpecialNeeds(false);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
      {publicId && (
        <Image
          style={{ width: 200 }}
          cloudName="dnstseshn"
          publicId={publicId}
        />
      )}

      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">Select category</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="small_animal">Small Animal</option>
        </select>
      </div>
      <div>
        <label>Type:</label>
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(event) => setAge(parseInt(event.target.value))}
        />
      </div>
      <div>
        <label>Temper:</label>
        <input
          type="text"
          placeholder="Temper"
          value={temper}
          onChange={(event) => setTemper(event.target.value)}
        />
      </div>
      <div>
        <label>Special Needs:</label>
        <input
          type="checkbox"
          checked={specialNeeds}
          onChange={(event) => setSpecialNeeds(event.target.checked)}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

function OwnerHomepage() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  const handleSubmitAll = () => {
    // Get the JWT token from wherever you have stored it (e.g., localStorage)
    const authToken = localStorage.getItem("authToken");

    // Check if the token is available
    if (!authToken) {
      console.error("No authentication token found.");
      return;
    }

    // Include the JWT token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    // Loop through each pet in the pets array and make a separate API call for each
    pets.forEach((pet, index) => {
      axios
        .post("http://localhost:5005/pet/petprofile", pet, config)
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (index === pets.length - 1) {
            // This is the last pet, so navigate to the dashboard
            navigate("/ownerdashboard");
          }
        })
        .catch((error) => {
          console.error(error);
          // Add any additional logic for error handling
        });
    });
  };

  const handleDeletePet = (id) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
  };

  return (
    <div>
      {/* Show the 'Add' button only when the form is not visible */}
      {pets.length === 0 && (
        <button
          onClick={() =>
            setPets((prevPets) => [...prevPets, { id: Date.now() }])
          }
        >
          Add
        </button>
      )}

      {/* Show the form when 'Add' is clicked */}
      {pets.map((pet, index) => (
        <div key={pet.id}>
          <h2>Pet {index + 1}</h2>
          <PetForm
            onSubmit={(formData) => {
              setPets((prevPets) => [...prevPets, formData]);
            }}
            onDelete={() => handleDeletePet(pet.id)}
          />
        </div>
      ))}

      <button onClick={handleSubmitAll}>Submit All</button>
    </div>
  );
}

export default OwnerHomepage;
