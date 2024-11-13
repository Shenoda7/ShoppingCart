import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { json } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false); //notice here when it's true everything disppears on refreshing unlike when it's set to true
  const [ListProducts, setListProducts] = useState([]);
  const [cartArr, setCartArr] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  async function fetchListofProducts() {
    try {
      setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/products");
      if (!apiResponse.ok) {
        throw new Error("Error with the response here");
      }

      const result = await apiResponse.json();
      if (result && result.products) {
        setListProducts(result.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListofProducts();
    const savedCartItems = localStorage.getItem("cartItems");

    if (savedCartItems) {
      setCartArr(JSON.parse(savedCartItems));
    }
  }, []);

  function handleAddtoCart(productDetails) {
    const { id, price } = productDetails;
    let currCartItems = [...cartArr];
    const existingItem = currCartItems.find((item) => item.id === id);

    if (!existingItem) {
      currCartItems.push({
        ...productDetails,
        quantity: 1,
        totalPrice: productDetails.price,
      });
    } else {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.quantity * price;
    }
    setCartArr(currCartItems);
    localStorage.setItem("cartItems", JSON.stringify(currCartItems)); //we'll use this key -> (cartItems) to retrieve our data
  }

  function helperFilter(currCartItems, id) {
    return currCartItems.filter((item) => item.id !== id);
  }

  function handleDeleteorDecreaseItem(productDetails, removeFully = false) {
    const { id, price } = productDetails;
    let currCartItems = [...cartArr];

    if (removeFully) {
      currCartItems = helperFilter(currCartItems, id);
    } else {
      const existingItem = currCartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          currCartItems = helperFilter(currCartItems, id);
        } else {
          existingItem.totalPrice = existingItem.quantity * price;
        }
      }
    }
    setCartArr(currCartItems);
    localStorage.setItem("cartItems", JSON.stringify(currCartItems));
  }

  const totalPrice = useMemo(
    () => cartArr.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2),
    [cartArr]
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        ListProducts,
        loading,
        setLoading,
        cartArr,
        setCartArr,
        productDetails,
        setProductDetails,
        handleAddtoCart,
        handleDeleteorDecreaseItem,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
