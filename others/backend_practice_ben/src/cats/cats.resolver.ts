import { Mutation, Query, ResolveField, Resolver, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatReturn } from './dto/cat.return';
import { CatInput } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(
    //   private authorsService: AuthorsService,
    //   private postsService: PostsService,
    private readonly catsService: CatsService,
  ) {}

  //   @Query((returns) => Author)
  //   async author(@Args('id', { type: () => Int }) id: number) {
  //     return this.authorsService.findOneById(id);
  //   }

  @Query(() => String)
  async hello123() {
    return 'Hello World!';
  }

  @Query(() => [CatReturn])
  async cats() {
    return this.catsService.findAll();
  }
  @Mutation(() => CatReturn)
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
