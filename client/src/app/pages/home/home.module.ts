import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RegionComponent } from './components/region/region.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    HomeComponent,
    RegionComponent,
    FilterBarComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
