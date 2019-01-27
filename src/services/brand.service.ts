import { BrandRepository } from './../repositories/brand.repository';
import { Injectable } from '@angular/core';
import Brand from '../entities/brand/brand';

@Injectable()
export class BrandService {

  constructor(private brandRepository: BrandRepository) {}

  save(brand: Brand): Promise<Brand> {
    return this.brandRepository.save(brand);
  }

  listAll(): Promise<Brand[]> {
    return this.brandRepository.listAll();
  }

  delete(brandId: number): Promise<any> { 
    return this.brandRepository.delete(brandId);
  }
}