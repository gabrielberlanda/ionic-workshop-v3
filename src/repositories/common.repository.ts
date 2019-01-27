import { Repository, getRepository } from "typeorm";

export default abstract class CommonRepository<T> {
  private _repository: Repository<T>;
  private className: string;

  constructor(className: string) {
    this.className = className;
    this._repository = getRepository(this.className);
  }

  get repository(): Repository<T> {
    return this._repository;
  }

}