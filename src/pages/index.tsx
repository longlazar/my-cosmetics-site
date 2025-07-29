import { useState } from 'react';
import Link from 'next/link';
import ingredients from '../data/ingredients.json';
type Ingredient = {
  slug: string;
  name: string;
  description: string;
  sources: string[];
  products_by_popularity: string[];
  products_by_percentage: string[];
  tags?: string[];
  image?: string;
};


export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(ingredients.flatMap((ingr) => ingr.tags || []))
  );

  const filtered = ingredients.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? i.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🍃 Каталог косметических ингредиентов
      </h1>

      {/* 🔍 Поиск */}
      <input
        type="text"
        placeholder="Поиск по названию или описанию..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full sm:w-1/2"
      />

      {/* 🏷 Фильтр по тегам */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full border ${
            selectedTag === null
              ? 'bg-black text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full border text-sm ${
              selectedTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 📦 Карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((ingr) => (
          <div
            key={ingr.slug}
            className="border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white"
          >
            {ingr.image && (
              <img
                src={ingr.image}
                alt={ingr.name}
                className="h-32 w-32 object-contain mx-auto mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2 text-center">
              {ingr.name}
            </h2>
            <p className="text-gray-700 text-sm mb-4 text-center">
              {ingr.description}
            </p>
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {(ingr.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-2 py-0.5 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-center">
              <Link href={`/ingredient/${ingr.slug}`}>
                <span className="inline-block text-blue-600 hover:underline text-sm font-medium cursor-pointer">
                  Подробнее →
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}