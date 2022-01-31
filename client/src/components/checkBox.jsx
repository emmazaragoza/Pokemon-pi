import React, { useState, useEffect} from 'react';
import { getPokeTypes } from '../actiones';
import { useDispatch, useSelector } from 'react-redux'


export default function Checkbox() {
  
  const types = useSelector(state => state.types)
  const dispatch = useDispatch()
  const tipos = useSelector(state => state.pokemon.types)

  const [pokemon, setPokemon] = useState({
    type: []
  })
  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      type: [...pokemon.type, e.target.value]
    })
  }
  
  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      type: [...pokemon.type, e.target.value]
    })
  }
  useEffect(() => {
    dispatch(getPokeTypes())
  }, [dispatch])

  function inputTypes() {
    setPokemon({
      ...pokemon,
      type: [types.map(t => t.name)]
    })
    
  }
  
    return (
      <div className="form-group">
                  <label className="formulario">Tipos: </label>
                  <label onChange={e => {handleSelect(e)}}>
                    {types.map(type => (
                   <input
                      id={type.id}
                      type="checkbox" 
                      className= "formulario" 
                      key={type.id} 
                      value={type.id}
                      checked = {types.name}
                      />
                  ))}</label>
              </div>
    );
  
}