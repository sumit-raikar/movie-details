import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { WishlistContext } from '../../root';
import Wishlist from '../../wishlist';
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { wishlist } = useContext(WishlistContext);
  const [hoverWishlist, setHoverWishlist] = useState(false);

  const handleWishlistHoverIn = () => {
    setHoverWishlist(true)
  }

  const handleWishlistHoverOut = () => {
    setHoverWishlist(false)
  }

  const handleLogoClick = () => {
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="site-identity">
        <h1>
          <button onClick={handleLogoClick}>Movie Details</button>
        </h1>
      </div>
      <nav className="site-navigation">
        <ul className="nav">
          <li onMouseOver={handleWishlistHoverIn} onMouseOut={handleWishlistHoverOut} className="site-wishlist">
            <button>Wishlist{wishlist.length > 0 && <span className="site-wishllist__box">{wishlist.length}</span>}</button>
            <Wishlist hoverWishlist={hoverWishlist} />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
