import React from 'react';
import styles from "../Styles/card.module.css";

function Card({name, img, types}) {
    return (
        <div className = {styles.container} key= {1}>
            <div  >
            <h3>{name}</h3>
            <img src = {img} alt = {name} width = "200px" height = "200px"/>
            {Array.isArray(types) ?
            types.map(tipo => (
            <h4 >{tipo.name}</h4>)):
            types ? (<h4>{types}</h4>) : (<h4 > Sin Tipo</h4>)}
            </div> 
        </div>
    )
}

export default Card;
