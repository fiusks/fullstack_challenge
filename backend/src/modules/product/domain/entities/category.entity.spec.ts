import { Category } from './category.entity';
import { EntityId } from '../../../common/domain';

describe('Category', () => {
  const mockCategoryProps: Category.CreateProps = {
    name: 'Category Name',
    description: 'Category Description',
    enabled: true,
  };

  it('should create a new Category instance with valid properties', () => {
    const category = Category.create(mockCategoryProps);

    expect(category).toBeInstanceOf(Category);
    expect(category.id).toBeInstanceOf(EntityId);
    expect(category.name).toBe(mockCategoryProps.name);
    expect(category.description).toBe(mockCategoryProps.description);
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.updatedAt).toBeInstanceOf(Date);
  });

  it('should update category properties', () => {
    const category = Category.create(mockCategoryProps);
    const updatedProps = {
      name: 'Updated Category Name',
      description: 'Updated Category Description',
    };

    category.update(updatedProps);

    expect(category.name).toBe(updatedProps.name);
    expect(category.description).toBe(updatedProps.description);
  });
});
