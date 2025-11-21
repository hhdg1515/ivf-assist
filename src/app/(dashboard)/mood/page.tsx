"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

type MoodType = "great" | "ok" | "bad" | "terrible";

type MoodLog = {
  id: string;
  mood: MoodType;
  note?: string;
  created_at: string;
};

const moods = [
  { value: "great" as const, emoji: "😊", label: "很好", color: "bg-mood-great" },
  { value: "ok" as const, emoji: "😐", label: "还行", color: "bg-mood-ok" },
  { value: "bad" as const, emoji: "😔", label: "不好", color: "bg-mood-bad" },
  { value: "terrible" as const, emoji: "😢", label: "很糟", color: "bg-mood-terrible" },
];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");
  const [todayLog, setTodayLog] = useState<MoodLog | null>(null);
  const [weekLogs, setWeekLogs] = useState<MoodLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMoodLogs();
  }, []);

  const loadMoodLogs = async () => {
    try {
      const response = await fetch("/api/mood");
      if (response.ok) {
        const data = await response.json();
        setTodayLog(data.today);
        setWeekLogs(data.week || []);
        if (data.today) {
          setSelectedMood(data.today.mood);
          setNote(data.today.note || "");
        }
      }
    } catch (error) {
      console.error("加载情绪记录失败:", error);
    }
  };

  const saveMood = async () => {
    if (!selectedMood) return;

    setLoading(true);
    try {
      const response = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: selectedMood, note }),
      });

      if (response.ok) {
        loadMoodLogs();
      }
    } catch (error) {
      console.error("保存情绪失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodCount = (moodValue: MoodType) => {
    return weekLogs.filter((log) => log.mood === moodValue).length;
  };

  return (
    <>
      <TopBar title="情绪记录" />

      <div className="pt-14 pb-20 px-4">
        {/* 今天的心情 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            今天感觉怎么样？
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedMood === mood.value
                    ? "border-primary bg-primary/5 scale-105"
                    : "border-gray-200 bg-white hover:border-primary/50"
                }`}
              >
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div className="font-medium">{mood.label}</div>
              </button>
            ))}
          </div>

          {/* 备注 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              今天有什么想说的吗？（可选）
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="记录你的感受..."
            />
          </div>

          <Button
            onClick={saveMood}
            disabled={!selectedMood || loading}
            className="w-full"
          >
            {loading ? "保存中..." : todayLog ? "更新记录" : "保存"}
          </Button>
        </div>

        {/* 本周情绪趋势 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">本周情绪趋势</h3>

          {weekLogs.length === 0 ? (
            <Card className="p-6 text-center text-text-secondary">
              还没有本周的记录
            </Card>
          ) : (
            <Card className="p-6">
              <div className="space-y-3">
                {moods.map((mood) => {
                  const count = getMoodCount(mood.value);
                  const percentage = weekLogs.length > 0
                    ? (count / weekLogs.length) * 100
                    : 0;

                  return (
                    <div key={mood.value} className="flex items-center gap-3">
                      <div className="text-2xl">{mood.emoji}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{mood.label}</span>
                          <span className="text-text-secondary">
                            {count}天
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${mood.color} transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-text-secondary text-center mt-4">
                过去7天共记录 {weekLogs.length} 天
              </p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
