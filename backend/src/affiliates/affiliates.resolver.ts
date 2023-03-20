import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { CreateAffiliateInputParams } from '../affiliates/interfaces/affiliate.getCreateAffiliateInput';
import { CreateAffiliateReturn } from '../affiliates/interfaces/affiliate.createAffiliate.return';
import { AdminAffiliateReturn } from '../affiliates/interfaces/affiliate.adminAffiliates.return';
import { GetAllAffiliatesInputParams } from '../affiliates/interfaces/affiliate.getAllAffiliatesInput';
import { ApproveAffiliatesInputParams } from '../affiliates/interfaces/admin.approveAffiliatesInput';
import { GetJobAffiliatesInputParams } from '../affiliates/interfaces/affiliate.getJobsInput';
import { AffiliateJobReturn } from './interfaces/affiliate.getJobsAffiliate.return';
import { DeleteAffiliatesInputParams } from '../affiliates/interfaces/admin.deleteAffiliateInput';
import { DisableAffiliatesInputParams } from '../affiliates/interfaces/admin.disableAffiliateInput';
import { EnableAffiliatesInputParams } from '../affiliates/interfaces/admin.enableAffiliateInput';
import { AffiliatesService } from './affiliates.service';

@Resolver()
export class AffiliatesResolver {
  constructor(private readonly affiliateService: AffiliatesService) {}
  @Mutation(() => CreateAffiliateReturn)
  async createAffiliate(@Args('input') input: CreateAffiliateInputParams) {
    console.log('Create Affiliate: ', input);
    return this.affiliateService.createAffiliate(input);
  }

  @Query(() => [AdminAffiliateReturn])
  async getAllAffiliates(@Args('input') input: GetAllAffiliatesInputParams) {
    return this.affiliateService.getAllAffiliates(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async approveAffiliate(@Args('input') input: ApproveAffiliatesInputParams) {
    console.log('Manage Affiliate: ', input);
    return this.affiliateService.approveAffiliate(input);
  }

  @Query(() => [AffiliateJobReturn])
  async getJobsAffiliate(
    @Args('input', { nullable: true }) input: GetJobAffiliatesInputParams,
  ) {
    return this.affiliateService.getJobsAffiliate(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async deleteAffiliate(@Args('input') input: DeleteAffiliatesInputParams) {
    console.log('Delete Affiliate: ', input);
    return this.affiliateService.deleteAffiliate(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async disableAffiliate(@Args('input') input: DisableAffiliatesInputParams) {
    console.log('Disable Affiliate: ', input);
    return this.affiliateService.disableAffiliate(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async enableAffiliate(@Args('input') input: EnableAffiliatesInputParams) {
    console.log('Enable Affiliate: ', input);
    return this.affiliateService.enableAffiliate(input);
  }
}
