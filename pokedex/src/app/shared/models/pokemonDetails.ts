export interface PokemonDetails {
  species? : {
    url : string
  }
  description : string,
  id : number,
  weight : number,
  height : number,
  name : string,
  sprites : {
    back_default: string,
    front_default: string
  }
}
