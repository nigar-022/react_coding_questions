import { useState, useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

function Pokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemomDetails, setPokemonDetails] = useState([]);
  const [cached, setCached] = useState({});
  //console.log(pokemonList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);

        const data = await response.json();
        //console.log(data);
        setPokemonList(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    const selectedPokemon = e.target.value;

    if (selectedPokemon in cached) {
      console.log("cached");
      setPokemonDetails(cached[selectedPokemon]);
    } else {
      const fetchPokemonDetails = async () => {
        const response = await fetch(`${BASE_URL}${selectedPokemon}`);
        const data = await response.json();
        console.log(data);
        setPokemonDetails(data);

        setCached({
          ...cached,
          [selectedPokemon]: data,
        });
      };
      fetchPokemonDetails();
    }
    setSelectedPokemon(selectedPokemon);
  };
  return (
    <div>
      <h1>Pokemon</h1>
      <div>
        <select onChange={handleChange} value={selectedPokemon}>
          <option value="">Select a pokemon...</option>
          {pokemonList &&
            pokemonList.map((p) => <option key={p.name}>{p.name}</option>)}
        </select>
      </div>
      <div>
        {selectedPokemon && pokemomDetails && (
          <>
            <h2>Name: {pokemomDetails.name}</h2>
            <h2>weight: {pokemomDetails.weight}</h2>
            <ul>
              Abilities :
              {pokemomDetails?.abilities?.map((p) => (
                <li>{p.ability.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Pokemon;
