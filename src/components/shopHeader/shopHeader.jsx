import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

function ShopHeader({ title }) {
  return (
    <div>
      <h1 className="shadow h-20 flex justify-between items-center">
        <div className="flex items-center">{title}</div>
        <div className="flex items-center">
          <FaUserCircle size={50} />
          <Link to="/cart">  <MdOutlineShoppingCart size={50} style={{ marginRight: "16px" }} />
</Link>
        </div>
      </h1>
    </div>
  );
}

export default ShopHeader;