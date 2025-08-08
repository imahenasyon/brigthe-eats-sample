import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';
import { LeadsService } from './leads.service';

describe('LeadsService', () => {
  let service: LeadsService;
  let repository: Repository<Lead>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getRepositoryToken(Lead),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    repository = module.get<Repository<Lead>>(getRepositoryToken(Lead));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new lead', async () => {
      const leadData = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        postcode: '12345',
        services: ['delivery'],
      };
      const expectedLead = { id: 1, ...leadData };

      jest.spyOn(repository, 'create').mockReturnValue(expectedLead as any);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedLead as any);

      const result = await service.create(leadData);
      expect(repository.create).toHaveBeenCalledWith(leadData);
      expect(repository.save).toHaveBeenCalledWith(expectedLead);
      expect(result).toEqual(expectedLead);
    });
  });

  describe('findAll', () => {
    it('should return an array of leads', async () => {
      const leads = [
        { id: 1, name: 'Lead 1' },
        { id: 2, name: 'Lead 2' },
      ] as Lead[];

      jest.spyOn(repository, 'find').mockResolvedValue(leads);

      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(leads);
    });
  });

  describe('findOne', () => {
    it('should return a single lead', async () => {
      const lead = { id: 1, name: 'Test Lead' } as Lead;
      jest.spyOn(repository, 'findOne').mockResolvedValue(lead);

      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(lead);
    });

    it('should return null when lead not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });
});