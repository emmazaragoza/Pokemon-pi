import React from "react";
import { Link } from "react-router-dom";
import Style from "../Styles/landingPage.module.css";
import logo from "../img/Pokemon.png";
import ingresar from "../img/poke-logo.png";


export default function LandingPage() {
    return (
        
        <div className={Style.body}>
            <img className={Style.logoPoke} src= {logo} alt='logo'/>
            <h1 className= {Style.h1}>Bienvenidos a mi PI, PokeAmigos.</h1>
            <Link to= '/home'>
                <img className={Style.ingresar} src= {ingresar} alt='logo'/>
            </Link>
        
        </div>
    );
}
