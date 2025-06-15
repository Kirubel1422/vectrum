"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LampContainer } from "./lamp";
import { motion, Variants } from "motion/react";

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
} as Variants;

const Hero = () => {
  return (
    <LampContainer>
      <motion.h1
        variants={{ ...fadeInUpVariant, hidden: { opacity: 0.5, y: 100 } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Get Noticed by Recruiters <br /> with AI-Optimized Resumes
      </motion.h1>

      <motion.p
        variants={{ ...fadeInUpVariant, hidden: { opacity: 0.5, y: 100 } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-4 text-lg text-gray-400 max-w-xl text-center"
      >
        Upload your CV and our smart analyzer will match it to job descriptions,
        giving you personalized insights to improve your chances.
      </motion.p>

      <motion.div
        variants={fadeInUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-14"
      >
        <Link href="/auth/signin">
          <Button className="bg-secondary-600 hover:bg-secondary-500 !py-6 text-lg px-10 transition-all ease duration-300 hover:-translate-y-2">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </LampContainer>
  );
};

export default Hero;
