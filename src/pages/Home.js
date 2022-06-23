import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import PlusMinus from "../component/PlusMinus";
import { CartContextUse } from "../context/CartContext";

const Home = () => {
  const [products, setproducts] = useState([]);

  let { state, dispatch } = CartContextUse();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setproducts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(state.cart);
  return (
    <div className="py-5 px-20 my-10">
      <div className="flex flex-wrap justify-center gap-10">
        {products?.map((p) => {
          return (
            <div
              key={p.id}
              className="shadow-md p-5 text-center w-60 bg-white flex flex-col justify-between"
            >
              <img src={p.image} className="h-40 inline-block object-contain" />{" "}
              <br />
              {/* {Math.ceil(p.rating.rate)} */}
              <p className="flex justify-center m-2">
                {[...Array(5)].map((_, i) => {
                  return (
                    <span key={i}>
                      {i > p.rating.rate ? <AiOutlineStar /> : <AiFillStar />}
                    </span>
                  );
                })}
              </p>
              <p>{p.title}</p>
              <p className="font-bold mt-2">${p.price}</p>
              {state.cart.some((px) => px.id === p.id) ? (
                <button
                  className="mt-3 py-2 text-white bg-red-500 hover:bg-red-600"
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: p })
                  }
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  onClick={() => dispatch({ type: "ADD_TO_CART", payload: p })}
                  className="mt-3 py-2 text-white bg-sky-500 hover:bg-sky-600"
                >
                  Add To Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
