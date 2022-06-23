import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContextUse } from "../context/CartContext";
import SideCart from "./SideCart";

const Navbar = () => {
  let { state } = CartContextUse();
  let [opensidecart, setopensidecart] = useState(false);

  return (
    <>
      {opensidecart && <SideCart onclick={() => setopensidecart(false)} />}
      <div className="bg-slate-800 text-white py-5 px-20 flex justify-between items-center ">
        <h2>REACT ECOMMERCE</h2>
        <div className="cart">
          <span className="px-2 bg-red-700 inline-block rounded-full relative left-5">
            {state.cart?.length}
          </span>
          <AiOutlineShoppingCart
            className="text-2xl cursor-pointer"
            onClick={() => setopensidecart(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
