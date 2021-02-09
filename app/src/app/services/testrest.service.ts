import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MyDatas}  from '../datas/mydatas'
@Injectable({
  providedIn: 'root'
})
export class TestrestService {

  url = "/api";
  constructor(private http:  HttpClient ) { }

  getDatas() {
    const surl = this.url +'/posts';
    return this.http.get<MyDatas[]>( surl  );
  }


}
