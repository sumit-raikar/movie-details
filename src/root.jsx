import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/header";
import "./root.scss";

export const WishlistContext = React.createContext([]);

export default function Root() {
  const [wishlist, setWishlist] = useState([]);
  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </WishlistContext.Provider>
  );
}
