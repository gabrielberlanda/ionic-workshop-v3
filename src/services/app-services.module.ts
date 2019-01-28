import { ModelService } from './model.service';
import { BrandService } from './brand.service';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    BrandService,
    ModelService
  ],
})
export class AppServicesModule { }
