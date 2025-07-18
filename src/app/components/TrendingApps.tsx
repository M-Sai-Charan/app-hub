'use client';

import React from 'react';
import Image from 'next/image';
const trendingApps = [
    {
        id: 1,
        name: 'PayX',
        category: 'Banking',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3H_JALYBvplr8UFPgih5kfLyd_mlYsMGFN13V40PoRNmS0DprCGiT0y32LCtMVjSXy-0&usqp=CAU',
        upvotes: 320,
        description: 'Simplified digital banking experience',
    },
    {
        id: 2,
        name: 'GameZone',
        category: 'Gaming',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUjdZUbyWzK85L5-achDuC6Ecas2mK0vj9QQ&s',
        upvotes: 210,
        description: 'Console-quality games on your mobile',
    },
    {
        id: 3,
        name: 'Streamly',
        category: 'OTT',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxG07G7imc8d_msbZ2helPYuVmRmacEghCg&s',
        upvotes: 150,
        description: 'Stream your favorite shows anytime',
    },
];

const TrendingApps = () => {
    return (
        <section className="px-4">
            <h2 className="text-lg font-semibold text-white-800 mb-3">🔥 Trending Apps</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 mt-6">
                {trendingApps.map((app) => (
                    <div
                        key={app.id}
                        className="min-w-[220px] bg-zinc-900 shadow rounded-lg p-4 flex-shrink-0 hover:shadow-md transition"
                    >
                        <div className="w-12 h-12 rounded-full bg-white p-1">
                            <Image
                                src={app.logo}
                                alt={app.name}
                                width={48}
                                height={48}
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>

                        <h3 className="text-md font-medium">{app.name}</h3>
                        <p className="text-xs text-white-500 mb-1">{app.category}</p>
                        <p className="text-sm text-white-700 line-clamp-2">{app.description}</p>
                        <p className="mt-2 text-xs text-white-600">
                            👍 {app.upvotes} upvotes
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrendingApps;
