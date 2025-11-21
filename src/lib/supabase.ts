import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type User = {
  id: string;
  email: string;
  name: string;
  city: string;
  ivf_stage: "preparing" | "stimulation" | "waiting" | "transferred" | "pregnant" | "other";
  expected_date?: string;
  timezone: string;
  created_at: string;
};

export type Conversation = {
  id: string;
  user_id: string;
  message: string;
  role: "user" | "assistant";
  created_at: string;
};

export type Reminder = {
  id: string;
  user_id: string;
  title: string;
  type: "medication" | "appointment" | "custom";
  datetime: string;
  remind_before_minutes: number[];
  is_completed: boolean;
  created_at: string;
};

export type MoodLog = {
  id: string;
  user_id: string;
  mood: "great" | "ok" | "bad" | "terrible";
  note?: string;
  created_at: string;
};

export type KnowledgeArticle = {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  created_at: string;
};
