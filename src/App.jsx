import React, { useState, useEffect } from 'react';
import { 
  Home, Compass, MessageCircle, User, 
  Lock, Unlock, ShieldCheck, ChevronRight, 
  Heart, MessageSquare, Share2, ArrowLeft, ArrowRight,
  Sparkles, Fingerprint, Activity,
  Settings, Bell, LogOut, CheckCircle2, X,
  Calendar, Plus, Image as ImageIcon,
  MoreHorizontal, Play, Search, Zap,
  Palette, Headphones, Gamepad2, BookOpen, Camera, LayoutGrid
} from 'lucide-react';

// ==========================================
// 1. 核心数据模型 (公私域隔离)
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
    jargons: [
      { word: '谷子', meaning: '动漫周边产品的谐音。' },
      { word: '形制', meaning: '汉服的款式结构，如明制马面裙。' }
    ],
    quiz: [
      { question: '以下哪部属于优秀的国产动画（国漫）？', options: ['A. 《大理寺日志》', 'B. 《火影忍者》', 'C. 《进击的巨人》'], answer: 0 },
      { question: '圈内常说的“吃谷”是指什么行为？', options: ['A. 提倡节约粮食', 'B. 购买动漫周边产品', 'C. 一种汉服穿着方式'], answer: 1 }
    ],
    publicPosts: [
      { id: 'p1', type: 'official', author: '社团官方', title: '【公告】校内漫展参展预告', content: '我们将于下周在体育馆布置专属国风展区，欢迎所有人前来打卡。', likes: 1204, image: 'https://images.unsplash.com/photo-1618365908648-e71bd8fac10f?auto=format&fit=crop&q=80&w=600' },
    ],
    privatePosts: [
      { id: 'pr1', author: '云中君', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', content: '家人们，周末漫展谁要一起出C？我这套明制还在犹豫配什么头饰，求推荐！', likes: 45, comments: 23, time: '10分钟前' },
      { id: 'pr2', author: '画师小透明', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', content: '吐槽一下今天新买的颜料，显色度太差了避雷避雷！顺便求大触们指点一下上色技巧。', likes: 12, comments: 8, time: '2小时前' }
    ]
  },
  {
    id: 'dance',
    name: '街舞交流圈',
    tags: ['震感舞', '嘻哈', '编舞'],
    members: 3420,
    headline: '节奏，重塑灵魂。',
    desc: '舞者的专属阵地。用身体丈量热爱，用汗水诠释态度。',
    cover: 'https://images.unsplash.com/photo-1535597408906-620a52538006?auto=format&fit=crop&q=80&w=1000',
    publicPosts: [
      { id: 'd_p1', type: 'official', author: '校街舞队', title: '齐舞大赛冠军视频发布', content: '感受力量与律动。', likes: 5400 }
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
    publicPosts: [],
    privatePosts: []
  }
];

const NOTIFICATIONS = [
  { id: 1, type: 'system', title: '系统更新', desc: '全新温柔认证系统已上线，你的安全由我们来守护。', time: '刚刚', unread: true },
  { id: 2, type: 'system', title: '圈层开放通知', desc: '「交通迷运转群」现已接受验证申请，快去探索吧。', time: '1小时前', unread: true },
  { id: 3, type: 'interaction', title: '云中君', desc: '赞同了你的帖子：“这套汉服形制非常考究”', time: '2小时前', unread: false },
  { id: 4, type: 'interaction', title: 'Locking_Jay', desc: '在「街舞交流圈」中提到了你', time: '昨天', unread: false },
];

const USER_INFO = {
  name: '测试用户',
  avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150',
  id: 'user_8829',
}

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
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [showPostModal, setShowPostModal] = useState(false);
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
    setJoinedCircles([...joinedCircles, circleId]);
    setShowQuiz(false);
    showToast('✨ 验证通过，已解锁私有空间');
  };

  const NAV_ITEMS = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'discover', icon: Compass, label: '发现' },
    { id: 'circles', icon: LayoutGrid, label: '圈层' },
    { id: 'messages', icon: MessageCircle, label: '通知' },
    { id: 'profile', icon: User, label: '我' },
  ];

  // ------------------------------------------
  // 登录界面 (未授权状态)
  // ------------------------------------------
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E2D4FF] via-[#EAE1FF] to-[#F3E8FF] font-sans text-indigo-950 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm flex flex-col items-center animate-in zoom-in-95 duration-1000">
          <div className="mb-12 text-center">
            <h1 className="text-6xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-lg">同频<span className="text-[#a78bfa]">.</span></h1>
            <p className="text-indigo-800/60 font-bold tracking-wide">找到属于你的精神角落</p>
          </div>
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <button className="w-full bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white font-bold text-lg rounded-full py-5 shadow-[0_12px_24px_rgba(167,139,250,0.4)] hover:scale-[1.02] active:scale-95 transition-all">
              {authLoading ? '正在开启空间...' : '进入空间'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // 响应式全局架构
  // ------------------------------------------
  const renderSidebar = () => (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white/50 backdrop-blur-3xl border-r border-white/60 p-8 z-40">
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold text-indigo-950 tracking-tight flex items-center gap-2">
          <Sparkles className="text-[#a78bfa]" size={24} />
          数字文化
        </h1>
        <p className="text-[10px] text-indigo-800/50 mt-1 font-black tracking-[0.2em] uppercase text-center md:text-left">This Circle</p>
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
      <div className="flex items-center gap-4">
        <Search className="text-indigo-800/60" size={20} />
        <img src={USER_INFO.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-white" />
      </div>
    </header>
  );

  const renderBottomNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-3xl border-t border-white/60 pb-safe z-40 shadow-[0_-12px_40px_rgba(0,0,0,0.06)]">
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

  // ------------------------------------------
  // 各板块渲染函数 (Tab Views)
  // ------------------------------------------

  // Tab 1: 首页 (Home) - 响应式 Banner 与看板
  const renderHome = () => (
    <div className="max-w-6xl mx-auto px-4 md:px-10 pt-6 pb-24 md:pb-12 space-y-12 animate-in fade-in [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
              <button onClick={() => { setActiveCircle(CIRCLES[0]); setShowQuiz(true); }} className="self-start md:self-center bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white px-8 py-4 rounded-full text-sm font-black flex items-center gap-3 hover:shadow-[0_8px_30px_rgba(167,139,250,0.4)] hover:scale-105 active:scale-95 transition-all shadow-lg">
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
          <GlassCard key={idx} className="p-6 md:p-8 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out" style={{ animationFillMode: 'both', animationDelay: `${idx * 120}ms` }}>
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

      <section className="space-y-8">
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

  // Tab 2: 发现页 (Discover) - 治愈系卡片流
  const renderDiscover = () => (
    <div className="pt-6 md:pt-10 px-6 max-w-4xl mx-auto animate-in fade-in pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-indigo-950">发现同频</h1>
         <div className="w-12 h-12 rounded-full bg-white/80 p-1 shadow-sm border border-white">
            <img src={USER_INFO.avatar} className="w-full h-full rounded-full object-cover" alt="User"/>
         </div>
      </div>
      <div className="flex gap-3 mb-10 overflow-x-auto hide-scrollbar">
         <span className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-black shadow-sm flex items-center gap-2 text-indigo-950 shrink-0">
           <Calendar size={18} className="text-[#a78bfa]"/> 探索最新
         </span>
         <span onClick={() => setCurrentTab('circles')} className="bg-white/40 px-6 py-3 rounded-full text-sm font-black text-indigo-800/60 flex items-center gap-2 cursor-pointer hover:bg-white/60 transition-all shrink-0">
           <ShieldCheck size={18}/> 已加入 ({joinedCircles.length})
         </span>
      </div>
      <div className="space-y-6">
        {CIRCLES.map((circle, idx) => (
          <FadeInView key={circle.id} delay={`delay-${idx * 100}`}>
            <GlassCard onClick={() => setActiveCircle(circle)} className="p-5 flex items-center gap-6 group hover:shadow-2xl">
               <div className="flex-1 space-y-2">
                  <h3 className="font-black text-2xl text-indigo-950 group-hover:text-[#a78bfa] transition-colors">{circle.name}</h3>
                  <p className="text-sm text-indigo-800/60 font-bold line-clamp-2 leading-relaxed">{circle.desc}</p>
               </div>
               <div className="w-28 h-28 rounded-[2rem] overflow-hidden relative shadow-inner shrink-0 border border-white/50">
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

  // Tab 3: 圈层页 (Circles) - Apple 风格 Icon 导航
  const renderCircles = () => (
    <div className="pt-6 md:pt-10 max-w-5xl mx-auto animate-in fade-in pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-start overflow-x-auto gap-8 px-6 py-8 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {CATEGORIES.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4 cursor-pointer group min-w-[4rem] animate-in zoom-in duration-700" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className="w-16 h-16 rounded-[1.5rem] bg-white/70 backdrop-blur-md shadow-sm border border-white flex items-center justify-center text-indigo-900 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#b7a8ff] group-hover:to-[#c084fc] group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
              <cat.icon size={28} strokeWidth={2} />
            </div>
            <span className="text-[11px] font-black text-indigo-950/80 whitespace-nowrap tracking-wide">{cat.label}</span>
          </div>
        ))}
      </div>
      <div className="px-6 text-center mt-6 mb-20 animate-in slide-in-from-top-12 duration-1000">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-indigo-950 mb-8 leading-[1.1] drop-shadow-sm">
          遇见，你的<br/><span className="text-white drop-shadow-md">精神领地。</span>
        </h1>
        <p className="text-base font-bold text-indigo-800/70 leading-relaxed max-w-xl mx-auto">
          备受赞誉的国风创作，血脉喷张的街舞现场。全校最硬核的交通迷运转记录。
          这里只有最纯粹的文化和沉浸体验 —— 仅限同频者入内。
        </p>
      </div>
      <div className="px-6 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-indigo-950 tracking-tight">正在开放的圈层</h2>
          <button className="text-sm font-black text-[#a78bfa] hover:underline flex items-center gap-1">查看全部 <ChevronRight size={14}/></button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {CIRCLES.map(circle => {
            const isJoined = joinedCircles.includes(circle.id);
            return (
              <GlassCard key={circle.id} onClick={() => setActiveCircle(circle)} className="p-6 flex items-center gap-6 group border-0 shadow-xl hover:bg-white transition-all">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 relative">
                  <img src={circle.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt=""/>
                  {isJoined && (
                    <div className="absolute inset-0 bg-[#a78bfa]/20 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white/90 p-2 rounded-full text-[#a78bfa] shadow-lg scale-110">
                        <Unlock size={16} strokeWidth={4} />
                      </div>
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

  // ------------------------------------------
  // 通用功能渲染
  // ------------------------------------------
  const renderCircleDetail = () => {
    const isJoined = joinedCircles.includes(activeCircle.id);
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#EAE1FF] via-[#F5F3FF] to-[#FFFFFF] text-indigo-950 z-[100] animate-in slide-in-from-right-full duration-500 flex flex-col md:left-64">
        <div className="absolute top-safe md:top-8 mt-4 left-6 right-6 flex justify-between z-[60] max-w-5xl mx-auto">
          <button onClick={() => setActiveCircle(null)} className="w-12 h-12 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center text-indigo-900 shadow-lg hover:bg-white hover:scale-110 transition-all border border-white">
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
          <button className="w-12 h-12 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center text-indigo-900 shadow-lg border border-white">
            <Share2 size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {!isJoined ? (
            <div className="pb-32">
              <div className="h-[50vh] md:h-[60vh] relative rounded-b-[4rem] overflow-hidden shadow-2xl">
                <img src={activeCircle.cover} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#EAE1FF] via-transparent to-transparent opacity-90"></div>
              </div>
              <div className="px-8 -mt-24 relative z-10 space-y-10 max-w-3xl mx-auto">
                <div className="text-center space-y-4">
                  <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-indigo-950 drop-shadow-sm">{activeCircle.name}</h1>
                  <p className="text-lg text-indigo-800/80 font-bold px-4">{activeCircle.headline || activeCircle.desc}</p>
                </div>
                <div className="relative mt-12 rounded-[3rem] overflow-hidden border border-white shadow-2xl">
                  <div className="p-8 space-y-6 opacity-30 bg-white/40 h-64 select-none pointer-events-none">
                    <div className="h-10 w-2/3 bg-indigo-200/50 rounded-2xl animate-pulse"></div>
                    <div className="h-32 w-full bg-indigo-200/50 rounded-2xl animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center z-10 border border-white/50">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl rotate-3">
                      <Lock size={36} className="text-[#a78bfa]" strokeWidth={3} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-indigo-950">私密讨论区已锁定</h3>
                    <p className="text-sm font-bold text-indigo-800/60 mb-8 max-w-xs leading-relaxed">通过简单的认知验证，即可解锁 99+ 条同好深度对话并加入我们。</p>
                    <button onClick={() => setShowQuiz(true)} className="w-full max-w-xs bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white font-black py-5 rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                      <Fingerprint size={20} strokeWidth={3} /> 开始验证申请
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-28 md:pt-36 max-w-5xl mx-auto w-full px-6 pb-32">
              <div className="mb-10 animate-in slide-in-from-bottom-8">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-indigo-950 mb-6">{activeCircle.name}</h1>
                <div className="flex gap-4">
                  <span className="bg-white/80 px-6 py-3 rounded-2xl text-sm font-black shadow-sm text-[#a78bfa] border border-white">社群动态</span>
                  <span className="bg-white/40 px-6 py-3 rounded-2xl text-sm font-black text-indigo-800/60 hover:bg-white/80 cursor-pointer transition-all border border-white/50">精华资料</span>
                </div>
              </div>
              <div className="space-y-8">
                {activeCircle.privatePosts?.map((post, i) => (
                  <GlassCard key={post.id} className="p-8 border-0 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center gap-4 mb-6">
                      <img src={post.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-lg border-2 border-white" alt="" />
                      <div>
                        <h4 className="font-black text-base text-indigo-950">{post.author}</h4>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{post.time}</p>
                      </div>
                    </div>
                    <p className="text-indigo-900/90 font-bold leading-relaxed text-lg mb-6">{post.content}</p>
                    <div className="flex items-center gap-8 text-indigo-300 border-t border-indigo-50 pt-6">
                      <button className="flex items-center gap-2 hover:text-[#a78bfa] transition-colors"><MessageSquare size={18} strokeWidth={2.5}/> <span className="text-xs font-black">23</span></button>
                      <button className="flex items-center gap-2 hover:text-rose-400 transition-colors"><Heart size={18} strokeWidth={2.5}/> <span className="text-xs font-black">45</span></button>
                    </div>
                  </GlassCard>
                ))}
              </div>
              <button onClick={() => setShowPostModal(true)} className="fixed bottom-10 right-6 md:right-12 w-16 h-16 bg-gradient-to-br from-[#a78bfa] to-[#c084fc] text-white rounded-3xl flex items-center justify-center shadow-[0_12px_40px_rgba(167,139,250,0.5)] hover:scale-110 active:scale-90 transition-all z-50">
                <Plus size={32} strokeWidth={3.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const q = activeCircle.quiz[quizStep];
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-indigo-950/40 backdrop-blur-xl animate-in fade-in duration-300 md:pl-64">
        <GlassCard className="w-full max-w-sm p-10 shadow-[0_32px_80px_rgba(0,0,0,0.15)] relative bg-white/95 border-0">
          <button onClick={() => setShowQuiz(false)} className="absolute top-6 right-6 w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-400 hover:bg-indigo-100 transition-all">
            <X size={20} strokeWidth={3} />
          </button>
          <div className="mb-10 text-center">
            <span className="bg-indigo-50 text-[#a78bfa] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#a78bfa]/10">
              认知验证申请 {quizStep + 1} / {activeCircle.quiz.length}
            </span>
            <h3 className="font-black text-3xl tracking-tight mt-6 text-indigo-950">身份认同</h3>
          </div>
          <h4 className="font-bold text-xl leading-snug mb-10 text-indigo-900/80">{q.question}</h4>
          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button key={idx} onClick={() => {
                if (idx === q.answer) {
                  if (quizStep < activeCircle.quiz.length - 1) setQuizStep(prev => prev + 1);
                  else handleJoinCircle(activeCircle.id);
                } else showToast('认知不匹配，再想想哦~');
              }} className="w-full text-left px-6 py-5 rounded-2xl bg-indigo-50/50 hover:bg-gradient-to-r hover:from-[#b7a8ff] hover:to-[#c084fc] hover:text-white font-black text-indigo-900 active:scale-95 transition-all shadow-sm">
                {opt}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    );
  };

  // ------------------------------------------
  // 其他 Tab 简略渲染
  // ------------------------------------------
  const renderMessages = () => (
    <div className="pt-6 md:pt-10 px-6 pb-24 max-w-4xl mx-auto animate-in fade-in">
      <h1 className="text-4xl font-black tracking-tighter mb-10 text-indigo-950 drop-shadow-sm">通知中心</h1>
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
    <div className="pt-6 md:pt-10 px-6 pb-24 max-w-4xl mx-auto animate-in fade-in space-y-10">
      <h1 className="text-4xl font-black tracking-tighter text-indigo-950 drop-shadow-sm">我的</h1>
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
      <div className="space-y-6">
        <GlassCard className="p-0 overflow-hidden border-0 shadow-xl">
          {[
            { icon: Activity, label: '浏览历史与社群轨迹', color: 'text-[#c084fc]' },
            { icon: Compass, label: '我的创作与发布', color: 'text-[#818cf8]' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 active:bg-white transition-all cursor-pointer border-b border-indigo-50 last:border-0 hover:pl-8 group">
              <div className="flex items-center gap-4">
                <item.icon size={20} className={`${item.color} group-hover:scale-110 transition-transform`} strokeWidth={3} />
                <span className="font-black text-base text-indigo-900">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-indigo-200 group-hover:translate-x-2 transition-transform" />
            </div>
          ))}
        </GlassCard>
        <button onClick={() => { setIsAuth(false); setCurrentTab('home'); }} className="w-full bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] py-6 flex items-center justify-center gap-3 text-rose-500 font-black hover:bg-rose-50 transition-all shadow-lg active:scale-95">
          <LogOut size={20} strokeWidth={3.5} /> 退出登录
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7FF] via-[#EAE1FF] to-[#FFFFFF] font-sans flex text-indigo-950 selection:bg-[#c084fc]/20 overflow-hidden">
      {renderSidebar()}
      <main className="flex-1 md:ml-64 flex flex-col h-screen relative overflow-hidden">
        {renderHeader()}
        {toast && (
          <div className="fixed top-6 md:top-8 left-1/2 md:ml-32 -translate-x-1/2 z-[120] bg-white/95 backdrop-blur-2xl border border-[#a78bfa]/20 text-indigo-950 px-8 py-4 rounded-3xl text-sm font-black flex items-center shadow-[0_20px_50px_rgba(167,139,250,0.3)] animate-in slide-in-from-top-4 border-b-4 border-b-[#a78bfa]">
            <CheckCircle2 size={20} strokeWidth={3} className="text-[#a78bfa] mr-3" /> {toast}
          </div>
        )}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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