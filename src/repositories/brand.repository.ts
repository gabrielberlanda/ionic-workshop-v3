import { Injectable } from '@angular/core';
import Brand from '../entities/brand/brand';
import CommonRepository from './common.repository';

@Injectable()
export class BrandRepository extends CommonRepository<Brand> {
  
  constructor() {
    super('Brand');
  }

  save(brand: Brand):Promise<Brand> {
    return this.repository.save(brand);
  }

  listAll(): Promise<Brand[]> {
    return this.repository.find();
  }

  delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}