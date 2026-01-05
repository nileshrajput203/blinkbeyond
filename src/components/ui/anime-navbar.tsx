"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const location = useLocation()
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(defaultActive)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update active tab based on current route
  useEffect(() => {
    const currentItem = items.find(item => item.url === location.pathname)
    if (currentItem) {
      setActiveTab(currentItem.name)
    }
  }, [location.pathname, items])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-lg border border-border/50 py-2 px-2 rounded-full shadow-lg shadow-primary/10">
        <nav className="flex items-center gap-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-300",
                  "text-muted-foreground hover:text-foreground",
                  isActive && "text-primary-foreground"
                )}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="anime-nav-active"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-primary/30 rounded-full blur-md" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
                    </div>
                  </motion.div>
                )}

                {/* Icon and text */}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={18} strokeWidth={2.5} />
                  {!isMobile && (
                    <span className="hidden sm:inline">{item.name}</span>
                  )}
                </span>

                {/* Hover effect for non-active items */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 rounded-full bg-muted/50"
                    />
                  )}
                </AnimatePresence>

                {/* Active sparkle effects */}
                {isActive && (
                  <div className="absolute -inset-2 pointer-events-none">
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      className="absolute top-0 left-1/4 text-xs"
                    >
                      ✨
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute bottom-0 right-1/4 text-xs"
                    >
                      ✨
                    </motion.span>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
