import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getChatResponse } from "@/lib/claude";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // TODO: 从认证会话中获取用户ID
    // 现在暂时使用模拟用户ID
    const userId = "demo-user-id";

    // 获取用户信息
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    // 获取最近10条对话历史
    const { data: history } = await supabase
      .from("conversations")
      .select("role, message")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    const conversationHistory = (history || [])
      .reverse()
      .map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.message,
      }));

    // 调用 Claude API 获取回复
    const reply = await getChatResponse(
      message,
      conversationHistory,
      user?.name,
      user?.ivf_stage,
      user?.city
    );

    // 保存用户消息
    await supabase.from("conversations").insert({
      user_id: userId,
      message,
      role: "user",
    });

    // 保存AI回复
    await supabase.from("conversations").insert({
      user_id: userId,
      message: reply,
      role: "assistant",
    });

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "服务器错误" },
      { status: 500 }
    );
  }
}
