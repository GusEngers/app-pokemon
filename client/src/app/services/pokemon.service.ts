import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListPokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private api: string = environment.api;
  constructor(private http: HttpClient) {}

  private errorHandling(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getHomePokemons(): Observable<ListPokemon | any> {
    return this.http
      .get(this.api + '/pokemon')
      .pipe(catchError(this.errorHandling));
  }
}
