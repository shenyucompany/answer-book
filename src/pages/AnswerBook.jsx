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
    // 积极鼓励类
    "命运正在向你微笑",
    "机不可失，大胆前进",
    "天时地利人和，时机已到",
    "成功就在眼前，继续前进",
    "一切皆有可能，勇敢尝试",
    "机会稍纵即逝，把握当下",
    "你比想象中更加强大",
    "相信自己，胜券在握",
    "宇宙正在助你一臂之力",
    "这是最好的选择",

    // 谨慎等待类
    "耐心等待，时机未到",
    "需要更多考虑",
    "不妨再等等看",
    "时机尚未成熟",
    "静观其变为上策",
    "保持耐心，静待花开",
    "暂时按兵不动",
    "等待更好的机会",
    "不要操之过急",
    "需要更完善的准备",

    // 直觉指引类
    "相信你的直觉",
    "答案就在你心中",
    "倾听内心的声音",
    "直觉不会欺骗你",
    "内心的选择最重要",
    "跟随你的感觉",
    "相信第一感觉",
    "心之所向即为正确",
    "内心的指引不会错",
    "直觉给出的答案是对的",

    // 行动建议类
    "放手去做吧",
    "大胆尝试，无需犹豫",
    "现在行动正当时",
    "付诸行动胜过犹豫",
    "只管去做，无需多想",
    "行动起来，别再等待",
    "迈出第一步最重要",
    "行动是最好的选择",
    "立刻开始行动吧",
    "不要让机会溜走",

    // 变化转机类
    "改变即将到来",
    "转机就在眼前",
    "柳暗花明又一村",
    "峰回路转在眼前",
    "好运即将降临",
    "变化正在悄然发生",
    "转折点即将到来",
    "意想不到的惊喜将至",
    "命运的齿轮正在转动",
    "黎明前的黑暗即将过去",

    // 深思熟虑类
    "三思而后行",
    "需要全面考虑",
    "仔细权衡利弊",
    "换个角度思考",
    "不妨多方考虑",
    "理性分析很重要",
    "需要更多信息",
    "谨慎决定为好",
    "多听听他人建议",
    "逐个分析各种可能",

    // 随缘顺其自然类
    "顺其自然最好",
    "一切随缘即可",
    "不必太过强求",
    "随波逐流未尝不可",
    "一切自有安排",
    "平常心对待",
    "不必过分强求",
    "一切都是最好的安排",
    "随遇而安即可",
    "一切自有定数",

    // 积极准备类
    "未雨绸缪为上策",
    "做好充分准备",
    "机会留给有准备的人",
    "未来掌握在你手中",
    "多做准备总是好的",
    "未来可期，继续努力",
    "机会正在靠近",
    "准备好迎接挑战",
    "努力必有回报",
    "胜利在向你招手",

    // 谨慎提醒类
    "需要留个退路",
    "不要把鸡蛋放在一个篮子里",
    "留意潜在风险",
    "谨慎行事为妙",
    "不要操之过急",
    "小心谨慎为上",
    "多留一份心眼",
    "防患于未然",
    "稳妥起见再等等",
    "不要轻易相信",

    // 开放包容类
    "敞开心扉接纳新事物",
    "换个思路也许更好",
    "尝试新的可能",
    "突破常规思维",
    "跳出固有框架",
    "接受改变的可能",
    "新的方向可能更好",
    "尝试不同的选择",
    "保持开放的心态",
    "改变也许是好事"
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