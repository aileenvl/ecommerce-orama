import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { ProductCard } from './components/ProductCard';
import { searchProducts } from './services/oramaService';
import { Product } from './types/product';
import { Loader2 } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9; // 3x3 grid
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setCurrentPage(1);
      const results = await searchProducts(
        searchTerm,
        priceRange,
        selectedBrand,
        selectedSize,
        selectedCategory,
        0,
        itemsPerPage
      );
      
      setProducts(results?.hits as unknown as Product[]);
      setTotalItems(results?.count || 0);
      
      const uniqueBrands = [...new Set(results?.hits.map((product: Product) => product.document.brand))];
      const uniqueSizes = [...new Set(results?.hits.flatMap((product: Product) => product.document.sizes))];
      const uniqueCategories = [...new Set(results?.hits.map((product: Product) => product.document.category))];
      
      setBrands(uniqueBrands);
      setSizes(uniqueSizes);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [currentPage, priceRange, selectedBrand, selectedSize, selectedCategory]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Product Search
        </h1>
        
        <div className="flex justify-center mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Filters
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              brands={brands}
              sizes={sizes}
              categories={categories}
            />
          </div>

          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.document.sku} product={product.document} />
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                {searchTerm ? 'No products found' : 'Start searching to see products'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;