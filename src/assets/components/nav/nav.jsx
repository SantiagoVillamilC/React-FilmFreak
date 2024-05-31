import React from "react";

import { Link } from 'react-router-dom'
import Styles from './nav.module.css';


export const Nav = () => {

    return (
        <>
            {/* <nav>

                <Link to={"/"} style={navStyles}>
                    <h2>Logo</h2>
                </Link>

                <ul className={Styles.nav_list}>
                    <Link to={"/About"} style={navStyles}>
                        <li>About</li>
                    </Link>
                    <Link to={"/Users"} style={navStyles}>
                        <li>Users</li>
                    </Link>
                </ul>

            </nav> */}

            <nav className={Styles.nav}>
                <div className={Styles.header_bar}>
                    <div className={Styles.logo_header}>
                        <Link to={"/React-FilmFreak"}>
                            <h1>Film Freak</h1>
                        </Link>
                    </div>
                    <div className={Styles.search_container}>
                        <input type="text" placeholder="Todavia no es funcional :)"></input>
                        <button type="submit">Buscar</button>
                    </div>
                    <div className={Styles.options_header}>

                        <a href="#sectionTeatros"><p className={Styles.option}  >En teatros</p></a>
                        <a href="#sectionPopular"><p className={Styles.option}  >Populares</p></a>
                        <a href="#sectionTrailers"><p className={Styles.option} >Trailers</p></a>

                        <a href="search.html">
                            <div className={Styles.option_search}>
                                <p>Filtrar Pelis</p>
                                <i class="bi bi-search"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
};