import React from "react";
import { useLocation } from "react-router-dom";
import { Image } from "cloudinary-react";

function OwnerDashboard() {
  const location = useLocation();
  const formData = location.state;
  console.log(location); // Access the form data from location state

  const handleEditClick = () => {
    // Assuming you have a route for the edit form with the path "/editpet/:id"
    // Replace 'formData.id' with the actual pet ID you want to edit
    window.location.href = `/editpet/${formData._id}`;
    console.log(formData);
  };

  return (
    <div>
      <h1>Your Pet</h1>
      <p>Name: {formData.name}</p>
      <p>Category: {formData.category}</p>
      <p>Type: {formData.type}</p>
      <p>Age: {formData.age}</p>
      <p>Temper: {formData.temper}</p>
      <p>Special Needs: {formData.specialNeeds}</p>
      {formData.image && (
        <div>
          <h2>Image:</h2>
          <Image
            style={{ width: 200 }}
            cloudName="dnstseshn"
            publicId={formData.image}
          />
        </div>
      )}
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
}

export default OwnerDashboard;
