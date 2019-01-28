import { ModelRepository } from './../repositories/model.repository';
import { Injectable } from '@angular/core';
import Model from '../entities/model/model';

@Injectable()
export class ModelService {

  constructor( private modelRepository: ModelRepository ) {}

  save(model: Model): Promise<Model> {
    return this.modelRepository.save(model);
  }

  findById(id: number): Promise<Model> {
    return this.modelRepository.findByIdWithBrand(id);
  }

  listAll(): Promise<Model[]> {
    return this.modelRepository.listAll();
  }
  
}