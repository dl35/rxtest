import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, timer } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, map, filter, tap } from 'rxjs/operators';
import { MyDatas } from '../datas/mydatas';
import { TestrestService } from '../services/testrest.service';

@Component({
  selector: 'app-rxtest',
  templateUrl: './rxtest.component.html',
  styleUrls: ['./rxtest.component.css']
})
export class RxtestComponent implements OnInit {

  source = timer(1000, 2000);
  value = '';

  datas$ : Observable<MyDatas[]>;
  search$ : Observable<string>;
  filtered$ : Observable<MyDatas[]>;

  search: FormControl = new FormControl('');
  // data jsonplaceholder
  constructor(private serv: TestrestService ) { }

  ngOnInit(): void {
 
    this.datas$ =   this.serv.getDatas();

    //startWith ajoute de '' dans le flux
    //debounceTime Émet une valeur après un lpas de temps
    // distinctUntilChanged() , renvoi un observablesi avec des valeurs distinctes
    this.search$ = this.search.valueChanges.pipe( startWith(''),
                                                 debounceTime(500),
                                                 distinctUntilChanged()
                                                 //filter(value => value.length > 0)
     );


     this.filtered$ = combineLatest( [ this.datas$, this.search$ ] )
     .pipe(
     //  tap( ( [ m , s ] ) => console.log( m , s )),
       map(([items, s ]) =>items.filter(item => item.title.toLowerCase().indexOf( s.toLowerCase() ) !== -1 ) )
          );


         
  }
  }


