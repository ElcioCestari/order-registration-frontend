import { Category } from './category';

describe('category', () => {
  describe('getKeys', () => {
    it('should be return a not empty array', () => {
      expect(Category.getKeys().length).toBeGreaterThan(0);
    });
  });
});
