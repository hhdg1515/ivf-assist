"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    city: "",
    ivfStage: "preparing" as const,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "注册失败");
      }

      router.push("/dashboard/welcome");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">
            加入 FertilityBuddy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                邮箱
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                密码
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                称呼
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="您希望我们怎么称呼您"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                所在城市
              </label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="例如：北京"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ivfStage" className="text-sm font-medium">
                IVF阶段
              </label>
              <select
                id="ivfStage"
                value={formData.ivfStage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ivfStage: e.target.value as any,
                  })
                }
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                required
              >
                <option value="preparing">准备期</option>
                <option value="stimulation">促排期</option>
                <option value="waiting">等待移植</option>
                <option value="transferred">已移植</option>
                <option value="pregnant">已怀孕</option>
                <option value="other">其他</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "注册中..." : "开始免费使用"}
            </Button>

            <div className="text-center text-sm text-text-secondary">
              已有账号？{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                登录
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
