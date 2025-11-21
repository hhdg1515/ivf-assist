import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // TODO: 从认证会话中获取用户ID
    const userId = "demo-user-id";

    const { data: profile, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "服务器错误" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    // TODO: 从认证会话中获取用户ID
    const userId = "demo-user-id";

    const { data: profile, error } = await supabase
      .from("users")
      .update(body)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "服务器错误" },
      { status: 500 }
    );
  }
}
