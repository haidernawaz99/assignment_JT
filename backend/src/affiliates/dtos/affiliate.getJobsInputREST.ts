export interface GetJobAffiliatesInputParamsREST {
  affiliateToken: string;
  categories: category[];
  limit: number;
}
export type category = 'Design' | 'Development' | 'Product' | 'Other';
