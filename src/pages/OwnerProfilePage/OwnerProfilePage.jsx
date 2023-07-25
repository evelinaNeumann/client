// OwnerProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OwnerProfilePage() {
  const { ownerId } = useParams();
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const res = await fetch(`http://localhost:5005/api/owner/${ownerId}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };
    fetchOwnerData();
  }, [ownerId]);

  if (!owner) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Owner Profile</h1>
      <p>Name: {owner.ownerName}</p>
      <p>Email: {owner.ownerEmail}</p>
      <p>Phone: {owner.ownerPhone}</p>
      {/* Add other owner details you want to display */}
    </div>
  );
}

export default OwnerProfilePage;

