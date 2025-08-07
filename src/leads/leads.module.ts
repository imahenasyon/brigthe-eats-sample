import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { LeadsService } from './leads.service';
import { LeadsResolver } from './leads.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [LeadsService, LeadsResolver],
})
export class LeadsModule {}