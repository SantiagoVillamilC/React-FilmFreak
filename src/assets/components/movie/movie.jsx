import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Styles from './movie.module.css';

const cargarInformacionPelicula = async (movieId, setMovieData, setError) => {
    const apiKey = 'cace972f4626db6a5ee3ae755a24b03d';

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`);
        const data = await respuesta.json();
        setMovieData(data);
    } catch (error) {
        setError(error.message);
    }
};

const cambiarColorTitulos = () => {
    const tituloFrasePelicula = document.getElementById('tituloFrasePelicula');
    tituloFrasePelicula.classList.toggle('cambio-color');
};

export const Movie = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarInformacionPelicula(id, setMovieData, setError);

        const interval = setInterval(cambiarColorTitulos, 7000);

        return () => clearInterval(interval);
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movieData) {
        return <div>Cargando...</div>;
    }

    const {
        backdrop_path,
        title,
        tagline,
        poster_path,
        genres,
        overview,
        original_title,
        original_language,
        status,
        vote_average,
        vote_count,
        runtime,
        budget,
        release_date
    } = movieData;

    const formattedBudget = budget.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const durationString = `${Math.floor(runtime / 60)}h ${runtime % 60}min`;

    const getColorForVoteAverage = (vote) => {
        if (vote >= 7) return '#00E676';
        if (vote >= 5) return '#FFEB3B';
        return '#FF5252';
    };

    const getEmoji = (vote) => {
        if (vote >= 7) return 'bi bi-emoji-smile';
        if (vote >= 5) return 'bi bi-emoji-neutral';
        return 'bi bi-emoji-frown';
    };

    const color = getColorForVoteAverage(vote_average);
    const formattedVoteAverage = Number(vote_average.toFixed(1));

    return (
        <>
            <header id="header" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})` }}>
                <div className={Styles.headerContainer} id="tituloFrasePelicula">
                    <div className={Styles.containerTituloPelicula}>
                        <h2 className={Styles.tituloPelicula} id="tituloPelicula">{title}</h2>
                        <h3 className={Styles.frasePelicula} id="frasePelicula">{tagline}</h3>
                    </div>
                    <div className={Styles.container_go_bottom}>
                        <p>Desliza hacia abajo</p>
                        <i className="bi bi-arrow-down"></i>
                    </div>
                </div>
            </header>
            <main>
                <section className={Styles.container_movie_info}>
                    <div id="posterPeli" className={Styles.posterPeli}>
                        <img className={Styles.poster} src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="movie poster" />
                    </div>
                    <div className={Styles.container_movie_info}>
                        <div className={Styles.divisor_movie_info}>
                            <div id="movieInfo" className={Styles.movieInfo}>
                                <div className={Styles.container_titles}>
                                    <h2>{title}</h2>
                                    <h3>{tagline}</h3>
                                </div>
                                <div className={Styles.container_plot}>
                                    <p><strong>Sinopsis:</strong></p>
                                    <p>{overview}</p>
                                </div>
                                <div className={Styles.genres_container}>
                                    <p><strong>Géneros:</strong></p>
                                    {genres.map((genre) => (
                                        <div className="genre" key={genre.id}><strong>{genre.name}</strong></div>
                                    ))}
                                </div>
                                <div className={Styles.original_language_container}>
                                    <p><strong>Titulo Original:</strong> {original_title}</p>
                                    <p><strong>Idioma Original:</strong> {original_language}</p>
                                    <p><strong>Estado:</strong> {status}</p>
                                </div>
                            </div>
                            <div className={Styles.container_score}>
                                <div id="scoreDiv" className={Styles.scoreDiv} style={{ backgroundColor: color }}>
                                    <p id="voteAverageElement" className={Styles.rating_circle}><strong>{formattedVoteAverage}</strong></p>
                                </div>
                                <div id="scoreFace" style={{ color }}>
                                    <i className={getEmoji(formattedVoteAverage)}></i>
                                </div>
                                <p className={Styles.votes_count}><strong>{vote_count}</strong> votos</p>
                            </div>
                        </div>
                        <div id="barInfo" className={Styles.barInfo}>
                            <div className={Styles.bar_info_icon}>
                                <i className="bi bi-calendar3"></i>
                                <p><strong>Lanzamiento:</strong> {release_date}</p>
                            </div>
                            <div className={Styles.bar_info_icon}>
                                <i className="bi bi-clock"></i>
                                <p><strong>Duración:</strong> {durationString}</p>
                            </div>
                            <div className={Styles.bar_info_icon}>
                                <i className="bi bi-cash-coin"></i>
                                <p><strong>Presupuesto:</strong> {formattedBudget}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}