import { ModelRepository } from './model.repository';
import { BrandRepository } from './brand.repository';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    BrandRepository,
    ModelRepository
  ],
})
export class AppRepositoriesModule { }
