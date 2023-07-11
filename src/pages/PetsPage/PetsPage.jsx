import "./PetsPage.css"
import { Link } from "react-router-dom";

const PetsPage = ( {key, category, name, type, age, temper, special_needs, image} ) => {
  return (
    <div>
        <img src={image} alt="Pet picture"/>
        <p><span>Name:</span> {name}</p>
        <div>
            {category === "small_pet" ? 
            <p><span>Category:</span> Small Pet</p> 
            :
            <p><span>Category:</span> {category}</p>
            }
        </div>
        <p><span>Type: </span>{type}</p>
        <p><span>Age: </span>{age}</p>
        <p><span>Temper: </span>{temper}</p>
        <p>Does this animal has any special needs? {special_needs ? <span>Yes</span> : <span>No</span>}</p>
        <Link to="/liveChat">
            <button>Contact the owner</button>
        </Link>

    </div>
  )
}

export default PetsPage