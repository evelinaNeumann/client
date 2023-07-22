import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PetsPage from "../PetsPage/PetsPage";
import LandingPage from "../LandingPage/LandingPage"
import AliceCarousel from "react-alice-carousel";
import { Image } from "cloudinary-react";
import axios from "axios";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./HomePage.css";

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [publicId, setPublicId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.preference) {
        let apiUrl = "";
  
        if (user.preference === "Dogs") {
          apiUrl = "http://localhost:5005/pet/dogs";
        } else if (user.preference === "Cats") {
          apiUrl = "http://localhost:5005/pet/cats";
        } else if (user.preference === "Small Pets") {
          apiUrl = "http://localhost:5005/pet/small_animals";
        } else {
          apiUrl = "http://localhost:5005/pet/pets";
        }
  
        const res = await fetch(apiUrl);
        const finalRes = await res.json();
        setPets(finalRes);
  
        // Get the public ID of the first pet in the fetched data
        if (finalRes.length > 0) {
          setPublicId(finalRes[0].image);
        }
      }
    };
  
    fetchData();
  }, [user]);
  

  const getDogs = async () => {
    const res = await fetch("http://localhost:5005/pet/dogs");
    const finalRes = await res.json();
    setPets(finalRes);
  };
  const getCats = async () => {
    const res = await fetch("http://localhost:5005/pet/cats");
    const finalRes = await res.json();
    setPets(finalRes);
  };
  const getSmallPets = async () => {
    const res = await fetch("http://localhost:5005/pet/small_animals");
    const finalRes = await res.json();
    setPets(finalRes);
  };
  const getAllPets = async () => {
    const res = await fetch("http://localhost:5005/pet/pets");
    const finalRes = await res.json();
    setPets(finalRes);
  };

  const mapPetsToSlides = () => {
    return pets.map((pet) => (
      <div key={pet.id} className="carousel-slide">
        <div className="pet-card">
          <div className="pet-image">
            <Image
              cloudName="dnstseshn"
              publicId={pet.image} // Use the correct property here
            />
            {/* <img src={pet.image} alt={pet.name} /> */}
          </div>
        </div>
        <div className="pet-details">
          <div className="pet-info">
            <h2>{pet.name}</h2>
            <p>{pet.category}</p>
            <p>Type: {pet.type}</p>
            <p>Age: {pet.age}</p>
            <p>Temper: {pet.temper}</p>
            <p>Special Needs: {pet.special_needs}</p>
          </div>
        </div>
      </div>
    ));
  };
  
  
  


  return (
    <div>
      <div className="carousel-container">
        {isLoggedIn ? (
          pets.length > 0 ? (
            <AliceCarousel
              mouseTracking
              items={mapPetsToSlides()}
              disableDotsControls
              buttonsDisabled={false} // Disable the default buttons
              renderPrevButton={({ isDisabled }) => (
                <button
                  className="carousel-button prev"
                  disabled={isDisabled}
                >
                  Prev
                </button>
              )}
              renderNextButton={({ isDisabled }) => (
                <button
                  className="carousel-button next"
                  disabled={isDisabled}
                >
                  Next
                </button>
              )}
            />
          ) : (
            <p>No pets available.</p>
          )
        ) : (
          <LandingPage />
        )}
      </div>
    </div>
  );
}

export default HomePage;
