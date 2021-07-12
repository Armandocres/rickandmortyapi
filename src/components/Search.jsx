import React from "react";

const Search = ({ search, searchInput, handleSearch }) => {
	return (
		<div className="Search">
			<label htmlFor="character">Busca un personaje de Rick and Morty</label>
			<input
				type="text"
				value={search}
				ref={searchInput}
				onChange={handleSearch}
				id="character"
			/>
		</div>
	);
};

export default Search;
