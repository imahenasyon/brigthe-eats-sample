import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
  ) {}

  async create(leadData: Partial<Lead>): Promise<Lead> {
    const lead = this.leadsRepository.create(leadData);
    return this.leadsRepository.save(lead);
  }

  async findAll(): Promise<Lead[]> {
    return this.leadsRepository.find();
  }

  async findOne(id: number): Promise<Lead | null> {
    return this.leadsRepository.findOne({ where: { id } });
  }

  async update(id: number, leadData: Partial<Lead>): Promise<Lead> {
    const lead = await this.findOne(id);
    if (!lead) throw new Error('Lead not found');
    Object.assign(lead, leadData);
    return this.leadsRepository.save(lead);
  }

  async delete(id: number): Promise<void> {
    const result = await this.leadsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('No lead found with that ID');
    }
  }
  
}