import React, { useEffect, useState } from 'react'
import Carousel from '../../Components/Carousel/carousel';
import axios from "../../interceptor"
import "./dashboard.scss";

const Dashboard = () => {
    const [category, setCategory] = useState([
        { title: "Popular", apiKey: "popular" },
        { title: "Top Rated", apiKey: "top_rated" },
        { title: "Now Playing", apiKey: "now_playing" }
    ]);

    useEffect(() => {
        getMoviesByCategory();
    }, [])

    const getMoviesByCategory = () => {
        let moviesByCategory = [...category];
        let moviesByCategoryApiLists = category.map(cat => axios.get(`movie/${cat.apiKey}`))
        Promise.all(moviesByCategoryApiLists)
            .then(values => {
                console.log(values);
                values.forEach((val, index) => {
                    const categoryDetails = moviesByCategory[index];
                    categoryDetails.movies = val.data.results.slice(0, 5 + index + index + 1);
                })
                console.log(moviesByCategory);
                setCategory(moviesByCategory);
            })
            .catch(err => console.log(err))
    }

    return (
        <section>
            <ul className="dashboard-ul__container">
                {category.map(cat => {
                    return <li className="dashboard-li__container">
                        <dl className="title">{cat.title} Movies</dl>
                        <Carousel slides={cat.movies} title={cat.title} />
                    </li>
                })}
            </ul>
        </section>
    )
}

export default Dashboard
