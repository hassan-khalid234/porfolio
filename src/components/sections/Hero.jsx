import { motion } from "framer-motion";
import DimensionLine from "../primitives/DimensionLine";

export default function Hero() {
    const w = 520, h = 140;

    return (
        <section className="min-h-screen flex flex-col justify-center items-center gap-8">
            <h1 className="sr-only">
                Muhammad Hassan — AI/LLM Application Engineer
            </h1>

            <svg
                width={w}
                height={h}
                viewBox={`0 0 ${w} ${h}`}
                className="overflow-visible"
                aria-hidden="true"
            >
                <motion.rect
                    x={4} y={4} width={w - 8} height={h - 8}
                    fill="none"
                    stroke="var(--bp-line)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                />

                <motion.text
                    x={w / 2} y={h / 2 - 6}
                    textAnchor="middle"
                    fontFamily="var(--font-sans, sans-serif)"
                    fontWeight="700"
                    fontSize="34"
                    fill="var(--bp-text)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                >
                    MUHAMMAD HASSAN
                </motion.text>
                <motion.text
                    x={w / 2} y={h / 2 + 24}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="13"
                    letterSpacing="2"
                    fill="var(--bp-line-bright)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                >
                    AI/LLM APPLICATION ENGINEER
                </motion.text>
            </svg>

            <DimensionLine label="EST. 2027 — FINAL YEAR, UMT LAHORE" length={320} />
        </section>
    );
}