import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { map, share, shareReplay, switchMap, tap } from 'rxjs/operators';

import {MyDatas}  from '../datas/mydatas'
@Injectable({
  providedIn: 'root'
})
export class TestrestService {
  protected subject$: BehaviorSubject<MyDatas[]> ;

  
  url = "/api";
  constructor(private http:  HttpClient ) { }

  /*getDatas(): Observable<MyDatas[]> {

    if ( this.subject$ ) {
      return this.subject$.asObservable();
    }
    const surl = this.url +'/posts';
    this.subject$ = new BehaviorSubject<MyDatas[]>([]) ;
    return this.http.get<MyDatas[]>( surl  ).pipe(
      switchMap((values: MyDatas[]) => {
        this.subject$.next(values);
        return this.subject$.asObservable();
      })
    );




  }*/

  getDatas( code ): Observable<MyDatas[]> {

    if ( code ==='GET' ) {
      return this.getDatas2();
    }

      else return this.getDatas1();

  }


  getDatas2(): Observable<MyDatas[]> {
    const surl = this.url +'/posts';
    return this.http.get<MyDatas[]>( surl  )

  }



  getDatas1() {

    const d = { userId: 4000,id: 4000,title: 'test', body: 'test'  };
    const a =[] ;
    a.push( d ) ;
    const surl = this.url +'/posts';
     return  this.http.get<MyDatas[]>( surl  ).pipe(
      map( m  =>  { return  a  } )
      )
 
  }










}
