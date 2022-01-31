import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createPokemon, getPokeTypes } from '../actiones/index'
import { Link } from 'react-router-dom'
import formulario from '../Styles/formulario.module.css';
// import Checkbox from './checkBox.jsx'


export default function Form() {
  const dispatch = useDispatch()
//  const AllPokemons = useSelector(state => state.pokemons)
  const history = useHistory ();
  const types = useSelector(state => state.types)
  // console.log(types)
 
  const [pokemon, setPokemon] = useState({
      name: '',
      live: 0,
      attack: 0,
      defense: 0,
      velocidad: 0,
      altura: 0,
      peso: 0,
      img: '',
      type: []

    
  })
  const [error, setError] = useState(false)

  const handleChange = e => {
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value.toLowerCase(),
      [e.target.type]: e.target.value,
      [e.target.live]: e.target.value,
      [e.target.attack]: e.target.value,
      [e.target.defense]: e.target.value,
      [e.target.velocidad]: e.target.value,
      [e.target.altura]: e.target.value,
      [e.target.peso]: e.target.value,
      [e.target.img]: e.target.value

    })
    console.log(pokemon)
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(pokemon);
    if (pokemon.name === '' || pokemon.type === [] ||
      pokemon.life === 0 || pokemon.attack === 0 ||
      pokemon.defense === 0 || pokemon.speed === 0 ||
      pokemon.height === 0 || pokemon.weight === 0) {
      setError(true)
      return 
    }
    dispatch(createPokemon(pokemon))
    alert('Pokemon added!')
    setPokemon({
      name: '',
      live: 0,
      attack: 0,
      defense: 0,
      velocidad: 0,
      altura: 0,
      peso: 0,
      img: '',
      type: []
    })
   history.push('/Home')

  }

  
  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      type: [...pokemon.type, e.target.value]
    })
  }

  function handleDelete(e) {
    setPokemon({
      ...pokemon,
      type: pokemon.type.filter(type => type !== e.target.value)
    })
  }

  useEffect(() => {
    dispatch(getPokeTypes())
  }, [dispatch])



  useEffect(() => {
    if (error) {
      alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
      setTimeout(() => {
        setError(false);        
      }, 3000)
    }
  }, [error])

  return (
    <Fragment>
      
      <div className= {formulario.body}>
        <div className={formulario.contform}>
        <div>
          <button className={formulario.btnhome}>
                <Link to="/home">
                    Volver al Home
                </Link>
          </button>
        </div>
              
          <div className={formulario.formulario}>
          <div className= {formulario.create}>
            <h1 className={formulario.formh1}>Crea tú propio Pokémon</h1>
            <div className={formulario.form}>
            <form onSubmit={e => {handleSubmit(e)}}>
              <div>
                <label className={formulario.labelTitle}>Nombre:</label>
                <input
                placeholder='Inserte el nombre'
                  type="text"
                  className={formulario.inputsForm}
                  id="name"
                  name="name"
                  value={pokemon.name}
                  onChange={e => {handleChange(e)}}
                />
              </div>
              
              
            {/*<div className={formulario.formInout}>
                  <label className="formulario">Selecione los tipos: </label>
                  <label onChange={e => {handleSelect(e)}}>
                    {types.map(type => ( 
                      <label><p>                  
                   <input
                      id={type.id}
                      type="checkbox" 
                      className= "formulario" 
                      key={type.id} 
                      value={type.id}
                      />{type.name}</p> </label>
                  ))}</label>
              </div>
            */}
              
              



{ /*
              <div className="form-group">
                <label className={formulario.labelTitle}>Type: </label>
                <select onChange={e => {handleSelect(e)}}>
                  <option value="">Select a type</option>
                  {types.map(type => (
                    <option className={formulario.inputsForm} key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

                  */}














              <div className="form-group">
                <label className={formulario.labelTitle}>Vida:</label>
                <input
                placeholder='0'
                  type="number"
                  className={formulario.inputsForm}
                  id="life"
                  name="life"
                  value={pokemon.life}
                  onChange={e => {handleChange(e)}}
                />
              </div>
              
              <div className="form-group">
                <label className={formulario.labelTitle}>Ataque:</label>
                <input
                placeholder='0'
                  type="number"
                  className={formulario.inputsForm}
                  id="attack"
                  name="attack"
                  value={pokemon.attack}
                  onChange={e => {handleChange(e)}}
                />
              </div>

              <div className="form-group">
                <label className={formulario.labelTitle}>Defensa:</label>
                <input
                placeholder='0'
                  type="number"
                  className={formulario.inputsForm}
                  id="defense"
                  name="defense"
                  value={pokemon.defense}
                  onChange={e => {handleChange(e)}}
                />
              </div>

              <div className="form-group">
                <label className={formulario.labelTitle}>Velocidad:</label>
                <input
                placeholder='0'
                  type="number"
                  className={formulario.inputsForm}
                  id="speed"
                  name="speed"
                  value={pokemon.speed}
                  onChange={e => {handleChange(e)}}
                />
              </div>

              <div className="form-group">
                <label className={formulario.labelTitle}>Peso:</label>
                <input
                placeholder='0'
                  type="number"
                  className={formulario.inputsForm}
                  id="height"
                  name="height"
                  value={pokemon.height}
                  onChange={e => {handleChange(e)}}
                />
              </div>

              <div className="form-group">
                <label className={formulario.labelTitle}>Altura:</label>
                <input
                placeholder='0'
                  type="number"
                  className={formulario.inputsForm}
                  id="weight"
                  name="weight"
                  value={pokemon.weight}
                  onChange={e => {handleChange(e)}}
                />
              </div>

              <div className="form-group">
                <label className={formulario.labelTitle}>Imagen:</label>
                <input
                placeholder='Inserte url de la imagen'
                    type="url"
                    className={formulario.inputsForm}
                    id="img"
                    name="img"
                    value={pokemon.img}
                    onChange={e => {handleChange(e)}}
                />
                </div>
                <button 
                type="submit" className= {formulario.btnsubmit}>
                    Crea tú Pokemon
                </button>
                
            </form>
            </div>

        
            
            
            {/*error && (
                <div className="form-alert form-alert-danger" role="form-alert">
                    TODOS LOS CAMPOS SON OBLIGATORIOS
                </div>
            )*/}
          </div>
              
            </div>
        </div>
        
        </div>
        <div>
              <div>
                      <label><h1 className={formulario.h1input}>Selecione los tipos: </h1></label>
                      <div className={formulario.contInput}>
                      <label onChange={e => {handleSelect(e)}}>
                        {types.map(type => ( 
                          <label><div>
                                             
                       <input
                          id={type.id}
                          type="checkbox" 
                          className= "formulario" 
                          key={type.id} 
                          value={type.id}
                          />{type.name} </div></label>
                      ))}</label>
                      </div>
              </div>
        </div>
    </Fragment>
)
}