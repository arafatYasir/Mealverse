import Image from "next/image";

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
        <section className="bg-[#0D0D0D] text-white py-10 px-4 md:px-12 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Meals in <span className="text-yellow-400">{name}</span>
            </h2>

            {/* ----Rendering Meals---- */}
            {meals.length === 0 ? (
                <p className="text-center text-gray-400">No meals found in this category.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {meals.map(meal => (
                        <div
                            key={meal?.idMeal}
                            className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
                        >
                            <Image
                                src={meal?.strMealThumb}
                                alt={meal?.strMeal}
                                width={320}
                                height={200}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-center">{meal?.strMeal}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CategoryMealsPage;