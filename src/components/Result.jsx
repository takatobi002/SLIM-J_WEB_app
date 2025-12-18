import Histogram from './Histogram';

// 18項目（範囲：18 - 90）に基づく正規分布に近いモックデータ
const DISTRIBUTION_DATA = [
    { label: '18-28', count: 5, min: 18, max: 28 },
    { label: '29-38', count: 25, min: 29, max: 38 },
    { label: '39-48', count: 70, min: 39, max: 48 },
    { label: '49-59', count: 120, min: 49, max: 59 }, // 中央付近
    { label: '60-69', count: 70, min: 60, max: 69 },
    { label: '70-79', count: 25, min: 70, max: 79 },
    { label: '80-90', count: 5, min: 80, max: 90 },
];

const Result = ({ score, onReset }) => {
    return (
        <div className="glass-card fade-in">
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>あなたの結果</h2>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div style={{
                    fontSize: '4rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    {score}
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>合計スコア (最大 90)</p>
            </div>

            <div style={{ marginBottom: '2rem', height: '300px' }}>
                <Histogram userScore={score} distribution={DISTRIBUTION_DATA} />
            </div>

            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                上のグラフは、一般的な母集団と比較したあなたの位置を示しています。
                ピンク色の棒があなたのスコア範囲を表しています。
            </p>

            <button className="btn-primary" onClick={onReset}>
                もう一度回答する
            </button>
        </div>
    );
};

export default Result;
