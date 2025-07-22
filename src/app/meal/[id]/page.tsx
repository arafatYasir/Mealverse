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
        <section className="bg-[#0D0D0D] text-white min-h-screen p-6 md:p-12 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">{meal?.strMeal}</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 md:w-1/2">
                    <Image
                        src={meal?.strMealThumb}
                        alt={meal?.strMeal}
                        width={600}
                        height={400}
                        className="rounded-xl object-cover"
                    />
                    <p className="mt-4 text-gray-300">
                        <strong>Category:</strong> {meal?.strCategory} <br />
                        <strong>Area:</strong> {meal?.strArea}
                    </p>
                </div>

                <div className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside mb-6">
                        {ingredients.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                    <p className="whitespace-pre-line text-gray-300">{meal?.strInstructions}</p>
                </div>
            </div>
        </section>
    );
};

export default MealDetailsPage;