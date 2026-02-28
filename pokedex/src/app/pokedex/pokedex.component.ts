import {Component, OnInit} from '@angular/core';
import {PokeApiService} from "../shared/services/poke-api.service";
import {Pokemon} from "../shared/models/pokemon";
import {PokemonDetails} from "../shared/models/pokemonDetails";
import {Subscription} from "rxjs";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent {

  private pokemonList$: Subscription
  pokemonList: Pokemon[] = [];

  pokemonDetails: PokemonDetails | undefined;

  constructor(private _pokeApi: PokeApiService) {
    this._pokeApi.refreshPokemonList();
    this.pokemonList$ = this._pokeApi.pokemonList$.subscribe(pokemons => {
      this.pokemonList = pokemons;
    })
  }

  getNewList(down: boolean): void {
    this._pokeApi.offset += down ? 1 : -1;
  }

  getDetails(url: string): void {
    this._pokeApi.getPokemonDetails(url).subscribe(details => {
      this.pokemonDetails = details;
    })
  }
}
