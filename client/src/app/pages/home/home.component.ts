import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPokemon, ListPokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'poke-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  count!: number;
  pokemons!: IPokemon[];
  error: string | null = null;
  loading: boolean = true;
  subscription: Subscription = new Subscription();

  constructor(private service: PokemonService) {}

  ngOnInit(): void {
    this.subscription = this.service.getHomePokemons().subscribe({
      next: (res: ListPokemon) => {
        this.count = res.count;
        this.pokemons = res.pokemons;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.loading = true;
  }
}
