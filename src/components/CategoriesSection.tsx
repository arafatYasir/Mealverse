import Image from "next/image";
import Link from "next/link";

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string
}

const getCategories = async () => {
    try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();

        return data.categories;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const CategoriesSection = async () => {
    const categories: Category[] = await getCategories();

    return (
        <section className="bg-[#0D0D0D] text-white py-10 px-4 md:px-12">
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-6 text-center">Meal Categories</h2>

            {/* Category Cards */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map(category => (
                    <Link
                        key={category?.idCategory}
                        href={`/category/${category.strCategory}`}
                    >
                        <div
                            className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
                        >
                            <Image
                                src={category?.strCategoryThumb}
                                alt={category?.strCategory}
                                width={320}
                                height={200}
                            />

                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{category?.strCategory}</h3>

                                <p className="text-sm text-gray-300 line-clamp-3">
                                    {category?.strCategoryDescription}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;