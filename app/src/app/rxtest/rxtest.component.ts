import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of, timer } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, map, filter, tap, switchMap } from 'rxjs/operators';
import { MyBooks } from '../datas/mybooks';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-rxtest',
  templateUrl: './rxtest.component.html',
  styleUrls: ['./rxtest.component.css']
})
export class RxtestComponent implements OnInit {

  source = timer(1000, 2000);
  value = '';



  
  subject$ = new BehaviorSubject<string>('GET');
  datas$ : Observable<MyBooks[]>;
  search$ : Observable<string>;
  filtered$ : Observable<MyBooks[]>;

  search: FormControl = new FormControl('');
  // data jsonplaceholder
  constructor(private serv: BooksService ) { }

  ngOnInit(): void {
 
   


   this.datas$ = this.subject$.pipe( switchMap( m =>  this.serv.get() ) ) ;


    // startWith ajoute de '' dans le flux
    // debounceTime Émet une valeur après un laps de temps
    // distinctUntilChanged() , renvoi un observablesi avec des valeurs distinctes
    this.search$ = this.search.valueChanges.pipe( startWith(''),
                                                 debounceTime(500),
                                                 distinctUntilChanged()
                                                 //filter(value => value.length > 0)
     );

   //  this.serv.getDatas().subscribe();
     this.filtered$ = combineLatest( [ this.datas$ , this.search$ ] )
     .pipe(
       tap( ( [ m , s ] ) => console.log( m , s )),
       map(([items, s ]) =>items.filter(item => item.title.toLowerCase().indexOf( s.toLowerCase() ) !== -1 ) )
          );

     //     this.serv.getDatas();

          /*
          const d = { userId: 4000,id: 4000,title: 'test', body: 'test'  };
          let a: Array<MyDatas>   = [] ;
          a.push( d ) ;

         this.subject.next( a );
          this.subject$.pipe(
              switchMap( m =>  { return this.serv.getDatas()   }  )
              
          ) */


     //     this.serv.getDatas3().subscribe();
          
        /*  this.serv.getDatas().pipe(
            tap( ( m  ) => this.subject.next(m ) ),
            switchMap( m =>  { return this.subject$ } )
            
     
         );*/


         
  }

      update() {
      console.log( 'update') ;
      this.subject$.next( 'POST' );


      }


      update2() {
        console.log( 'update') ;
        
        this.subject$.next( 'GET' );
        
        
              }
  }


