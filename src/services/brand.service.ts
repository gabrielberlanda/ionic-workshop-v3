import { BrandRepository } from './../repositories/brand.repository';
import { Injectable } from '@angular/core';
import Brand from '../entities/brand/brand';

@Injectable()
export class BrandService {

  constructor(private brandRepository: BrandRepository) {}

  createAndSave(brandName: string): Promise<Brand> {
    const brand = new Brand();
    brand.name = brandName;
    return this.brandRepository.save(brand);
  }

  listAll(): Promise<Brand[]> {
    return this.brandRepository.listAll();
  }
  
}