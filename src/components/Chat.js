import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {
  const { university, subject } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };

  useEffect(() => {
    scrollToBottom();
    setMessages([{ role: 'interviewer', content: `Welcome to the ${university} ${subject} interview. Please introduce yourself.` }]);
  }, [university, subject]);

  // ...（其他代码不变）
const sendMessage = async () => {
  if (!input.trim() || isLoading) return;
  const userMessage = { role: 'user', content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  try {
    const response = await axios.post('http://localhost:5000/api/chat', { // 指向本地服务器
      university,
      subject,
      message: input,
      history: messages // 发送完整历史
    });
    const aiMessage = { role: 'interviewer', content: response.data.reply };
    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    console.error('AI交互错误:', error);
    // 可添加UI提示：alert('服务器错误，请检查后端');
  }
  setIsLoading(false);
};
// ...（其他代码不变）

  return (
    <div className="d-flex h-100 bg-gradient">
      <div className="col-3 bg-dark p-3 d-none d-md-block">
        <h5 className="mb-3">面试信息</h5>
        <p>大学：{university.toUpperCase()}</p>
        <p>学科：{subject}</p>
      </div>
      <div className="col flex-grow-1 d-flex flex-column">
        <div className="flex-grow-1 overflow-auto p-3" style={{ height: 'calc(100vh - 100px)' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`d-flex ${msg.role === 'interviewer' ? 'justify-content-start' : 'justify-content-end'} mb-2`}>
              <div className={`msg-bubble ${msg.role === 'interviewer' ? 'bg-primary text-white' : 'bg-success text-white'}`}>
                <small className="d-block">{msg.role === 'interviewer' ? '面试官：' : '您：'}</small>
                <span>{msg.content}</span>
              </div>
            </div>
          ))}
          {isLoading && <div className="d-flex justify-content-start mb-2"><div className="alert alert-primary msg-bubble">面试官：思考中...</div></div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 bg-light bg-opacity-10">
          <input
            type="text"
            className="form-control bg-light text-dark"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="输入您的英语回答..."
          />
          <button onClick={sendMessage} disabled={isLoading} className="btn btn-primary w-100 mt-2">发送</button>
        </div>
      </div>
    </div>
  );
};
export default Chat;