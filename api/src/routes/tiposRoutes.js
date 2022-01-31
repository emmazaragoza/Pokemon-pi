// const express = require('express');
// const {Type} = require('../db.js');
// const router = express.Router();
// const axios = require('axios');
// const { types } = require('pg');



// //  >> http://localhost:3001/tipos <<
// router.get('/', async (req, res) => {
//     try {
//         let pokeCantidad = await Type.count(); // Cuenta la cantidad de registros en la tabla Tipos
    
//         // si en la base de datos no hay registros, se buscan de la api
//         if (pokeCantidad === 0) {
//             let pokeApi = (await axios.get('https://pokeapi.co/api/v2/type')).data.results; // guardo los tipos de pokemon en un array desde la api.

//             // se guardan los datos de la api en la base de datos
//             if(pokeApi){
//                 pokeApi = pokeApi.map(el => {
//                     return {
//                         id: el.id,
//                         name: el.name
//                     }
//                 })
//             }
//             await Type.bulkCreate(pokeApi); // buscar bilkCreate en la documentacion de sequelize.
//             res.send(pokeApi.map(el => el.name));

//         } else { // si hay registros en la base de datos, se buscan de la base de datos
//             let pokeBd = await Type.findAll();
//             let pokeBdDatos = pokeBd.map(el => {
//                 return {
//                     name: el.name,
//                     id: el.id,
//                 }
//             });
//             res.send(pokeBdDatos);
//         }
//     } catch (error) {
//         res.send(error);
//     }
// })


// module.exports = router;

const express = require('express')
const {Type} = require('../db')
const router = express.Router()
const axios = require('axios')
router.use(express.json())


//-------------------------------------------------------------------------------------------------------
// GET -> Traigo los Tipos de todos los pokemons desde la API y los guardo en la DB (si no existen)
//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res, next) => {
    try{
        let typeCant = await Type.count() //cuenta los tipos de pokemon que hay en la tabla types
        // si no hay tipos en la tabla types entonces se obtienen los tipos de pokemon de la api
        if (typeCant === 0) { 
            let types = await axios.get(`https://pokeapi.co/api/v2/type`)
            let typesApi = types.data.results // poner los tipos de pokemon de la api en un array
            // Pregunto si no está vacio entonces guardo los tipos de pokemon en la tabla types
            if (typesApi) { 
                typesApi = typesApi.map(t => {
                    return {
                        id: t.id,
                        name: t.name
                    }
                })
            }
            await Type.bulkCreate(typesApi)
            res.send(typesApi.map(p => p.name))
            
        } else { // Si la cantidad es distinta de 0 entonces se obtienen los tipos de pokemon de la tabla types
            let typesBD = await Type.findAll()
            let typesEnBaseDatos = typesBD.map((e) => {
                return  {
                    id: e.id,
                    name: e.name
                }
            })
            res.send(typesEnBaseDatos)
            
        }
    } catch (error) {
        next(error)
    }
    
})


module.exports = router;