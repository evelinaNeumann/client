import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

function OwnerHomepage() {
  const [imageSelected, setSelectedImage] = useState("");
  const [publicId, setPublicId] = useState("");
  const [breed, setBreed] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState("");
  // const [postedBy, setPostedBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState(""); // Add state for type
  const [temper, setTemper] = useState(""); // Add state for temper
  const [specialNeeds, setSpecialNeeds] = useState(false); // Initialize as false

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
    // Get the JWT token from wherever you have stored it (e.g., localStorage)
    const authToken = localStorage.getItem("authToken");

    // Check if the token is available
    if (!authToken) {
      console.error("No authentication token found.");
      return;
    }

    const formData = {
      name,
      category: selectedCategory,
      type,
      age,
      temper,
      special_needs: !!specialNeeds, // Convert to boolean
      image: publicId,
      // postedBy,
    };

    // Include the JWT token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .post("http://localhost:5005/pet/petprofile", formData, config)
      .then((response) => {
        const data = response.data;
        console.log(data);
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
        {/* <label>Weight:</label>
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
        <label>Posted By:</label>
        <input
          type="text"
          placeholder="Your Name"
          value={postedBy}
          onChange={(event) => setPostedBy(event.target.value)}
        />
      </div>
      <div> */}
        {/* Other form fields */}
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

export default OwnerHomepage;
