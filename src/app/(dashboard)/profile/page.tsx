"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, MapPin, Heart, LogOut } from "lucide-react";

type UserProfile = {
  name: string;
  email: string;
  city: string;
  ivf_stage: string;
  created_at: string;
};

const ivfStageLabels: Record<string, string> = {
  preparing: "准备期",
  stimulation: "促排期",
  waiting: "等待移植",
  transferred: "已移植",
  pregnant: "已怀孕",
  other: "其他",
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      }
    } catch (error) {
      console.error("加载个人资料失败:", error);
    }
  };

  const handleLogout = () => {
    // TODO: 实现登出逻辑
    router.push("/");
  };

  if (!profile) {
    return (
      <>
        <TopBar title="我的" />
        <div className="pt-14 pb-20 px-4">
          <div className="text-center text-text-secondary mt-8">
            加载中...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="我的" />

      <div className="pt-14 pb-20 px-4">
        {/* 用户信息卡片 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-sm text-text-secondary">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-text-secondary" />
                <span>{profile.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4 text-text-secondary" />
                <span>{ivfStageLabels[profile.ivf_stage] || profile.ivf_stage}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能选项 */}
        <div className="space-y-3 mb-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">关于 FertilityBuddy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                版本 1.0.0 MVP
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">帮助和反馈</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                遇到问题？告诉我们您的想法
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">隐私政策</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                了解我们如何保护您的数据
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 登出按钮 */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          登出
        </Button>
      </div>
    </>
  );
}
