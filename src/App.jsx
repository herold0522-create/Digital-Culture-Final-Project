import React, { useState, useEffect } from 'react';
import { 
  Home, Compass, MessageCircle, User, 
  Lock, Unlock, ShieldCheck, ChevronRight, 
  Heart, MessageSquare, Share2, ArrowLeft, ArrowRight,
  Sparkles, Fingerprint, Activity,
  Settings, Bell, LogOut, CheckCircle2, X,
  Calendar, Plus, Image as ImageIcon,
  MoreHorizontal, Play, Search, Zap,
  Palette, Headphones, Gamepad2, BookOpen, Camera, LayoutGrid,
  Ticket, MapPin, Clock, Users, Train
} from 'lucide-react';

// ==========================================
// 1. 核心数据模型 (包含至诚学院背景故事)
// ==========================================
const CIRCLES = [
  {
    id: 'guofeng',
    name: '国风动漫社',
    tags: ['二次元', '汉服', '同人'],
    members: 1284,
    headline: '文化，在此觉醒。',
    desc: '专注国漫安利、汉服形制研究与同人创作的聚集地。绝无闲杂人等。',
    cover: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=1200',
    quiz: [
      { question: '以下哪部属于优秀的国产动画（国漫）？', options: ['A. 《大理寺日志》', 'B. 《火影忍者》', 'C. 《进击的巨人》'], answer: 0 },
      { question: '圈内常说的“吃谷”是指什么行为？', options: ['A. 提倡节约粮食', 'B. 购买动漫周边产品', 'C. 一种汉服穿着方式'], answer: 1 }
    ],
    privatePosts: [
      { id: 'pr1', author: '云中君', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', content: '家人们，周末漫展谁要一起出C？我这套明制还在犹豫配什么头饰，求推荐！', likes: 45, comments: 23, time: '10分钟前' }
    ]
  },
  {
    id: 'dance',
    name: '街舞交流圈',
    tags: ['震感舞', '嘻哈', '编舞'],
    members: 3420,
    headline: '节奏，重塑灵魂。',
    desc: '舞者的专属阵阵地。用身体丈量热爱，用汗水诠释态度。',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200',
    quiz: [
      { question: 'Locking（锁舞）的标志性动作之一是什么？', options: ['A. Point (指手)', 'B. Headspin (头转)', 'C. Moonwalk (月球漫步)'], answer: 0 }
    ],
    privatePosts: [
      { id: 'd_pr1', author: 'Locking_Jay', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', content: '今晚北区食堂门口镜子前，有人来切磋吗？', likes: 67, comments: 15, time: '刚刚' }
    ]
  },
  {
    id: 'transit',
    name: '交通迷运转群',
    tags: ['铁道', '公交', '民航'],
    members: 856,
    headline: '脉络，尽收眼底。',
    desc: '记录城市脉络，分享列车交路、公交迷日常与运转记录。',
    cover: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=1000',
    quiz: [], 
    founder: '福州大学至诚学院 创办',
    heroTitle: '探索，记录，运转。',
    lore: '本群起源于 2008 年福州大学至诚学院机电工程系的一间宿舍。我们用镜头和路书丈量着城市的每一次脉动，与你分享所有纯粹的热爱。',
    privatePosts: [
      { id: 't_pr1', author: '运转手小林', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', content: '今天打卡了福州地铁4号线首通段，全自动驾驶的平顺度真的绝了！第一视角的车头风景太震撼了，路书已上传。', likes: 124, comments: 32, time: '3小时前' },
      { id: 't_pr2', author: '至诚_飞羽', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', content: '周末准备去运转一趟经典的 K1234 次列车，有人要一起拼座吗？', likes: 89, comments: 15, time: '昨天' }
    ]
  }
];

const NOTIFICATIONS = [
  { id: 1, type: 'system', title: '系统更新', desc: '全新温柔认证系统已上线，你的安全由我们来守护。', time: '刚刚', unread: true },
  { id: 2, type: 'system', title: '圈层开放通知', desc: '「交通迷运转群」现已通过福州大学至诚学院认证。', time: '1小时前', unread: true },
  { id: 3, type: 'interaction', title: '云中君', desc: '赞同了你的帖子：“这套汉服形制非常考究”', time: '2小时前', unread: false },
  { id: 4, type: 'interaction', title: 'Locking_Jay', desc: '在「街舞交流圈」中提到了你', time: '昨天', unread: false },
];

const HERO_ACTIVITY = {
  id: 'hero1',
  title: '「破界」全能数字艺术特展',
  circle: '数字视觉前沿',
  date: '本周五 19:30',
  desc: '沉浸式视觉与听觉的双重盛宴。',
  cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600'
};

const ACTIVITIES = [
  { id: 'act1', title: '独立短片展映与导演对谈', date: '周六 14:00', cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800', circle: '光影记录' },
  { id: 'act2', title: '极限飞盘高校联赛选拔', date: '周日 09:00', cover: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800', circle: '运动竞技' },
  { id: 'act3', title: '现代先锋艺术画廊巡展', date: '下周三 15:00', cover: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800', circle: '文艺创作' }
];

const USER_INFO = { name: '测试用户', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150', id: 'user_8829' };

const CATEGORIES = [
  { icon: Palette, label: '文艺创作' },
  { icon: Activity, label: '运动竞技' },
  { icon: Headphones, label: '音乐交流' },
  { icon: Gamepad2, label: '电子竞技' },
  { icon: BookOpen, label: '学术探讨' },
  { icon: Camera, label: '光影记录' }
];

// ==========================================
// 2. UI 基础组件
// ==========================================
const FadeInView = ({ children, delay = '', className = '' }) => (
  <div className={`animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out fill-mode-both ${delay} ${className}`}>
    {children}
  </div>
);

const GlassCard = ({ children, className = '', onClick, style }) => (
  <div 
    onClick={onClick}
    style={style}
    className={`bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(167,139,250,0.1)] rounded-[2rem] overflow-hidden ${onClick ? 'cursor-pointer active:scale-95 transition-all hover:shadow-[0_8px_30px_rgba(167,139,250,0.2)] hover:-translate-y-1' : ''} ${className}`}
  >
    {children}
  </div>
);

// ==========================================
// 3. 主程序入口
// ==========================================
export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('home'); 
  const [activeCircle, setActiveCircle] = useState(null);
  const [joinedCircles, setJoinedCircles] = useState(['dance']); 
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => { setAuthLoading(false); setIsAuth(true); }, 1200);
  };

  const handleJoinCircle = (circleId) => {
    if (!joinedCircles.includes(circleId)) {
      setJoinedCircles([...joinedCircles, circleId]);
    }
    setShowQuiz(false);
    showToast('✨ 已为您解锁该圈层私有空间');
  };

  const handleOpenQuiz = (circle) => {
    if (!circle) return;
    if (circle.quiz && circle.quiz.length > 0) {
      setQuizStep(0);
      setShowQuiz(true);
    } else {
      handleJoinCircle(circle.id);
    }
  };

  const handleRegisterEvent = (eventId, e) => {
    e.stopPropagation();
    if (registeredEvents.includes(eventId)) {
       showToast('你已经报名过该活动啦');
       return;
    }
    setRegisteredEvents([...registeredEvents, eventId]);
    showToast('🎉 报名成功！记得准时参加哦');
  };

  const NAV_ITEMS = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'discover', icon: Compass, label: '发现' },
    { id: 'circles', icon: LayoutGrid, label: '圈层' },
    { id: 'messages', icon: MessageCircle, label: '通知' },
    { id: 'profile', icon: User, label: '我' },
  ];

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F7FF] via-[#EAE1FF] to-[#FFFFFF] font-sans text-indigo-950 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm flex flex-col items-center animate-in zoom-in-95 duration-1000">
          <div className="mb-12 text-center">
            <h1 className="text-6xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-lg">同频<span className="text-[#a78bfa]">.</span></h1>
            <p className="text-indigo-800/60 font-bold tracking-wide">找到属于你的精神角落</p>
          </div>
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <button className="w-full bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white font-bold text-lg rounded-full py-5 shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
              {authLoading ? '正在开启空间...' : '进入空间'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderSidebar = () => (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white/50 backdrop-blur-3xl border-r border-white/60 p-8 z-40">
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold text-indigo-950 tracking-tight flex items-center gap-2">
          <Sparkles className="text-[#a78bfa]" size={24} />
          数字文化
        </h1>
        <p className="text-[10px] text-indigo-800/50 mt-1 font-black tracking-[0.2em] uppercase">This Circle</p>
      </div>
      <nav className="flex-1 space-y-3">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setCurrentTab(item.id); setActiveCircle(null); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black transition-all ${
                isActive ? 'bg-white/80 text-[#a78bfa] shadow-sm scale-[1.02]' : 'text-indigo-800/40 hover:bg-white/30 hover:text-indigo-950'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto bg-white/60 p-4 rounded-3xl flex items-center gap-3 border border-white cursor-pointer hover:bg-white/90 transition-all shadow-sm group">
        <img src={USER_INFO.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-indigo-950 truncate">{USER_INFO.name}</p>
          <p className="text-[10px] text-indigo-800/60 font-bold uppercase tracking-wider">Pro 认证</p>
        </div>
      </div>
    </aside>
  );

  const renderHeader = () => (
    <header className="sticky top-0 z-30 bg-white/50 backdrop-blur-2xl border-b border-white/50 px-6 py-4 flex justify-between items-center md:hidden shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="text-[#a78bfa]" size={24} />
        <h1 className="text-xl font-black text-indigo-950 tracking-tight">数字文化</h1>
      </div>
      <img src={USER_INFO.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-white" />
    </header>
  );

  const renderBottomNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-3xl border-t border-white/60 pb-safe z-40 shadow-lg">
      <div className="flex justify-around items-center h-16 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button key={item.id} onClick={() => { setCurrentTab(item.id); setActiveCircle(null); }} className="flex flex-col items-center justify-center w-12 h-full relative">
              <item.icon size={26} strokeWidth={isActive ? 3 : 2} className={`transition-all duration-300 ${isActive ? 'text-[#a78bfa] scale-110' : 'text-indigo-800/30'}`} />
              {isActive && <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#a78bfa] rounded-full shadow-[0_0_10px_rgba(167,139,250,1)] animate-pulse"></span>}
            </button>
          );
        })}
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="max-w-6xl mx-auto px-4 md:px-10 pt-6 pb-24 md:pb-12 space-y-12 animate-in fade-in hide-scrollbar">
      <div className="hidden md:flex justify-between items-center pt-2">
        <div className="relative w-96">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-800/40" size={20} />
          <input type="text" placeholder="探索圈层、动态或活动..." className="w-full pl-14 pr-6 py-4 bg-white/60 backdrop-blur-md rounded-full border border-white/80 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#EAE1FF]/50 transition-all text-sm text-indigo-950 font-bold shadow-sm placeholder:text-indigo-800/30"/>
        </div>
        <button className="w-12 h-12 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/80 hover:bg-white transition-all text-indigo-950 shadow-sm relative group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-3 h-3 bg-rose-400 border-2 border-white rounded-full"></span>
        </button>
      </div>

      <section className="space-y-6">
        <div className="animate-in slide-in-from-left-8 duration-700">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-indigo-950 mb-3 drop-shadow-sm">进入同频。</h2>
          <p className="text-xl text-indigo-800/60 font-black">兴趣社交，做成高级审美的日常体验。</p>
        </div>
        <GlassCard className="relative overflow-hidden group p-0 border-0 shadow-2xl">
          <div className="h-56 md:h-80 w-full relative bg-indigo-100 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=1200" alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-80"></div>
          </div>
          <div className="p-8 md:p-10 bg-white/80 backdrop-blur-3xl relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="bg-[#a78bfa]/10 text-[#a78bfa] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">推荐圈子</span>
                <h3 className="text-3xl font-black text-indigo-950">国风动漫社</h3>
                <p className="text-sm text-indigo-800/60 font-bold max-w-lg">专注国漫安利、汉服形制研究与同人创作。纯粹，拒绝喧哗。</p>
              </div>
              <button onClick={() => { setActiveCircle(CIRCLES[0]); handleOpenQuiz(CIRCLES[0]); }} className="self-start md:self-center bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white px-8 py-4 rounded-full text-sm font-black flex items-center gap-3 hover:shadow-xl hover:scale-105 active:scale-95 transition-all shadow-lg">
                立即申请 <ArrowRight size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
        {[
          { label: '兴趣圈子', value: '128+', icon: Compass },
          { label: '活跃成员', value: '8,420+', icon: User },
          { label: '讨论帖子', value: '26,890+', icon: MessageCircle },
          { label: '精彩活动', value: '340+', icon: Zap },
        ].map((stat, idx) => (
          <GlassCard key={idx} className="p-6 md:p-8 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out" style={{ animationDelay: `${idx * 120}ms` }}>
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-gradient-to-br from-[#EAE1FF] to-indigo-50 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-1000 ease-out"></div>
            <div className="relative z-10 flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm text-[#a78bfa] flex items-center justify-center shrink-0">
                <stat.icon size={20} strokeWidth={3} />
              </div>
              <p className="text-xs text-indigo-800/50 font-black tracking-widest uppercase">{stat.label}</p>
            </div>
            <p className="relative z-10 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] to-[#818cf8] tracking-tighter truncate">
              {stat.value}
            </p>
          </GlassCard>
        ))}
      </section>

      <section className="space-y-8 pb-12">
        <h2 className="text-3xl font-black tracking-tight text-indigo-950">探索多元矩阵。</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: '文艺创作', desc: '灵感的碰撞', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800' },
            { title: '运动竞技', desc: '汗水的挥洒', img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=800' },
            { title: '兴趣同好', desc: '纯粹的热爱', img: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800' }
          ].map((item, idx) => (
            <GlassCard key={idx} className="p-6 text-center group hover:bg-white/80 transition-all shadow-xl">
              <div className="h-56 rounded-3xl overflow-hidden mb-6 relative shadow-inner bg-indigo-50">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <h3 className="text-2xl font-black text-indigo-950 mb-1">{item.title}</h3>
              <p className="text-sm text-indigo-800/60 font-bold">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );

  const renderDiscover = () => (
    <div className="pt-6 md:pt-10 px-4 md:px-6 max-w-6xl mx-auto animate-in fade-in pb-24 hide-scrollbar">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-indigo-950">发现</h1>
         <div className="w-10 h-10 rounded-full bg-white/80 p-0.5 shadow-sm border border-white">
            <img src={USER_INFO.avatar} className="w-full h-full rounded-full object-cover" alt="User"/>
         </div>
      </div>

      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-10 group shadow-xl border border-white/50">
         <img src={HERO_ACTIVITY.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
         <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-white max-w-lg">
               <div className="flex items-center gap-2 mb-3">
                 <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase border border-white/30">Top Event</span>
                 <span className="text-xs font-bold text-white/90">{HERO_ACTIVITY.circle}</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">{HERO_ACTIVITY.title}</h2>
               <p className="text-sm md:text-base text-white/80 font-medium">{HERO_ACTIVITY.desc}</p>
            </div>
            <button
               onClick={(e) => handleRegisterEvent(HERO_ACTIVITY.id, e)}
               className="bg-white text-indigo-950 px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
               {registeredEvents.includes(HERO_ACTIVITY.id) ? '已报名' : '立即报名'}
            </button>
         </div>
      </div>

      <div className="mb-14 animate-in slide-in-from-bottom-8">
        <div className="flex gap-4 md:gap-5 overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 md:-mx-0 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
           {ACTIVITIES.map((activity, idx) => {
             const isRegistered = registeredEvents.includes(activity.id);
             return (
               <div key={activity.id} className="min-w-[260px] md:min-w-[320px] w-[260px] md:w-[320px] shrink-0 flex flex-col group cursor-pointer snap-start" style={{ animationDelay: `${idx * 100}ms` }}>
                 <div className="w-full aspect-video rounded-2xl overflow-hidden mb-3 shadow-md border border-black/5 relative bg-indigo-50">
                   <img src={activity.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={activity.title} />
                 </div>
                 <div className="px-1 flex items-start justify-between gap-3">
                   <div className="flex-1 min-w-0 flex flex-col pt-1">
                     <h3 className="font-black text-indigo-950 text-base leading-tight truncate">{activity.title}</h3>
                     <p className="text-xs text-indigo-800/60 font-semibold mt-1 truncate">{activity.circle} · {activity.date}</p>
                   </div>
                   <button
                      onClick={(e) => handleRegisterEvent(activity.id, e)}
                      disabled={isRegistered}
                      className={`shrink-0 px-4 py-1.5 mt-0.5 rounded-full text-[11px] font-black transition-all ${isRegistered ? 'bg-indigo-50 text-indigo-300' : 'bg-indigo-100 text-[#a78bfa] hover:bg-[#a78bfa] hover:text-white'}`}
                   >
                     {isRegistered ? '已报' : '报名'}
                   </button>
                 </div>
               </div>
             )
           })}
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl font-black text-indigo-950 mb-4 flex items-center gap-2">
           <Compass className="text-[#a78bfa]" size={20}/> 探索圈层
        </h2>
        {CIRCLES.map((circle, idx) => (
          <FadeInView key={circle.id} delay={`delay-${idx * 100}`}>
            <GlassCard onClick={() => setActiveCircle(circle)} className="p-5 flex items-center gap-6 group hover:shadow-2xl">
               <div className="flex-1 space-y-2">
                  <h3 className="font-black text-2xl text-indigo-950 group-hover:text-[#a78bfa] transition-colors">{circle.name}</h3>
                  <p className="text-sm text-indigo-800/60 font-bold line-clamp-2 leading-relaxed">{circle.desc}</p>
               </div>
               <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] overflow-hidden relative shadow-inner shrink-0 border border-white/50">
                  <img src={circle.cover} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-indigo-950/10"></div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#a78bfa] shadow-sm">
                     <Play size={14} fill="currentColor" className="ml-0.5" />
                  </div>
               </div>
            </GlassCard>
          </FadeInView>
        ))}
      </div>
    </div>
  );

  const renderCircles = () => (
    <div className="pt-6 md:pt-10 max-w-5xl mx-auto animate-in fade-in pb-24 hide-scrollbar">
      <div className="flex items-start justify-start md:justify-center overflow-x-auto gap-6 md:gap-10 lg:gap-16 px-6 py-8 mb-4 hide-scrollbar">
        {CATEGORIES.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4 cursor-pointer group min-w-[4rem] animate-in zoom-in duration-700" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className="w-16 h-16 rounded-[1.5rem] bg-white/70 backdrop-blur-md shadow-sm border border-white flex items-center justify-center text-indigo-900 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#b7a8ff] group-hover:to-[#c084fc] group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
              <cat.icon size={28} strokeWidth={2} />
            </div>
            <span className="text-[11px] font-black text-indigo-950/80 whitespace-nowrap tracking-wide">{cat.label}</span>
          </div>
        ))}
      </div>
      
      <div className="px-6 text-center mt-8 mb-24 relative">
        <style>
          {`
            @keyframes hugeShrink {
              0% { transform: scale(3.5); opacity: 0; filter: blur(12px); }
              40% { opacity: 1; filter: blur(0px); }
              100% { transform: scale(1); opacity: 1; filter: blur(0px); }
            }
            .animate-huge-shrink {
              animation: hugeShrink 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}
        </style>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#a78bfa] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">Find Your Spiritual Sanctuary</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-indigo-950 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">遇见，你的</h2>
          <div className="mt-[-0.5rem] md:mt-[-1.5rem] relative z-20">
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black text-white tracking-tighter drop-shadow-xl animate-huge-shrink leading-none">精神领地<span className="text-indigo-200">.</span></h1>
          </div>
        </div>
        <p className="text-sm md:text-base font-bold text-indigo-800/70 leading-relaxed max-w-xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">备受赞誉的国风创作，血脉喷张的街舞现场。全校最硬核的交通迷运转记录。这里只有最纯粹的文化和沉浸体验 —— 仅限同频者入内。</p>
      </div>

      <div className="px-6 space-y-8">
        <h2 className="text-2xl font-black text-indigo-950">正在开放的圈层</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {CIRCLES.map(circle => {
            const isJoined = joinedCircles.includes(circle.id);
            return (
              <GlassCard key={circle.id} onClick={() => setActiveCircle(circle)} className="p-6 flex items-center gap-6 group border-0 shadow-xl hover:bg-white transition-all">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 relative">
                  <img src={circle.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt=""/>
                  {isJoined && (
                    <div className="absolute inset-0 bg-[#a78bfa]/20 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white/90 p-2 rounded-full text-[#a78bfa] shadow-lg scale-110"><Unlock size={16} strokeWidth={4} /></div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className="text-xl font-black text-indigo-950 truncate">{circle.name}</h3>
                  <p className="text-xs text-indigo-800/60 font-bold line-clamp-2 leading-relaxed mb-3">{circle.desc}</p>
                  <div className="flex gap-2">
                    {circle.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] bg-indigo-50 px-2.5 py-1 rounded-lg text-[#a78bfa] font-black border border-[#a78bfa]/10">{tag}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="pt-6 md:pt-10 px-6 pb-24 max-w-4xl mx-auto animate-in fade-in hide-scrollbar">
      <h1 className="text-4xl font-black tracking-tighter mb-10 text-indigo-950">通知中心</h1>
      <GlassCard className="overflow-hidden p-0 border-0 shadow-xl">
        {NOTIFICATIONS.map((msg) => (
          <div key={msg.id} className="flex gap-5 p-6 active:bg-white/40 hover:bg-white/20 transition-all cursor-pointer border-b border-white/40 last:border-0 relative">
            <div className="relative flex-shrink-0">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${msg.type === 'system' ? 'bg-gradient-to-br from-[#b7a8ff] to-[#c084fc] text-white' : 'bg-white border border-indigo-50 text-[#a78bfa]'}`}>
                {msg.type === 'system' ? <Zap size={24} strokeWidth={2.5}/> : <User size={24} strokeWidth={2.5}/>}
              </div>
              {msg.unread && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full border-2 border-white shadow-sm"></span>}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-indigo-950 truncate">{msg.title}</span>
                <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">{msg.time}</span>
              </div>
              <p className={`text-sm line-clamp-2 leading-relaxed ${msg.unread ? 'text-indigo-900 font-bold' : 'text-indigo-800/50 font-medium'}`}>{msg.desc}</p>
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );

  const renderProfile = () => (
    <div className="pt-6 md:pt-10 px-6 pb-24 max-w-4xl mx-auto animate-in fade-in space-y-10 hide-scrollbar">
      <h1 className="text-4xl font-black tracking-tighter text-indigo-950">我的</h1>
      <GlassCard className="p-8 relative overflow-hidden shadow-2xl border-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#c084fc]/10 blur-[60px] rounded-full"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
          <div className="w-28 h-28 rounded-[2.5rem] bg-white p-1.5 shadow-2xl rotate-3">
            <img src={USER_INFO.avatar} alt="Avatar" className="w-full h-full rounded-[2.2rem] object-cover" />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-indigo-950 mb-1">{USER_INFO.name}</h2>
              <p className="text-xs font-black text-indigo-800/40 tracking-widest uppercase">Member ID: {USER_INFO.id}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-white bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] px-4 py-1.5 rounded-full font-black shadow-lg inline-flex uppercase tracking-widest">
              <ShieldCheck size={14} strokeWidth={3}/> Pro Verified
            </div>
          </div>
        </div>
      </GlassCard>
      <div className="space-y-4">
         <GlassCard className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/80 transition-all">
            <div className="flex items-center gap-4">
               <Ticket className="text-[#a78bfa]" />
               <span className="font-black text-indigo-950">我的活动报名单 <span className="text-[#a78bfa] ml-1">({registeredEvents.length})</span></span>
            </div>
            <ChevronRight className="text-indigo-200 group-hover:translate-x-1 transition-transform" />
         </GlassCard>
         <button onClick={() => { setIsAuth(false); setCurrentTab('home'); }} className="w-full bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] py-6 flex items-center justify-center gap-3 text-rose-500 font-black hover:bg-rose-50 transition-all shadow-lg active:scale-95">
           <LogOut size={20} strokeWidth={3.5} /> 退出登录
         </button>
      </div>
    </div>
  );

  const renderCircleDetail = () => {
    const isJoined = joinedCircles.includes(activeCircle.id);
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#F4F5F8] via-[#FFFFFF] to-[#F8F7FF] text-indigo-950 z-[100] animate-in slide-in-from-right-full duration-500 flex flex-col md:left-64">
        <div className="absolute top-8 left-6 right-6 flex justify-between z-[60] max-w-5xl mx-auto">
          <button onClick={() => setActiveCircle(null)} className="w-12 h-12 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-md border border-white/80 hover:bg-white transition-all text-indigo-900">
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pt-24 pb-32 max-w-4xl mx-auto w-full hide-scrollbar">
           {!isJoined ? (
             <div className="text-center space-y-8 animate-in fade-in mt-12">
                <div className="w-24 h-24 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl rotate-3"><Lock size={40} className="text-[#a78bfa]" strokeWidth={3} /></div>
                <h1 className="text-4xl font-black">{activeCircle.name}</h1>
                <p className="text-indigo-800/60 font-bold max-w-xs mx-auto">完成认知验证以加入此圈层并解锁讨论区。</p>
                <button onClick={() => handleOpenQuiz(activeCircle)} className="w-full max-w-xs bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white font-black py-5 rounded-3xl shadow-xl hover:scale-105 transition-transform">开始验证</button>
             </div>
           ) : (
             <div className="pb-10">
                <style>
                  {`
                    @keyframes iconPopExaggerated {
                      0% { transform: scale(0) translateY(30px); opacity: 0; }
                      50% { transform: scale(1.35) translateY(-10px); opacity: 1; }
                      75% { transform: scale(0.9) translateY(5px); opacity: 1; }
                      100% { transform: scale(1) translateY(0); opacity: 1; }
                    }
                    .animate-icon-pop { animation: iconPopExaggerated 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                  `}
                </style>
                <div className="flex flex-col items-center justify-center text-center mt-6 md:mt-10 mb-16">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-b from-[#ff9a44] to-[#ff5200] rounded-[1.8rem] shadow-xl flex items-center justify-center text-white mb-5 animate-icon-pop">
                    <Train size={40} strokeWidth={2.5} />
                  </div>
                  <span className="text-[13px] font-black text-indigo-950/70 mb-8 tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
                    {activeCircle.founder || '官方认证圈层'}
                  </span>
                  <h1 className="text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] font-black tracking-tight text-indigo-950 leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '400ms' }}>
                    {activeCircle.heroTitle || activeCircle.name}
                  </h1>
                  <p className="text-[15px] md:text-[17px] font-bold text-indigo-900/70 max-w-3xl mx-auto leading-relaxed px-2 md:px-6 whitespace-pre-line animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '600ms' }}>
                    {activeCircle.lore || activeCircle.desc}
                  </p>
                </div>
                <div className="w-12 h-1.5 bg-indigo-100 mx-auto rounded-full mb-12 animate-in fade-in" style={{ animationDelay: '800ms' }}></div>
                <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: '1000ms' }}>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-indigo-950">最新运转记录</h3>
                    <button className="text-sm font-black text-[#a78bfa] bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100">发布路书</button>
                  </div>
                  {activeCircle.privatePosts?.map((post) => (
                    <GlassCard key={post.id} className="p-6 md:p-8 bg-white border border-indigo-50/50 shadow-sm hover:shadow-xl transition-all">
                       <div className="flex items-center gap-4 mb-6">
                         <img src={post.avatar} className="w-12 h-12 rounded-full object-cover border border-indigo-50" />
                         <div>
                           <h4 className="font-black text-base text-indigo-950">{post.author}</h4>
                           <p className="text-[10px] font-black text-indigo-400 uppercase">{post.time}</p>
                         </div>
                       </div>
                       <p className="text-indigo-900/90 font-bold leading-relaxed">{post.content}</p>
                    </GlassCard>
                  ))}
                </div>
             </div>
           )}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (!activeCircle || !activeCircle.quiz || !activeCircle.quiz[quizStep]) return null;
    const q = activeCircle.quiz[quizStep];
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-indigo-950/40 backdrop-blur-xl animate-in fade-in duration-300 md:pl-64">
        <GlassCard className="w-full max-w-sm p-10 shadow-2xl relative bg-white/95 border-0">
          <button onClick={() => setShowQuiz(false)} className="absolute top-6 right-6 w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-400"><X size={20} strokeWidth={3} /></button>
          <div className="mb-10 text-center">
            <span className="bg-indigo-50 text-[#a78bfa] text-[10px] font-black px-4 py-1.5 rounded-full uppercase border border-[#a78bfa]/10">验证申请 {quizStep + 1} / {activeCircle.quiz.length}</span>
            <h3 className="font-black text-3xl mt-6 text-indigo-950">身份认同</h3>
          </div>
          <h4 className="font-bold text-xl mb-10 text-indigo-900/80">{q.question}</h4>
          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button key={idx} onClick={() => {
                if (idx === q.answer) {
                  if (quizStep < activeCircle.quiz.length - 1) setQuizStep(prev => prev + 1);
                  else handleJoinCircle(activeCircle.id);
                } else showToast('认知不匹配，再想想哦~');
              }} className="w-full text-left px-6 py-5 rounded-2xl bg-indigo-50/50 hover:bg-gradient-to-r hover:from-[#b7a8ff] hover:to-[#c084fc] hover:text-white font-black transition-all">{opt}</button>
            ))}
          </div>
        </GlassCard>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7FF] via-[#EAE1FF] to-[#FFFFFF] font-sans flex text-indigo-950 selection:bg-[#c084fc]/20 overflow-hidden">
      {renderSidebar()}
      <main className="flex-1 md:ml-64 flex flex-col h-screen relative overflow-hidden">
        {renderHeader()}
        {toast && (
          <div className="fixed top-8 left-1/2 md:ml-32 -translate-x-1/2 z-[120] bg-white/95 backdrop-blur-2xl border border-[#a78bfa]/20 px-8 py-4 rounded-3xl text-sm font-black flex items-center shadow-xl animate-in slide-in-from-top-4 border-b-4 border-b-[#a78bfa]">
            <CheckCircle2 size={20} strokeWidth={3} className="text-[#a78bfa] mr-3" /> {toast}
          </div>
        )}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {currentTab === 'home' && renderHome()}
          {currentTab === 'discover' && renderDiscover()}
          {currentTab === 'circles' && renderCircles()}
          {currentTab === 'messages' && renderMessages()}
          {currentTab === 'profile' && renderProfile()}
        </div>
        {activeCircle && renderCircleDetail()}
        {showQuiz && renderQuiz()}
      </main>
      {renderBottomNav()}
    </div>
  );
}
