const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jwt_token: localStorage.getItem("jwt_token"),
			user: null,	
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
		}
	};
};

export default getState;
