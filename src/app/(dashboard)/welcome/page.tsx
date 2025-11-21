"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "欢迎来到 FertilityBuddy！",
      description: "我是你的IVF小助手，我知道这段旅程不容易，但我会一直陪着你。",
      emoji: "💕",
    },
    {
      title: "随时问我问题",
      description: "我24/7在线，你可以随时问我任何关于IVF的问题。我会用简单的语言为你解答。",
      emoji: "💬",
    },
    {
      title: "管理你的日程",
      description: "我会帮你记住所有重要的事项，包括用药时间、检查预约等。不会遗漏任何一件事。",
      emoji: "📅",
    },
    {
      title: "记录你的情绪",
      description: "这段旅程充满起伏，记录你的感受可以帮助你更好地了解自己，也让医生更了解你的状态。",
      emoji: "😊",
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/dashboard/chat");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <div className="text-6xl mb-6">{currentStep.emoji}</div>
          <h1 className="text-2xl font-bold mb-4 text-primary">
            {currentStep.title}
          </h1>
          <p className="text-text-secondary mb-8">
            {currentStep.description}
          </p>

          {/* 进度指示器 */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === step ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Button onClick={handleNext} className="w-full">
            {step < steps.length - 1 ? "下一步" : "开始使用"}
          </Button>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 text-text-secondary text-sm hover:text-primary"
            >
              上一步
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
