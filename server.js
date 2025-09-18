const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors()); // 启用跨域
app.use(express.json()); // 解析JSON请求体

app.post('/api/chat', async (req, res) => {
  const { university, subject, message, history } = req.body;
  const apiKey = 'sk-90a6b5755ec04ac6ac1c955b4c1d3793'; // 替换为您的DeepSeek API Key

  try {
    // 构建系统提示：模拟面试官
    const systemPrompt = `You are a strict interviewer from ${university.toUpperCase()} University for the ${subject} undergraduate admission interview. Conduct the interview in English only. Ask probing questions based on the candidate's responses. Keep responses concise, academic, and challenging. Previous conversation history: ${JSON.stringify(history)}.`;

    // DeepSeek API调用（兼容OpenAI格式）
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: 'deepseek-chat', // 或'deepseek-coder'若需代码相关
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7, // 控制随机性，0.7适合对话
      max_tokens: 500 // 限制响应长度，避免过长
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // 提取AI响应
    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error('DeepSeek API错误:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'AI服务错误，请检查API Key或网络' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`服务器运行于端口 ${PORT}`));