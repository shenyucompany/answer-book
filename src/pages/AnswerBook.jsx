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

    // 行动指引类
    "把握当下，及时行动",
    "等待不如立即行动",
    "时不我待，把握机会",
    "勇敢尝试，无需后悔",
    "行动胜过犹豫不决",
    "机会稍纵即逝，请把握当下",
    "不要让时间蹉跎而过",
    "现在就是最好的时机",
    "付诸行动才有收获",
    "不要让机会从指间溜走",

    // 智慧启迪类
    "智者顺应天意",
    "万物自有其道",
    "一切自有定数",
    "顺应自然规律",
    "天道酬勤",
    "万事有因必有果",
    "一切皆有可能",
    "命运自有安排",
    "天意不可违",
    "道法自然",

    // 平衡之道类
    "过犹不及，把握分寸",
    "中庸之道最为安全",
    "平和之心最为重要",
    "不偏不倚，守住本心",
    "适度而行，不急不躁",
    "张弛有度，收放自如",
    "进退有据，从容自在",
    "不卑不亢，恰到好处",
    "遵循规律，循序渐进",
    "把握分寸，适可而止",

    // 变化转机类
    "否极泰来，守得云开",
    "柳暗花明又一村",
    "山重水复疑无路",
    "峰回路转在眼前",
    "守得云开见月明",
    "车到山前必有路",
    "船到桥头自然直",
    "天无绝人之路",
    "苦尽甘来",
    "黎明前的黑暗即将过去",

    // 谨慎提醒类
    "三思而后行",
    "慎重决定为上",
    "留有余地为妙",
    "不妨再等等看",
    "谨慎行事为好",
    "多加考虑无妨",
    "静观其变为宜",
    "从长计议为佳",
    "稳妥行事为上",
    "深思熟虑为要",

    // 内心指引类
    "聆听内心的声音",
    "心之所向即为道",
    "随心而行无愧意",
    "本心所向不会错",
    "内心的选择最真实",
    "直觉往往最准确",
    "心之所安即为家",
    "内心的指引最可靠",
    "心有所属必有方向",
    "心之所念即为路",

    // 因果循环类
    "种善因得善果",
    "善恶终有报",
    "因果循环不爽",
    "一切皆有因果",
    "种什么因得什么果",
    "善有善报恶有恶报",
    "种瓜得瓜种豆得豆",
    "因果报应如影随形",
    "善恶到头终有报",
    "种下善因必得善果",

    // 自然规律类
    "天道自然，循环往复",
    "阴阳轮转，生生不息",
    "四季更迭，万物有序",
    "潮起潮落，自有规律",
    "日月交替，自有定数",
    "春华秋实，循环不止",
    "万物生长，各有其时",
    "天地运行，自有法则",
    "自然法则，亘古不变",
    "宇宙规律，永恒不变",

    // 宿命玄机类
    "命中注定自有缘",
    "缘分天注定",
    "一切皆是命中安排",
    "天意自有安排",
    "命运自有定数",
    "前程自有天定",
    "缘分自有天意",
    "天机不可泄露",
    "命运自有轨迹",
    "天意不可违逆",

    // 八卦玄机类
    "乾卦示警，谨慎而行",
    "坤卦现世，厚德载物",
    "震卦而动，行动有时",
    "巽卦告知，顺势而为",
    "坎卦示危，险中有机",
    "离卦明示，光明在前",
    "艮卦告诫，止于至善",
    "兑卦指引，喜悦可期",
    "六爻皆阳，大吉大利",
    "六爻皆阴，静待转机",

    // 五行相生类
    "金生水，循环不息",
    "水生木，生机勃发",
    "木生火，激情燃烧",
    "火生土，厚积薄发",
    "土生金，万物归藏",
    "五行相生，道法自然",
    "阴阳交替，生生不息",
    "天地交泰，万物复苏",
    "四象流转，生生不已",
    "五行相济，万事亨通",

    // 星象启示类
    "紫微星动，贵人相助",
    "天机星明，智慧降临",
    "文昌星耀，学业有成",
    "金星高照，姻缘将至",
    "太白临门，变化在即",
    "天罡指引，前程似锦",
    "北斗垂象，指引方向",
    "南斗护佑，平安喜乐",
    "七星汇聚，时来运转",
    "众星拱月，吉祥如意",

    // 佛家禅机类
    "一切皆是虚妄",
    "放下执念得自在",
    "随缘不变，不变随缘",
    "心若无尘，境自空明",
    "万法皆空，因果不空",
    "菩提本无树，明镜亦非台",
    "一花一世界，一叶一如来",
    "放下便是得到",
    "无心方见本心",
    "静心自见菩提",

    // 道家玄机类
    "道生一，一生二",
    "无为而无不为",
    "清静自然得道",
    "顺其自然，逆者难行",
    "道法自然，物极必反",
    "太极生两仪，两仪生四象",
    "无极而太极",
    "虚极静笃，守静待时",
    "致虚极，守静笃",
    "大道至简，大智若愚",

    // 奇门遁甲类
    "天门开启，吉运将至",
    "地户相迎，基业永固",
    "人门大开，贵人相助",
    "九星汇聚，大吉大利",
    "八门齐开，通达四方",
    "六甲护身，诸邪退避",
    "三奇聚会，非常之象",
    "四维得位，稳固安康",
    "中宫得正，事事亨通",
    "遁甲临门，化险为夷",

    // 周易卦象类
    "上上卦象，诸事皆宜",
    "中上之象，稳步向前",
    "大吉大利，前程似锦",
    "小吉之象，渐入佳境",
    "平平之卦，守成为上",
    "待时之象，静候佳音",
    "转机在即，守待有时",
    "危中有机，谨慎而行",
    "否极泰来，守得云开",
    "泰来否去，把握机缘",

    // 灵机示警类
    "天机不可泄露太多",
    "玄机暗藏，静待时机",
    "天意难违，顺应自然",
    "神机妙算，暗中有助",
    "仙机隐现，需细心体会",
    "玄机已现，只待时机",
    "天机已露，速速行动",
    "神机莫测，静观其变",
    "仙机点化，明悟在即",
    "灵机一动，勿失良机"
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