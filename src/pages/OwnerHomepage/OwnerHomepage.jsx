import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

function PetForm({ onSubmit }) {
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
    // Add validation to check if age is a valid number
    if (!Number.isInteger(age) || age < 0) {
      console.error("Invalid age. Please enter a valid positive number.");
      return;
    }
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

  const handleChangeAge = (event) => {
    const value = event.target.value;
    if (value === "" || isNaN(value)) {
      setAge(0);
    } else {
      setAge(parseInt(value));
    }
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
          onChange={handleChangeAge}
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
    </div>
  );
}

function OwnerHomepage() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
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

    // Make the API call to add the new pet
    axios
      .post("http://localhost:5005/pet/petprofile", formData, config)
      .then((response) => {
        const data = response.data;
        console.log(data);
        // After successful addition, navigate to the dashboard
        navigate("/ownerdashboard/:ownerId");
      })
      .catch((error) => {
        console.error(error);
        // Add any additional logic for error handling
      });
  };

  return (
    <div>
      <h1>Add a Pet</h1>
      <PetForm onSubmit={handleSubmit} />
    </div>
  );
}

export default OwnerHomepage;
