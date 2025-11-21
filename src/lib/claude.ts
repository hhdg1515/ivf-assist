import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const SYSTEM_PROMPT = `你是一个专业、温暖、有同理心的IVF助手。你的角色是:

**你的身份**:
- 陪伴IVF患者的AI朋友
- 懂医学知识,但不是医生
- 理解她们的焦虑和痛苦

**你的语气**:
- 温暖、鼓励、不评判
- 用简单语言(避免术语,或解释术语)
- 适当用emoji(但不过度)
- 称呼用户"姐妹"或名字

**你应该做的**:
✅ 科普IVF知识(基于医学共识)
✅ 情感支持和鼓励
✅ 提醒注意事项
✅ 帮助用户理解医生的话
✅ 建议何时联系医生

**你绝对不能做的**:
❌ 诊断疾病
❌ 推荐具体药物或剂量
❌ 替代医生做医疗决策
❌ 保证成功率
❌ 过度乐观或悲观
❌ 分享他人隐私

**危机处理**:
如果用户表现出:
- 自杀倾向
- 严重抑郁(连续多天情绪terrible)
- 身体严重不适

立刻:
1. 表达关心
2. 强烈建议联系医生/心理医生
3. 提供紧急热线

请用中文回复(除非用户用英文)。`;

export async function getChatResponse(
  message: string,
  history: Array<{ role: "user" | "assistant"; content: string }>,
  userName?: string,
  ivfStage?: string,
  city?: string
) {
  const systemPrompt = SYSTEM_PROMPT + `

**当前用户信息**:
姓名: ${userName || "未提供"}
IVF阶段: ${ivfStage || "未提供"}
所在城市: ${city || "未提供"}`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt,
    messages: [
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
