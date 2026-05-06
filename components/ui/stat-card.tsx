'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  delay?: number
}

export function StatCard({ label, value, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className="bg-bg-surface border border-bg-border rounded-none p-6 hover:border-lime/50 hover:shadow-lg hover:shadow-lime/10 transition-all group"
    >
      {icon && (
        <div className="mb-3 text-lime group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}
      <p className="text-text-secondary text-sm font-medium mb-2">{label}</p>
      <p className="text-4xl font-bebas text-lime">{value}</p>
    </motion.div>
  )
}
