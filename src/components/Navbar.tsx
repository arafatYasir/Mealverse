import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="w-full py-4 px-8 bg-[#0f172a] text-white border-b border-slate-700 flex justify-between items-center">
            <h1 className="text-xl font-bold">Mealverse</h1>
            <ul className="flex space-x-6 text-sm">
                <li>
                    <Link href="/" className="hover:text-emerald-400">Home</Link>
                </li>
                <li>
                    <Link href="/meals" className="hover:text-emerald-400">Meals</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;