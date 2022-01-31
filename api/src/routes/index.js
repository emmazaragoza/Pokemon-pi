const { Router } = require('express');
const pokemonRoute = require('./pokemonRoutes');
const tiposApi = require('./tiposRoutes');
//  Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); 

// Middleware para las rutas principales.
router.use('/pokemons', pokemonRoute);
router.use('/types', tiposApi);




module.exports = router;
