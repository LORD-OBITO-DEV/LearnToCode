import React, { useState } from 'react';

function Exercise({ exercise, onComplete }) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() === exercise.correctAnswer.trim()) {
      setFeedback('✅ Correct !');
      onComplete();
    } else {
      setFeedback('❌ Incorrect, réessaie.');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-4">
      <h3 className="font-bold mb-2">{exercise.title}</h3>
      <p className="mb-2">{exercise.question}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          className="p-2 border rounded"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit" className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary">
          Vérifier
        </button>
      </form>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
}

export default Exercise;
