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

  @Mutation(() => Lead)
  async leadEdit(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('mobile') mobile: string,
    @Args('postcode') postcode: string,
    @Args('services', { type: () => [String] }) services: string[],
  ): Promise<Lead> {
    const lead = await this.leadsService.findOne(id);
    if (!lead) throw new Error('Lead not found');
    Object.assign(lead, { name, email, mobile, postcode, services });
    return this.leadsService.update(id, { name, email, mobile, postcode, services });
  }

  @Mutation(() => Boolean)
  async leadDelete(@Args('id') id: number): Promise<boolean> {
    await this.leadsService.delete(id);
    return true;
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