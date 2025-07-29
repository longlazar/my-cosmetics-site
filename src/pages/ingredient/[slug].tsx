import { useRouter } from 'next/router';
import ingredients from '../../data/ingredients.json';

export default function IngredientPage() {
  const router = useRouter();
  const { slug } = router.query;

  const ingredient = ingredients.find((i) => i.slug === slug);

  if (!ingredient) return <p className="p-6">Ингредиент не найден</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{ingredient.name}</h1>
      <p className="mb-4">{ingredient.description}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🔬 Научные исследования</h2>
      <ul className="list-disc pl-6">
        {ingredient.sources.map((src, i) => (
          <li key={i}>
            <a href={src} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {src}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">📦 Популярные продукты</h2>
      <ul className="list-disc pl-6">
        {ingredient.products_by_popularity.map((prod, i) => (
          <li key={i}>{prod}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">💪 По процентному содержанию</h2>
      <ul className="list-disc pl-6">
        {ingredient.products_by_percentage.map((prod, i) => (
          <li key={i}>{prod}</li>
        ))}
      </ul>
    </div>
  );
}