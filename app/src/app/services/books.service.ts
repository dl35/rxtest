import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { map, share, shareReplay, switchMap, tap } from 'rxjs/operators';

import {MyBooks}  from '../datas/mybooks';

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  protected subject$: BehaviorSubject<MyBooks[]> ;

  
  url = "/books";
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


  get(): Observable<MyBooks[]> {
    const surl = this.url + '/list';
    return this.http.get<MyBooks[]>( surl  )
  }

  put(id: number, datas: MyBooks ): Observable<any> {
    const surl = this.url + '/' + id ;
    return this.http.put<any>( surl , datas  );
  }

  post(datas: MyBooks): Observable<MyBooks> {
    const surl = this.url ;
    return this.http.post<MyBooks>( surl , datas  );
  }

  delete(id: number): Observable<any> {
    const surl = this.url + '/' + id ;
    return this.http.delete<any>( surl );
  }


  getDatas( code ): Observable<MyBooks[]> {

    if ( code ==='GET' ) {
      return this.getDatas2();
    }

      else return this.getDatas1();

  }


  getDatas2(): Observable<MyBooks[]> {
    const surl = this.url +'/posts';
    return this.http.get<MyBooks[]>( surl  )

  }



  getDatas1() {

    const d = { userId: 4000,id: 4000,title: 'test', body: 'test'  };
    const a =[] ;
    a.push( d ) ;
    const surl = this.url +'/posts';
     return  this.http.get<MyBooks[]>( surl  ).pipe(
      map( m  =>  { return  a  } )
      )
 
  }










}


