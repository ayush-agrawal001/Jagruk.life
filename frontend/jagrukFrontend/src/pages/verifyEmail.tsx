import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import ProgressBar from './../components/progressBar';
import { Toaster } from "@/components/ui/toaster";
import { isUserVerified } from "@/atoms";
import { useRecoilValue } from "recoil";

export default function WaitingPage() {
  // const [pollingTime] = useState<number>(500);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const TIMEOUT_LIMIT = 60000; // 1 minute in milliseconds
  const isUser = useRecoilValue(isUserVerified);

  setInterval(() => {
    setTimeElapsed((prev) => prev + 1000);
  }, 1000);

  const progress = (timeElapsed / TIMEOUT_LIMIT) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        {!isUser ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
            <p className="mb-4">Please check your inbox and click the verification link.</p>
            <ProgressBar progress={progress} />
            <p className="mt-2 text-sm text-gray-600">
              Time remaining: {Math.round((TIMEOUT_LIMIT - timeElapsed) / 1000)}s
            </p>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <motion.h1
                className="text-2xl font-bold mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Email verified
              </motion.h1>
            </div>
          </motion.div>
        )}
      </div>
      <Toaster></Toaster>
    </div>
  );
}