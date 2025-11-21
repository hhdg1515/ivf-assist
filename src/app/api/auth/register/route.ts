import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, city, ivfStage, timezone } = body;

    // 使用 Supabase Auth 创建用户
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "注册失败，请重试" },
        { status: 400 }
      );
    }

    // 在 users 表中创建用户资料
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      name,
      city,
      ivf_stage: ivfStage,
      timezone: timezone || "UTC",
    });

    if (profileError) {
      return NextResponse.json(
        { error: "创建用户资料失败" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "注册成功",
      user: authData.user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "服务器错误" },
      { status: 500 }
    );
  }
}
