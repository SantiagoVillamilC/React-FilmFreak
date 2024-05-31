import React, { useState, useEffect } from 'react';
import Styles from './trailers.module.css';

const cargarTrailers = async (setTrailers, setError) => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX`);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            let trailersHTML = '';
            const apiKey = 'cace972f4626db6a5ee3ae755a24b03d';
            const language = 'es-MX';

            // Promesas para todas las solicitudes de video
            const videoPromises = datos.results.slice(0, 10).map(async (pelicula) => {
                const videoRespuesta = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.id}/videos?api_key=${apiKey}&language=${language}`);
                if (videoRespuesta.status === 200) {
                    const videoDatos = await videoRespuesta.json();
                    // Seleccionar solo el primer video (si existe) de cada película
                    const primerVideo = videoDatos.results.length > 0 ? videoDatos.results[0] : null;
                    return primerVideo;
                }
                return null;
            });

            // Esperar a que todas las solicitudes de video se completen
            const videosPorPelicula = await Promise.all(videoPromises);

            // Generar HTML para los trailers
            videosPorPelicula.forEach(video => {
                if (video) {
                    trailersHTML += `
                        <div class=${Styles.trailer}>
                            <iframe src="https://www.youtube.com/embed/${video.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    `;
                }
            });

            // Establecer el contenido HTML en el contenedor con el ID 'contenedorTrailers'
            setTrailers(trailersHTML);
        }

    } catch (error) {
        setError(error.message);
    }
};

export const Trailers = () => {
    const [trailers, setTrailers] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        cargarTrailers(setTrailers, setError);
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={Styles.contenedorTrailers} dangerouslySetInnerHTML={{ __html: trailers }} />
    );
};
