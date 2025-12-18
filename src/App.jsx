import { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Result from './components/Result';

function App() {
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome' | 'questionnaire' | 'result'
  const [score, setScore] = useState(0);
  const [activityName, setActivityName] = useState('');

  const handleStart = (name) => {
    setActivityName(name);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = (totalScore) => {
    setScore(totalScore);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setScore(0);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem', marginTop: '2rem' }}>
        <h1>パーソナリティ尺度 (SLIM-J) {activityName && `(${activityName})`}</h1>
      </header>

      <main>
        {currentView === 'welcome' && (
          <div className="glass-card fade-in" style={{ textAlign: 'center' }}>
            <h2>ようこそ</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              始めるには、評価する活動の名前を入力してください（例：テニス、ピアノ、ゲーム）。
              活動名は質問文に反映されます。
            </p>
            <form onSubmit={(e) => { e.preventDefault(); handleStart(e.target.elements.activity.value); }}>
              <input
                name="activity"
                type="text"
                placeholder="活動名を入力..."
                required
                style={{
                  padding: '1rem',
                  fontSize: '1.1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(15, 23, 42, 0.5)',
                  color: 'white',
                  width: '100%',
                  marginBottom: '2rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-primary">
                質問票を開始
              </button>
            </form>
          </div>
        )}

        {currentView === 'questionnaire' && (
          <Questionnaire
            onComplete={handleComplete}
            activityName={activityName}
          />
        )}

        {currentView === 'result' && (
          <Result score={score} onReset={handleReset} />
        )}
      </main>

      <footer style={{
        marginTop: '4rem',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '0.9rem'
      }}>
        <p>&copy; {new Date().getFullYear()} SLIM-J App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
