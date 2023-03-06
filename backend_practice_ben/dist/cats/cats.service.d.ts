import { Model } from 'mongoose';
import { Cat } from './interfaces/cat.interface';
import { CatInput } from './inputs/cat.input';
export declare class CatsService {
    private catModel;
    constructor(catModel: Model<Cat>);
    create(catInput: CatInput): Promise<Cat>;
    findAll(): Promise<Cat[]>;
}
