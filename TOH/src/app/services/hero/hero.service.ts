import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from '../../interfaces/hero.interface';
import { HEROES } from '../../mock/mock-heroes';
import { MessageService } from '../message/message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }


    private handleError<T>(operation = 'operation', result?: T){
      return (error: any): Observable<T> => {

        console.error(error);

        this.log(`${operation} failed: ${error.message}`);

        return of(result as T);
      };
    }


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('get Heroes', []))
    )
  }


  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }


  private log(message:string){
    this.messageService.add(`HeroService:${message}`);
  }


  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero id ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


}

