import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {getPokeDetails} from "../actiones/index";
import { useEffect, useState } from "react";
import card from '../Styles/card.module.css'
import Banner from "./banner";
import banner from '../Styles/bannerDetails.module.css';

const Details = () => {
    // console.log(this.props, "DESDE EL COMPONENTE DE DATALLES")
    const { id } = useParams();

    const [pokeID, usePokeId] = useState(id);
    const dispatch = useDispatch();
    // console.log(pokeID, "pokeID");
    
    useEffect(()=>{
        dispatch(getPokeDetails(pokeID));
    }, [dispatch])

    const datails = useSelector(state => state.detail)
    console.log(datails, "DATALLES")
    return(
        <div className={card.details}>
            {
                datails ? 
                <div>
                    <div className={card.name}>
                        <h1 >Nombre: {datails.name}</h1>
                    </div>
                    <div className={card.img}>
                        <img className={card.imgDetails} src={datails.img} alt="" />
                    </div>
                    <div className={card.dato}>
                        {Array.isArray(datails.types) ?
                         datails.types.map(t => (
                         <h3 className="pokemon_tipo"> Tipo: {t.name}</h3>)) : <h1>Sin Tipos</h1>}
                        <h3>Peso: {datails.createdInDb ? datails.peso : datails.weight}</h3>
                        <h3>Altura: {datails.createdInDb ? datails.altura : datails.height}</h3>
                        <p>Vida: {datails.createdInDb ? datails.life : datails.vida}</p>
                    </div>
                    
                </div> : <h1>No se encontraron detalles</h1>
            }
            <div className={card.btn}>
                <Link to="/home">
                    Volver al Inicio
                </Link>
            </div>
            <div className={banner.contenedor}>
             <Banner/>   
            </div>
            
        </div>
    )
}

export default Details;