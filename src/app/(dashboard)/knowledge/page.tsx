"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Article = {
  id: string;
  title: string;
  category: string;
  content: string;
};

const categories = [
  { id: "basics", name: "基础知识", emoji: "📚" },
  { id: "medication", name: "用药相关", emoji: "💉" },
  { id: "lab", name: "实验室阶段", emoji: "🔬" },
  { id: "transfer", name: "移植和等待", emoji: "🤰" },
];

export default function KnowledgePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch("/api/knowledge");
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      }
    } catch (error) {
      console.error("加载知识库失败:", error);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <TopBar title="知识库" />

      <div className="pt-14 pb-20 px-4">
        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
            <Input
              type="text"
              placeholder="搜索问题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* 分类 */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-200 text-text"
              }`}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-200 text-text"
                }`}
              >
                {category.emoji} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        <div className="space-y-3">
          {filteredArticles.length === 0 ? (
            <Card className="p-6 text-center text-text-secondary">
              <p>暂无相关内容</p>
              <p className="text-sm mt-2">我们正在准备更多知识内容...</p>
            </Card>
          ) : (
            filteredArticles.map((article) => (
              <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {article.content.substring(0, 100)}...
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 示例知识卡片 */}
        {filteredArticles.length === 0 && !searchQuery && (
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold text-lg">常见问题</h3>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">什么是IVF？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary">
                  IVF（In Vitro Fertilization）即体外受精，是一种辅助生殖技术。
                  医生会从女性卵巢中取出卵子，在实验室中与精子结合形成胚胎，
                  然后将胚胎移植回子宫。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">IVF的完整流程是什么？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary">
                  IVF流程通常包括：1. 促排卵治疗 2. 取卵手术 3. 体外受精
                  4. 胚胎培养 5. 胚胎移植 6. 等待验孕。整个过程大约需要4-6周。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">取卵疼吗？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary">
                  取卵手术通常在麻醉下进行，所以手术过程中不会感到疼痛。
                  手术后可能会有轻微的腹部不适，类似月经痛，一般1-2天会好转。
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
