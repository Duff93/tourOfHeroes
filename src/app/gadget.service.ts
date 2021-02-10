import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Gadget } from './gadget';
import { MessageCustomService } from './message-custom.service';

@Injectable({
  providedIn: 'root'
})
export class GadgetService {

  private gadgetsUrl = 'http://localhost:8080/api/gadgets';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageCustomService) { }

  /** GET heroes from the server */
  getGadgets(): Observable<Gadget[]> {
    return this.http.get<Gadget[]>(this.gadgetsUrl)
      .pipe(
        tap(_ => this.log('fetched gadgets')),
        catchError(this.handleError<Gadget[]>('getGadgets', []))
      );
  }

  //** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Gadget> {
    const url = `${this.gadgetsUrl}/?id=${id}`;
    return this.http.get<Gadget[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Gadget>(`getGadget id=${id}`))
      );
  }

  /** GET gadget by id. Will 404 if id not found */
  getGadget(gadget: Gadget): Observable<Gadget> {
    const url = `${this.gadgetsUrl}/${gadget.id}`;
    return this.http.get<Gadget>(url).pipe(
      tap(_ => this.log(`fetched gadget id=${gadget.id}`)),
      catchError(this.handleError<Gadget>(`getGadget id=${gadget.id}`))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteGadget(gadget: Gadget | number): Observable<Gadget> {
    const id = typeof gadget === 'number' ? gadget : gadget.id;
    const url = `${this.gadgetsUrl}/${id}`;

    return this.http.delete<Gadget>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted gadget id=${id}`)),
      catchError(this.handleError<Gadget>('deleteGadget'))
    );
  }

  /** POST: add a new hero to the server */
  addGadget(gadget: Gadget): Observable<Gadget> {
    return this.http.post<Gadget>(this.gadgetsUrl, gadget, this.httpOptions).pipe(
      tap((newGadget: Gadget) => this.log(`added gadget w/ id=${newGadget.id}`)),
      catchError(this.handleError<Gadget>('addGadget'))
    );
  }

  /* GET gadgets whose name contains search term */
  searchGadgets(term: string): Observable<Gadget[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Gadget[]>(`${this.gadgetsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found gadgets matching "${term}"`) :
         this.log(`no gadgets matching "${term}"`)),
      catchError(this.handleError<Gadget[]>('searchGadgets', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GadgetService: ${message}`);
  }
}
