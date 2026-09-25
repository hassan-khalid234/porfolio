import { useRef } from "react";
import {
    useScroll,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
} from "framer-motion";

export function useDraw(offset = ["start 0.85", "start 0.35"]) {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset });
    const pathLength = useMotionValue(reduce ? 1 : 0);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (!reduce && v > pathLength.get()) pathLength.set(v);
    });

    return { ref, pathLength };
}