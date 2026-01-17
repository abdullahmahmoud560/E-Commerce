// src/app/products/[id]/loading.tsx
export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section Skeleton */}
            <div className="p-8 bg-white">
              <div className="space-y-4">
                {/* Main Image Skeleton */}
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                
                {/* Thumbnails Skeleton */}
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="p-8 bg-gray-50">
              <div className="space-y-6">
                {/* Title Skeleton */}
                <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
                
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                </div>
                
                {/* Price Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-12 bg-gray-200 rounded animate-pulse w-32" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
                </div>
                
                {/* Rating Skeleton */}
                <div className="h-10 bg-gray-200 rounded animate-pulse w-40" />
                
                {/* Quantity Skeleton */}
                <div className="h-12 bg-gray-200 rounded animate-pulse w-48" />
                
                {/* Buttons Skeleton */}
                <div className="space-y-3">
                  <div className="h-14 bg-gray-200 rounded-lg animate-pulse w-full" />
                  <div className="h-14 bg-gray-200 rounded-lg animate-pulse w-full" />
                </div>
                
                {/* Details Skeleton */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}