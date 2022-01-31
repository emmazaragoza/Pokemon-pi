import React from "react";
import Style from '../Styles/paginacion.module.css'

export default function Paginacion ({pokemonsPerPage, pokemon, paginado}) {
    const numeroPagina = [];

    for (let i = 1; i <= Math.ceil(pokemon/pokemonsPerPage); i++) {
        numeroPagina.push(i);
    }

    return(
        <nav>
            <div className = {Style.contPage}>
                {numeroPagina && numeroPagina.map(n => (
                        <div className = {Style.filtro} key = {n}>
                            <button className={Style.btnPage} onClick = {() => paginado(n)} color= "red">{n}</button>
                        </div>
                ))}
            </div>
        </nav>
    )
}