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
                <br />
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>※この分布はイメージです。</span>
            </p>

            <button className="btn-primary" onClick={onReset}>
                もう一度回答する
            </button>

            <p style={{
                marginTop: '2rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                borderTop: '1px solid var(--glass-border)',
                paddingTop: '1rem',
                textAlign: 'left'
            }}>
                <strong>出典:</strong><br />
                阿部 太一, 森田 泰暢, 矢野 航平 (2025). 言語的妥当性のある日本語版シリアスレジャー測定尺度の翻訳. Jxiv. <br />
                <a href="https://jxiv.jst.go.jp/index.php/jxiv/preprint/view/1176" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>
                    https://jxiv.jst.go.jp/index.php/jxiv/preprint/view/1176
                </a>
            </p>
        </div>
    );
};

export default Result;
