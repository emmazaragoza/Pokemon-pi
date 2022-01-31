import { 
    GET_POKEMON, 
    GET_POKE_NAME, 
    GET_POKE_TYPES, 
    POST_POKEMON, 
    GET_POKE_DETAILS, 
    CREATED_OR_EXIST,
    FILTER_TIPOS,
	LOADING
} from '../actiones/actionTypes';



const initialState = {
	pokemons: [],
	allPokemons: [],
	detail: [],
	types: [],
	mensaje: '',
	loading: {
		loading: false,
		msj: '',
	}
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POKEMON:
			return {
				...state,
				pokemons: action.payload,
				allPokemons: action.payload,
				loading :{
					loading: false,
					msj: ''
				}
			};
		case LOADING:
			return {
				...state,
				loading: {
					loading: true,
					msj: '',
				}
			}
  // https://www.google.com/search?q=pokemon+neon+imagen&tbm=isch&ved=2ahUKEwi_9u350Mv0AhVnkZUCHTpAApIQ2-cCegQIABAA&oq=pokemon+neon+imagen&gs_lcp=CgNpbWcQAzIGCAAQCBAeOgcIIxDvAxAnULwMWMMuYIEwaABwAHgAgAFsiAGFB5IBAzkuMZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=jCasYb-AN-ei1sQPuoCJkAk&bih=625&biw=1366
		case GET_POKE_NAME:
			return {
				...state,
				pokemons: action.payload,
			};

		case GET_POKE_DETAILS:
			// console.log("adfkaj sc");
			return {
				...state,
				detail: action.payload,
			};

			case POST_POKEMON:
				return {
				  ...state,
				  mensaje: action.payload,
				  loading: {
					loading: false,
					msg: ''
				  }
		  
				}
		

		case GET_POKE_TYPES:
			// console.log(action.payload, "desde reducer");
			return {
				...state,
				types: action.payload,
			};
	
		
		case CREATED_OR_EXIST:
        const allPokes = state.allPokemons;
        const filteredCreated =
        action.payload === "create"
          ? allPokes.filter(poke => poke.createdInDb) : allPokes.filter(poke => !poke.createdInDb);
        return {
          ...state,
		  pokemons: action.payload === 'all' ? state.allPokemons : filteredCreated,
        };
	  
	  case FILTER_TIPOS: 
	  const allPoke = state.allPokemons;
      // console.log(allPoke)
      const filteredByTypes =
        allPoke.filter((poke) => poke.types.find(t => {
            if (t.name === action.payload) {
              //console.log(poke, '2')
              return poke
            } 
        }));
        // console.log(filteredByTypes, '3')  
        return {
          ...state,
          pokemons: filteredByTypes,
        
        };

		case "ORDENADO_POR": { 
	          // console.log("desde reducer", action.payload)
    		  let orderPoke;
    		  if (action.payload === "asc") {
    		    orderPoke = state.pokemons.sort(function (a, b) {

    		      if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
    		      if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1 }
    		      return 1;
    		    });
    		  }
    		  if (action.payload === "dec") {
    		    orderPoke = state.pokemons.sort(function (a, b) {

    		      if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1 }
    		      if (a.name.toLowerCase() < b.name.toLowerCase()) { return 1}
    		      return 1;
    		    });
    		  }
			  return {
				...state,
				pokemons: orderPoke,
			  }
	}
	case "ORDENADO_ATTACK": { 
		// console.log(action.payload, "ORDENADO_ATTACK");
		let orderAttack;
		if (action.payload === "att-asc") {
		  orderAttack = state.pokemons.sort(function (a, b) {
			if (a.attack > b.attack) { return 1 }
			if (a.attack < b.attack) { return -1 }
			return 1;
		  });
		}
		if (action.payload === "att-dec") {
		  orderAttack = state.pokemons.sort(function (a, b) {
			if (a.attack > b.attack) { return -1 }
			if (a.attack < b.attack) { return 1}
			return 1;
		  });
		}
		return {
		  ...state,
		  pokemons: orderAttack,
		}
	  }
    
		default:
			return state;
	}
}

export default rootReducer;