import { PokemonDescriptionPipe } from './pokemon-description.pipe';

describe('PokemonDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonDescriptionPipe();
    expect(pipe).toBeTruthy();
  });
});
