import { useState, useEffect } from 'react';
import { Slide } from './components/Slide';
import { SlideNavigation } from './components/SlideNavigation';
import {
  SchoolsBarChart,
  SchoolsLineChart,
  SubjectsPieChart,
  CramSchoolBarChart,
  MockExamBarChart,
  ExamTypesPieChart,
  SuccessFactorsChart,
  CostStackedBarChart
} from './components/DataVisualizations';

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


function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [schoolsData, setSchoolsData] = useState<SchoolData[]>([]);
  const [subjectsData, setSubjectsData] = useState<SubjectData[]>([]);
  const [cramSchoolData, setCramSchoolData] = useState<CramSchoolData[]>([]);
  const [mockExamData, setMockExamData] = useState<MockExamData[]>([]);
  const [costData, setCostData] = useState<CostData[]>([]);
  
  console.log('App component mounted, slides should be visible');
  
  useEffect(() => {
    const loadCSVData = async () => {
      try {
        console.log('Loading CSV data...');
        const schoolsResponse = await fetch('/data/schools_data.csv');
        const schoolsText = await schoolsResponse.text();
        const schoolsRows = schoolsText.split('\n').slice(1); // Skip header
        const parsedSchoolsData = schoolsRows
          .map(row => {
            const [学校名, 偏差値, 合格最低点2023, 合格最低点2024, 合格最低点2025, 入試形態, 学費年間, 特徴] = row.split(',');
            return {
              学校名,
              偏差値: Number(偏差値),
              合格最低点2023: Number(合格最低点2023),
              合格最低点2024: Number(合格最低点2024),
              合格最低点2025: Number(合格最低点2025),
              入試形態,
              学費年間: Number(学費年間),
              特徴
            };
          })
          .filter(school => school.学校名); // Filter out empty rows
        setSchoolsData(parsedSchoolsData);
        
        const subjectsResponse = await fetch('/data/subject_data.csv');
        const subjectsText = await subjectsResponse.text();
        const subjectsRows = subjectsText.split('\n').slice(1); // Skip header
        const parsedSubjectsData = subjectsRows
          .map(row => {
            const [教科, 配点比率, 重要度, 対策ポイント, 平均点2025] = row.split(',');
            return {
              教科,
              配点比率: Number(配点比率),
              重要度: Number(重要度),
              対策ポイント,
              平均点2025: Number(平均点2025)
            };
          })
          .filter(subject => subject.教科); // Filter out empty rows
        setSubjectsData(parsedSubjectsData);
        console.log('Subjects data loaded:', parsedSubjectsData);
        
        const cramSchoolResponse = await fetch('/data/cram_school_data.csv');
        const cramSchoolText = await cramSchoolResponse.text();
        const cramSchoolRows = cramSchoolText.split('\n').slice(1); // Skip header
        const parsedCramSchoolData = cramSchoolRows
          .map(row => {
            const [塾名, 形態, 月謝小4, 月謝小5, 月謝小6, 合格実績上位校, 特徴, 地域] = row.split(',');
            return {
              塾名,
              形態,
              月謝小4: Number(月謝小4),
              月謝小5: Number(月謝小5),
              月謝小6: Number(月謝小6),
              合格実績上位校: Number(合格実績上位校),
              特徴,
              地域
            };
          })
          .filter(school => school.塾名); // Filter out empty rows
        setCramSchoolData(parsedCramSchoolData);
        console.log('Cram school data loaded:', parsedCramSchoolData);
        
        const mockExamResponse = await fetch('/data/mock_exam_data.csv');
        const mockExamText = await mockExamResponse.text();
        const mockExamRows = mockExamText.split('\n').slice(1); // Skip header
        const parsedMockExamData = mockExamRows
          .map(row => {
            const [模試名, 実施回数年間, 費用1回, 対象学年, 特徴, 主催] = row.split(',');
            return {
              模試名,
              実施回数年間: Number(実施回数年間),
              費用1回: Number(費用1回),
              対象学年,
              特徴,
              主催
            };
          })
          .filter(exam => exam.模試名); // Filter out empty rows
        setMockExamData(parsedMockExamData);
        console.log('Mock exam data loaded:', parsedMockExamData);
        
        const costResponse = await fetch('/data/cost_data.csv');
        const costText = await costResponse.text();
        const costRows = costText.split('\n').slice(1); // Skip header
        const parsedCostData = costRows
          .map(row => {
            const [項目, 小4費用, 小5費用, 小6費用, 備考] = row.split(',');
            return {
              項目,
              小4費用: Number(小4費用),
              小5費用: Number(小5費用),
              小6費用: Number(小6費用),
              備考
            };
          })
          .filter(cost => cost.項目); // Filter out empty rows
        setCostData(parsedCostData);
        console.log('Cost data loaded:', parsedCostData);
      } catch (error) {
        console.error('Error loading CSV data:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
      }
    };
    
    loadCSVData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < 18) {
      setCurrentSlide(slideIndex);
    }
  };

return (
  <div className="relative overflow-hidden bg-background text-foreground">
    {/* Slide 1: Title Slide */}
    <Slide id={0} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="slide-title text-primary">中学入試ロードマップ</h1>
        <h2 className="slide-subtitle text-muted-foreground mb-8">4年生・5年生の保護者様向け</h2>
        <p className="text-lg mb-4">2025年5月</p>
        <p className="text-lg font-medium">講師：倉島和也</p>
      </div>
    </Slide>

    {/* Slide 2: 茨城県内中学校の偏差値比較 (Data Visualization) */}
    <Slide id={1} currentSlide={currentSlide} className="bg-white">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">茨城県内中学校の偏差値比較</h2>
        <div className="max-w-4xl mx-auto">
          {schoolsData.length > 0 ? (
            <SchoolsBarChart data={schoolsData} />
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <p className="text-gray-500">データ読み込み中...</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>※ 偏差値は2025年度入試結果に基づく参考値です</p>
        </div>
      </div>
    </Slide>

    {/* Slide 3: 中学受験の概要 */}
    <Slide id={2} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">中学受験の概要</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">受験のメリット</h3>
            <ul className="space-y-2">
              <li>• 質の高い教育環境</li>
              <li>• 大学進学に有利</li>
              <li>• 同レベルの仲間との切磋琢磨</li>
              <li>• 6年間の一貫教育</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">受験の現状</h3>
            <ul className="space-y-2">
              <li>• 競争率の上昇傾向</li>
              <li>• 早期化する準備開始時期</li>
              <li>• 多様化する入試形態</li>
              <li>• 地域格差の存在</li>
            </ul>
          </div>
        </div>
      </div>
    </Slide>

    {/* Slide 4: 主要校の合格最低点推移 (Data Visualization) */}
    <Slide id={3} currentSlide={currentSlide} className="bg-white">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">主要校の合格最低点推移</h2>
        <div className="max-w-4xl mx-auto">
          {schoolsData.length > 0 ? (
            <SchoolsLineChart data={schoolsData} />
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <p className="text-gray-500">データ読み込み中...</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>※ 過去3年間の合格最低点の推移（100点満点換算）</p>
        </div>
      </div>
    </Slide>

    {/* Slide 5: 学習タイムライン */}
    <Slide id={4} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">学習タイムライン</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="md:col-start-1 p-4 bg-white rounded-lg shadow-sm relative">
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
                <h3 className="text-xl font-semibold mb-2">小学4年生</h3>
                <p>基礎学力の定着と学習習慣の確立。算数・国語を中心に週2〜3回の学習。模試体験も推奨。</p>
              </div>
              
              <div className="md:col-start-2 mt-8 md:mt-16 p-4 bg-white rounded-lg shadow-sm relative">
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
                <h3 className="text-xl font-semibold mb-2">小学5年生</h3>
                <p>学習範囲と時間の拡大。理科・社会も本格的に開始。週3〜4回の学習と定期的な模試受験。</p>
              </div>
              
              <div className="md:col-start-1 mt-8 md:mt-16 p-4 bg-white rounded-lg shadow-sm relative">
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
                <h3 className="text-xl font-semibold mb-2">小学6年生 前半</h3>
                <p>総合的な学力向上と弱点補強。週5〜6回の集中学習。志望校の過去問演習開始。</p>
              </div>
              
              <div className="md:col-start-2 mt-8 md:mt-16 p-4 bg-white rounded-lg shadow-sm relative">
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
                <h3 className="text-xl font-semibold mb-2">小学6年生 後半</h3>
                <p>入試直前対策と総仕上げ。過去問演習と弱点克服に集中。本番を想定した演習を繰り返す。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>

    {/* Slide 6: 教科別配点比率 (Data Visualization) */}
    <Slide id={5} currentSlide={currentSlide} className="bg-white">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">教科別配点比率</h2>
        <div className="max-w-4xl mx-auto">
          {subjectsData.length > 0 ? (
            <SubjectsPieChart data={subjectsData} />
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <p className="text-gray-500">データ読み込み中...</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>※ 主要校の平均的な配点比率です。学校によって異なる場合があります。</p>
        </div>
      </div>
    </Slide>

    {/* Slide 7: 学習準備戦略 */}
    <Slide id={6} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">学習準備戦略</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">自宅学習</h3>
            <ul className="space-y-2">
              <li>• 学習環境の整備</li>
              <li>• 集中できる時間帯の活用</li>
              <li>• 計画的な学習スケジュール</li>
              <li>• 定期的な復習と確認テスト</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">塾・家庭教師</h3>
            <ul className="space-y-2">
              <li>• 子どもに合った学習形態の選択</li>
              <li>• 定期的な面談と進捗確認</li>
              <li>• 塾と家庭学習の連携</li>
              <li>• 志望校に強い塾の選定</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">メンタルケア</h3>
            <ul className="space-y-2">
              <li>• 適度な休息と気分転換</li>
              <li>• 小さな成功体験の積み重ね</li>
              <li>• 親子のコミュニケーション</li>
              <li>• 過度なプレッシャーを避ける</li>
            </ul>
          </div>
        </div>
      </div>
    </Slide>

    {/* Slide 8: 塾の形態別・学年別月謝比較 (Data Visualization) */}
    <Slide id={7} currentSlide={currentSlide} className="bg-white">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">塾の形態別・学年別月謝比較</h2>
        <div className="max-w-4xl mx-auto">
          {cramSchoolData.length > 0 ? (
            <CramSchoolBarChart data={cramSchoolData} />
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <p className="text-gray-500">データ読み込み中...</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>※ 茨城県内の主要塾の月謝平均（教材費別）</p>
        </div>
      </div>
    </Slide>

    {/* Slide 9: 自宅学習のポイント */}
    <Slide id={8} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">自宅学習のポイント</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">効果的な学習方法</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">1.</span>
                  <span>学習計画表の作成と活用（週間・月間）</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">2.</span>
                  <span>アウトプット重視の学習（問題演習）</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">3.</span>
                  <span>反復学習と定着確認</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">4.</span>
                  <span>弱点分野の集中強化</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">保護者のサポート</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">1.</span>
                  <span>学習環境の整備と集中できる空間づくり</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">2.</span>
                  <span>学習習慣の定着を促す声かけ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">3.</span>
                  <span>適切な教材選びと進捗確認</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">4.</span>
                  <span>モチベーション維持のための工夫</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold mb-2">おすすめの学習時間</h3>
            <p>小4: 週3〜4時間 / 小5: 週6〜8時間 / 小6: 週10〜15時間</p>
          </div>
        </div>
      </div>
    </Slide>

    {/* Slide 10: 主要模試の費用比較 (Data Visualization) */}
    <Slide id={9} currentSlide={currentSlide} className="bg-white">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">主要模試の費用比較</h2>
        <div className="max-w-4xl mx-auto">
          {mockExamData.length > 0 ? (
            <MockExamBarChart data={mockExamData} />
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <p className="text-gray-500">データ読み込み中...</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>※ 1回あたりの受験費用（税込）</p>
        </div>
      </div>
    </Slide>

    {/* Slide 11: 面接対策 */}
    <Slide id={10} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">面接対策</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">よくある質問</h3>
              <ul className="space-y-3">
                <li className="p-2 border-b border-gray-100">
                  <span className="font-medium">Q. この学校を志望した理由は？</span>
                </li>
                <li className="p-2 border-b border-gray-100">
                  <span className="font-medium">Q. 得意な科目と苦手な科目は？</span>
                </li>
                <li className="p-2 border-b border-gray-100">
                  <span className="font-medium">Q. 中学校で挑戦したいことは？</span>
                </li>
                <li className="p-2 border-b border-gray-100">
                  <span className="font-medium">Q. 最近読んだ本について教えてください</span>
                </li>
                <li className="p-2">
                  <span className="font-medium">Q. 将来の夢や目標は？</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">面接のポイント</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>明るく元気な挨拶と適切な姿勢</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>質問をしっかり聞き、簡潔に答える</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>自分の言葉で具体的に話す</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>学校の特色を理解した上での志望理由</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>事前に家族で練習しておく</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Slide>

    {/* Slide 12: 入試形式別の実施割合 (Data Visualization) */}
    <Slide id={11} currentSlide={currentSlide} className="bg-white">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">入試形式別の実施割合</h2>
        <div className="max-w-4xl mx-auto">
          <ExamTypesPieChart />
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>※ 茨城県内中学校の入試形式採用率（複数形式採用校あり）</p>
        </div>
      </div>
    </Slide>

    {/* Slide 13: 合格に影響する要素 (Data Visualization) */}
    <Slide id={12} currentSlide={currentSlide} className="bg-white">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">合格に影響する要素</h2>
        <div className="max-w-4xl mx-auto">
          <SuccessFactorsChart />
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>※ 過去5年間の合格者データに基づく分析</p>
        </div>
      </div>
    </Slide>

    {/* Slide 14: よくある失敗と対策 */}
    <Slide id={13} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">よくある失敗と対策</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-red-500">失敗①: 準備開始が遅すぎる</h3>
              <p className="mb-2 text-gray-700">小6からの対策では基礎固めが間に合わないケースが多い</p>
              <p className="font-medium text-blue-600">→ 対策: 小4〜5年生から計画的に準備を始める</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-red-500">失敗②: 志望校研究不足</h3>
              <p className="mb-2 text-gray-700">入試傾向や校風を理解せずに対策を進めてしまう</p>
              <p className="font-medium text-blue-600">→ 対策: 学校説明会参加、過去問分析を早めに行う</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-red-500">失敗③: メンタル面のケア不足</h3>
              <p className="mb-2 text-gray-700">プレッシャーや疲労で本番で実力を発揮できない</p>
              <p className="font-medium text-blue-600">→ 対策: 適度な休息、モチベーション管理、本番を想定した演習</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-red-500">失敗④: 併願戦略の誤り</h3>
              <p className="mb-2 text-gray-700">難易度バランスを考えない志望校選定</p>
              <p className="font-medium text-blue-600">→ 対策: チャレンジ校・本命校・滑り止め校をバランスよく選定</p>
            </div>
          </div>
        </div>
      </div>
    </Slide>

    {/* Slide 15: 保護者のサポート戦略 */}
    <Slide id={14} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">保護者のサポート戦略</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">学習面のサポート</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>学習環境の整備（静かで集中できる空間）</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>学習計画の確認と進捗管理</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>塾や模試の情報収集と選択</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>弱点把握と対策の相談</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">精神面のサポート</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>適度な休息と気分転換の促進</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>小さな成功体験の共有と称賛</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>過度なプレッシャーを与えない</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>子どもの話をよく聞き、共感する</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold mb-2">家族の協力体制</h3>
            <p>受験は子どもだけでなく家族全体で取り組むもの。兄弟姉妹や祖父母も含めた協力体制を構築しましょう。</p>
          </div>
        </div>
      </div>
    </Slide>

    {/* Slide 16: 学年別費用内訳 (Data Visualization) */}
    <Slide id={15} currentSlide={currentSlide} className="bg-white">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">学年別費用内訳</h2>
        <div className="max-w-4xl mx-auto">
          {costData.length > 0 ? (
            <CostStackedBarChart data={costData} />
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <p className="text-gray-500">データ読み込み中...</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>※ 平均的な受験対策費用の内訳（年間）</p>
        </div>
      </div>
    </Slide>

    {/* Slide 17: 出願スケジュール */}
    <Slide id={16} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">出願スケジュール</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">小6年間のスケジュール</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-24 font-semibold">10月〜12月</div>
                  <div>
                    <p className="font-medium">学校説明会・文化祭参加</p>
                    <p className="text-sm text-gray-600">志望校の雰囲気を体感し、校風を理解する</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-24 font-semibold">12月</div>
                  <div>
                    <p className="font-medium">願書取り寄せ・出願校最終決定</p>
                    <p className="text-sm text-gray-600">模試結果や志望度を考慮して併願校を含め決定</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-24 font-semibold">1月上旬</div>
                  <div>
                    <p className="font-medium">願書提出</p>
                    <p className="text-sm text-gray-600">記入ミスがないよう確認し、余裕をもって提出</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-24 font-semibold">1月中旬〜</div>
                  <div>
                    <p className="font-medium">入試本番</p>
                    <p className="text-sm text-gray-600">体調管理に気をつけ、複数校受験の場合は日程確認</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-24 font-semibold">1月下旬〜</div>
                  <div>
                    <p className="font-medium">合格発表・入学手続き</p>
                    <p className="text-sm text-gray-600">手続き期限を確認し、必要書類を準備</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-24 font-semibold">2月〜3月</div>
                  <div>
                    <p className="font-medium">入学準備</p>
                    <p className="text-sm text-gray-600">制服・教材購入、入学前オリエンテーション参加</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">出願時の注意点</h3>
              <ul className="space-y-2">
                <li>• 出願書類は早めに準備し、記入ミスがないか複数回確認</li>
                <li>• 受験料の振込は余裕をもって行う</li>
                <li>• 複数校受験の場合は日程の重複に注意</li>
                <li>• 入試当日の持ち物リストを事前に確認</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Slide>

    {/* Slide 18: Q&A・まとめ */}
    <Slide id={17} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="p-10">
        <h2 className="slide-title text-center mb-8">Q&A・まとめ</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">よくある質問</h3>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="font-medium text-blue-800">Q. いつから準備を始めるべきですか？</p>
                <p className="mt-1">A. 理想的には小4から基礎固めを始め、小5から本格的な受験対策を行うことをお勧めします。</p>
              </div>
              <div className="border-b pb-3">
                <p className="font-medium text-blue-800">Q. 塾は必ず必要ですか？</p>
                <p className="mt-1">A. 必須ではありませんが、専門的な指導や受験情報の入手、モチベーション維持の面で有効です。</p>
              </div>
              <div>
                <p className="font-medium text-blue-800">Q. 公立中高一貫校と私立中学はどう選べばよいですか？</p>
                <p className="mt-1">A. 教育方針、校風、費用、通学距離、お子さんの適性を総合的に考慮して選択しましょう。</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">まとめ</h3>
            <ul className="space-y-2">
              <li>• 早めの準備と計画的な学習が合格への鍵</li>
              <li>• 子どもの特性に合った学習方法と志望校選び</li>
              <li>• 家族全体でのサポート体制の構築</li>
              <li>• 学習面と精神面の両方のケア</li>
              <li>• 受験は通過点、その先の成長を見据えた準備を</li>
            </ul>
            <div className="mt-6 text-center">
              <p className="font-medium">個別相談は随時受け付けております</p>
              <p className="text-sm mt-2">お問い合わせ: info@junior-high-roadmap.jp</p>
            </div>
          </div>
        </div>
      </div>
    </Slide>

    {/* Navigation controls */}
    <SlideNavigation 
      currentSlide={currentSlide} 
      totalSlides={18} 
      goToSlide={goToSlide} 
    />
  </div>
);
}

export default App;
