import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonDescription'
})
export class PokemonDescriptionPipe implements PipeTransform {

  transform(value: any): string {
    let description : string = value;
    description = description.replace('\f', ' ')
    description = description.toUpperCase()
    return description
  }

}
