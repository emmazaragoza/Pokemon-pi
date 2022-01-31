import React, { useEffect, useState }from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getPokemon, createdOrExist, filterTipos, ordenadoPor, ordenadoAtt, getPokeTypes} from "../actiones/index";
import Card from "./card";
import Paginacion from "./paginas";
import Style from '../Styles/home.module.css'
import cargando from '../img/cargando-nuevo.gif'
import card from '../Styles/card.module.css'
import NavBar from "./navBar";
import filter from '../Styles/filtro.module.css'
import Banner from './banner.jsx'

export default function Home() {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemons);
    const loading = useSelector(state => state.loading);
    const types = useSelector(state => state.types);

    // PAGINAS -- ESTADOS LOCALES:
    const [currentPage, setCurrentPage] = useState(1);
    // estado local para que muestre 12 Pokemons por pagina
    const [pokemonsPerPage] = useState(12);
    const [name, setName] = useState("");
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 11, indice del ultimo poke

    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 0 indice del primer poke
    const currentPokemons = pokemon.slice(indexOfFirstPokemon, indexOfLastPokemon) ;


    const paginas = (numeroPagina) =>{
        setCurrentPage(numeroPagina);
    }
    const [orden, setOrden] = useState(''); 
    const [tipo, setTipo] = useState('');

    useEffect(() => {
        if(!pokemon.length && !loading.loading){
            dispatch(getPokemon());
            dispatch(getPokeTypes());
    }});

   /*
    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemon());
    }
   */
    //**************************************************************
   /*
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value.toLowerCase());
        setCurrentPage(1);
        console.log(name);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        dispatch(getPokeName(name));
        setCurrentPage(1);
        setName("");
      }
   */

    //**************************************************************

    function handlecreatedOrExist(e) {
        e.preventDefault();
        dispatch(createdOrExist(e.target.value));
    }

    function handlefilterTipos(e) {
        e.preventDefault();
        dispatch(filterTipos(e.target.value));
        console.log(e.target.value, 'desde la home')
    }

    function handleordenadoPor(e) {
        e.preventDefault();
        dispatch(ordenadoPor(e.target.value));
        setTipo(`Ordenar por: ${e.target.value}`);
    }

    function handleordenadoAtt(e) {
        e.preventDefault();
        dispatch(ordenadoAtt(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenar por: ${e.target.value}`);
    }
    

    return (
        <div className= {Style.body}>
            <div>
                <NavBar/>
            </div>
            {/*
            <Link to = "/pokemons">
                    <button>Crear pokemon</button>
                </Link>
            
            
                <button onClick={event => {handleClick(event)}}>Volver al Inicio</button>
            <div className="container">
      <input id="formulario" value={name}
        type="text"
       
        placeholder="Buscar pokemon..."           
        onChange={e => {handleInputChange(e)}}            
      />
      
      <button type="submit" onClick={e => {handleSubmit(e)}}>Buscar</button>   
    </div>
            */}
                
             <div className={filter.contenedor}>
                 
                
                <div className={filter.filters}>
                <div>
                     <h3 className={filter.h3}>Ordenar por:</h3>
                 </div>
                 <div className={filter.select}>
                <select className={filter.h6} onChange = {event => handlecreatedOrExist(event)}>
                    <option value = 'all'>Todos</option>
                    <option value = 'create'>Creados</option>
                    <option value = 'pokeApi'>PokeDex</option>
                </select>
                </div>
                </div>  

                <div className={filter.filters}>
                    <div >
                        <h3 className={filter.h3}>Ordenar Vida:</h3>
                    </div>
                    <div className={filter.select}>
                        <select className={filter.h6} onChange = {event => handleordenadoPor(event)}>
                        <option value = 'asc'>Ascendente</option>
                        <option value = 'dec'>Decendente</option>
                        </select> 
                    </div>
                   
                </div>
                

                <div className={filter.filters}>
                    <div>
                        <h3 className={filter.h3}>Ordenar Ataque: </h3>
                    </div>
                    <div className={filter.select}>
                        <select className={filter.h6} onChange = {event => handleordenadoAtt(event)}>   
                        <option value = 'att-asc'>Ascendente</option>
                        <option value = 'att-dec'>Decendente</option>
                        </select> 
                    </div>
                </div>
                
                <div className={filter.filters}>
                    <div>
                        <h3 className={filter.h3}>Ordenar Tipo por:</h3>
                    </div>
                    <div className={filter.select}>
                        <select className={filter.h6} onChange = {event => handlefilterTipos(event)}>
                    {
                    types && types.map(type => (
                    <option key={type.id} value={type.name}>{type.name.charAt().toUpperCase() + type.name.slice(1)}</option>))}
                    </select>
                    </div>
                </div>
                
            </div>
                <div>
                    <Paginacion
                    pokemonsPerPage={pokemonsPerPage}
                    pokemon = {pokemon.length}
                    paginado ={paginas}
                    />
                </div>
                <div className={Style.contenedor}>
                {loading.loading ? <img src={cargando} className={Style.cargando}/>:
                currentPokemons?.map((poke) => (
                    <Link to = {'/home/' + poke.id}>
                        <div className={card.data}>
                        <Card name = {poke.name} img = {poke.img} types = {poke.types}/>
                        </div>
                    </Link> 
                ))}
                </div>
                <div>
                    <Banner />
                </div>
            
        </div>
    )
}
