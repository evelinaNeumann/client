import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Uncomment this line to import useParams
import { Image } from "cloudinary-react";
import axios from "axios";
//import { useContext } from "react";
//import { AuthContext } from "../../context/auth.context";

function OwnerDashboard() {
  const { ownerId } = useParams();
  const [formData, setFormData] = useState(null);
 // const [ownerPets, setOwnerPets] = useState([]);
  //const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        console.log("Fetching pet details from the server...");
        const response = await axios.get(`http://petapp.fly.dev/pet/pets/${ownerId}`);
        console.log("Server response:", response.data);
        const petData = response.data; // Use response.data directly to get pet data
        setFormData(petData);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    if (ownerId) {
      fetchPetDetails();
    }
  }, [ownerId]);

  return (
    <div>
      <h1>Your Pet</h1>
      {formData ? (
        formData.map((d) => (
          <>
            <p>Name: {d.name}</p>
            <p>Category: {d.category}</p>
            <p>Type: {d.type}</p>
            <p>Age: {d.age}</p>
            <p>Temper: {d.temper}</p>
            <p>Special Needs: {d.special_needs ? "Yes" : "No"}</p>
            {d.image && (
              <div>
                <h2>Image:</h2>
                <Image
                  style={{ width: 200 }}
                  cloudName="dnstseshn"
                  publicId={d.image}
                />
              </div>
            )}
          </>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default OwnerDashboard;