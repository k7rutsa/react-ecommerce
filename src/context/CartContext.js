const {
  createContext,
  Children,
  useContext,
  useReducer,
  useEffect,
} = require("react");

let CartContext = createContext();

let cartreducer = (state, action) => {
  let checkitem = state.cart.find((p) => p.id === action.payload.id);
  switch (action.type) {
    case "ADD_TO_CART":
      if (checkitem) {
        return {
          cart: state.cart.map((p) =>
            p.id === action.payload.id
              ? { ...checkitem, quantity: checkitem.quantity + 1 }
              : p
          ),
        };
      } else {
        localStorage.setItem(
          "CART",
          JSON.stringify([...state.cart, { ...action.payload, quantity: 1 }])
        );
        return { cart: [...state.cart, { ...action.payload, quantity: 1 }] };
      }

    case "REMOVE_FROM_CART":
      localStorage.setItem(
        "CART",
        JSON.stringify(
          state.cart.filter((c) => {
            return c.id !== action.payload.id;
          })
        )
      );

      return {
        cart: state.cart.filter((c) => {
          return c.id !== action.payload.id;
        }),
      };

    case "INCREMENT":
      if (checkitem) {
        localStorage.setItem(
          "CART",
          JSON.stringify(
            state.cart.map((p) =>
              p.id === action.payload.id
                ? { ...checkitem, quantity: checkitem.quantity + 1 }
                : p
            )
          )
        );

        return {
          cart: state.cart.map((p) =>
            p.id === action.payload.id
              ? { ...checkitem, quantity: checkitem.quantity + 1 }
              : p
          ),
        };
      }

    case "DECREMENT":
      if (checkitem) {
        localStorage.setItem(
          "CART",
          JSON.stringify(
            state.cart.map((p) =>
              p.id === action.payload.id
                ? {
                    ...checkitem,
                    quantity:
                      checkitem.quantity > 1 ? checkitem.quantity - 1 : 1,
                  }
                : p
            )
          )
        );

        return {
          cart: state.cart.map((p) =>
            p.id === action.payload.id
              ? {
                  ...checkitem,
                  quantity: checkitem.quantity > 1 ? checkitem.quantity - 1 : 1,
                }
              : p
          ),
        };
      }

    default:
      return state;
  }
};

export let CartContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(cartreducer, {
    cart: JSON.parse(localStorage.getItem("CART")) || [],
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export let CartContextUse = () => {
  return useContext(CartContext);
};
