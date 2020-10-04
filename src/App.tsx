import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './Api';
import './App.css';

export type answerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const TOTALQUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTALQUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTALQUESTIONS) {
      setGameOver(true);

    }
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {/* start button condition */}
      {gameOver || userAnswers.length === TOTALQUESTIONS ? (
        <button className='start' onClick={startTrivia}>Start</button>
      ) : null}
      {/* score condition */}

      {!gameOver ?
        <p className='score'>Score: {score}</p> : null
      }
      {/* Loading condition */}

      {loading ?
        <p className="loading">Loading Questions</p> : null
      }
      {!loading && !gameOver && (

        <QuestionCard questionNr={number + 1}
          totalQuestions={TOTALQUESTIONS}
          question={questions[number].question}
          answer={questions[number].answer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}

        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTALQUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>Next Question</button>

      ) : null}
    </div>
  );
}

export default App;
