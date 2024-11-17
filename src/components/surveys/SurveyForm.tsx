import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';

interface Question {
  id: string;
  type: 'text' | 'radio' | 'checkbox' | 'rating';
  text: string;
  options?: string[];
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  reward?: {
    type: string;
    value: number;
  };
  endDate: string;
}

export default function SurveyForm({ survey }: { survey: Survey }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'surveyResponses'), {
        surveyId: survey.id,
        userId: user.id,
        answers,
        submittedAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'rating':
        return (
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleAnswer(question.id, rating)}
                className={`w-10 h-10 rounded-full ${
                  answers[question.id] === rating
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-2">Thank you for participating!</h3>
        {survey.reward && (
          <p className="text-gray-600">
            Your reward of {survey.reward.value} {survey.reward.type} will be credited soon.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{survey.title}</h2>
      <p className="text-gray-600 mb-6">{survey.description}</p>

      <div className="mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-red-600">
                {Math.round((currentQuestion / survey.questions.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
            <div
              style={{ width: `${(currentQuestion / survey.questions.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            {survey.questions[currentQuestion].text}
          </h3>
          {renderQuestion(survey.questions[currentQuestion])}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          
          {currentQuestion === survey.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              disabled={!answers[survey.questions[currentQuestion].id]}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}