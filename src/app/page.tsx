import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-white px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-primary">
          FertilityBuddy
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary">
          您的24/7 IVF伴侣
        </p>
        <p className="text-lg text-text max-w-2xl mx-auto">
          提供日程管理、用药指导、情感支持和知识科普。
          让您在IVF旅程中不再孤单。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link href="/auth/register">
            <Button size="lg" className="w-48">
              开始免费使用
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="w-48">
              登录
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-semibold text-lg mb-2">AI对话助手</h3>
            <p className="text-sm text-text-secondary">
              24/7随时回答您的问题，用温暖的语言提供支持
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="font-semibold text-lg mb-2">日程提醒</h3>
            <p className="text-sm text-text-secondary">
              自动提醒用药、检查，不会错过任何重要事项
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="font-semibold text-lg mb-2">知识库</h3>
            <p className="text-sm text-text-secondary">
              用简单语言解释医学术语，帮助您更好地理解流程
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">😊</div>
            <h3 className="font-semibold text-lg mb-2">情绪记录</h3>
            <p className="text-sm text-text-secondary">
              追踪情绪变化，提供情感支持，让您感到被理解
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
