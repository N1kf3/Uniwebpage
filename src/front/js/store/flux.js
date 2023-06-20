const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jwt_token: localStorage.getItem("jwt_token"),
			user: null,	
			user_Sig: null,
			falg:0,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			setToken: (jwt_token) => {
				setStore({jwt_token: jwt_token});
				localStorage.setItem("jwt_token", jwt_token);
			},
			removeToken: () => {
				const store = getStore()
				localStorage.removeItem("jwt_token");
				setStore({jwt_token: null});
				if (!store.jwt_token) {
					alert("Se ha cerrado sesión correctamente");
				}
			},
			getProfile: async () => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/private", {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${store.jwt_token}`,
						}
					})
					if (response.status == 200) {
						const body = await response.json();
						setStore({user: body.user});						
					}
					else {
						alert("Se produjo un error al cargar el perfil de usuario");
						throw new Error (response.status);
					}
				} catch (error) {
					console.log("Estatus de error: ", error);
				}
			},
		}
	};
};

export default getState;
