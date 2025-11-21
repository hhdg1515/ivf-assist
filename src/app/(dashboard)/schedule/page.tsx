"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Calendar as CalendarIcon, Pill, Stethoscope, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

type Reminder = {
  id: string;
  title: string;
  type: "medication" | "appointment" | "custom";
  datetime: string;
  is_completed: boolean;
};

export default function SchedulePage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const response = await fetch("/api/reminders");
      if (response.ok) {
        const data = await response.json();
        setReminders(data.reminders);
      }
    } catch (error) {
      console.error("加载提醒失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const completeReminder = async (id: string) => {
    try {
      await fetch(`/api/reminders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_completed: true }),
      });
      loadReminders();
    } catch (error) {
      console.error("完成提醒失败:", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="w-5 h-5" />;
      case "appointment":
        return <Stethoscope className="w-5 h-5" />;
      default:
        return <CalendarIcon className="w-5 h-5" />;
    }
  };

  const todayReminders = reminders.filter((r) => {
    const reminderDate = new Date(r.datetime);
    const today = new Date();
    return (
      reminderDate.toDateString() === today.toDateString() && !r.is_completed
    );
  });

  const upcomingReminders = reminders.filter((r) => {
    const reminderDate = new Date(r.datetime);
    const today = new Date();
    return reminderDate > today && !r.is_completed;
  });

  return (
    <>
      <TopBar title="我的日程" />

      <div className="pt-14 pb-20 px-4">
        {/* 今天的提醒 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            今天 - {format(new Date(), "M月d日 EEEE", { locale: zhCN })}
          </h2>

          {todayReminders.length === 0 ? (
            <Card className="p-6 text-center text-text-secondary">
              今天没有安排
            </Card>
          ) : (
            <div className="space-y-3">
              {todayReminders.map((reminder) => (
                <Card key={reminder.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-primary mt-1">
                      {getIcon(reminder.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-sm text-text-secondary">
                        {format(new Date(reminder.datetime), "HH:mm")}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => completeReminder(reminder.id)}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 即将到来的提醒 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">即将到来</h2>

          {upcomingReminders.length === 0 ? (
            <Card className="p-6 text-center text-text-secondary">
              暂无即将到来的提醒
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingReminders.slice(0, 5).map((reminder) => (
                <Card key={reminder.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-primary mt-1">
                      {getIcon(reminder.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-sm text-text-secondary">
                        {format(
                          new Date(reminder.datetime),
                          "M月d日 HH:mm",
                          { locale: zhCN }
                        )}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 添加提醒按钮 */}
        <Button
          className="w-full"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          添加新提醒
        </Button>
      </div>

      {/* 添加提醒的表单（简化版） */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">添加提醒</h3>
            <p className="text-text-secondary text-sm mb-4">
              添加提醒功能即将推出...
            </p>
            <Button onClick={() => setShowAddForm(false)}>关闭</Button>
          </Card>
        </div>
      )}
    </>
  );
}
