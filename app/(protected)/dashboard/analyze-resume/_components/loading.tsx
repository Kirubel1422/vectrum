"use client";

import { Bot, BrainCircuit, Code, FileSearch, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const aiProcessingMessages = [
  "Initializing analysis protocols...",
  "Parsing your resume structure...",
  "Extracting key skills and experiences...",
  "Analyzing job description requirements...",
  "Cross-referencing your skills with the role...",
  "Checking for ATS keyword compatibility...",
  "Synthesizing your match report...",
] as const;

export function AIProcessingIndicator() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  // Effect to cycle through the messages every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        (prevIndex) => (prevIndex + 1) % aiProcessingMessages.length
      );
    }, 2500);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const icons = [
    {
      component: <FileSearch className="h-6 w-6 text-sky-400" />,
      position: "top",
    },
    {
      component: <Code className="h-6 w-6 text-emerald-400" />,
      position: "left",
    },
    {
      component: <Sparkles className="h-6 w-6 text-amber-400" />,
      position: "right",
    },
    {
      component: <Bot className="h-6 w-6 text-purple-400" />,
      position: "bottom",
    },
  ];

  return (
    <div className="inset-0 fixed bg-black/70 flex items-center justify-center z-[999] overflow-y-hidden ">
      <div className="flex flex-col items-center justify-center gap-8 p-6 text-foreground">
        {/* The main animated graphic */}
        <div className="relative h-40 w-40">
          {/* Central pulsing brain icon */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <BrainCircuit className="h-20 w-20 text-primary" />
          </motion.div>

          {/* Orbiting icons container */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {icons.map((icon, index) => {
              let positionClasses = "";
              switch (icon.position) {
                case "top":
                  positionClasses = "top-0 left-1/2 -translate-x-1/2";
                  break;
                case "left":
                  positionClasses = "left-0 top-1/2 -translate-y-1/2";
                  break;
                case "right":
                  positionClasses = "right-0 top-1/2 -translate-y-1/2";
                  break;
                case "bottom":
                  positionClasses = "bottom-0 left-1/2 -translate-x-1/2";
                  break;
              }

              return (
                <motion.div
                  key={index}
                  className={`absolute ${positionClasses}`}
                  // This makes each icon "wobble" and counter-rotate slightly for a more dynamic feel
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {icon.component}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* The cycling text message */}
        <div className="h-6 w-full max-w-sm text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessageIndex}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground"
            >
              {aiProcessingMessages[currentMessageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
