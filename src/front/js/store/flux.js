const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: null,
			planets: null,
			character: null,
			planet: null,
			favorites: {
				characters: [],
				planets: []
			}
		},
		actions: {
			//acá tengo que hacer las 2 funcionalidades que acabo de escribir para obtener la info.
			// Use getActions to call a function within a fuction
			obtenerPersonajes: () => {
				fetch("https://www.swapi.tech/api/people")
					.then((res) => res.json())
					.then((data) => setStore({ characters: data.results }))
					.catch((err) => console.error(err));
			},
			obtenerPlanetas: () => {
				fetch("https://www.swapi.tech/api/planets")
					.then((res) => res.json())
					.then((data) => setStore({ planets: data.results }))
					.catch((err) => console.error(err));
			},

			obtenerPersonaje: (id) => {
				fetch("https://www.swapi.tech/api/people/" + id)
					.then((res) => res.json())
					.then((data) => setStore({ character: data.result.properties }))
					.catch((err) => console.error(err));
			},

			obtenerPlaneta: (id) => {
				fetch("https://www.swapi.tech/api/planets/" + id)
					.then((res) => res.json())
					.then((data) => setStore({ planet: data.result.properties }))
					.catch((err) => console.error(err));
			},

			signUp: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "sign_up", {
					method: "POST",
					body: JSON.stringify({ 'email': email, 'password': password }),
					headers: {
						'Content-Type': 'application/json'
					},
				})
				const data = await resp.json()
				console.log(data);
			},

			logIn: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "login", {
					method: "POST",
					body: JSON.stringify({ 'email': email, 'password': password }),
					headers: {
						'Content-Type': 'application/json'
					},
				})
				const data = await resp.json()
				console.log(data);
				localStorage.setItem("myToken", data.access_token)
			},

			logOut:() => {
				localStorage.removeItem("myToken")
			},



			addFavoriteCharacter: (character) => {
				const store = getStore()
				const isAlreadyFavorite = store.favorites.characters.some((favorite) => favorite.uid === character.uid)
				const updatedFavorites = isAlreadyFavorite ? [...store.favorites.characters] : [...store.favorites.characters, character]
				setStore(
					{
						...store,
						favorites: {
							...store.favorites,
							characters: updatedFavorites
						}

					}
				)

			},

			addFavoritePlanet: (planet) => {
				const store = getStore()
				const isAlreadyFavorite = store.favorites.planets.some((favorite) => favorite.uid === planet.uid)
				const updatedFavorites = isAlreadyFavorite ? [...store.favorites.planets] : [...store.favorites.planets, planet]
				setStore(
					{
						...store,
						favorites: {
							...store.favorites,
							planets: updatedFavorites
						}


					}
				)

			}

		},

	};
};

export default getState;
