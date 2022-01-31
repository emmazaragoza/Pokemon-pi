import { 
    GET_POKEMON, 
    GET_POKE_NAME, 
    GET_POKE_TYPES, 
    POST_POKEMON, 
    GET_POKE_DETAILS, 
    CREATED_OR_EXIST,
    FILTER_TIPOS,
    LOADING,
} from './actionTypes';
import axios from "axios";
import cargando from '../img/poke-logo.png'


// const getPokeAll =  axios.get("http://localhost:3001/pokemons");
// const getTypes = (axios.get("http://localhost:3001/tipos/"));
// const CrearPoke = (axios.post("http://localhost:3001/pokemons/").data);


/*
export const getPokemon = () => {
    return function (dispatch) {
        dispatch({type: LOADING, payload: 'hljnkdjf'});

        return axios.get('http://localhost:3001/pokemons')
            .then(res => res.data)
            .then(data => dispatch({ type: GET_POKEMON, payload: data }))
    }
    
}
*/
export const getPokemon = () => {
    return async (dispatch) => {
        dispatch({type: LOADING, payload: 'kjnaskjcnas'})

        const pokemon = await axios.get('http://localhost:3001/pokemons')
        return dispatch ({
            type: GET_POKEMON,
            payload: pokemon.data
        })
    }
}

export const getPokeName = (name) => {
    return async (dispatch) => {
        let pokeName = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        // console.log(pokeName.data, "dede la actions");

        return dispatch({
            type: GET_POKE_NAME,
            payload: pokeName.data
        })
    };
};

export const getPokeTypes = () => {
    return async (dispatch) => {
        let json = await (axios.get("http://localhost:3001/types"))

        return dispatch({
            type: GET_POKE_TYPES,
            payload: json.data
        })
    };
};


export function createPokemon(pokemon) {
    return function (dispatch) {
        dispatch({ type: LOADING, payload: cargando })
        return axios.post('http://localhost:3001/pokemons', pokemon)
            .then(res => res.data)
            .then(data => dispatch({
                type: POST_POKEMON,
                payload: data
            }))
    }
}

 // GET_POKE_DETAILS

export const createdOrExist = (payload) => {
    return async (dispatch) => {
        try{ dispatch({
            type: CREATED_OR_EXIST,
            payload,
        })}
        catch(err){
       console.log(err)
        }
        
    };
}

export const getPokeDetails = (id) => {
        // console.log(id, "id de la actions");
        return async (dispatch) => {
        let pokeDetails = await axios.get(`http://localhost:3001/pokemons/${id}`);
        // console.log(pokeDetails.data, "dede la actions");
        return dispatch({
            type: GET_POKE_DETAILS,
            payload: pokeDetails.data
        })
    };
}

export const filterTipos = (payload) => {
    return async function (dispatch) {
        try {
            dispatch ({
                type: FILTER_TIPOS,
                payload
            });
        }
        catch (error) {
            console.log(error)
        }    
    }
};

export const ordenadoPor = (ordenadoPor) => {
    return async (dispatch) => {
        // console.log("ordenado", ordenadoPor)
        try{return dispatch({
            type: "ORDENADO_POR",
            payload: ordenadoPor
            
        })}
        catch(err){
            console.log(err)
        }
        
    }
}

export const ordenadoAtt = (orderAttack) => {
    return async (dispatch) => {
        try{ dispatch({
            type: "ORDENADO_ATTACK",
            payload: orderAttack
        })}
        catch(err){
            console.log(err)
        }
    }
}


