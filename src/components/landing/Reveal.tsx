"use client";
import { motion, type MotionProps, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

const offset = 28;
const variantsFor = (dir: Direction): Variants => {
  const map: Record<Direction, { x?: number; y?: number; scale?: number }> = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    scale: { scale: 0.94 },
    fade: {},
  };
  const from = map[dir];
  return {
    hidden: { opacity: 0, ...from },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.7, 0.2, 1],
      },
    },
  };
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as: As = "div",
  amount = 0.2,
  once = true,
  ...rest
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: keyof typeof motion;
  amount?: number;
  once?: boolean;
} & MotionProps) {
  const Comp = motion[As] as typeof motion.div;
  const v = variantsFor(direction);
  return (
    <Comp
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerGroup({
  children,
  className,
  delayChildren = 0.05,
  stagger = 0.08,
  amount = 0.18,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren, staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.2, 0.7, 0.2, 1] },
  },
};
