'use client';

import React from 'react';
import AppCard from './AppCard';

type Props = {
    query: string;
    selectedCategory: string | null;
};

const dummyApps = [
    {
        name: 'Streamly',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxG07G7imc8d_msbZ2helPYuVmRmacEghCg&s',
        category: 'OTT',
        description: 'Stream your favorite TV shows and movies anywhere, anytime.',
        upvotes: 245,
        isClaimed: true,
    },
    {
        name: 'ShopSwift',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_15oZDaIeEopUQYP5QIUezUAnBS1JXKNUQ&s',
        category: 'E-commerce',
        description: 'Your one-stop online shopping destination.',
        upvotes: 180,
        isClaimed: false,
    },
    {
        name: 'FinSmart',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3H_JALYBvplr8UFPgih5kfLyd_mlYsMGFN13V40PoRNmS0DprCGiT0y32LCtMVjSXy-0&usqp=CAU',
        category: 'Banking',
        description: 'Manage your finances with ease and security.',
        upvotes: 310,
        isClaimed: true,
    },
    {
        name: 'PlayNow',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUjdZUbyWzK85L5-achDuC6Ecas2mK0vj9QQ&s',
        category: 'Gaming',
        description: 'Casual and hardcore games in one place.',
        upvotes: 127,
        isClaimed: false,
    },
];

const AllAppsList: React.FC<Props> = ({ query, selectedCategory }) => {
    const filteredApps = dummyApps.filter((app) => {
        const matchesCategory =
            !selectedCategory || selectedCategory === 'All' || app.category === selectedCategory;

        const matchesSearch =
            app.name.toLowerCase().includes(query.toLowerCase()) ||
            app.category.toLowerCase().includes(query.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <section className="px-4">
            <h2 className="text-lg font-semibold text-white-800 mt-5">🔥 All Apps</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 mt-6">
                {filteredApps.length > 0 ? (
                    filteredApps.map((app, index) => <AppCard key={index} {...app} />)
                ) : (
                    <p className="text-zinc-400 col-span-full text-center">
                        No apps found for your search.
                    </p>
                )}
            </div>
        </section>
    );
};

export default AllAppsList;
