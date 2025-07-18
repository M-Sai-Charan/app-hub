'use client';

import React from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaThumbsUp, FaRegEye } from 'react-icons/fa';

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
            <h2 className="text-lg font-semibold text-white mb-3">🔥 Trending Apps</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 px-1">
                {trendingApps.map((app) => (
                    <div
                        key={app.id}
                        className="bg-zinc-900 text-white rounded-lg p-4 shadow-md hover:shadow-lg transition w-full max-w-xs min-w-[240px] flex-shrink-0"
                    >
                        <div className="flex items-center gap-3 mb-3">
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
                            <div className="flex-1">
                                <h3 className="text-md font-semibold flex items-center gap-2">
                                    {app.name}
                                </h3>
                                <p className="text-sm text-zinc-400">{app.category}</p>
                            </div>
                        </div>

                        <p className="text-sm text-zinc-300 line-clamp-2 mb-4">
                            {app.description}
                        </p>

                        <div className="flex justify-between items-center text-sm text-zinc-400">
                            <span className="flex items-center gap-1">
                                <FaThumbsUp className="text-yellow-400" />
                                {app.upvotes} Upvotes
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    );
};

export default TrendingApps;
