import { useState } from 'react';
import questionsData from '../questions.json';

const SCALE = [
  { value: 1, label: "全く当てはまらない" },
  { value: 2, label: "当てはまらない" },
  { value: 3, label: "どちらともいえない" },
  { value: 4, label: "当てはまる" },
  { value: 5, label: "非常によく当てはまる" }
];

const Questionnaire = ({ onComplete, activityName }) => {
  const [answers, setAnswers] = useState({});
  // Load questions from JSON
  const questions = questionsData;

  const handleOptionChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    onComplete(score, answers);
  };

  const formatQuestion = (text) => {
    return text.replace(/_____/g, activityName || 'this activity');
  };

  const isComplete = questions.every(q => answers[q.id] !== undefined);

  return (
    <div className="glass-card fade-in">
      <h2>質問票</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <strong>{activityName}</strong> に関するあなたの経験に基づいて、以下の質問にお答えください。
      </p>

      {questions.map((q, index) => (
        <div key={q.id} style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: index < questions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '1rem', lineHeight: '1.5' }}>
            <span style={{ color: 'var(--primary-color)', marginRight: '0.5rem' }}>{index + 1}.</span>
            {formatQuestion(q.text)}
          </p>
          <div className="likert-scale">
            {SCALE.map((option) => (
              <label key={option.value} className="likert-option">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={option.value}
                  checked={answers[q.id] === option.value}
                  onChange={() => handleOptionChange(q.id, option.value)}
                />
                <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            回答数: {Object.keys(answers).length} / {questions.length}
          </span>
        </div>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!isComplete}
          style={{ opacity: isComplete ? 1 : 0.7 }}
        >
          {isComplete ? '回答を送信する' : 'すべての質問に回答してください'}
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
