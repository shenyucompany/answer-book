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
    "改变也许是好事",

    // 人际关系类
    "坦诚相待是关键",
    "多一分包容和理解",
    "换位思考很重要",
    "保持适当的距离",
    "真诚永远是最好的选择",
    "给对方一些时间和空间",
    "沟通胜过猜测",
    "用善意去理解对方",
    "维系关系需要双方努力",
    "保持独立的同时也要懂得依靠",

    // 自我提升类
    "现在开始学习为时不晚",
    "投资自己是最好的选择",
    "持续学习永远不过时",
    "跳出舒适区才能成长",
    "自我提升是最好的投资",
    "知识就是力量",
    "学习新技能的好时机",
    "充实自己很有必要",
    "提升自己比较他人更重要",
    "保持学习的热情",

    // 情感指导类
    "倾听内心的声音",
    "给爱一个机会",
    "保持真诚的态度",
    "爱需要勇气表达",
    "珍惜眼前人",
    "别让爱等待",
    "感情需要经营",
    "保持一颗真心",
    "爱要及时表达",
    "给彼此一些空间",

    // 事业发展类
    "职业规划要趁早",
    "寻找适合的发展方向",
    "把握行业发展趋势",
    "专业能力要提升",
    "建立良好的人脉关系",
    "保持竞争力很重要",
    "找准自己的定位",
    "把握市场机遇",
    "提升核心竞争力",
    "建立个人品牌",

    // 财务决策类
    "理性投资很重要",
    "分散投资降低风险",
    "量力而行最稳妥",
    "保持财务独立",
    "未雨绸缪做打算",
    "适度理财有必要",
    "不要孤注一掷",
    "稳健投资为上",
    "留有应急资金",
    "量入为出最重要",

    // 健康生活类
    "保持规律作息",
    "适度运动很重要",
    "注意劳逸结合",
    "保持健康饮食",
    "心态平和最重要",
    "定期体检有必要",
    "保持运动习惯",
    "关注身心健康",
    "适当放松心情",
    "保持良好作息",

    // 创新突破类
    "打破常规思维",
    "创新思路很重要",
    "尝试不同方法",
    "突破固有模式",
    "创新带来机遇",
    "开拓新的方向",
    "跳出思维定式",
    "创新思维制胜",
    "寻找新的可能",
    "突破自我限制",

    // 生活态度类
    "保持乐观心态",
    "享受生活点滴",
    "活在当下最重要",
    "保持平和心态",
    "快乐源于知足",
    "感恩生活中的美好",
    "保持童心与好奇",
    "生活需要仪式感",
    "保持生活热情",
    "珍惜当下时光",

    // 目标规划类
    "制定清晰目标",
    "循序渐进最稳妥",
    "目标要切实可行",
    "分步实现计划",
    "坚持目标不动摇",
    "制定阶段性目标",
    "保持执行力",
    "目标要具体明确",
    "坚持比完美更重要",
    "保持前进动力",

    // 压力管理类
    "适度压力促进成长",
    "调节心态很重要",
    "压力源于内心",
    "学会释放压力",
    "保持心理平衡",
    "找到减压方式",
    "压力需要疏导",
    "调节好心态",
    "适当放松自己",
    "保持心理健康",

    // 时间管理类
    "合理规划时间",
    "把握当下最重要",
    "时间需要管理",
    "提高时间效率",
    "分清事情轻重",
    "合理分配时间",
    "珍惜每分每秒",
    "时间管理有序",
    "提高执行效率",
    "把握黄金时间",

    // 决策智慧类
    "权衡利弊再决定",
    "理性分析很重要",
    "考虑长远影响",
    "全面思考问题",
    "决策要有依据",
    "考虑各方因素",
    "理性决策为上",
    "深思熟虑再行",
    "决策要有预见",
    "考虑决策影响",

    // 心灵成长类
    "内心强大最重要",
    "修养内心世界",
    "保持心灵纯净",
    "提升精神境界",
    "心灵成长需要时间",
    "涵养心灵品质",
    "保持内心平静",
    "提升精神层次",
    "心灵需要沉淀",
    "保持心灵纯粹",

    // 人生哲理类
    "人生在于经历",
    "过程比结果重要",
    "活出真实的自己",
    "人生需要沉淀",
    "经历造就成长",
    "活在当下最真实",
    "人生贵在体验",
    "保持本真本色",
    "活出生命价值",
    "珍惜生命过程",

    // 机遇把握类
    "机会稍纵即逝",
    "把握当下机遇",
    "准备好再出发",
    "机会留给准备者",
    "把握稍纵即逝",
    "抓住机会要快",
    "时机把握很重要",
    "机遇需要准备",
    "把握转瞬即逝",
    "准备迎接机遇",

    // 逆境应对类
    "逆境是人生财富",
    "困境中寻找机会",
    "逆境造就成长",
    "坚持就是胜利",
    "困境使人更强",
    "逆境是成长契机",
    "坚持必有回报",
    "困境终将过去",
    "逆境磨练意志",
    "坚持看到希望",

    // 人生价值类
    "追求内心的价值",
    "实现自我价值",
    "活出生命意义",
    "追求真实自我",
    "实现人生价值",
    "活出精彩人生",
    "追求生命意义",
    "实现自我追求",
    "活出独特人生",
    "追求心中理想",

    // 智慧人生类
    "智慧源于生活",
    "经验累积智慧",
    "智慧需要沉淀",
    "生活造就智慧",
    "经历带来智慧",
    "智慧来自体验",
    "生活给予智慧",
    "经验转化智慧",
    "智慧需要积累",
    "生活孕育智慧",

    // 内心平和类
    "保持内心平静",
    "心平气和最好",
    "内心安宁致远",
    "平和心态致胜",
    "内心平静制胜",
    "心态平和致远",
    "内心安宁最美",
    "平和心态最佳",
    "内心平静致远",
    "心态平和制胜"
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