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
    // 哲理启示类
    "万事皆有定数，顺其自然",
    "时机未到，继续等待",
    "一切随缘，不必强求",
    "相信内心的选择",
    "时间会给你答案",
    "保持耐心与信心",
    "答案就在你心中",
    "随心而行，无需犹豫",
    "一切都是最好的安排",
    "静心聆听内心的声音",

    // 生活智慧类
    "有时候放手也是一种选择",
    "当下的困惑源于未来的祝福",
    "与其纠结不如放手一试",
    "有些事不必想得太复杂",
    "简单的选择往往最正确",
    "有时候退一步海阔天空",
    "不要给自己太大压力",
    "试着换个角度思考",
    "有些事情需要时间证明",
    "顺其自然可能是最好的选择",

    // 人生感悟类
    "生活总是充满惊喜",
    "有些遗憾也是一种美",
    "得失之间皆有意义",
    "没有对错只有选择",
    "每个决定都有它的意义",
    "有时候不知道也是一种答案",
    "答案往往出人意料",
    "有些事情强求不得",
    "一切都是最好的安排",
    "有些困惑需要时间解答",

    // 玄学精华类
    "天机星明，智慧降临",
    "随缘不变，不变随缘",
    "心若无尘，境自空明",
    "放下执念得自在",
    "顺其自然，逆者难行",
    "一花一世界，一叶一如来",
    "道法自然，物极必反",
    "无为而无不为",
    "天意难违，顺应自然",
    "一切皆是虚妄",

    // 生活哲理类
    "有时候不做选择也是一种选择",
    "答案可能就在犹豫之中",
    "当你纠结时说明在乎",
    "有些事情需要顺其自然",
    "不是所有问题都需要答案",
    "有时候等待也是一种智慧",
    "简单的答案往往最真实",
    "不要被表象所迷惑",
    "真正的答案在于内心",
    "有些事情需要时间证明",

    // 启发思考类
    "问题的答案往往就在问题中",
    "思考本身可能就是答案",
    "有时候没有答案就是答案",
    "答案或许就在寻找的过程中",
    "困惑本身就包含着答案",
    "有些问题不需要答案",
    "答案可能比问题更简单",
    "真相往往出人意料",
    "有时候疑问本身就是答案",
    "答案可能就在你的犹豫中",

    // 人生感悟类
    "生活不会亏待每一个真诚的人",
    "时间会给出最好的答案",
    "有些事情需要用心体会",
    "答案往往在意料之外",
    "真相可能出乎意料",
    "有时候糊涂比清醒更美",
    "不是所有问题都有标准答案",
    "有些事情需要用心感受",
    "答案可能就在你的心中",
    "时间会告诉你真相"
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