import { CatsService } from './cats.service';
import { CatInput } from './inputs/cat.input';
export declare class CatsResolver {
    private readonly catsService;
    constructor(catsService: CatsService);
    hello123(): Promise<string>;
    cats(): Promise<import("./interfaces/cat.interface").Cat[]>;
    createCat(input: CatInput): Promise<import("./interfaces/cat.interface").Cat>;
}
