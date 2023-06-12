import { PokemonType, PokemonAbility, PokemonStat } from 'pokenode-ts';

type Pokemon_type =
	| {
			id: number;
			name: string;
			types: PokemonType[];
			abilities: PokemonAbility[];
			stats: PokemonStat[];
			image: string;
	  }
	| {
			error: string;
	  };

export default Pokemon_type;
