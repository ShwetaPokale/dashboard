import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UsersService } from '../users/users.service';
import { Category } from './categories.entity/categories.entity';
import { DeleteResult } from 'typeorm';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let mockCategoriesService: Partial<CategoriesService>;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    mockCategoriesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    mockUsersService = {
      findOne: jest.fn(),
      hasAccessToCategory: jest.fn(),
      findCategoriesForUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should create a category', async () => {
    const section = { id: 1 } as any;
    const category: Category = { 
      id: 1, 
      name: 'Category 1', 
      section, 
      description: 'Description',
      userCategories: [], 
      categoryCharts: [] 
    };
    jest.spyOn(mockCategoriesService, 'create').mockResolvedValue(category as any);
  
    const result = await controller.create({
      name: 'Category 1', 
      section: { id: 1 }, 
      description: 'Description'
    });
    expect(result).toEqual(category);
  });

  it('should return error if name is missing when creating a category', async () => {
    const result = await controller.create({ section: { id: 1 } });
    expect(result).toBe('Name is required');
  });

  it('should return error if section is missing when creating a category', async () => {
    const result = await controller.create({ name: 'Category 1' });
    expect(result).toBe('Section with ID is required');
  });

  it('should return all categories', async () => {
    const section = { id: 1 } as any;
    const categories: Category[] = [
      { 
        id: 1, 
        name: 'Category 1', 
        section, 
        description: 'Description',
        userCategories: [], 
        categoryCharts: []
      }
    ];
    jest.spyOn(mockCategoriesService, 'findAll').mockResolvedValue(categories as any);
    
    const result = await controller.findAll();
    expect(result).toEqual(categories);
  });

  it('should return a single category by ID', async () => {
    const section = { id: 1 } as any;
    const category: Category = { 
      id: 1, 
      name: 'Category 1', 
      section, 
      description: 'Description',
      userCategories: [], 
      categoryCharts: []
    };
    jest.spyOn(mockCategoriesService, 'findOne').mockResolvedValue(category as any);
    jest.spyOn(mockUsersService, 'findOne').mockResolvedValue({ userid: 1 } as any);
    jest.spyOn(mockUsersService, 'hasAccessToCategory').mockResolvedValue(true);

    const result = await controller.findOne(1, { headers: { userid: '1' } } as any);
    expect(result).toEqual(category);
  });

  it('should return error if user ID is missing when finding a category', async () => {
    const result = await controller.findOne(1, { headers: {} } as any);
    expect(result).toBe('User ID is required');
  });

  it('should return error if user does not have access to the category', async () => {
    const section = { id: 1 } as any;
    const category: Category = { 
      id: 1, 
      name: 'Category 1', 
      section, 
      description: 'Description',
      userCategories: [], 
      categoryCharts: []
    };
    jest.spyOn(mockCategoriesService, 'findOne').mockResolvedValue(category as any);
    jest.spyOn(mockUsersService, 'findOne').mockResolvedValue({ userid: 1 } as any);
    jest.spyOn(mockUsersService, 'hasAccessToCategory').mockResolvedValue(false);

    const result = await controller.findOne(1, { headers: { userid: '1' } } as any);
    expect(result).toBe('User does not have access to this category');
  });

  it('should update a category', async () => {
    const section = { id: 1 } as any;
    const category: Category = { 
      id: 1, 
      name: 'Updated Category', 
      section, 
      description: 'Updated Description',
      userCategories: [], 
      categoryCharts: []
    };
    jest.spyOn(mockCategoriesService, 'findOne').mockResolvedValue(category as any);
    jest.spyOn(mockCategoriesService, 'update').mockResolvedValue(category as any);

    const result = await controller.update(1, { name: 'Updated Category' });
    expect(result).toEqual(category);
  });

  it('should return error if no fields are provided for update', async () => {
    const result = await controller.update(1, {});
    expect(result).toBe('At least one field (name or description) is required for update');
  });

  it('should delete a category', async () => {
    const result: DeleteResult = { affected: 1 } as any;
    jest.spyOn(mockCategoriesService, 'remove').mockResolvedValue(result);

    const response = await controller.remove(1);
    expect(response).toBe('Category with ID 1 has been successfully deleted');
  });

  it('should return error if category not found during deletion', async () => {
    const result: DeleteResult = { affected: 0 } as any;
    jest.spyOn(mockCategoriesService, 'remove').mockResolvedValue(result);

    const response = await controller.remove(1);
    expect(response).toBe('Category with ID 1 not found');
  });

  it('should find categories by user and section', async () => {
    const section = { id: 1 } as any;
    const categories: Category[] = [
      { 
        id: 1, 
        name: 'Category 1', 
        section, 
        description: 'Description',
        userCategories: [], 
        categoryCharts: []
      }
    ];
    jest.spyOn(mockUsersService, 'findCategoriesForUser').mockResolvedValue(categories as any);

    const result = await controller.findCategoriesByUserAndSection(1, 1);
    expect(result).toEqual(categories);
  });
});
