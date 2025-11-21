import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // TODO: 从认证会话中获取用户ID
    const userId = "demo-user-id";

    const { data: reminders, error } = await supabase
      .from("reminders")
      .select("*")
      .eq("user_id", userId)
      .order("datetime", { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({ reminders: reminders || [] });
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
    const { title, type, datetime } = body;

    // TODO: 从认证会话中获取用户ID
    const userId = "demo-user-id";

    const { data, error } = await supabase
      .from("reminders")
      .insert({
        user_id: userId,
        title,
        type,
        datetime,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ reminder: data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "服务器错误" },
      { status: 500 }
    );
  }
}
