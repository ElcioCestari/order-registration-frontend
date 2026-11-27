import { Category } from './category';

describe('Category', () => {
  it('should have values', () => {
    expect(Object.values(Category).length).toBeGreaterThan(0);
  });
});
