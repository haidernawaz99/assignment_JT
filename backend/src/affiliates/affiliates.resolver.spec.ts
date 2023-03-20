import { Test, TestingModule } from '@nestjs/testing';
import { AffiliatesResolver } from './affiliates.resolver';

describe('AffiliatesResolver', () => {
  let resolver: AffiliatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AffiliatesResolver],
    }).compile();

    resolver = module.get<AffiliatesResolver>(AffiliatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
