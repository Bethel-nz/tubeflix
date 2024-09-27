'use client';
import { motion } from 'framer-motion';
export default function index() {
  return (
    <motion.div
      className='bg-zinc-900 rounded-lg p-8 shadow-lg'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.h2
        className='text-2xl font-bold text-white mb-4'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        No movie found
      </motion.h2>
      <motion.div
        className='w-12 h-12 border-t-2 border-white rounded-full animate-spin'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />
    </motion.div>
  );
}
