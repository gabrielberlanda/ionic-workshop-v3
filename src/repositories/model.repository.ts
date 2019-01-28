import { Injectable } from '@angular/core';
import CommonRepository from './common.repository';
import Model from '../entities/model/model';

@Injectable()
export class ModelRepository extends CommonRepository<Model> {

  constructor() { 
    super('Model')
  }

  listAll(): Promise<Model[]> {
    return this.repository
              .createQueryBuilder('model')
              .leftJoinAndSelect('model.brand', 'brand')
              .getMany();
  }

  findByIdWithBrand(id: number): Promise<Model> {
    return this.repository.findOne(id, { 
      relations: ['brand']
    });
  }

  async save(model: Model): Promise<Model> {
    const modelSaved: Model = await this.repository.save(model);
    
    console.log('Model saved', modelSaved);
    
    return this.findByIdWithBrand(modelSaved.id);
  }

}