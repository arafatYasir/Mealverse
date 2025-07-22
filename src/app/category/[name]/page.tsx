import Image from "next/image";
import Link from "next/link";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const getMealsByCategory = async (categoryName: string) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await res.json();

        return data.meals;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const CategoryMealsPage = async ({ params }: { params: { name: string } }) => {
    const { name } = await params;

    const meals: Meal[] = await getMealsByCategory(name);

    return (
        <section className="bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#121212] text-white py-12 px-6 md:px-16 min-h-screen">
            <h2 className="text-4xl font-bold mb-10 text-center">
                Meals in <span className="text-yellow-400 underline underline-offset-4">{name}</span>
            </h2>

            {meals.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No meals found in this category.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {meals.map(meal => (
                        <Link key={meal?.idMeal} href={`/meal/${meal?.idMeal}`}>
                            <div className="group bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-lg shadow-black/30 hover:shadow-yellow-500/20 border border-[#2e2e2e] hover:border-yellow-500 transition duration-300 transform hover:scale-[1.03] cursor-pointer">
                                <div className="relative w-full h-48 overflow-hidden">
                                    <Image
                                        src={meal?.strMealThumb}
                                        alt={meal?.strMeal}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-semibold text-center text-white tracking-wide group-hover:text-yellow-400 transition-colors duration-200">
                                        {meal?.strMeal}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>

    );
};

export default CategoryMealsPage;