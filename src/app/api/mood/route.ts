import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // TODO: 从认证会话中获取用户ID
    const userId = "demo-user-id";

    // 获取今天的记录
    const today = new Date().toISOString().split("T")[0];
    const { data: todayLog } = await supabase
      .from("mood_logs")
      .select("*")
      .eq("user_id", userId)
      .eq("created_at", today)
      .single();

    // 获取本周的记录
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { data: weekLogs } = await supabase
      .from("mood_logs")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", weekAgo.toISOString().split("T")[0])
      .order("created_at", { ascending: false });

    return NextResponse.json({
      today: todayLog || null,
      week: weekLogs || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "服务器错误" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mood, note } = body;

    // TODO: 从认证会话中获取用户ID
    const userId = "demo-user-id";
    const today = new Date().toISOString().split("T")[0];

    // 使用 upsert 来插入或更新今天的记录
    const { data, error } = await supabase
      .from("mood_logs")
      .upsert(
        {
          user_id: userId,
          mood,
          note: note || null,
          created_at: today,
        },
        {
          onConflict: "user_id,created_at",
        }
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ log: data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "服务器错误" },
      { status: 500 }
    );
  }
}
