import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Lead } from './lead.entity';
import { LeadsService } from './leads.service';

@Resolver(() => Lead)
export class LeadsResolver {
  constructor(private leadsService: LeadsService) {}

  @Mutation(() => Lead)
  async register(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('mobile') mobile: string,
    @Args('postcode') postcode: string,
    @Args('services', { type: () => [String] }) services: string[],
  ): Promise<Lead> {
    return this.leadsService.create({
      name,
      email,
      mobile,
      postcode,
      services,
    });
  }

  @Query(() => [Lead])
  async leads(): Promise<Lead[]> {
    return this.leadsService.findAll();
  }

  @Query(() => Lead, { nullable: true })
  async lead(@Args('id') id: number): Promise<Lead | null> {
    return this.leadsService.findOne(id);
  }
}