import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
}

export default function CategoryCard({ name, image, slug }: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`} className="block">
      <div className="text-center group cursor-pointer">
        <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
}