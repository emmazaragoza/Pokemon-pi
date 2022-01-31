import React, { useState }from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {getPokemon, getPokeName} from "../actiones/index";
import Style from '../Styles/navBar.module.css'
import logo from '../img/Pokemon.png'



export default function NavBar () {
    // const linkDin = "https://www.linkedin.com/in/emmazaragoza"
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemon());
    }
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value.toLowerCase());
        
    }
      function handleSubmit(e) {
        e.preventDefault();
        dispatch(getPokeName(name));
        setName("");
    }

    return (
    <div className={Style.body}>
        <div>
            <button className={Style.btnRecargar} onClick={event => {handleClick(event)}}>Recargar Página</button>
        </div>
            
            <div>
            <img className={Style.imgPoke} src={logo} alt="img-pokemon"/>
            </div>
            <Link to = "/pokemons">
                    <button className={Style.btnCreate}>Crear Pokémon</button>
            </Link> 

        <div className={Style.inputBuscar}>
            <div>
               <input className={Style.inputB} id="formulario" value={name}
                  type="text"
                  placeholder="Buscar Pokémon..."           
                  onChange={e => {handleInputChange(e)}}            
               /> 
            </div>
            <div>
                <button className={Style.btnBuscar} type="submit" onClick={e => {handleSubmit(e)}}>Buscar</button> 
            </div>
        </div> 
    </div>
    )
}