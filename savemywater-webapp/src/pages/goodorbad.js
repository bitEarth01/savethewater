// pages/index.js
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const questions = [
  { question: "Do you recycle your plastic bottles?", isGood: true },
  { question: "Do you dispose of hazardous chemicals properly?", isGood: true },
  // Add more questions with their correct answers
  { question: "Do you conserve water by fixing leaks promptly?", isGood: true },
  { question: "Do you use natural cleaning products?", isGood: true },
  // Add more questions (total 50 questions)
  { question: "Do you properly dispose of electronic waste?", isGood: true },
  {
    question: "Do you participate in local water cleanup events?",
    isGood: true,
  },
];

const images = {
  smilemin: "/smilemin.svg",
  smilebelowaverage: "/smilebelowaverage.svg",
  smileaverage: "/smileaverage.svg",
  smileaboveaverage: "/smileaboveaverage.svg",
  smilemax: "/smilemax.svg",
};

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [showPlayerInput, setShowPlayerInput] = useState(true);
  const controls = useAnimation(); // Initialize animation controls

  useEffect(() => {
    if (!showPlayerInput && currentQuestionIndex >= questions.length) {
      // Trigger an animation when the results are displayed
      controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }
  }, [currentQuestionIndex, showPlayerInput, controls]);

  const handleAnswer = (isGood) => {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      if (question.isGood === isGood) {
        setScore(score + 1);
      }

      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleStartGame = () => {
    setShowPlayerInput(false);
  };

  return (
    <div className="h-screen bg-cover  bg-[url('https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]">
      <div className="flex justify-center items-center min-h-screen ">
        <div className="max-w-7xl p-4 flex">
          {/* Left Column: Player Name Input and Questionnaire */}
          <div className=" p-6  rounded-lg ">
            {showPlayerInput ? (
              <div className="mb-6 ">
                <h1 className="text-7xl font-semibold mb-6">
                  Water Pollution <br /> Prevention Game
                </h1>
                <p className="text-xl my-4">Enter your name:</p>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="border rounded p-3 bg-white/5 border-sky-500 backdrop-blur-md w-full text-gray-800"
                />
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 transition duration-300 my-4"
                  onClick={handleStartGame}
                >
                  Start Game
                </button>
              </div>
            ) : (
              <>
                {currentQuestionIndex < questions.length ? (
                  <>
                    <motion.p
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl mb-6 text-center max-w-xl mx-auto"
                    >
                      {questions[currentQuestionIndex].question}
                    </motion.p>
                    <div className="gap-8 flex flex-row items-center justify-center">
                      <button
                        className="px-12 py-3 bg-green-500 shadow-lg shadow-green-300 text-white rounded hover:bg-green-600 transition duration-300"
                        onClick={() => handleAnswer(true)}
                      >
                        Yes
                      </button>
                      <p>or</p>
                      <button
                        className="px-12 py-3 bg-red-500 shadow-lg shadow-red-300 text-white rounded hover:bg-red-600 transition duration-300"
                        onClick={() => handleAnswer(false)}
                      >
                        No
                      </button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls} // Use the animation controls
                    className="text-xl mt-6 max-w-3xl"
                  >
                    <p className="text-2xl mb-8">
                      Congratulations <span className="font-bold ">{playerName}!</span>
                    </p>
                    <p className="text-2xl">
                      Your score:{" "}
                      <span className="font-bold bg-white px-3 py-1 rounded-lg ">
                        {((score / questions.length) * 100).toFixed(2)}%
                      </span>
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Right Column: Changing Image */}
          <div className=" p-4 flex flex-col justify-center">
            {currentQuestionIndex >= questions.length && (
              <motion.img
                src={images.smilemin}
                alt="Smile Image"
                initial={{ opacity: 0, y: -20 }}
                animate={controls} // Use the animation controls
                className="max-h-24"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
