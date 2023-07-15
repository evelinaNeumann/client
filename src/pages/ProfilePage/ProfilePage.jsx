import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { Image } from "cloudinary-react";

function ProfilePage() {
  const [imageSelected, setSelectedImage] = useState("");
  const [publicId, setPublicId] = useState(""); // Add state to store the publicId
  const [breed, setBreed] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "jgklgkwm");

    axios
      .post("https://api.cloudinary.com/v1_1/dnstseshn/image/upload", formData)
      .then((response) => {
        console.log(response);
        setPublicId(response.data.public_id); // Store the publicId from the response
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    const formData = {
      breed,
      name,
      age,
      weight,
      description,
    };

    axios
      .post("/api/submitProfile", formData) // Replace "/api/submitProfile" with the appropriate backend endpoint
      .then((response) => {
        console.log(response);
        // Add any additional logic for success
      })
      .catch((error) => {
        console.error(error);
        // Add any additional logic for error handling
      });
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
          publicId={publicId} // Use the stored publicId in the Image component
        />
      )}
      <div>
        <label>Breed:</label>
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(event) => setBreed(event.target.value)}
        />
      </div>
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
        <label>Age:</label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(event) => setAge(parseInt(event.target.value))}
        />
      </div>
      <div>
        <label>Weight:</label>
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(event) => setWeight(parseFloat(event.target.value))}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div>
        {/* Other form fields */}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default ProfilePage;
