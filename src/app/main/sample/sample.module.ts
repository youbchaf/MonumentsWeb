import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SampleComponent } from './sample.component';
import { HomeComponent } from './home.component';
import { MonumentsComponent } from 'app/monuments/monuments.component';
import {SwiperModule} from "ngx-swiper-wrapper";
import {GoogleMapsModule} from "@angular/google-maps";


const routes = [
  {
    path: 'monuments',
    component: MonumentsComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  }
];

@NgModule({
  declarations: [SampleComponent, HomeComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule, SwiperModule, GoogleMapsModule],
  exports: [SampleComponent, HomeComponent]
})
export class SampleModule {}
