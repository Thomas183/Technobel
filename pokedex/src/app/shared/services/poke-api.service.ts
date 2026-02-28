import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pokemon} from "../models/pokemon";
import {PokemonListResponse} from "../models/pokemonListResponse";
import {BehaviorSubject, Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators"
import {PokemonDetails} from "../models/pokemonDetails";
import {SpeciesResponse} from "../models/speciesResponse";

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private _pokemonList: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
  pokemonList$ = this._pokemonList.asObservable()

  constructor(private _httpClient: HttpClient) {
  }

  private _offset: number = 0
  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value
    if (this._offset < 0) {
      this._offset = 0;
    }
    this.refreshPokemonList();
  }

  refreshPokemonList(): void {
    this._httpClient.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.offset}`)
      .subscribe(pokemons => {
        this._pokemonList.next(pokemons.results);
      });
  }

  getPokemonDetails(url: string): Observable<PokemonDetails> {
    return this._httpClient.get<PokemonDetails>(url).pipe(switchMap(data => {
      const speciesUrl = data.species!.url
      return this._httpClient.get<SpeciesResponse>(speciesUrl).pipe(map(speciesData => {
        console.log(data.sprites.front_default)
        return {
          description: speciesData.flavor_text_entries[0].flavor_text,
          id: data.id,
          weight: data.weight,
          height: data.height,
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default
          }
        }
      }))
    }))
  }
}
