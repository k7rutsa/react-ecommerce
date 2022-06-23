import React from "react";
import { AiOutlineArrowRight, AiOutlineShoppingCart } from "react-icons/ai";
import { CartContextUse } from "../context/CartContext";
import PlusMinus from "./PlusMinus";

const SideCart = ({ onclick }) => {
  let { state, dispatch } = CartContextUse();

  return (
    <div className="absolute w-1/4 right-0 h-screen shadow-md bg-white z-10 overflow-y-scroll">
      <AiOutlineArrowRight
        className="text-2xl m-2 cursor-pointer -ml-"
        onClick={onclick}
      />
      {state.cart.map((cp) => {
        return (
          <div key={Math.random()} className="shadow-md m-4 p-2">
            <div className="flex gap-2 items-center">
              <img src={cp.image} className="h-10" />
              <span className="text-sm">
                {cp.title} - <strong>x{cp.quantity}</strong>
              </span>
              <strong className="text-sm">${cp.price}</strong>
            </div>
            <div className="flex items-center justify-center gap-2">
              <PlusMinus
                quantity={cp.quantity}
                increment={() => dispatch({ type: "INCREMENT", payload: cp })}
                decrement={() => dispatch({ type: "DECREMENT", payload: cp })}
              />
              <button
                className="bg-red-500 block w-full my-2 pb-1 text-white cursor-pointer text-sm"
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: cp })
                }
              >
                Remove From Cart
              </button>
            </div>
          </div>
        );
      })}

      {state.cart.length > 0 ? (
        <span className="bottom-0 m-4 block h-10">
          Subtotal:{" "}
          <strong>
            $
            {state.cart
              .reduce((acc, p) => acc + p.price * p.quantity, 0)
              .toFixed(2)}
          </strong>
        </span>
      ) : (
        <div className="flex flex-col items-center justify-center h-60">
          <AiOutlineShoppingCart className="text-3xl" />
          <span>CART EMPTY </span>
        </div>
      )}
    </div>
  );
};

export default SideCart;
