import { Test, TestingModule } from '@nestjs/testing';
import { LeadsResolver } from './leads.resolver';
import { LeadsService } from './leads.service';
import { Lead } from './lead.entity';

describe('LeadsResolver', () => {
  let resolver: LeadsResolver;
  let service: LeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsResolver,
        {
          provide: LeadsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<LeadsResolver>(LeadsResolver);
    service = module.get<LeadsService>(LeadsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('register', () => {
    it('should create a new lead', async () => {
      const leadData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        mobile: '0987654321',
        postcode: '54321',
        services: ['delivery'],
      };
      const expectedLead = { id: 1, ...leadData };

      jest.spyOn(service, 'create').mockResolvedValue(expectedLead as any);

      const result = await resolver.register(
        leadData.name,
        leadData.email,
        leadData.mobile,
        leadData.postcode,
        leadData.services
      );

      expect(service.create).toHaveBeenCalledWith(leadData);
      expect(result).toEqual(expectedLead);
    });
  });

  describe('leads', () => {
    it('should return an array of leads', async () => {
      const leads = [
        { id: 1, name: 'Lead A' },
        { id: 2, name: 'Lead B' },
      ] as Lead[];

      jest.spyOn(service, 'findAll').mockResolvedValue(leads);

      const result = await resolver.leads();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(leads);
    });
  });

  describe('lead', () => {
    it('should return a single lead by id', async () => {
      const lead = { id: 1, name: 'Single Lead' } as Lead;
      jest.spyOn(service, 'findOne').mockResolvedValue(lead);

      const result = await resolver.lead(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(lead);
    });

    it('should return null when lead not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const result = await resolver.lead(999);
      expect(result).toBeNull();
    });
  });
});
