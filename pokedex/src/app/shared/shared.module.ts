import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokemonDescriptionPipe} from "./pipes/pokemon-description.pipe";



@NgModule({
  declarations: [PokemonDescriptionPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    PokemonDescriptionPipe
  ]
})
export class SharedModule { }
