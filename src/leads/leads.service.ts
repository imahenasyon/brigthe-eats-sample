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
}