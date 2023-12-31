import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Obsevable
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PokeApiService {


  private url: string ='https://pokeapi.co/api/v2/pokemon/?limit=384';
  constructor(
    private http: HttpClient
  ) { }

  get apiListAllPokemons():Observable<any>{
    return this.http.get<any>(this.url).pipe(
      tap( res => res ),
      tap( res => {
        res.results.map((resPokemons: any)=>{

          this.apiGetPokemons(resPokemons.url).subscribe(
            res => resPokemons.status = res
          )

        })
      })
    )
  }

  public apiGetPokemons(url: string ): Observable<any>{
    return this.http.get<any>( url ).pipe(
      map(
        res => res
      )
    )
  }
}
