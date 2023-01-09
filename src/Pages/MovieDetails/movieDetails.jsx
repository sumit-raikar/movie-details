import React, { useEffect, useState, useMemo, useContext } from 'react'
import { useParams } from 'react-router-dom';
import "./movieDetails.scss"
import axios from "../../interceptor"
import { WishlistContext } from '../../root';

const MovieDetails = ({ }) => {
    let { movieId } = useParams();
    const { wishlist, setWishlist } = useContext(WishlistContext);

    const [movieDetails, setMovieDetails] = useState({})
    const [moviePoster, setMoviePoster] = useState();

    useEffect(() => {
        getMovieDetails();
    }, [movieId])

    const getMovieDetails = async () => {
        const response = await axios.get(`movie/${movieId}`);
        setMovieDetails(response.data);
        const posterResponse = await axios.get(`https://image.tmdb.org/t/p/w500${response.data.poster_path}`, { responseType: 'arraybuffer' });
        let blob = new Blob(
            [posterResponse.data],
            { type: posterResponse.headers['content-type'] }
        )
        let image = URL.createObjectURL(blob)
        setMoviePoster(image);
    }

    const movieGenres = useMemo(() => {
        if (movieDetails.genres) {
            return movieDetails.genres.reduce((value, genre, index) => {
                if (index !== 0) {
                    value += ", ";
                }
                value += genre.name;
                return value;
            }, "")
        }
    }, [movieDetails]);

    const movieRuntime = useMemo(() => {
        const runtime = movieDetails.runtime
        if (runtime) {
            const hours = Number.parseInt(runtime / 60);
            const minutes = Number.parseInt(runtime % 60);
            return `${hours}H ${minutes}M`
        }
    }, [movieDetails]);

    const movieIsInWishlist = useMemo(() => {
        let inWishlist = false;
        if (wishlist.length > 0) {
            const movieInWishlist = wishlist.find(movie => movie.id === movieDetails.id);
            if (movieInWishlist) {
                inWishlist = true;
            }
        }
        return inWishlist;
    }, [wishlist, movieDetails]);

    const handleAddToWishlist = () => {
        const movieAlreadyWishlised = wishlist.find(list => list.id === movieDetails.id);
        if (!movieAlreadyWishlised) {
            const currentWishlist = [...wishlist];
            currentWishlist.push(movieDetails);
            setWishlist(currentWishlist);
        }
    }

    return (
        <section className="movie-details">
            <img src={moviePoster} alt="as" />
            <article>
                <dl><h3>{movieDetails.original_title}</h3></dl>
                <dl><span>{movieDetails.release_date}</span><span> . </span><span>{movieRuntime}</span></dl>
                <dl>{movieGenres}</dl>
                <dl>
                    {!movieIsInWishlist && <button className="wishlist-button" onClick={handleAddToWishlist}>Add to wishlist</button>}
                    {movieIsInWishlist && <span className="aleady-wishlist">Movie in Wishlist</span>}
                </dl>
                <dl>{movieDetails.tagline}</dl>
            </article>
            <article className="additional-info">
                <h3>Overview</h3>
                {movieDetails.overview}
            </article>
        </section>
    )
}

export default MovieDetails
