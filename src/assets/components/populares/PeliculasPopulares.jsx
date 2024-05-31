import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from './peliculasPopulares.module.css';

const cargarPeliculas = async (pagina, setPeliculas, setError) => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX&page=${pagina}`);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            setPeliculas(datos.results);
        } else if (respuesta.status === 401) {
            setError('Error de comunicación con el servidor');
        } else if (respuesta.status === 404) {
            setError('Película no encontrada');
        } else {
            setError('Hubo un error');
        }
    } catch (error) {
        setError(error.message);
    }
};

const verBoton = (pagina, setPaginaAnteriorVisible) => {
    if (pagina > 1) {
        setPaginaAnteriorVisible(true);
    } else {
        setPaginaAnteriorVisible(false);
    }
};

export const PeliculasPopulares = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [paginaAnteriorVisible, setPaginaAnteriorVisible] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarPeliculas(pagina, setPeliculas, setError);
        verBoton(pagina, setPaginaAnteriorVisible);
    }, [pagina]);

    const handleSiguiente = () => {
        if (pagina < 1000) {
            setPagina(prevPagina => prevPagina + 1);
        }
    };

    const handleAnterior = () => {
        if (pagina > 1) {
            setPagina(prevPagina => prevPagina - 1);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (peliculas.length === 0) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className={Styles.paginacion}>
                {paginaAnteriorVisible && <button onClick={handleAnterior}><i className="bi bi-arrow-left-circle-fill"></i></button>}
                <span>Página {pagina}</span>
                <button onClick={handleSiguiente}><i className="bi bi-arrow-right-circle-fill"></i></button>
            </div>
            <div className={Styles.contenedor}>
                {peliculas.map(pelicula => (
                    <Link to={`/movie/${pelicula.id}`} key={pelicula.id} className={Styles.pelicula}>
                        <img className={Styles.poster} src={`https://image.tmdb.org/t/p/original/${pelicula.poster_path}`} alt="movie poster" />
                    </Link>
                ))}
            </div>
        </div>
    );
};