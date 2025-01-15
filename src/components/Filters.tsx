import React from 'react';

interface FiltersProps {
  priceRange: number;
  onPriceRangeChange: (value: number) => void;
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  brands: string[];
  sizes: string[];
  categories: string[];
}

export function Filters({
  priceRange,
  onPriceRangeChange,
  selectedBrand,
  onBrandChange,
  selectedSize,
  onSizeChange,
  selectedCategory,
  onCategoryChange,
  brands,
  sizes,
  categories,
}: FiltersProps) {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Price: ${priceRange}
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={(e) => onPriceRangeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
        <select
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
        <select
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Sizes</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}