-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  city VARCHAR(100),
  ivf_stage VARCHAR(50) DEFAULT 'preparing',
  expected_date DATE,
  timezone VARCHAR(50) DEFAULT 'UTC',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 对话历史表
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 提醒事项表
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  type VARCHAR(50) DEFAULT 'custom' CHECK (type IN ('medication', 'appointment', 'custom')),
  datetime TIMESTAMP NOT NULL,
  remind_before_minutes INTEGER[] DEFAULT '{1440, 60, 15}',
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 情绪记录表
CREATE TABLE IF NOT EXISTS mood_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mood VARCHAR(20) NOT NULL CHECK (mood IN ('great', 'ok', 'bad', 'terrible')),
  note TEXT,
  created_at DATE DEFAULT CURRENT_DATE,
  UNIQUE(user_id, created_at)
);

-- 知识库文章表
CREATE TABLE IF NOT EXISTS knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_datetime ON reminders(datetime);
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_id ON mood_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_logs_created_at ON mood_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_articles_category ON knowledge_articles(category);

-- 启用行级安全性 (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的数据
CREATE POLICY users_policy ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY conversations_policy ON conversations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY reminders_policy ON reminders
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY mood_logs_policy ON mood_logs
  FOR ALL USING (auth.uid() = user_id);

-- 知识库文章所有人都可以读取
CREATE POLICY knowledge_articles_read_policy ON knowledge_articles
  FOR SELECT USING (true);

CREATE POLICY knowledge_articles_write_policy ON knowledge_articles
  FOR ALL USING (auth.role() = 'service_role');
