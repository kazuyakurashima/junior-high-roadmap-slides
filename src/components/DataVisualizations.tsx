import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface SchoolData {
  学校名: string;
  偏差値: number;
  合格最低点2023: number;
  合格最低点2024: number;
  合格最低点2025: number;
  入試形態: string;
  学費年間: number;
  特徴: string;
}

interface SubjectData {
  教科: string;
  配点比率: number;
  重要度: number;
  対策ポイント: string;
  平均点2025: number;
}

interface CramSchoolData {
  塾名: string;
  形態: string;
  月謝小4: number;
  月謝小5: number;
  月謝小6: number;
  合格実績上位校: number;
  特徴: string;
  地域: string;
}

interface MockExamData {
  模試名: string;
  実施回数年間: number;
  費用1回: number;
  対象学年: string;
  特徴: string;
  主催: string;
}

interface CostData {
  項目: string;
  小4費用: number;
  小5費用: number;
  小6費用: number;
  備考: string;
}

export const SchoolsBarChart: React.FC<{ data: SchoolData[] }> = ({ data }) => {
  const chartData = {
    labels: data.map(school => school.学校名),
    datasets: [
      {
        label: '偏差値',
        data: data.map(school => school.偏差値),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '茨城県内中学校の偏差値',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export const SchoolsLineChart: React.FC<{ data: SchoolData[] }> = ({ data }) => {
  const chartData = {
    labels: data.slice(0, 5).map(school => school.学校名),
    datasets: [
      {
        label: '2023年',
        data: data.slice(0, 5).map(school => school.合格最低点2023),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '2024年',
        data: data.slice(0, 5).map(school => school.合格最低点2024),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '2025年',
        data: data.slice(0, 5).map(school => school.合格最低点2025),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '合格最低点の推移（過去3年）',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export const SubjectsPieChart: React.FC<{ data: SubjectData[] }> = ({ data }) => {
  const chartData = {
    labels: data.map(subject => subject.教科),
    datasets: [
      {
        label: '配点比率',
        data: data.map(subject => subject.配点比率),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '教科別配点比率',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export const CramSchoolBarChart: React.FC<{ data: CramSchoolData[] }> = ({ data }) => {
  const chartData = {
    labels: data.slice(0, 6).map(school => school.塾名),
    datasets: [
      {
        label: '小4',
        data: data.slice(0, 6).map(school => school.月謝小4),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '小5',
        data: data.slice(0, 6).map(school => school.月謝小5),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '小6',
        data: data.slice(0, 6).map(school => school.月謝小6),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '塾の月謝比較',
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export const MockExamBarChart: React.FC<{ data: MockExamData[] }> = ({ data }) => {
  const chartData = {
    labels: data.map(exam => exam.模試名),
    datasets: [
      {
        label: '費用（円）',
        data: data.map(exam => exam.費用1回),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '模試費用比較（1回あたり）',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export const ExamTypesPieChart: React.FC = () => {
  const chartData = {
    labels: ['ペーパーテスト', '面接', '適性検査', '小論文・作文'],
    datasets: [
      {
        label: '実施校の割合',
        data: [80, 40, 30, 25],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '入試形式別の実施割合',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export const SuccessFactorsChart: React.FC = () => {
  const chartData = {
    labels: ['1年以上前から準備', '週10時間以上の学習', '定期的な模試受験', '複数校併願'],
    datasets: [
      {
        label: '合格率への影響度',
        data: [85, 78, 72, 65],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '合格に影響する要素',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export const CostStackedBarChart: React.FC<{ data: CostData[] }> = ({ data }) => {
  const chartData = {
    labels: ['小4', '小5', '小6'],
    datasets: data.slice(0, 5).map((item, index) => {
      const colors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ];
      
      return {
        label: item.項目,
        data: [item.小4費用, item.小5費用, item.小6費用],
        backgroundColor: colors[index % colors.length],
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '学年別費用内訳',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
