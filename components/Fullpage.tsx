"use client"
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState, Children } from "react"
import { motion, useReducedMotion } from "framer-motion"

export function FullpageContainer({ children }: PropsWithChildren) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    // Observe sections to track which is active
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const sections = Array.from(container.querySelectorAll<HTMLElement>(".fp-section"))
        if (sections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the entry with the largest intersection ratio
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
                if (!visible) return
                const index = sections.findIndex((s) => s === visible.target)
                if (index >= 0) setActiveIndex(index)
            },
            {
                root: container,
                threshold: [0.2, 0.6, 0.9],
            }
        )

        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    const scrollToIndex = useCallback((index: number) => {
        const container = containerRef.current
        if (!container) return
        const sections = Array.from(container.querySelectorAll<HTMLElement>(".fp-section"))
        const clamped = Math.max(0, Math.min(index, sections.length - 1))
        sections[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [])

    // Arrow/PageUp/PageDown keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (["ArrowDown", "PageDown"].includes(e.key)) {
                e.preventDefault()
                scrollToIndex(activeIndex + 1)
            } else if (["ArrowUp", "PageUp"].includes(e.key)) {
                e.preventDefault()
                scrollToIndex(activeIndex - 1)
            }
        }
        window.addEventListener("keydown", handler, { passive: false })
        return () => window.removeEventListener("keydown", handler as any)
    }, [activeIndex, scrollToIndex])

    return (
        <div
            ref={containerRef}
            className="w-screen h-[calc(100svh-64px)] overflow-y-auto overflow-x-hidden md:snap-y md:snap-mandatory scroll-smooth fullpage relative"
        >
            {children}

            {/* Dots navigation */}
            <div className="hidden md:flex flex-col gap-3 fixed right-4 top-1/2 -translate-y-1/2 z-50">
                {Array.from({ length: Children.count(children) }).map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to section ${i + 1}`}
                        onClick={() => scrollToIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                            i === activeIndex ? "bg-purple-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export function FullpageSection({ children }: PropsWithChildren) {
    const reduceMotion = useReducedMotion()
    const variants = useMemo(
        () => ({
            hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
            shown: { opacity: 1, y: 0 },
        }),
        [reduceMotion]
    )

    return (
        <motion.section
            className="fp-section w-screen h-[calc(100svh-64px)] md:snap-start flex items-stretch"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            variants={variants}
        >
            <div className="w-screen h-full">{children}</div>
        </motion.section>
    )
}
