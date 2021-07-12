import React, {
	useState,
	useReducer,
	useMemo,
	useRef,
	useCallback,
} from "react";
import Search from "./Search";
import useCharacters from "./hooks/useCharacter";

const initialState = {
	favorites: [],
};

const API = "https://rickandmortyapi.com/api/character/";

const favoriteReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_FAVORITE":
			return {
				...state,
				favorites: [...state.favorites, action.payload],
			};
		default:
			return state;
	}
};

const Characaters = () => {
	const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
	const [search, setSearch] = useState("");
	const searchInput = useRef(null);

	const characters = useCharacters(API);

	const handleSearch = useCallback(() => {
		setSearch(searchInput.current.value);
	}, []);

	const handleClick = (favorite) => {
		dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
	};

	const filterUsers = useMemo(
		() =>
			characters.filter((user) => {
				return user.name.toLowerCase().includes(search.toLowerCase());
			}),
		[characters, search]
	);

	return (
		<div className="Characters">
			{favorites.favorites.map((favorite) => (
				<li key={favorite.id}>
					{favorite.name} {favorite.gender}{" "}
				</li>
			))}
			<Search
				search={search}
				searchInput={searchInput}
				handleSearch={handleSearch}
			/>
			{filterUsers.map((characters) => (
				<div className="Character" key={characters.name}>
					<h2>{characters.name}</h2>
					<figure>
						<img src={characters.image} alt={characters.species} />
						<figcaption>
							<p>Gender: {characters.gender}</p>
							<p>Origin: {characters.origin.name}</p>
						</figcaption>
					</figure>
					<button type="button" onClick={() => handleClick(characters)}>
						Agregar a favoritos
					</button>
				</div>
			))}
		</div>
	);
};
export default Characaters;
