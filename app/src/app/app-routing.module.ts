import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RxtestComponent } from './rxtest/rxtest.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent,   children:
    [
      { path: '', component: RxtestComponent },
      { path: 'test1', component: RxtestComponent },
      { path: 'test2', component: Test2Component },
      { path: 'test3', component: Test3Component }
  
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
