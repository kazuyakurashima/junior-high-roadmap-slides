import React, { useState, useEffect } from 'react';
import { Slide } from './components/Slide';
import { SlideNavigation } from './components/SlideNavigation';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
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
  
  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const schoolsResponse = await fetch('/data/schools_data.csv');
        const schoolsText = await schoolsResponse.text();
        const schoolsRows = schoolsText.split('\n').slice(1); // Skip header
        const schoolsData = schoolsRows.map(row => {
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
        }).filter(school => school.学校名); // Filter out empty rows
        setSchoolsData(schoolsData);
        
        const subjectsResponse = await fetch('/data/subject_data.csv');
        const subjectsText = await subjectsResponse.text();
        const subjectsRows = subjectsText.split('\n').slice(1); // Skip header
        const subjectsData = subjectsRows.map(row => {
          const [教科, 配点比率, 重要度, 対策ポイント, 平均点2025] = row.split(',');
          return {
            教科,
            配点比率: Number(配点比率),
            重要度: Number(重要度),
            対策ポイント,
            平均点2025: Number(平均点2025)
          };
        }).filter(subject => subject.教科); // Filter out empty rows
        setSubjectsData(subjectsData);
        
        const cramSchoolResponse = await fetch('/data/cram_school_data.csv');
        const cramSchoolText = await cramSchoolResponse.text();
        const cramSchoolRows = cramSchoolText.split('\n').slice(1); // Skip header
        const cramSchoolData = cramSchoolRows.map(row => {
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
        }).filter(school => school.塾名); // Filter out empty rows
        setCramSchoolData(cramSchoolData);
        
        const mockExamResponse = await fetch('/data/mock_exam_data.csv');
        const mockExamText = await mockExamResponse.text();
        const mockExamRows = mockExamText.split('\n').slice(1); // Skip header
        const mockExamData = mockExamRows.map(row => {
          const [模試名, 実施回数年間, 費用1回, 対象学年, 特徴, 主催] = row.split(',');
          return {
            模試名,
            実施回数年間: Number(実施回数年間),
            費用1回: Number(費用1回),
            対象学年,
            特徴,
            主催
          };
        }).filter(exam => exam.模試名); // Filter out empty rows
        setMockExamData(mockExamData);
        
        const costResponse = await fetch('/data/cost_data.csv');
        const costText = await costResponse.text();
        const costRows = costText.split('\n').slice(1); // Skip header
        const costData = costRows.map(row => {
          const [項目, 小4費用, 小5費用, 小6費用, 備考] = row.split(',');
          return {
            項目,
            小4費用: Number(小4費用),
            小5費用: Number(小5費用),
            小6費用: Number(小6費用),
            備考
          };
        }).filter(cost => cost.項目); // Filter out empty rows
        setCostData(costData);
      } catch (error) {
        console.error('Error loading CSV data:', error);
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

      {/* Slides 2-18 would go here - simplified for brevity */}
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
