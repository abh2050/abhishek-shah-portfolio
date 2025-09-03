import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  isStreaming?: boolean;
}

// Pre-defined responses based on your portfolio content
const FAQ_RESPONSES = {
  'education': `Abhishek Shah has an impressive educational background:

• M.S. in Artificial Intelligence & Machine Learning from University of Michigan (2022-2025)
  - Concentration: Natural Language Processing (NLP)
  - Relevant Courses: Advanced Deep Learning, ML Engineering, Cloud AI Systems

• M.S. in Engineering and Technology Management from Washington State University (2018-2020)
  - Focus: Data-Driven Decision Making, Technology Strategy

• Bachelor of Science in Chemical Engineering from University of Minnesota (2007-2012)

His educational journey shows a strategic progression from engineering fundamentals to cutting-edge AI technologies, perfectly positioning him for his current role as a Senior Data Scientist.`,

  'current_role': `Abhishek currently serves as a Data Scientist at BMW (2024-Present), where he:

• Leads development and training of enterprise LLM platform serving 100,000+ users globally
• Spearheads responsible AI use cases development, ensuring alignment with business objectives
• Collaborates with executive leadership and cross-functional teams to deploy transformative AI solutions across BMW's global manufacturing network

His role involves cutting-edge work in generative AI, large language models, and enterprise-scale AI deployment, making him a key player in BMW's digital transformation initiatives.`,

  'experience': `Abhishek brings 13+ years of progressive experience in data science and AI:

BMW - Data Scientist (2024-Present)
• Leading enterprise LLM platform for 100,000+ users
• Developing responsible AI frameworks

Intel - Data Scientist (2019-2024)
• Built RAG pipeline saving $100K/month in costs
• Developed ML models saving $250K yearly
• Implemented AI-driven quality control for 900 welding robots

Westlake Chemical - Data Analytics Process Engineer (2017-2019)
• Reduced raw material usage by 20% through analytics
• Applied predictive modeling reducing costs by 25%

Tate & Lyle - Process Engineer (2012-2017)
• Managed $5MM+ capital projects using data analytics
• Created real-time dashboards for enhanced process visibility`,

  'skills': `Abhishek's technical expertise spans multiple domains:

AI/ML Technologies:
• Deep Learning: TensorFlow, PyTorch, Keras
• NLP: HuggingFace Transformers, spaCy, NLTK
• LLM Integration: OpenAI GPT, Claude, LangChain, LangGraph
• Computer Vision: OpenCV, PIL, scikit-image

Cloud & DevOps:
• AWS: SageMaker, EC2, S3, Lambda
• Azure: ML Studio, Cognitive Services, Data Factory
• Containerization: Docker, Kubernetes
• Orchestration: Apache Airflow, MLflow

Data Engineering:
• Big Data: Apache Spark, Hadoop, Databricks
• Databases: PostgreSQL, MySQL, MongoDB, Neo4j
• Vector Databases: Pinecone, Weaviate, Qdrant, ChromaDB`,

  'projects': `Abhishek has developed numerous cutting-edge AI projects:

Recent Highlights:
• Local RAG with DeepSeek & Ollama - SEC filings analysis using local LLMs
• LangGraph Multi-Agent AI Travel Planner - Advanced multi-agent coordination system
• Customer Service Multi-Agent Swarm - Specialized agents for customer support
• Financial Document Analyzer - AI-powered document insights and analysis
• Legal Document Search Engine - PySpark-based legal text retrieval system

Industry Impact:
• Saved $250K annually through ML-driven defect detection at Intel
• Reduced manufacturing costs by 50% through AI quality control
• Automated processes saving 10+ hours/week per engineer

Each project demonstrates his ability to translate complex AI concepts into practical business solutions.`,

  'default': `I'm Virtual Abhishek, an AI assistant trained on Abhishek Shah's professional portfolio. I can help you learn about his:

• Educational background and degrees
• Current role at BMW and responsibilities  
• 13+ years of professional experience
• Technical skills in AI/ML, cloud computing, and data engineering
• Recent projects and industry impact
• Publications and thought leadership

What specific aspect would you like to know more about?`
};

const VirtualAbhishekChatBotSimple: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Virtual Abhishek, your AI-powered guide to exploring Abhishek Shah's professional journey. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const findBestResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university') || lowerQuery.includes('school') || lowerQuery.includes('study')) {
      return FAQ_RESPONSES.education;
    }
    
    if (lowerQuery.includes('current') || lowerQuery.includes('bmw') || lowerQuery.includes('role') || lowerQuery.includes('job') || lowerQuery.includes('position')) {
      return FAQ_RESPONSES.current_role;
    }
    
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('career') || lowerQuery.includes('background') || lowerQuery.includes('history')) {
      return FAQ_RESPONSES.experience;
    }
    
    if (lowerQuery.includes('skill') || lowerQuery.includes('technical') || lowerQuery.includes('technology') || lowerQuery.includes('programming') || lowerQuery.includes('ai') || lowerQuery.includes('ml') || lowerQuery.includes('machine learning')) {
      return FAQ_RESPONSES.skills;
    }
    
    if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('built') || lowerQuery.includes('developed') || lowerQuery.includes('created')) {
      return FAQ_RESPONSES.projects;
    }
    
    return FAQ_RESPONSES.default;
  };

  const streamText = async (text: string, messageId: string) => {
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, text: currentText, isStreaming: true }
            : msg
        )
      );
      
      const delay = words[i].length > 6 ? 80 : 50;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isStreaming: false }
          : msg
      )
    );
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const botMessageId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: botMessageId,
      text: 'Thinking...',
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputValue('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const responseText = findBestResponse(userMessage.text);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessageId
            ? { ...msg, text: '', isLoading: false, isStreaming: true }
            : msg
        )
      );

      await streamText(responseText, botMessageId);
    } catch (error) {
      const errorMessage = "I apologize, but I'm having trouble processing your request right now. Please try asking about Abhishek's education, current role, experience, skills, or projects.";
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessageId
            ? { ...msg, text: errorMessage, isLoading: false, isStreaming: false }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hi! I'm Virtual Abhishek, your AI-powered guide to exploring Abhishek Shah's professional journey. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const suggestedQuestions = [
    "What is Abhishek's educational background?",
    "Tell me about his current role at BMW",
    "What are his key technical skills?",
    "What major projects has he worked on?",
    "What's his professional experience?",
  ];

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Open Virtual Abhishek Chat"
        >
          <div className="text-2xl">
            {isOpen ? '✖️' : '🤖'}
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-lg">Virtual Abhishek</h3>
                  <p className="text-xs opacity-90">AI Portfolio Assistant</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={clearChat}
                  className="text-white opacity-70 hover:opacity-100 p-1 rounded"
                  title="Clear chat"
                >
                  🗑️
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white opacity-70 hover:opacity-100 p-1 rounded"
                >
                  ✖️
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%]`}>
                  {!message.isUser && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-1">
                      🤖
                    </div>
                  )}
                  
                  <div
                    className={`p-3 rounded-2xl shadow-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : message.isLoading
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {message.isStreaming && (
                      <span className="inline-block w-1 h-4 bg-blue-500 ml-1 animate-pulse"></span>
                    )}
                    
                    <p className="text-sm leading-relaxed whitespace-pre-line text-gray-900 dark:text-gray-100">
                      {message.text}
                    </p>
                    
                    <p className="text-xs opacity-60 mt-1 text-gray-600 dark:text-gray-300">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  
                  {message.isUser && (
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-1">
                      👤
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {messages.length <= 1 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Quick Questions:
                </p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="block w-full text-left text-sm p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-gray-100"
                  >
                    💡 {question}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Abhishek..."
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  '📨'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Powered by AI • Real-time responses from portfolio knowledge
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualAbhishekChatBotSimple;
