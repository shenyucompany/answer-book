import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 20px;
  touch-action: none;
`;

const Book = styled(motion.div)`
  background: rgba(30, 30, 30, 0.9);
  border: 2px solid #333;
  border-radius: 10px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const TouchArea = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid #444;
  border-radius: 10px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: #666;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const TrailEffect = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  pointer-events: none;
`;

const Answer = styled(motion.div)`
  margin-top: 20px;
  padding: 20px;
  min-height: 60px;
  font-style: italic;
  font-size: 1.2em;
  letter-spacing: 1px;
`;

const AnswerChar = styled(motion.span)`
  display: inline-block;
  margin: 0 1px;
`;

const AnswerBook = () => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [answer, setAnswer] = useState('');
  const [touchPoints, setTouchPoints] = useState([]);
  const [isReadyToReveal, setIsReadyToReveal] = useState(false);
  const touchAreaRef = useRef(null);
  const touchStartTime = useRef(null);
  
  const answers = [
    "命运正在向你微笑",
    "耐心等待，时机未到",
    "相信你的直觉",
    "放手去做吧",
    "需要更多考虑",
    "答案就在你心中",
    "机会稍纵即逝，把握当下",
    "保持耐心，静待花开",
    "改变即将到来",
    "一切皆有可能",
  ];

  const handleTouchStart = (e) => {
    touchStartTime.current = Date.now();
    setTouchPoints([]);
    setIsReadyToReveal(false);
    setAnswer('');
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = touchAreaRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    setTouchPoints(points => [...points, { x, y }]);
  };

  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStartTime.current;
    if (touchDuration > 1000 && touchPoints.length > 10) {
      setIsReadyToReveal(true);
      revealAnswer();
    } else {
      setTouchPoints([]);
    }
  };

  const revealAnswer = async () => {
    setIsRevealing(true);
    const selectedAnswer = answers[Math.floor(Math.random() * answers.length)];
    
    setAnswer('');
    
    for (let i = 0; i < selectedAnswer.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setAnswer(prev => prev + selectedAnswer[i]);
    }
    
    setIsRevealing(false);
  };

  return (
    <PageContainer>
      <Book
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>神秘的答案之书</h1>
        <p>闭上眼睛，在心中默想你的问题...</p>
        <p>用手指在下方区域随意滑动，感受命运的指引</p>
        
        <TouchArea
          ref={touchAreaRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {touchPoints.length === 0 && "在此处滑动..."}
          {touchPoints.map((point, index) => (
            <TrailEffect
              key={index}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{ duration: 1 }}
              style={{ left: point.x, top: point.y }}
            />
          ))}
        </TouchArea>

        <AnimatePresence>
          {answer && (
            <Answer>
              {answer.split('').map((char, index) => (
                <AnswerChar
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {char}
                </AnswerChar>
              ))}
            </Answer>
          )}
        </AnimatePresence>
      </Book>
    </PageContainer>
  );
};

export default AnswerBook; 