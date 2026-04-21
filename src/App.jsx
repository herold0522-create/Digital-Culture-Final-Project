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
  Ticket, MapPin, Clock, Users, Train, Feather, AudioLines, Coffee
} from 'lucide-react';

// ==========================================
// 1. 核心数据模型 (包含至诚学院背景故事与专属视觉)
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
    icon: Feather,
    iconTheme: 'from-[#fb7185] to-[#e11d48]', // 国风樱红渐变
    founder: '福州大学至诚学院 创办',
    heroTitle: '传承，演绎，觉醒。\n梦回千古华夏。',
    lore: '本社团前身为“晓雨动漫社”，由福州大学至诚学院一群热爱二次元与传统文化的学子创立。\n\n从最初的番剧放映室，到如今涵盖汉服形制考究、宅舞翻跳与同人绘图的综合性文化阵地，我们始终坚持为同好提供一个纯净的交流空间。跨越次元与历史，每一次相聚都是一次纯粹的文化觉醒。',
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
    desc: '舞者的专属阵地。用身体丈量热爱，用汗水诠释态度。',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200',
    icon: AudioLines,
    iconTheme: 'from-[#38bdf8] to-[#4f46e5]', // 电音紫蓝渐变
    founder: '福州大学至诚学院 创办',
    heroTitle: '律动，汗水，狂欢。\n舞台由你定义。',
    lore: '诞生于福州大学至诚学院的镜子前和路灯下。起初只是一群不服输的年轻人，带着音箱在夜色中挥洒汗水。\n\n多年来，我们见证了无数次 Underground Battle 的热血沸腾，传承着街头文化的自由与无畏。无论你是 Breaking、Locking 还是 Popping 玩家，只要音乐响起，这里就是你灵魂的主场。',
    quiz: [
      { question: 'Locking（锁舞）的标志性动作之一是什么？', options: ['A. Point (指手)', 'B. Headspin (头转)', 'C. Moonwalk (月球漫步)'], answer: 0 },
      { question: 'Breaking（霹雳舞）中，主要在地面上完成的腿部步伐动作统称为什么？', options: ['A. Toprock', 'B. Footwork', 'C. Freeze'], answer: 1 }
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
    icon: Train,
    iconTheme: 'from-[#ff9a44] to-[#ff5200]', // 运转亮橙渐变
    founder: '福州大学至诚学院 创办',
    heroTitle: '探索，记录，运转。\n尽在这一域。',
    lore: '本群起源于 2008 年福州大学至诚学院机电工程系的一间宿舍。\n我们用镜头和路书丈量着城市的每一次脉动，与你分享所有纯粹的热爱。',
    quiz: [
      { question: '铁路运转记录中常说的“交路”通常指的是什么？', options: ['A. 铁路线路的交叉点', 'B. 机车或乘务员担当牵引任务的周转区段', 'C. 列车的换乘车站'], answer: 1 },
      { question: '地铁轨道系统中的“第三轨”主要起什么作用？', options: ['A. 为列车供电', 'B. 增加车厢行驶稳定性', 'C. 紧急制动系统的一部分'], answer: 0 }
    ], 
    privatePosts: [
      { id: 't_pr1', author: '运转手小林', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', content: '今天打卡了福州地铁4号线首通段，全自动驾驶的平顺度真的绝了！第一视角的车头风景太震撼了，路书已上传。', likes: 124, comments: 32, time: '3小时前' },
      { id: 't_pr2', author: '至诚_飞羽', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', content: '周末准备去运转一趟经典的 K1234 次列车，有人要一起拼座吗？', likes: 89, comments: 15, time: '昨天' }
    ]
  },
  {
    id: 'film-photo',
    name: '胶片摄影研习社',
    tags: ['暗房', '135胶卷', '扫街'],
    members: 2150,
    headline: '定格，等待，显影。',
    desc: '从银盐到暗房，在这个数码泛滥的时代，我们依然迷恋纯粹的物理感光。',
    cover: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=1200',
    icon: Camera,
    iconTheme: 'from-[#14b8a6] to-[#0369a1]', // 青蓝摄影色
    founder: '视觉传达设计系 认证',
    heroTitle: '光影，银盐，颗粒。\n留住时间的形状。',
    lore: '在这个手机快门只需 0.01 秒的时代，我们选择慢下来。从测光、对焦到上卷，每一次按下快门都是一次慎重的决定。\n\n从 135 格式到中画幅，从柯达的暖色到富士的冷艳，我们在快门声中捕捉稍纵即逝的光影，在暗房的显影液中等待惊喜的降临。',
    quiz: [
      { question: '通常所说的“E-6工艺”是用来冲洗哪种底片的？', options: ['A. 黑白负片', 'B. 彩色负片 (C-41)', 'C. 彩色反转片 (正片)'], answer: 2 },
      { question: '在相机镜头参数中，光圈主要控制的是什么？', options: ['A. 进光量与景深', 'B. 视角与焦距', 'C. 胶卷的感光度 (ISO)'], answer: 0 }
    ], 
    privatePosts: [
      { id: 'f_pr1', author: '光影猎手', avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&q=80&w=150', content: '新入手的禄来双反，这中画幅的色彩太毒了，有没有周末去老街扫街的搭子？', likes: 210, comments: 45, time: '2小时前' },
      { id: 'f_pr2', author: '显影液爱好者', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', content: '尝试了一下 C-41 自己冲洗彩色底片，温度没控制好稍微偏绿了，大意了大意了...', likes: 76, comments: 12, time: '昨天' }
    ]
  },
  {
    id: 'poetry',
    name: '深夜读诗会',
    tags: ['现代诗', '文学', '灵魂共鸣'],
    members: 1042,
    headline: '字句，韵脚，共鸣。',
    desc: '当城市的喧嚣褪去，这里是文字最后的庇护所。',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=1200',
    icon: BookOpen,
    iconTheme: 'from-[#8b5cf6] to-[#4c1d95]', // 神秘文学紫
    founder: '至诚中文文学社 创办',
    heroTitle: '浪漫，哲思，解构。\n灵魂深处的对白。',
    lore: '在这个短视频与碎片化信息充斥的时代，我们偏偏要读那些无用却美丽的句子。\n\n无论你是偏爱泰戈尔的浪漫，还是海子的哲思，亦或是现代先锋诗歌的解构。在这里，每一行诗都是一次灵魂的深呼吸，每一个夜晚都有懂你的回音。',
    quiz: [
      { question: '著名诗句“面朝大海，春暖花开”的作者是谁？', options: ['A. 北岛', 'B. 顾城', 'C. 海子'], answer: 2 }
    ], 
    privatePosts: [
      { id: 'p_pr1', author: '吟游诗人', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', content: '昨夜重读里尔克，雨声淅沥中写下这几句不成气候的短诗，请诸位同好斧正。', likes: 185, comments: 64, time: '4小时前' },
      { id: 'p_pr2', author: '纸上微光', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', content: '最近迷上了废话体诗歌，大家怎么看待这种对传统意象的解构主义？', likes: 52, comments: 89, time: '昨天' }
    ]
  },
  {
    id: 'indie-game',
    name: '硬核独立游戏舱',
    tags: ['魂系', '肉鸽', '第九艺术'],
    members: 4120,
    headline: '硬核，沉浸，通关。',
    desc: '拒绝千篇一律的氪金手游，我们只为真正触动人心的“第九艺术”买单。',
    cover: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200',
    icon: Gamepad2,
    iconTheme: 'from-[#10b981] to-[#047857]', // 像素矩阵绿
    founder: '第九艺术研究室 认证',
    heroTitle: '弹反，构筑，远征。\n重塑游戏荣光。',
    lore: '我们不追求绚丽的氪金抽卡，只沉迷于精妙的关卡设计与深刻的叙事。\n\n探讨魂系游戏（Souls-like）的极限弹反帧、研究肉鸽游戏（Roguelike）的疯狂 Build 组合。在这里，游戏不仅是消遣，更是一场需要耐心、智慧和肌肉记忆的波澜壮阔的电子远征。',
    quiz: [
      { question: '被全球玩家广泛尊称为“老贼”，并开创了“魂系”游戏玩法的著名游戏制作人是谁？', options: ['A. 小岛秀夫', 'B. 宫崎英高', 'C. 席德·梅尔'], answer: 1 },
      { question: '游戏分类中常说的“Roguelike（肉鸽）”游戏，其最核心的两大特征通常是什么？', options: ['A. 多人联机与开放世界', 'B. 随机生成关卡与永久死亡', 'C. 回合制与文字解谜'], answer: 1 }
    ], 
    privatePosts: [
      { id: 'g_pr1', author: '无名褪色者', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150', content: '历时 80 小时，终于无骨灰纯近战单杀女武神！配装思路和弹反节奏已经整理在二楼，欢迎讨论。', likes: 840, comments: 215, time: '1小时前' },
      { id: 'g_pr2', author: '独立之魂', avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=150', content: '强推一款刚上架的像素风 Roguelike 神作，打击感无敌，流派构筑深度极高，现在打折只要 30！', likes: 320, comments: 66, time: '5小时前' }
    ]
  },
  {
    id: 'coffee',
    name: '精品咖啡研习所',
    tags: ['手冲', '浅烘', '风味轮'],
    members: 1890,
    headline: '萃取，风味，醇香。',
    desc: '从一颗生豆到一杯滴滤，探讨咖啡背后关于温度与时间的科学。',
    cover: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200',
    icon: Coffee,
    iconTheme: 'from-[#d97706] to-[#78350f]', // 琥珀深焙褐
    founder: '手冲爱好者联盟 创办',
    heroTitle: '注水，焖蒸，品鉴。\n唤醒沉睡的风味。',
    lore: '放下速溶和流水线奶咖，我们在这里静享滴滤的时光。\n\n从一颗生豆的精细烘焙，到手冲壶里的水温与研磨度的完美配合。我们追求的不仅是一杯提神的饮品，更是花魁的浓郁果香、耶加雪菲的明亮酸质，以及一杯好咖啡带来的片刻宁静。',
    quiz: [
      { question: '在制作常规的手冲咖啡（滴滤咖啡）时，普遍推荐的“水粉比”大约在什么范围？', options: ['A. 1:5 ~ 1:8', 'B. 1:15 ~ 1:16', 'C. 1:30 ~ 1:35'], answer: 1 }
    ], 
    privatePosts: [
      { id: 'c_pr1', author: '金杯法则', avatar: 'https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&q=80&w=150', content: '今天刚到的埃塞俄比亚日晒生豆，养豆期还没过，忍不住先手冲了一杯，虽然风味还是有点杂但莓果香气已经很突出了！', likes: 156, comments: 28, time: '半小时前' },
      { id: 'c_pr2', author: '拉花苦手', avatar: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=150', content: '郁金香拉花练习第 30 天，终于有一杯能看的成型了！诀窍真的在于融合时的水流高度控制。', likes: 302, comments: 41, time: '昨天' }
    ]
  }
];

const NOTIFICATIONS = [
  { id: 1, type: 'system', title: '系统更新', desc: '全新温柔认证系统已上线，你的安全由我们来守护。', time: '刚刚', unread: true },
  { id: 2, type: 'system', title: '圈层开放通知', desc: '「交通迷运转群」现已通过福州大学至诚学院认证。', time: '1小时前', unread: true },
  { id: 3, type: 'interaction', title: '云中君', desc: '赞同了你的帖子：“这套汉服形制非常考究”', time: '2小时前', unread: false },
  { id: 4, type: 'interaction', title: 'Locking_Jay', desc: '在「街舞交流圈」中提到了你', time: '昨天', unread: false },
];

const HERO_ACTIVITIES = [
  {
    id: 'hero1',
    title: '「破界」全能数字艺术特展',
    circle: '数字视觉前沿',
    date: '本周五 19:30',
    desc: '沉浸式视觉与听觉的双重盛宴。',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'hero2',
    title: '2026 高校街舞争霸赛',
    circle: '街舞交流圈',
    date: '下周六 18:00',
    desc: '见证最强舞者的巅峰对决，全网同步直播。',
    cover: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'hero3',
    title: '「时光」复古胶片摄影展',
    circle: '胶片摄影研习社',
    date: '本周末 全天',
    desc: '在银盐颗粒中感受时光的温度，重回 1990。',
    cover: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=1600'
  }
];

const ACTIVITIES = [
  { id: 'act1', title: '独立短片展映与导演对谈', date: '周六 14:00', cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800', circle: '光影记录' },
  { id: 'act2', title: '极限飞盘高校联赛选拔', date: '周日 09:00', cover: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800', circle: '运动竞技' },
  { id: 'act3', title: '现代先锋艺术画廊巡展', date: '下周三 15:00', cover: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800', circle: '文艺创作' },
  { id: 'act4', title: '汉服形制科普讲座', date: '下周五 19:00', cover: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=800', circle: '国风动漫社' },
  { id: 'act5', title: '福州老城区寻线之旅', date: '下周日 08:30', cover: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800', circle: '交通迷运转群' },
  { id: 'act6', title: '现代诗的解构与重塑', date: '下周二 20:00', cover: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?auto=format&fit=crop&q=80&w=800', circle: '深夜读诗会' },
  { id: 'act7', title: '独立游戏开发者沙龙', date: '下周四 14:00', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', circle: '硬核独立游戏舱' },
  { id: 'act8', title: '精品手冲咖啡品鉴会', date: '下周六 15:30', cover: 'https://images.unsplash.com/photo-1495474472207-464a518e15a5?auto=format&fit=crop&q=80&w=800', circle: '精品咖啡研习所' },
  { id: 'act9', title: '二次元同人签售会', date: '本月末 10:00', cover: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&q=80&w=800', circle: '国风动漫社' },
  { id: 'act10', title: '街头涂鸦与街舞快闪', date: '下个月初 19:00', cover: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&q=80&w=800', circle: '街舞交流圈' }
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
// 为多元矩阵预定义的散落图片位置参数 (增加层级感与数量)
// 分为 前景层(清晰圈子图) 和 背景层(稍暗的活动图)
// ==========================================
const MATRIX_IMAGES = [
  // --- 主层：圈子代表图片 (清晰，靠前 z-20) ---
  { id: 'guofeng', type: 'circle', src: CIRCLES[0].cover, pos: "top-[10%] left-[2%] md:top-[12%] md:left-[8%] w-32 h-40 md:w-48 md:h-64", rot: "-rotate-6", delay: "200ms", z: "z-20" },
  { id: 'dance', type: 'circle', src: CIRCLES[1].cover, pos: "top-[15%] right-[2%] md:top-[15%] md:right-[8%] w-40 h-32 md:w-60 md:h-48", rot: "rotate-6", delay: "350ms", z: "z-20" },
  { id: 'film-photo', type: 'circle', src: CIRCLES[3].cover, pos: "bottom-[10%] left-[5%] md:bottom-[15%] md:left-[12%] w-40 h-40 md:w-56 md:h-56", rot: "rotate-12", delay: "500ms", z: "z-20" },
  { id: 'indie-game', type: 'circle', src: CIRCLES[5].cover, pos: "bottom-[8%] right-[2%] md:bottom-[12%] md:right-[10%] w-32 h-48 md:w-48 md:h-64", rot: "-rotate-12", delay: "650ms", z: "z-20" },
  { id: 'coffee', type: 'circle', src: CIRCLES[6].cover, pos: "top-[40%] left-[-2%] md:left-[2%] w-32 h-32 md:w-40 md:h-40 hidden md:block", rot: "-rotate-12", delay: "800ms", z: "z-20" },
  { id: 'transit', type: 'circle', src: CIRCLES[2].cover, pos: "top-[50%] right-[-2%] md:right-[2%] w-40 h-28 md:w-48 md:h-32 hidden md:block", rot: "rotate-12", delay: "950ms", z: "z-20" },
  
  // --- 背景层：活动图片 (较小，增加透明度暗度，靠后 z-10，制造纵深感) ---
  { id: 'act1', type: 'activity', src: ACTIVITIES[0].cover, pos: "top-[5%] left-[30%] md:top-[6%] md:left-[35%] w-20 h-20 md:w-32 md:h-32", rot: "rotate-12", delay: "250ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'act2', type: 'activity', src: ACTIVITIES[1].cover, pos: "bottom-[5%] right-[30%] md:bottom-[8%] md:right-[35%] w-24 h-24 md:w-36 md:h-36", rot: "-rotate-6", delay: "400ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'act3', type: 'activity', src: ACTIVITIES[2].cover, pos: "top-[25%] left-[25%] md:top-[30%] md:left-[25%] w-16 h-16 md:w-28 md:h-28 hidden md:block", rot: "-rotate-12", delay: "550ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'act4', type: 'activity', src: ACTIVITIES[3].cover, pos: "top-[30%] right-[25%] md:top-[35%] md:right-[25%] w-20 h-28 md:w-32 md:h-40 hidden md:block", rot: "rotate-6", delay: "700ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'act6', type: 'activity', src: ACTIVITIES[5].cover, pos: "bottom-[30%] left-[25%] md:bottom-[35%] md:left-[22%] w-24 h-16 md:w-36 md:h-24 hidden md:block", rot: "-rotate-6", delay: "850ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'act8', type: 'activity', src: ACTIVITIES[7].cover, pos: "bottom-[25%] right-[20%] md:bottom-[28%] md:right-[22%] w-20 h-20 md:w-28 md:h-28 hidden md:block", rot: "rotate-12", delay: "900ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'hero1', type: 'activity', src: HERO_ACTIVITIES[0].cover, pos: "top-[2%] right-[40%] md:top-[5%] md:right-[45%] w-28 h-20 md:w-40 md:h-28", rot: "-rotate-3", delay: "950ms", z: "z-10 opacity-50 brightness-50" },
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
  
  // 轮播与观察器状态
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const [matrixRefEl, setMatrixRefEl] = useState(null);
  const [matrixInView, setMatrixInView] = useState(false);

  // 轮播定时器逻辑
  useEffect(() => {
    let timer;
    if (isAuth && currentTab === 'discover') {
      timer = setInterval(() => {
        setCurrentHeroIdx((prev) => (prev + 1) % HERO_ACTIVITIES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isAuth, currentTab]);

  // 首页矩阵板块滚动监听逻辑
  useEffect(() => {
    if (!matrixRefEl) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMatrixInView(true);
        observer.disconnect(); // 触发一次后注销监听
      }
    }, { threshold: 0.2 }); // 露出 20% 即可触发动画
    
    observer.observe(matrixRefEl);
    return () => observer.disconnect();
  }, [matrixRefEl]);

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
        <style>
          {`
            .animate-in { animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); animation-fill-mode: both; }
            .fade-in { animation-name: fadeIn; }
            .slide-in-from-bottom-6 { animation-name: slideInBottom; }
            .slide-in-from-left-8 { animation-name: slideInLeft; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideInBottom { from { transform: translateY(2rem); } to { transform: translateY(0); } }
            @keyframes slideInLeft { from { transform: translateX(-2rem); } to { transform: translateX(0); } }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .pb-safe { padding-bottom: calc(1rem + env(safe-area-inset-bottom)); }
          `}
        </style>
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
      
      {/* Search & Notif */}
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

      {/* Intro Banner */}
      <section className="space-y-6">
        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
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

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
        {[
          { label: '兴趣圈子', value: '128+', icon: Compass },
          { label: '活跃成员', value: '8,420+', icon: User },
          { label: '讨论帖子', value: '26,890+', icon: MessageCircle },
          { label: '精彩活动', value: '340+', icon: Zap },
        ].map((stat, idx) => (
          <GlassCard key={idx} className="p-6 md:p-8 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out" style={{ animationDelay: `${idx * 120}ms` }}>
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

      {/* 滚动触发的沉浸式错落图片矩阵 - 增加了大量活动图片作为背景层 */}
      <section className="pb-12" ref={setMatrixRefEl}>
        <style>
          {`
            .matrix-item {
              opacity: 0;
              transform: translateY(80px) scale(0.85);
              transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .matrix-item.in-view {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          `}
        </style>
        
        <div className="relative w-full h-[500px] md:h-[650px] bg-indigo-950 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex items-center justify-center">
          
          {/* 背景环境光 */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-indigo-950 to-[#0c0a20] pointer-events-none"></div>

          {/* 错落有致的卡片阵列 */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {MATRIX_IMAGES.map((img) => (
              <div 
                key={img.id} 
                className={`absolute ${img.pos} ${img.z} matrix-item ${matrixInView ? 'in-view' : ''} pointer-events-auto`}
                style={{ transitionDelay: matrixInView ? img.delay : '0ms' }}
              >
                <div 
                  className={`w-full h-full transform ${img.rot} hover:rotate-0 hover:scale-105 hover:z-50 transition-all duration-500 cursor-pointer shadow-2xl relative group rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden`}
                  onClick={() => { 
                    if(img.type === 'circle') {
                      const circle = CIRCLES.find(c => c.id === img.id);
                      if(circle) { setActiveCircle(circle); handleOpenQuiz(circle); }
                    }
                  }}
                >
                  {/* 对于背景活动图片增加暗角/灰度效果，增强纵深感 */}
                  <img src={img.src} className={`w-full h-full object-cover border-[3px] border-white/10 group-hover:border-white/30 transition-all duration-500`} alt="" />
                  
                  {/* Hover 蒙版 (只有圈子图片支持点击进入) */}
                  {img.type === 'circle' && (
                    <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-white font-black text-sm md:text-lg tracking-widest text-center px-4 drop-shadow-md">
                        {CIRCLES.find(c => c.id === img.id)?.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 中央巨型标题（最后浮现），使用了更强的投影以保证在图片上方绝对清晰 */}
          <div 
            className={`relative z-30 text-center pointer-events-none matrix-item ${matrixInView ? 'in-view' : ''}`} 
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="text-[3.5rem] md:text-7xl lg:text-[6.5rem] font-black text-white tracking-tighter drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] mb-4 leading-[1.1]">
              多元矩阵，<br/>由此展开。
            </h3>
            <p className="text-indigo-100 font-black text-xs md:text-sm tracking-[0.4em] uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
              Explore Your Spiritual Matrix
            </p>
          </div>

        </div>
      </section>
    </div>
  );

  const renderDiscover = () => (
    <div className="pt-6 md:pt-10 px-4 md:px-6 max-w-6xl mx-auto animate-in fade-in pb-24 hide-scrollbar">
      
      {/* 补充无限滚动动画 CSS */}
      <style>
        {`
          @keyframes scrollX {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-x {
            animation: scrollX 40s linear infinite;
          }
          .animate-scroll-x:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="flex justify-between items-center mb-8">
         <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-indigo-950">发现</h1>
         <div className="w-10 h-10 rounded-full bg-white/80 p-0.5 shadow-sm border border-white">
            <img src={USER_INFO.avatar} className="w-full h-full rounded-full object-cover" alt="User"/>
         </div>
      </div>

      {/* Apple 级动态轮播巨幕 */}
      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-10 shadow-xl border border-white/50 group">
         
         {/* 滚动的 Track */}
         <div 
           className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
           style={{ transform: `translateX(-${currentHeroIdx * 100}%)` }}
         >
           {HERO_ACTIVITIES.map((hero) => (
             <div key={hero.id} className="relative w-full h-full shrink-0">
               <img src={hero.cover} className="w-full h-full object-cover" alt={hero.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="text-white max-w-lg">
                     <div className="flex items-center gap-2 mb-3">
                       <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase border border-white/30">Top Event</span>
                       <span className="text-xs font-bold text-white/90">{hero.circle}</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">{hero.title}</h2>
                     <p className="text-sm md:text-base text-white/80 font-medium">{hero.desc}</p>
                  </div>
                  <button
                     onClick={(e) => handleRegisterEvent(hero.id, e)}
                     className="bg-white text-indigo-950 px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
                  >
                     {registeredEvents.includes(hero.id) ? '已报名' : '立即报名'}
                  </button>
               </div>
             </div>
           ))}
         </div>
         
         {/* 底部动态胶囊指示器 */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
           {HERO_ACTIVITIES.map((_, idx) => (
             <button 
               key={idx}
               onClick={() => setCurrentHeroIdx(idx)}
               className={`h-1.5 rounded-full transition-all duration-500 ${currentHeroIdx === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
             />
           ))}
         </div>
      </div>

      <div className="relative w-full overflow-hidden mb-14 animate-in fade-in slide-in-from-bottom-8">
        <h2 className="text-2xl font-black text-indigo-950 mb-5 flex items-center gap-2 px-1">
           <Ticket className="text-[#a78bfa]" /> 近期活动
        </h2>
        {/* CSS 驱动的无限轮播活动流 */}
        <div className="flex w-max gap-4 md:gap-5 animate-scroll-x hover:[animation-play-state:paused]">
           {[...ACTIVITIES, ...ACTIVITIES].map((activity, idx) => {
             const isRegistered = registeredEvents.includes(activity.id);
             return (
               <div key={`${activity.id}-${idx}`} className="min-w-[260px] md:min-w-[320px] w-[260px] md:w-[320px] shrink-0 flex flex-col group cursor-pointer">
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
          <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#a78bfa] uppercase mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">Find Your Spiritual Sanctuary</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-indigo-950 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">遇见，你的</h2>
          <div className="mt-[-0.5rem] md:mt-[-1.5rem] relative z-20">
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black text-white tracking-tighter drop-shadow-xl animate-huge-shrink leading-none">精神领地<span className="text-indigo-200">.</span></h1>
          </div>
        </div>
        <p className="text-sm md:text-base font-bold text-indigo-800/70 leading-relaxed max-w-xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">备受赞誉的国风创作，血脉喷张的街舞现场。全校最硬核的交通迷运转记录。这里只有最纯粹的文化和沉浸体验 —— 仅限同频者入内。</p>
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
    const ActiveIcon = activeCircle.icon || Sparkles;
    
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
                      0% { transform: scale(0.4) translateY(20px); opacity: 0; }
                      50% { transform: scale(1.2) translateY(-5px); opacity: 1; }
                      75% { transform: scale(0.95) translateY(2px); opacity: 1; }
                      100% { transform: scale(1) translateY(0); opacity: 1; }
                    }
                    @keyframes smoothFadeUp {
                      0% { opacity: 0; transform: translateY(30px); filter: blur(4px); }
                      100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
                    }
                    .animate-icon-pop { 
                      animation: iconPopExaggerated 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; 
                    }
                    .animate-smooth-up { 
                      animation: smoothFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                      opacity: 0; 
                    }
                  `}
                </style>
                <div className="flex flex-col items-center justify-center text-center mt-6 md:mt-10 mb-16">
                  
                  {/* 动态 Icon 与 主题渐变 */}
                  <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-b ${activeCircle.iconTheme || 'from-[#b7a8ff] to-[#c084fc]'} rounded-[1.8rem] shadow-xl flex items-center justify-center text-white mb-5 animate-icon-pop`}>
                    <ActiveIcon size={40} strokeWidth={2.5} />
                  </div>
                  
                  <span className="text-[13px] font-black text-indigo-950/70 mb-6 tracking-wide animate-smooth-up" style={{ animationDelay: '150ms' }}>
                    {activeCircle.founder || '官方认证圈层'}
                  </span>
                  
                  <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-black tracking-tight text-indigo-950 leading-[1.1] mb-8 drop-shadow-sm animate-smooth-up" style={{ animationDelay: '300ms' }}>
                    {(activeCircle.heroTitle || activeCircle.name).split('\n').map((line, index) => (
                      <span key={index} className="block">{line}</span>
                    ))}
                  </h1>
                  
                  <p className="text-[15px] md:text-[17px] font-bold text-indigo-900/70 max-w-2xl mx-auto leading-relaxed px-2 md:px-6 whitespace-pre-line animate-smooth-up" style={{ animationDelay: '450ms' }}>
                    {activeCircle.lore || activeCircle.desc}
                  </p>
                </div>
                
                <div className="w-12 h-1.5 bg-indigo-100 mx-auto rounded-full mb-12 animate-smooth-up" style={{ animationDelay: '600ms' }}></div>
                
                <div className="space-y-6 max-w-3xl mx-auto animate-smooth-up" style={{ animationDelay: '750ms' }}>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-indigo-950">最新运转记录</h3>
                    <button className="text-sm font-black text-[#a78bfa] bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">发布路书</button>
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
