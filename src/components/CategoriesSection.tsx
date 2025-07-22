import Image from "next/image";
import Link from "next/link";

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

const getCategories = async () => {
    try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();
        return data.categories;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const CategoriesSection = async () => {
    const categories: Category[] = await getCategories();

    return (
        <section className="relative bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#0F172A] py-14 px-4 md:px-12">
            {/* Section Title */}
            <h2 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg tracking-wide">
                🍽️ Explore Meal Categories
            </h2>

            {/* Category Grid */}
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                    <Link key={category?.idCategory} href={`/category/${category.strCategory}`}>
                        <div className="group relative rounded-2xl overflow-hidden bg-[#1a1a1a]/60 backdrop-blur-md shadow-xl hover:shadow-2xl border border-[#2f2f2f] hover:border-indigo-500 transition-all duration-300">
                            {/* Image with overlay */}
                            <div className="relative w-full h-48">
                                <Image
                                    src={category?.strCategoryThumb}
                                    alt={category?.strCategory}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-white mb-2 tracking-wide group-hover:text-indigo-400 transition-colors">
                                    {category?.strCategory}
                                </h3>
                                <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
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
