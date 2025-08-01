import React, { useEffect } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, description, username }) {
  const imageUrl = appwriteService.getFilePreview(featuredImage);

  useEffect(() => {
    console.log("Image URL:", imageUrl);
  }, [imageUrl]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 hover:bg-slate-200 shadow-2xl shadow-neutral-300 ">
        
        {/* Responsive Image Box */}
        <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-gray-200 dark:bg-gray-700">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = '/fallback-image.png';
              e.target.alt = 'Image not available';
            }}
          />
        </div>

        {/* Title */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-1">
            {description}
          </p>
        )}

        {/* Username */}
        {username && (
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            Posted by: {username}
          </p>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
