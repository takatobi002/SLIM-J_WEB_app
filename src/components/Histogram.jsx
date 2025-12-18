import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Histogram = ({ userScore, distribution }) => {
    // distribution is expected to be an array of objects: { label: string, count: number, min: number, max: number }

    const backgroundColors = distribution.map(bin => {
        if (userScore >= bin.min && userScore <= bin.max) {
            return 'rgba(236, 72, 153, 0.8)'; // Secondary color (Pink) for user
        }
        return 'rgba(99, 102, 241, 0.5)'; // Primary color (Indigo) for others
    });

    const borderColors = distribution.map(bin => {
        if (userScore >= bin.min && userScore <= bin.max) {
            return 'rgba(236, 72, 153, 1)';
        }
        return 'rgba(99, 102, 241, 1)';
    });

    const data = {
        labels: distribution.map(d => d.label),
        datasets: [
            {
                label: '全体分布',
                data: distribution.map(d => d.count),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(248, 250, 252, 0.8)', // text-primary
                }
            },
            title: {
                display: true,
                text: 'スコア分布',
                color: 'rgba(248, 250, 252, 1)',
                font: {
                    size: 16
                }
            },
        },
        scales: {
            y: {
                ticks: { color: 'rgba(148, 163, 184, 1)' },
                grid: { color: 'rgba(148, 163, 184, 0.1)' }
            },
            x: {
                ticks: { color: 'rgba(148, 163, 184, 1)' },
                grid: { color: 'rgba(148, 163, 184, 0.1)' }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default Histogram;
