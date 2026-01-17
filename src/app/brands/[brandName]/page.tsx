import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BrandPageProps {
  params: {
    brandName: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  // In a real app, fetch brand data here
  const brandName = decodeURIComponent(params.brandName).replace(/-/g, ' ');
  
  return {
    title: `${brandName} - Shop Now`,
    description: `Browse all products by ${brandName} at our store`,
    openGraph: {
      title: `${brandName} Products`,
      description: `Discover the latest ${brandName} products`,
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const brandName = decodeURIComponent(params.brandName).replace(/-/g, ' ');
  
  // In a real app, you would fetch brand data and products here
  // const brand = await fetchBrandBySlug(params.brandName);
  // const products = await fetchProductsByBrand(params.brandName);
  
  // if (!brand) {
  //   notFound();
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{brandName} Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
        
        {/* Temporary placeholder */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Sample Product</h3>
          <p className="text-gray-600">Brand: {brandName}</p>
          <p className="text-green-600 font-medium mt-2">$99.99</p>
        </div>
      </div>
      
      {false && (
        <div className="mt-8 text-center">
          <p>No products found for {brandName}.</p>
        </div>
      )}
    </div>
  );
}