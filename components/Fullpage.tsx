"use client"
import { PropsWithChildren } from "react"
import { motion } from "framer-motion"

export function FullpageContainer({ children }: PropsWithChildren) {
    return (
        <div
            className="
        h-[calc(100dvh-64px)] overflow-y-auto
        md:snap-y md:snap-proximity      /* mềm hơn mandatory */
        scroll-smooth fullpage
      "
        >
            {children}
        </div>
    )
}

export function FullpageSection({ children }: PropsWithChildren) {
    return (
        <motion.section
            className="min-h-[calc(100dvh-64px)] md:snap-start flex items-center"
            initial={{ opacity: 0 }}          // bỏ translateY để không xung đột snap
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
        >
            <div className="w-full">{children}</div>
        </motion.section>
    )
}
