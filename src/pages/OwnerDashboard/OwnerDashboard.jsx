import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Uncomment this line to import useParams
import { Image } from "cloudinary-react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function OwnerDashboard() {
  const { ownerId } = useParams();
  const [formData, setFormData] = useState(null);
  const [ownerPets, setOwnerPets] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        console.log("Fetching pet details from the server...");
        const response = await axios.get(
          `http://localhost:5005/pet/pets/${ownerId}`
        );
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

  // useEffect(() => {
  //   const fetchPetDetails = async () => {
  //     try {
  //       console.log("Fetching pet details from the server...");
  //       const response = await axios.get(
  //         `http://localhost:5005/pet/pets/${ownerId}` // Use the correct URL with ownerId
  //       );
  //       console.log("Server response:", response.data);
  //       const petData = response.data; // Use response.data directly to get pet data
  //       setFormData(petData);
  //       console.log(petData);
  //     } catch (error) {
  //       console.error("Error fetching pet details:", error);
  //     }
  //   };

  //   if (ownerId) {
  //     fetchPetDetails();
  //   }
  // }, [ownerId]);

  // useEffect(() => {
  //   const fetchOwnerPets = async () => {
  //     try {
  //       const res = await fetch(`https://petapp.fly.dev/api/pets/${user._id}`);
  //       const data = await res.json();
  //       setOwnerPets(data);
  //       console.log(ownerPets);
  //     } catch (error) {
  //       console.error("Error fetching owner pets:", error);
  //     }
  //   };
  //   fetchOwnerPets();
  // }, [ownerId]);

  // const { productId } = useParams();      useEffect(() => {
  //   const fetchProductDetails = async () => {
  //     try {
  //       //const res = await fetch(http://localhost:5005/api/shop_products/${productId});
  //       const res = await fetch(https://petapp.fly.dev/api/shop_products/${productId});
  //       const data = await res.json();
  //       setProduct(data);
  //     } catch (error) {
  //       console.error("Error fetching product details:", error);
  //     }
  //   };

  //   fetchProductDetails();
  // }, [productId]);

  // import React, { useEffect, useState } from "react";
  // // import { useParams } from "react-router-dom";
  // import { Image } from "cloudinary-react";
  // import axios from "axios";

  // function OwnerDashboard() {
  //   // const { petId } = useParams();
  //   // console.log("petId:", petId);
  //   const [formData, setFormData] = useState(null);

  //   useEffect(() => {
  //     // console.log("fetching pet details for petID:", petId);
  //     const fetchPetDetails = async () => {
  //       try {
  //         console.log("Fetching pet details from the server...");
  //         const response = await axios.get(
  //           `http://localhost:5005/pet/pets/:ownerId`
  //         );
  //         console.log("Server response:", response.data);
  //         const petData = response.data.pet;
  //         setFormData(petData);
  //       } catch (error) {
  //         console.error("Error fetching pet details:", error);
  //       }
  //     };

  //     if (ownerId) {
  //       fetchPetDetails();
  //     }
  //   }, [ownerId]);

  // useEffect(() => {
  //   if (petId) {
  //     // Fetch the pet data using the pet ID from the updated route
  //     axios
  //       .get(`http://localhost:5005/pet/petprofile/${petId}`)
  //       .then((response) => {
  //         const petData = response.data.pet;
  //         setFormData(petData);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [petId]);

  return (
    <div>
      <h1>Your Pet</h1>
      {formData ? (
        <>
          <p>Name: {formData.name}</p>
          <p>Category: {formData.category}</p>
          <p>Type: {formData.type}</p>
          <p>Age: {formData.age}</p>
          <p>Temper: {formData.temper}</p>
          <p>Special Needs: {formData.special_needs ? "Yes" : "No"}</p>
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default OwnerDashboard;
