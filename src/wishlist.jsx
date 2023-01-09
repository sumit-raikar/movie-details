import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "./root";
import "./wishlist.scss";

const Wishlist = ({ hoverWishlist }) => {
    const navigate = useNavigate();
    const { wishlist, setWishlist } = useContext(WishlistContext);

    const handleDeleteWishlistMovie = (index) => {
        let currentWishlist = [...wishlist];
        currentWishlist = currentWishlist.filter((movie, mIndex) => mIndex !== index);
        setWishlist(currentWishlist);
    }

    const handleWishlistItem = (movie) => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <section className={hoverWishlist ? "wishlist__show" : "wishlist__hide"}>
            {wishlist.map((movie, index) => {
                return <article className="wishlist-card">
                    <div>
                        <h4 className="title" onClick={() => { handleWishlistItem(movie) }}>{movie.original_title}</h4>
                        <dl className="rating">Rating - {movie.vote_average}</dl>
                    </div>
                    <div className="delete-cross" onClick={() => { handleDeleteWishlistMovie(index) }}>
                        X
                    </div>
                </article>
            })}
            {wishlist.length === 0 && <article className="no-wishlist">Add your favourite movie to wishlist</article>}
        </section>
    )
}

export default Wishlist
