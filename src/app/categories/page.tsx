import CategoryCard from '@/components/CategoryCard';

const categories = [
  { name: 'Baby Care', image: '/images/category/category-baby-care.jpg', slug: 'baby-care' },
  { name: 'Chicken, Meat & Fish', image: '/images/category/category-chicken-meat-fish.jpg', slug: 'chicken-meat-fish' },
  { name: 'Cleaning Essentials', image: '/images/category/category-cleaning-essentials.jpg', slug: 'cleaning-essentials' },
  { name: 'Pet Care', image: '/images/category/category-pet-care.jpg', slug: 'pet-care' },
  { name: 'Fruits & Vegetables', image: '/images/category/category-fruits-vegetables.jpg', slug:'fruits-vegetables' },
{ name: 'Cold Drinks & Juices', image: '/images/category/category-cold-drinks-juices.jpg', slug: 'cold-drinks-juices' },
{ name: 'Dairy, Bread & Eggs', image: '/images/category/category-dairy-bread-eggs.jpg', slug: 'dairy-bread-eggs' },
{ name: 'Snack & Munchies', image: '/images/category/category-snack-munchies.jpg', slug: 'snack-munchies' },
{ name: 'Bakery & Biscuits', image: '/images/category/category-bakery-biscuits.jpg', slug: 'bakery-biscuits' },
{ name: 'Instant Food', image: '/images/category/category-instant-food.jpg', slug: 'instant-food' },
{ name: 'Tea, Coffee & Drinks', image: '/images/category/category-tea-coffee-drinks.jpg', slug: 'tea-coffee-drinks' },
{ name: 'Atta, Rice & Dal', image: '/images/category/category-atta-rice-dal.jpg', slug: 'atta-rice-dal' },
];
export default function CategoriesPage() {
return (
<div className="py-12">
<div className="container-custom">
<div className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 mb-2">All Categories</h1>
<p className="text-gray-600">Browse products by category</p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.slug} {...category} />
      ))}
    </div>
  </div>
</div>
);
}