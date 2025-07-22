import Image from "next/image";

interface MealDetail {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    [key: string]: any; // for ingredients keys (strIngredient1, strIngredient2, etc)
}

const getMealDetails = async (id: string) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();

        return data?.meals ? data?.meals[0] : [];
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const MealDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const meal = await getMealDetails(id);

    // Constructing meal ingredients with measure
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient: string = meal[`strIngredient${i}`];
        const measure: string = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    if (!meal) {
        return (
            <div className="text-center text-white p-10">
                <h2 className="text-2xl font-bold">Meal not found</h2>
            </div>
        )
    }

    return (
        <section className="bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#121212] text-white min-h-screen p-6 md:p-12 max-w-6xl mx-auto rounded-lg shadow-lg shadow-black/30">
            <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-yellow-400 drop-shadow-lg">
                {meal?.strMeal}
            </h1>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Meal Image and Info */}
                <div className="flex-shrink-0 md:w-1/2">
                    <div className="overflow-hidden rounded-2xl shadow-lg border border-[#2e2e2e] hover:border-yellow-500 transition-all duration-300">
                        <Image
                            src={meal?.strMealThumb}
                            alt={meal?.strMeal}
                            width={600}
                            height={400}
                            className="rounded-2xl object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="mt-6 bg-[#1e1e1e] p-4 rounded-xl text-sm text-gray-300 shadow-inner shadow-black/20">
                        <p><span className="font-semibold text-white">Category:</span> {meal?.strCategory}</p>
                        <p><span className="font-semibold text-white">Area:</span> {meal?.strArea}</p>
                    </div>
                </div>

                {/* Ingredients & Instructions */}
                <div className="md:w-1/2">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-yellow-400 mb-4 border-b border-yellow-500 pb-2">Ingredients</h2>
                        <ul className="space-y-2 pl-4 text-gray-200 list-disc">
                            {ingredients.map((item, idx) => (
                                <li key={idx} className="hover:text-yellow-300 transition-colors duration-200">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-yellow-400 mb-4 border-b border-yellow-500 pb-2">Instructions</h2>
                        <p className="whitespace-pre-line leading-7 text-gray-300 tracking-wide">
                            {meal?.strInstructions}
                        </p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default MealDetailsPage;