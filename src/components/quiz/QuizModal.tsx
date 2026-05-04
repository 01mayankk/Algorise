"use client";

import React, { useState } from 'react';
import { Algorithm } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizModalProps {
  algorithm: Algorithm;
}

export function QuizModal({ algorithm }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const quiz = algorithm.quiz;

  const handleOptionSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === quiz[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(resetQuiz, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button variant="outline" className="gap-2 font-medium border-primary/20 hover:bg-primary/10 hover:text-primary">
          <BrainCircuit className="w-4 h-4" />
          Test Yourself
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{algorithm.name} Quiz</DialogTitle>
          <DialogDescription>
            Test your knowledge about {algorithm.name}.
          </DialogDescription>
        </DialogHeader>

        {!isFinished ? (
          <div className="space-y-6 py-4">
            <div className="text-sm font-medium text-muted-foreground flex justify-between">
              <span>Question {currentQuestion + 1} of {quiz.length}</span>
              <span>Score: {score}</span>
            </div>
            
            <h3 className="text-lg font-semibold">{quiz[currentQuestion].question}</h3>
            
            <div className="space-y-3">
              {quiz[currentQuestion].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === quiz[currentQuestion].correct;
                let bgClass = "bg-secondary/50 hover:bg-secondary";
                let icon = null;

                if (showExplanation) {
                  if (isCorrect) {
                    bgClass = "bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-400";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
                  } else if (isSelected) {
                    bgClass = "bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-400";
                    icon = <XCircle className="w-5 h-5 text-red-500" />;
                  } else {
                    bgClass = "opacity-50 pointer-events-none";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={showExplanation}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border flex items-center justify-between transition-colors",
                      bgClass
                    )}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="p-4 bg-muted rounded-lg border text-sm mt-4">
                <p className="font-semibold mb-1">Explanation:</p>
                <p className="text-muted-foreground">{quiz[currentQuestion].explanation}</p>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button onClick={handleNext} disabled={!showExplanation}>
                {currentQuestion < quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">{score}/{quiz.length}</span>
            </div>
            <h3 className="text-xl font-bold">Quiz Completed!</h3>
            <p className="text-muted-foreground">
              You scored {score} out of {quiz.length} correctly.
            </p>
            <Button onClick={resetQuiz} className="mt-4" variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
