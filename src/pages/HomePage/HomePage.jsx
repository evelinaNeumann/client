import "./HomePage.css";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PetsPage from "../PetsPage/PetsPage";
import LoginPage from "../LoginPage/LoginPage"

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (user && user.preference) {
      if (user.preference === "Dogs") {
        getDogs();
      } else if (user.preference === "Cats") {
        getCats();
      } else if (user.preference === "Small Pets") {
        getSmallPets();
      } else {
        getAllPets();
      }
    } 
  }, [user]);


  const getDogs = async () => {
    const res = await fetch("http://localhost:5005/api/dogs");
    const finalRes = await res.json();
    setPets(finalRes);
  };
  const getCats = async () => {
    const res = await fetch("http://localhost:5005/api/cats");
    const finalRes = await res.json();
    setPets(finalRes);
  };
  const getSmallPets = async () => {
    const res = await fetch("http://localhost:5005/api/small_pets");
    const finalRes = await res.json();
    setPets(finalRes);
  };
  const getAllPets = async () => {
    const res = await fetch("http://localhost:5005/api/all_pets");
    const finalRes = await res.json();
    setPets(finalRes);
  };

  return (
    <div>
      <h1>Home page</h1>
      <div>
      {isLoggedIn ? (
        pets.length > 0 ? (
          pets.map((pet) => (
            <PetsPage
              key={pet.id}
              name={pet.name}
              category={pet.category}
              type={pet.type}
              age={pet.age}
              temper={pet.temper}
              special_needs={pet.special_needs}
              image={pet.image}
            />
          ))
        ) : (
          <p>No pets available.</p>
        )
      ) : (
        <LoginPage />
      )}
      </div>
    </div>
  );

}

export default HomePage;
