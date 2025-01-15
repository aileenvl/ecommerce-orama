import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const formatImageUrl = (imageArray: string[]) => {
  const allUrls = imageArray.join('').split('~');
  const laydownUrl = allUrls.find(url => url.includes('laydown.jpg')) || allUrls[0];
  
  return laydownUrl
    .replace('w_600f_autoq_auto', 'w_600,f_auto,q_auto,fl_lossy,c_fill,g_auto');
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = formatImageUrl(product.images);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">{product.brand}</p>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm text-gray-600">{product.average_rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">Color: {product.color}</p>
        <div className="text-sm text-gray-500 mb-3">
          <p className="line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">${product.selling_price.toFixed(2)}</span>
          <div className="text-sm text-gray-500">{product.sku}</div>
        </div>
        
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          View Product
        </a>
      </div>
    </div>
  );
}