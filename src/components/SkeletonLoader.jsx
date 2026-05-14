import React from 'react'
import { motion } from 'framer-motion'

const SkeletonCard = () => {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Skeleton */}
      <div className="h-60 sm:h-72 lg:h-80 bg-gray-200 dark:bg-slate-700 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded mb-3 animate-pulse" />
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
        </div>
        
        {/* Features Skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-full w-20 animate-pulse" />
        </div>
        
        {/* Price Skeleton */}
        <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-24 mb-4 animate-pulse" />
        
        {/* Button Skeleton */}
        <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>
    </motion.div>
  )
}

const SkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

export { SkeletonCard, SkeletonGrid }
