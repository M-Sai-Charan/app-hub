'use client';

import React from 'react';
import { FaThumbsUp, FaRegEye, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
type AppCardProps = {
  name: string;
  logo: string;
  category: string;
  description: string;
  upvotes: number;
  isClaimed?: boolean;
};

const AppCard = ({
  name,
  logo,
  category,
  description,
  upvotes,
  isClaimed = false,
}: AppCardProps) => {
  return (
    <div className="bg-zinc-900 text-white rounded-lg p-4 shadow-md hover:shadow-lg transition w-full max-w-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-white p-1">
          <Image
            src={logo}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
            priority
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {name}
            {isClaimed && (
              <FaCheckCircle className="text-green-400" title="Claimed by brand" />
            )}
          </h3>
          <p className="text-sm text-zinc-400">{category}</p>
        </div>
      </div>

      <p className="text-sm text-zinc-300 line-clamp-2 mb-4">
        {description}
      </p>

      <div className="flex justify-between items-center text-sm text-zinc-400">
        <span className="flex items-center gap-1">
          <FaThumbsUp className="text-yellow-400" />
          {upvotes}
        </span>
        <div className="flex gap-3">
          <button className="hover:text-white">
            <FaRegEye title="View" />
          </button>
          {/* <button className="hover:text-white">
            <FaThumbsUp title="Upvote" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AppCard;
