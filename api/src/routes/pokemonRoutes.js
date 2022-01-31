const express = require('express');
const router = express.Router();
const {Pokemon, Type, types_pokemon} = require('../db.js');
const axios = require('axios');
const {v4: uuidv4} = require('uuid');
//------------------------------------------------------------------------------------------------------------
// Me traigo solo 40 pokemones desde la api

const pokemonApi = async () => {
    const pokeApi = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results;
    let newPokeApi = []; // guardar despues del filtro
    for(let i = 0; i < pokeApi.length; i++){
        newPokeApi.push(axios.get(pokeApi[i].url));
    }
    let resultado =  (await Promise.all(newPokeApi)).map(el => { 
        return {
            id: el.data.id,
            name: el.data.name,
            types: el.data.types.map(el => el.type),
            img: el.data.sprites.other.dream_world.front_default,
            weight: el.data.weight,
            height: el.data.height,
            hp: el.data.stats[0].base_stat,
            attack: el.data.stats[1].base_stat,
            defense: el.data.stats[2].base_stat
        }
    });
   
    return resultado;
}


// -------------------------------------------------------------------------------------------------------------
// Info de base de datos.

const getPokeBd = async () => {    
     
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["id", "name"],
            through: {
                attributes: [],
            }}
        })
    };

// -------------------------------------------------------------------------------------------------------------

 //coneccion de la api y bases de datos.
 const getPokeAll = async () => {
     const apiInfoPoke = await pokemonApi();
     const bdInfoPoke = await getPokeBd();
     const pokeAllInfo = bdInfoPoke.concat(apiInfoPoke);
     
     return pokeAllInfo; 
 }

// ---------------------------------------------------------------------------------------------------------------------
// **  BACK  **

// ---------------------------------------------------------------------------------------------------------------------
// ! ** Ruta Principal y busqueda por name**
// >> http://localhost:3001/pokemons <<

router.get('/', async(req,res)=>{
   
    let {name}= req.query;
  
    try{
        
    if (name) {
        
        const pokeBd = await Pokemon.findAll({
            where: {
                name: name,
            },
            include: {
                model: Type,
            },
        })
        if (pokeBd != 0) {
            let respBd = pokeBd.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    types: p.types.map(t => t.name),
                    img: p.img,
                    live: p.life,
                    attack: p.attack,
                    defense: p.defense,
                    velocidad: p.speed,
                    altura: p.height,
                    peso: p.weight

                }
            })
            res.status(200).send(respBd)
        }
        else {
                  
            const pokeApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`))
            let respApi = [
                {
                    id: pokeApi.data.id,
                    name: pokeApi.data.name,
                    types: pokeApi.data.types.map(t => t.type),
                    img: pokeApi.data.sprites.other.home.front_default,
                    life: pokeApi.data.stats[0].base_stat,
                    attack: pokeApi.data.stats[1].base_stat,
                    defense: pokeApi.data.stats[2].base_stat,
                    speed: pokeApi.data.stats[5].base_stat,
                    height: pokeApi.data.height,
                    weight: pokeApi.data.weight
                }
            ]
            res.status(200).send(respApi)

        }
    }
    else {
        //res.status(404).send({msg:'Debe Ingresar un nombre'})
        try {
            const pokemons = await getPokeAll();
            res.json(pokemons);
        } catch (error) {
            next(error);
        }
    }
 } catch (err) {
    res.status(404).send({msg:'Pokemon not found'})
}
    
    
});


// ---------------------------------------------------------------------------------------------------------------------

// ! ** Ruta para crear un pokemon **

// >> http://localhost:3001/pokemons/ <<

router.post('/', async (req, res, next) => {
    try {
        const {name, live, attack, defense, velocidad, altura, peso, img, type} = req.body
        const newPoke = await Pokemon.create({
            name,
            live,
            attack,
            defense,
            velocidad,
            altura,
            peso,
            img,
            type
        })
        await newPoke.setTypes(type)
        res.send(newPoke)

    } catch (error) {
        next(error)
    }
})

// ---------------------------------------------------------------------------------------------------------------------

// ! ** Ruta para guardar y relacionar un pokemon por nombre y id**

router.post('/:pokemonId/type/:typeId', async (req, res, next) => {
    try {
        const {pokemonId, typeId} = req.params; 
        const pokemon = await Pokemon.findByPk(pokemonId); 
        await pokemon.addType(typeId); 
        res.status(201).send(pokemon)
    }catch (error) {
        next(error)
    }       
});
// ---------------------------------------------------------------------------------------------------------------------

// ! ** Ruta para buscar un pokemon por ID primero en la Base de Datos y si no esta, va directo al PokeApi **
// >> http://localhost:3001/pokemons/id <<

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    if(id.length > 6) {
        try {
            const pokeDB = await Pokemon.findByPk(id, {include: Type});
            res.json(pokeDB)
        } catch (error) {
            next(error);
        }
    } else {
        try {
            const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokeApiDatos = {
                id: pokeApi.data.id,
                name: pokeApi.data.name,
                types: pokeApi.data.types.map(el => el.type),
                img: pokeApi.data.sprites.other.dream_world.front_default,
                weight: pokeApi.data.weight,
                height: pokeApi.data.height,
                vida: pokeApi.data.stats[0].base_stat,
                attack: pokeApi.data.stats[1].base_stat,
                defense: pokeApi.data.stats[2].base_stat
            }
            res.json(pokeApiDatos);
        } catch (error) {
            next(error);
        }
    }
})

// ---------------------------------------------------------------------------------------------------------------------

module.exports = router;