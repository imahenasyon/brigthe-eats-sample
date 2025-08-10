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
            update: jest.fn(),
            delete: jest.fn(),
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

  describe('leadEdit', () => {
    it('should update an existing lead', async () => {
      const id = 1;
      const leadData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        mobile: '111222333',
        postcode: '67890',
        services: ['payment'],
      };
      const existingLead = {
        id,
        name: 'Old Name',
        email: 'old@example.com',
        mobile: '1234567890',
        postcode: '12345',
        services: ['delivery'],
      };
      const updatedLead = { ...existingLead, ...leadData };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingLead as any);
      jest.spyOn(service, 'update').mockResolvedValue(updatedLead as any);

      const result = await resolver.leadEdit(
        id,
        leadData.name,
        leadData.email,
        leadData.mobile,
        leadData.postcode,
        leadData.services,
      );

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(service.update).toHaveBeenCalledWith(id, {
        name: leadData.name,
        email: leadData.email,
        mobile: leadData.mobile,
        postcode: leadData.postcode,
        services: leadData.services,
      });
      expect(result).toEqual(updatedLead);
    });

    it('should throw an error if lead to update is not found', async () => {
      const id = 999;
      const leadData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        mobile: '111222333',
        postcode: '67890',
        services: ['delivery'],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(
        resolver.leadEdit(
          id,
          leadData.name,
          leadData.email,
          leadData.mobile,
          leadData.postcode,
          leadData.services,
        ),
      ).rejects.toThrow('Lead not found');
    });
  });

  describe('leadDelete', () => {
    it('should delete a lead and return true', async () => {
      const id = 1;
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      const result = await resolver.leadDelete(id);

      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });
  });
});
