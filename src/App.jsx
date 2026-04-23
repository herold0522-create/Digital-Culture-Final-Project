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
  Ticket, MapPin, Clock, Users, Train, Feather, AudioLines, Coffee, PenTool, Tv,
  Rocket, DollarSign, Mail, TreePine, Send
} from 'lucide-react';

// ==========================================
// 1. 核心数据模型 (全量 8 大硬核圈层 & 专属配图)
// ==========================================
const CIRCLES = [
  {
    id: 'shufa-guofeng',
    name: '书法国风社',
    tags: ['碑帖研习', '形制考究', '金石篆刻', '朝代复原'],
    members: 1560,
    headline: '墨香，在此氤氲。',
    desc: '专注传统书法研习、汉服形制考究与国风美学的聚集地。',
    cover: 'https://images.unsplash.com/photo-1702054853074-260ebd0aa9ea?w=800&auto=format&fit=crop&q=60', 
    icon: PenTool,
    iconTheme: 'from-[#0d9488] to-[#0f766e]', 
    founder: '福州大学至诚学院 创办',
    heroTitle: '笔墨，传承，觉醒。\n梦回千古华夏。',
    lore: '本社团由福州大学至诚学院一群热爱传统文化的学子创立。\n\n从最初的书法研习室，到如今涵盖汉服形制考究、传统乐器交流的综合性国风阵地。提笔挥毫，落纸如云烟，每一次相聚都是一次纯粹的文化觉醒。',
    quiz: [
      { question: '汉服中常说的“交领右衽”是什么意思？', options: ['A. 衣襟向右掩', 'B. 衣襟向左掩', 'C. 领口对称交叉'], answer: 0 },
      { question: '以下哪种字体被称为“瘦金体”且由宋徽宗赵佶所创？', options: ['A. 狂草', 'B. 瘦金书', 'C. 馆阁体'], answer: 1 },
      { question: '行书的代表作《兰亭集序》是谁的作品？', options: ['A. 颜真卿', 'B. 王羲之', 'C. 柳公权'], answer: 1 }
    ],
    privatePosts: [
      { id: 'sf1', author: '至诚笔冢', title: '【碑帖考】颜体多宝塔碑的藏锋技巧与动力学分析', views: '2340', likes: '1.2万', image: 'https://images.unsplash.com/photo-1764696505036-9a0c7048c630?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 'sf2', author: '云中君', title: '明制马面裙织金工艺：通袖襕与裙门纹样结构拆解', views: '1890', likes: '8k', image: 'https://images.unsplash.com/photo-1659767151204-29ca875adda7?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 'sf3', author: '墨香研习', title: '狼毫与羊毫的蓄水性对比实测，附长篇微距图解', views: '4500', likes: '2.1万', image: 'https://images.unsplash.com/photo-1641478059705-247e998e77c7?w=700&auto=format&fit=crop&q=60' },
      { id: 'sf4', author: '金石刀客', title: '【篆刻】冲刀法与切刀法的发力机制异同研究', views: '1200', likes: '4k', image: 'https://images.unsplash.com/photo-1613274507375-051f0c43f07e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUU3JUFGJTg2JUU1JTg4JUJCfGVufDB8fDB8fHww' },
      { id: 'sf5', author: '青衫落拓', title: '唐代圆领袍复原记录：从出土陶俑到面料织造', views: '3200', likes: '1.5万', image: 'https://images.unsplash.com/photo-1743574142021-02464ce85b9b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFOSU5RCVBMiVFNiU5NiU5OXxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'sf6', author: '至诚长安', title: '宣纸品鉴：泾县生宣在不同墨墨比下的晕墨曲线', views: '1500', likes: '3.2k', image: 'https://images.unsplash.com/photo-1748563223560-42d7a0828961?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8JUU1JUFFJUEzJUU3JUJBJUI4fGVufDB8fDB8fHww' },
      { id: 'sf7', author: '古音溯源', title: '尺八的制作参数演变：内径曲线与音色的物理关联', views: '890', likes: '2k', image: 'https://images.unsplash.com/photo-1603251426790-28a9954b7f01?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCVFNSVCMCVCQSVFNSU4NSVBQnxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'sf8', author: '半帖行书', title: '王羲之《兰亭序》神龙本与定武本的点画特征比对', views: '5600', likes: '2.8万', image: 'https://plus.unsplash.com/premium_photo-1661871474343-2bd9acc0be03?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUU1JTg1JUIwJUU0JUJBJUFEJUU1JUJBJThGfGVufDB8fDB8fHww' },
      { id: 'sf9', author: '染织录', title: '植物草木染实录：板蓝根染青色的固色剂浓度配比', views: '2100', likes: '6.5k', image: 'https://images.unsplash.com/photo-1506034844286-f98ed954e516?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUU2JTlGJTkzJUU4JTg5JUIyfGVufDB8fDB8fHww' },
      { id: 'sf10', author: '至诚笔冢', title: '米芾《蜀素帖》结体密码：如何处理重心的微妙偏移', views: '1100', likes: '3.8k', image: 'https://images.unsplash.com/photo-1633580969752-a821ac729fce?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCVFNSVBRCU5NyVFNSVCOCU5NnxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'sf11', author: '云中君', title: '魏晋时期坦领半臂的裁剪版型深度复原（附图纸）', views: '3400', likes: '1.2万', image: 'https://plus.unsplash.com/premium_photo-1671527298921-a525395f9957?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fCVFNSVBRCU5NyVFNSVCOCU5NnxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'sf12', author: '金石刀客', title: '西泠八家印风拆解：刀法与边栏的残破美学', views: '1700', likes: '5k', image: 'https://images.unsplash.com/photo-1635761396505-3a12f82ddd99?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8JUU1JThEJUIwJUU3JUFCJUEwfGVufDB8fDB8fHww' },
      { id: 'sf13', author: '墨香研习', title: '端砚下发墨实测：坑仔岩与麻子坑的水口对比', views: '980', likes: '2.2k', image: 'https://images.unsplash.com/photo-1586427705074-cef563134a3a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCVFNyVBMCU5QXxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'sf14', author: '半帖行书', title: '《圣教序》单字解析：王羲之的游丝牵带与笔势断连', views: '4200', likes: '1.8万', image: 'https://images.unsplash.com/photo-1537163478157-d2023b5ba5a2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFOCVBMSU4QyVFNCVCOSVBNnxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'sf15', author: '青衫落拓', title: '汉代交窬裙的打褶逻辑与耗布量精确计算', views: '2500', likes: '7k', image: 'https://plus.unsplash.com/premium_photo-1700070066270-fb189ec36543?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8JUU1JUI4JTgzJUU2JTk2JTk5fGVufDB8fDB8fHww' },
      { id: 'sf16', author: '至诚长安', title: '如何养护紫毫笔：关于脱脂与清洗的终极指南', views: '1300', likes: '3.4k', image: 'https://images.unsplash.com/photo-1603479354350-7391f7421afd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnJ1c2h8ZW58MHx8MHx8fDA%3D' },
      { id: 'sf17', author: '古音溯源', title: '古琴丝弦与钢丝尼龙弦的泛音延音衰减数据对比', views: '800', likes: '1.9k', image: 'https://images.unsplash.com/photo-1606722575830-ed672de05c1f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8JUU3JTkwJUI0fGVufDB8fDB8fHww' },
      { id: 'sf18', author: '染织录', title: '宋锦与蜀锦的经纬交织工艺在现代机织中的局限', views: '1800', likes: '4.8k', image: 'https://plus.unsplash.com/premium_photo-1765040758426-170e1b3af422?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fCVFNyVCQiU4N3xlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'sf19', author: '金石刀客', title: '封泥的拓印技巧：湿拓法与干拓法的墨色层次', views: '1050', likes: '2.5k', image: 'https://images.unsplash.com/photo-1609817482305-222c7d90ab06?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUU1JUIwJTgxJUU2JUIzJUE1fGVufDB8fDB8fHww' },
      { id: 'sf20', author: '至诚笔冢', title: '草书临帖指南：张旭《古诗四帖》的连绵笔势重构', views: '3800', likes: '1.4万', image: 'https://images.unsplash.com/photo-1734941133462-25095e2f80e3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFOCU4RCU4OSVFNCVCOSVBNnxlbnwwfHwwfHx8MA%3D%3D' }
    ]
  },
  {
    id: 'anime-research',
    name: '动漫研习社',
    tags: ['作画技法', '剧情解构', '考据学', '手办模玩'],
    members: 2450,
    headline: '热爱，跨越次元。',
    desc: '纯粹的二次元同好交流地。从新番安利到同人创作，守护你的精神结界。',
    cover: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1200', 
    icon: Tv,
    iconTheme: 'from-[#a855f7] to-[#6366f1]', 
    founder: '晓雨动漫社 传承',
    heroTitle: '羁绊，追番，同人。\n守护你的热爱。',
    lore: '前身为至诚学院“晓雨动漫社”。这里没有偏见与引战，只有对纸片人最纯粹的爱。',
    quiz: [
      { question: '赛璐璐(Celluloid)在动画制作中主要指什么？', options: ['A. 一种3D渲染技术', 'B. 透明胶片上手绘的传统工艺', 'C. 动画配音技巧'], answer: 1 },
      { question: '《新世纪福音战士(EVA)》中“A.T.力场”的全称是？', options: ['A. Absolute Terror Field', 'B. Anti-Tank Field', 'C. Advanced Technology Field'], answer: 0 },
      { question: '动画术语中“一拍二”指的是什么？', options: ['A. 每秒24帧中每张画作停留两帧', 'B. 两个画师同时绘制一帧', 'C. 每秒播放两张原画'], answer: 0 }
    ],
    privatePosts: [
      { id: 'ar1', author: '帧数狂魔', title: '【原画拆解】骨头社的“日常演技”：微小动作的K帧逻辑', views: '5600', likes: '2.3万', image: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'ar2', author: 'EVA考据党', title: '《EVA》第26集意识流分镜解析：庵野秀明的视觉诡计', views: '7800', likes: '3.5万', image: 'https://images.unsplash.com/photo-1620336655052-b57986f5a26a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcnRvb258ZW58MHx8MHx8fDA%3D' },
      { id: 'ar3', author: '至诚吃谷人', title: '痛层陈列学：亚克力砖与吧唧在自然光下的折射收纳法', views: '3400', likes: '1.2万', image: 'https://plus.unsplash.com/premium_photo-1739027969843-036e37e77414?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fCVFNSU4RCVBMSVFOSU4MCU5QXxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'ar4', author: '赛璐璐之魂', title: '赛璐璐时代的色彩美学：90年代动画滤镜调色还原教程', views: '4500', likes: '1.8万', image: 'https://images.unsplash.com/photo-1521249607530-ef23405c2d40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fCVFNSU4RCVBMSVFOSU4MCU5QXxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'ar5', author: '分镜解析师', title: '今敏的转场魔法：《未麻的部屋》中匹配剪辑的精确到帧', views: '8200', likes: '4.1万', image: 'https://images.unsplash.com/photo-1593538573197-4e3ee8a864d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fCVFNSU4RCVBMSVFOSU4MCU5QXxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'ar6', author: '至诚画师', title: '同人插画进阶：环境光与反射光在二次元厚涂中的计算', views: '6100', likes: '2.9万', image: 'https://images.unsplash.com/photo-1578088854867-b54b766b9dc4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVFNSU4RCVBMSVFOSU4MCU5QXxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'ar7', author: '手办匠人', title: 'GK白模打磨与喷涂：处理高落差细小组立的压力控制', views: '2300', likes: '8k', image: 'https://images.unsplash.com/photo-1668359249832-d3abd3b606b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8JUU2JUJDJUFCJUU3JTk0JUJCfGVufDB8fDB8fHww' },
      { id: 'ar8', author: '剧作结构', title: '三幕剧还是起承转合？日本深夜番季番的节奏控制', views: '3800', likes: '1.4万', image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar9', author: '高达迷', title: '机甲浪漫：大河原邦男“大河原站姿”的透视与重心配重', views: '4100', likes: '1.9万', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar10', author: '帧数狂魔', title: '一拍一还是一拍二？扳机社战斗场景的张力倍增诀窍', views: '5500', likes: '2.5万', image: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar11', author: '考据达人', title: '《进击的巨人》神话隐喻：北欧神话体系在世界观的映射', views: '9200', likes: '5.1万', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar12', author: '至诚吃谷人', title: '日拍切煤指南：如何避开Mercari的高溢价与瑕疵雷区', views: '3100', likes: '1.1万', image: 'https://images.unsplash.com/photo-1580477667995-15608051dc8b?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar13', author: '至诚画师', title: '人体结构透视：大透视张力构图下鱼眼畸变的修正', views: '4800', likes: '2.1万', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar14', author: '手办匠人', title: 'PVC手办存放的环境湿度阈值与抗出油保养全解析', views: '2700', likes: '9.5k', image: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar15', author: '分镜解析师', title: '长镜头的运用：新海诚式虚实空间交错的镜头调度', views: '6300', likes: '2.8万', image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar16', author: '剧作结构', title: '后启示录题材的哀物语：废土日常系动画的情感内核', views: '3500', likes: '1.3万', image: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar17', author: '赛璐璐之魂', title: '宫崎骏的天空：从水彩背景板到光影渲染的进化史', views: '7100', likes: '3.6万', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar18', author: '高达迷', title: 'UC宇宙机设演变：从工业真实感到超级系夸张造型', views: '3900', likes: '1.6万', image: 'https://images.unsplash.com/photo-1580477667995-15608051dc8b?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar19', author: '考据达人', title: '魔圆宗教隐喻：基督教图像符号在动画分镜中的运用', views: '5800', likes: '2.6万', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60' },
      { id: 'ar20', author: '帧数狂魔', title: '中村丰特写：特效方块碎裂（Yutapon Cubes）的动力学', views: '8800', likes: '4.5万', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: 'dance',
    name: '街舞交流圈',
    tags: ['招式拆解', '赛事Repo', '编舞逻辑', '音乐理解'],
    members: 3420,
    headline: '节奏，重塑灵魂。',
    desc: '舞者的专属阵地。用身体丈量热爱，用汗水诠释态度。',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200',
    icon: AudioLines,
    iconTheme: 'from-[#38bdf8] to-[#4f46e5]', 
    founder: '福州大学至诚学院 创办',
    heroTitle: '律动，汗水，狂欢。\n舞台由你定义。',
    lore: '诞生于福州大学至诚学院的镜子前和路灯下。',
    quiz: [
      { question: 'Locking(锁舞)的标志性动作之一是什么？', options: ['A. Point(指手)', 'B. Headspin(头转)', 'C. Moonwalk(月步)'], answer: 0 },
      { question: 'Breaking(霹雳舞)中，舞者站立时进行的准备步法统称为什么？', options: ['A. Toprock', 'B. Footwork', 'C. Freeze'], answer: 0 },
      { question: 'Popping(震感舞)中Hit的核心原理是什么？', options: ['A. 依靠电流刺激', 'B. 肌肉迅速收缩与放松产生震动', 'C. 关节脱臼后复位'], answer: 1 }
    ],
    privatePosts: [
      { id: 'dc1', author: '至诚Popper', title: '【干货】Popping震感本质：肌肉收缩(Hit)与关节锁定的生物力学', views: '4500', likes: '1.2万', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc2', author: '至诚B-Boy', title: '大风车(Windmill)滞空要领：腰部力量传递与地心引力对抗', views: '3800', likes: '9.5k', image: 'https://images.unsplash.com/photo-1535597401614-2d7442111100?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc3', author: 'Kinjaz研究员', title: '编舞逻辑拆解：Kinjaz空间层次与视觉差阵型(Formation)应用', views: '6700', likes: '2.5万', image: 'https://images.unsplash.com/photo-1550026593-f369f98df0af?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc4', author: 'OldSchool魂', title: 'Hiphop基础律动：Bounce与Rock的呼吸感隔离练习法', views: '2900', likes: '7k', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc5', author: '至诚Locker', title: 'Locking灵魂控制：如何将Twirl的离心力转化为干脆的Lock', views: '3100', likes: '8.2k', image: 'https://images.unsplash.com/photo-1729166240683-d571ede41f8b?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc6', author: '节奏切片师', title: '音乐理解(Musicality)：在切分音与Off-beat中寻找编舞动机', views: '5200', likes: '1.8万', image: 'https://plus.unsplash.com/premium_photo-1710064057043-d301e344e348?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc7', author: '赛事复盘', title: '【Repo】KOD 2026半决赛神仙打架：极限卡点与情绪张力', views: '8900', likes: '3.1万', image: 'https://images.unsplash.com/photo-1757580191181-38b126cc3a77?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc8', author: '至诚B-Boy', title: 'Airflare(抛)的进阶瓶颈：起手姿势重心滞后导致的速度损耗', views: '2200', likes: '5.5k', image: 'https://images.unsplash.com/photo-1757580190832-1845c74de167?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc9', author: 'Waacking女王', title: 'Waacking延展性：肩轴旋转与手臂延伸曲线的视觉错觉', views: '4100', likes: '1.1万', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc10', author: '至诚Popper', title: 'Roll与Ticking的区别：连续微收缩在不同BPM下的应用', views: '3600', likes: '9k', image: 'https://images.unsplash.com/photo-1535597401614-2d7442111100?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc11', author: 'OldSchool魂', title: 'House舞种的足部语法：Jacking律动与重心高频切换', views: '2700', likes: '6.2k', image: 'https://images.unsplash.com/photo-1550026593-f369f98df0af?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc12', author: '编舞师日常', title: '如何用舞蹈讲故事：从动作发力(Dynamics)构建叙事弧光', views: '5500', likes: '1.6万', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc13', author: '节奏切片师', title: 'G-Funk音乐结构拆解：House舞者该如何抓底鼓(Kick)', views: '3300', likes: '8.8k', image: 'https://images.unsplash.com/photo-1729166240683-d571ede41f8b?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc14', author: '至诚Locker', title: 'Scooby Doo步伐的变种：如何在Battle中利用它改变空间', views: '2800', likes: '7.5k', image: 'https://plus.unsplash.com/premium_photo-1710064057043-d301e344e348?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc15', author: '赛事复盘', title: 'Freestyle的临场逻辑：词汇量(Vocabulary)的堆叠与打乱', views: '7100', likes: '2.4万', image: 'https://images.unsplash.com/photo-1757580191181-38b126cc3a77?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc16', author: '至诚B-Boy', title: 'Toprock衔接Footwork的顺滑感：扫腿(Sweep)的滞空处理', views: '3900', likes: '1万', image: 'https://images.unsplash.com/photo-1757580190832-1845c74de167?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc17', author: '编舞师日常', title: '齐舞(Crew)的质感：呼吸同步与队形留白的留白效应', views: '4800', likes: '1.4万', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc18', author: 'Waacking女王', title: 'Pose的定格艺术：黑白老电影造型在Waacking中的移植', views: '4200', likes: '1.2万', image: 'https://images.unsplash.com/photo-1535597401614-2d7442111100?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc19', author: 'OldSchool魂', title: '街舞起源考：Bronx区派对文化对Breaking发展的影响', views: '1900', likes: '4.5k', image: 'https://images.unsplash.com/photo-1550026593-f369f98df0af?w=700&auto=format&fit=crop&q=60' },
      { id: 'dc20', author: '至诚Popper', title: 'Animatronics(定格动画)风格解析：极高频Stop的控制点', views: '6200', likes: '2.1万', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=700&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: 'transit',
    name: '交通迷运转群',
    tags: ['交路运转', '机车考据', '线网规划', '航空视角'],
    members: 856,
    headline: '脉络，尽收眼底。',
    desc: '记录城市脉络，分享列车交路、公交迷日常与运转记录。',
    cover: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=1000',
    icon: Train,
    iconTheme: 'from-[#ff9a44] to-[#ff5200]', 
    founder: '福州大学至诚学院 创办',
    heroTitle: '探索，记录，运转。\n尽在这一域。',
    lore: '本群起源于 2008 年福州大学至诚学院机电工程系的一间宿舍。',
    quiz: [
      { question: '铁路系统中“交路”通常指的是什么？', options: ['A. 线路交叉', 'B. 机车或乘务员担当乘务的区段', 'C. 换乘车站'], answer: 1 },
      { question: '我国国家铁路的标准轨距是多少？', options: ['A. 1000mm', 'B. 1435mm', 'C. 1520mm'], answer: 1 },
      { question: '电气化铁路接触网的标准额定电压通常是多少？', options: ['A. 10kV 直流', 'B. 25kV 单相工频交流', 'C. 1500V 直流'], answer: 1 }
    ], 
    privatePosts: [
      { id: 'tr1', author: '机电大拿', title: 'SS8型电力机车主电路原理拆解：硅机组全控桥的励磁逻辑', views: '4500', likes: '1.2万', image: 'https://images.unsplash.com/photo-1625020761306-6deea20d2e0b?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr2', author: '运转手小林', title: '【运转路书】跨越三省：绿皮K字头48小时不间断硬座记录', views: '7800', likes: '3.5万', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr3', author: 'ATC研习', title: '福州地铁4号线自动驾驶GOA4等级下的CBTC闭塞算法', views: '3200', likes: '8.5k', image: 'https://images.unsplash.com/photo-1522850403397-b0c8f2f75451?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr4', author: '云端飞客', title: '波音737MAX与A320neo的翼型空气动力学及涵道比差异', views: '5600', likes: '1.8万', image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr5', author: '线网规划师', title: '城市轨道交通网：环线+放射线规划的客流潮汐阻尼效应', views: '2900', likes: '7.1k', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr6', author: '公交活字典', title: '福州公交BRT系统演变：专用道与信号灯绝对优先权的冲突', views: '1800', likes: '4.2k', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr7', author: '机电大拿', title: 'CRH380B与CR400AF牵引变流器IGBT模块的散热效率对比', views: '3400', likes: '9k', image: 'https://plus.unsplash.com/premium_photo-1680667832221-abfb04ba7cfa?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr8', author: '运转手小林', title: '最美高原铁路：青藏铁路大宗货物列车的双机重联纪实', views: '8200', likes: '4.1万', image: 'https://images.unsplash.com/photo-1625020761306-6deea20d2e0b?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr9', author: 'ATC研习', title: '站台门(PSD)与列车门联动控制的继电器安全回路解析', views: '1500', likes: '3.6k', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr10', author: '云端飞客', title: '长乐机场拍机机位坐标分享：附跑道盲降ILS区域焦段建议', views: '6100', likes: '2.2万', image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr11', author: '线网规划师', title: '从北京地铁八通线看市郊通勤铁路(S线)的票制瓶颈', views: '2700', likes: '6.5k', image: 'https://images.unsplash.com/photo-1522850403397-b0c8f2f75451?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr12', author: '公交活字典', title: '铰接客车(通道车)铰接盘的液压阻尼系统防折损机制', views: '1200', likes: '2.8k', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr13', author: '机电大拿', title: '内燃机车考据：DF4B型柴油机增压器的喘振现象及消除', views: '3800', likes: '1.1万', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr14', author: '运转手小林', title: '【运转】抢救性乘坐：即将退役的最后一代普速客车包厢', views: '9500', likes: '5.2万', image: 'https://plus.unsplash.com/premium_photo-1680667832221-abfb04ba7cfa?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr15', author: 'ATC研习', title: '轨道电路计轴红光带故障排查：杂散电流的电磁干扰', views: '2100', likes: '5k', image: 'https://images.unsplash.com/photo-1625020761306-6deea20d2e0b?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr16', author: '云端飞客', title: 'A350的复合材料机身结构：疲劳极限与碳纤维铺层图解', views: '4400', likes: '1.3万', image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr17', author: '线网规划师', title: 'TOD模式发展：东京涩谷站上盖物业的垂直动线设计', views: '5200', likes: '1.7万', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr18', author: '机电大拿', title: '磁悬浮列车的高速超导技术：排斥力与导向力的动态平衡', views: '6800', likes: '2.5万', image: 'https://images.unsplash.com/photo-1522850403397-b0c8f2f75451?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr19', author: '运转手小林', title: '极地铁路运转：瑞士卑尔根冰川列车的大坡度齿轨结构', views: '7300', likes: '3.1万', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&auto=format&fit=crop&q=60' },
      { id: 'tr20', author: '公交活字典', title: '纯电公交的续航衰减：钛酸锂电池与磷酸铁锂的充放电差异', views: '1900', likes: '4.6k', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: 'film-photo',
    name: '胶片摄影研习社',
    tags: ['暗房冲洗', '器材评测', '胶片特性', '光影构图'],
    members: 2150,
    headline: '定格，等待，显影。',
    desc: '从银盐到暗房，我们依然迷恋纯粹的物理感光。',
    cover: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=1200',
    icon: Camera,
    iconTheme: 'from-[#14b8a6] to-[#0369a1]',
    founder: '视觉传达设计系 认证',
    heroTitle: '光影，银盐，颗粒。\n留住时间的形状。',
    lore: '在这个手机快门只需 0.01 秒的时代，我们选择慢下来。体验胶片的独特魅力。',
    quiz: [
      { question: 'E-6工艺主要是用来冲洗哪种类型的底片？', options: ['A. 黑白负片', 'B. 彩色负片', 'C. 彩色反转片'], answer: 2 },
      { question: '标准的135画幅(全画幅)胶片，其感光面积尺寸约为？', options: ['A. 24x36mm', 'B. 6x6cm', 'C. 4x5inch'], answer: 0 },
      { question: '在胶片冲洗中，迫冲(Push Processing)的主要目的是什么？', options: ['A. 降低底片颗粒感', 'B. 提高胶片的有效感光度(ISO)', 'C. 改变底片的色温'], answer: 1 }
    ], 
    privatePosts: [
      { id: 'fp1', author: '暗房魔术师', title: 'C-41工艺家庭自冲洗：漂定液温度对品红彩斑的致命影响', views: '4500', likes: '1.5万', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp2', author: '旁轴测距仪', title: '哈苏500CM与玛米亚RB67：中画幅机械快门结构的极致差异', views: '6800', likes: '2.8万', image: 'https://images.unsplash.com/photo-1552168324-d612d77906d6?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp3', author: '颗粒收集者', title: '柯达Portra 400宽容度测试：过曝两档情况下的肤色还原图解', views: '8200', likes: '3.6万', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp4', author: '至诚扫街', title: '布列松的决定性瞬间：35mm焦段盲拍与超焦距陷阱对焦设置', views: '5100', likes: '1.9万', image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp5', author: '暗房魔术师', title: '黑白显影液雷电纳(Rodinal)1:100高稀释比静置显影的锐度', views: '3200', likes: '9.2k', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp6', author: '旁轴测距仪', title: '徕卡M3黄斑测距仪的光学偏移校准与半透半反棱镜维护', views: '4700', likes: '1.6万', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp7', author: '颗粒收集者', title: '反转片E-6工艺迫冲(Push)实战：富士RVP100推一档的色彩偏离', views: '2900', likes: '8k', image: 'https://images.unsplash.com/photo-1552168324-d612d77906d6?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp8', author: '至诚扫街', title: '区域曝光法(Zone System)实战：如何用点测光控制高光死白', views: '6500', likes: '2.5万', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp9', author: '镜头拆解师', title: '蔡司七枚玉与八枚玉光学散景结构对比：非球面镜片的引入', views: '5500', likes: '1.8万', image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp10', author: '暗房魔术师', title: '相纸放大与反差控制：多级反差滤镜在银盐放相中的阻光曲线', views: '2100', likes: '5.5k', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp11', author: '颗粒收集者', title: '电影卷冲洗去除碳黑层的安全化学药剂配方与环保处理', views: '1800', likes: '4.6k', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp12', author: '旁轴测距仪', title: '尼康F3纯机械快门上弦齿轮磨损导致的1/1000秒快门漏光分析', views: '3300', likes: '8.9k', image: 'https://images.unsplash.com/photo-1552168324-d612d77906d6?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp13', author: '至诚扫街', title: '大画幅8x10技术相机的沙姆定律(Scheimpflug)移轴操作详解', views: '4900', likes: '1.7万', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp14', author: '镜头拆解师', title: '老镜头起雾脱胶修理：加热消解加拿大树胶与重新胶合步骤', views: '2600', likes: '7.1k', image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp15', author: '暗房魔术师', title: '底片水洗液(Photo-Flo)浓度对水渍残留与后期扫描Dmax值的影响', views: '1500', likes: '3.8k', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp16', author: '颗粒收集者', title: '伊尔福Provia 100F停产后的最佳替代反转片色彩倾向光谱对比', views: '7400', likes: '3.1万', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp17', author: '旁轴测距仪', title: '禄来双反(Rollei 3.5F)取景视差导致的近摄构图裁剪补偿算法', views: '3700', likes: '1万', image: 'https://images.unsplash.com/photo-1552168324-d612d77906d6?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp18', author: '至诚扫街', title: '森山大道式的黑白硬核高反差街拍：Tri-X 400迫冲至1600样片', views: '8600', likes: '4.2万', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp19', author: '镜头拆解师', title: '焦外二线性与“旋焦”玄学：苏联八羽怪Helios-44-2的光学缺陷', views: '5900', likes: '2.4万', image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&auto=format&fit=crop&q=60' },
      { id: 'fp20', author: '颗粒收集者', title: '宝丽来(Polaroid)SX-70相纸感光层剥离显影：移膜艺术实操', views: '4100', likes: '1.4万', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: 'poetry',
    name: '深夜读诗会',
    tags: ['先锋诗歌', '韵律解构', '诗人译本', '意象赏析'],
    members: 1042,
    headline: '字句，韵脚，共鸣。',
    desc: '当城市的喧嚣褪去，这里是文字最后的庇护所。',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=1200',
    icon: BookOpen,
    iconTheme: 'from-[#8b5cf6] to-[#4c1d95]',
    founder: '至诚中文文学社 创办',
    heroTitle: '浪漫，哲思，解构。\n灵魂深处的对白。',
    lore: '无论你是偏爱泰戈尔的浪漫，还是海子的哲思。在这里，每一行诗都是一次灵魂的深呼吸。',
    quiz: [
      { question: '诗句“面朝大海，春暖花开”的作者是谁？', options: ['A. 北岛', 'B. 顾城', 'C. 海子'], answer: 2 },
      { question: '现代主义诗歌里程碑作品《荒原》(The Waste Land)的作者是？', options: ['A. T.S. 艾略特', 'B. 埃兹拉·庞德', 'C. 华莱士·史蒂文斯'], answer: 0 },
      { question: '被称为“朦胧诗派”代表人物，写下“黑夜给了我黑色的眼睛”的诗人是？', options: ['A. 舒婷', 'B. 顾城', 'C. 食指'], answer: 1 }
    ], 
    privatePosts: [
      { id: 'po1', author: '字句解构', title: '意象的越界：里尔克《豹》的结构主义分析与视阈坍缩', views: '2800', likes: '7.5k', image: 'https://plus.unsplash.com/premium_photo-1724138462612-89c0f5141fb3?w=700&auto=format&fit=crop&q=60' },
      { id: 'po2', author: '韵脚流浪', title: '现代自由体的边界：北岛诗作中隐性十四行诗韵脚的再发现', views: '3400', likes: '9.2k', image: 'https://images.unsplash.com/photo-1594453576738-8a6ad41feca4?w=700&auto=format&fit=crop&q=60' },
      { id: 'po3', author: '译本考据', title: '波德莱尔中译本对比：陈东飚与王以培对“时间隐喻”的处理异同', views: '1500', likes: '3.8k', image: 'https://images.unsplash.com/photo-1764067185982-a74981a8abda?w=700&auto=format&fit=crop&q=60' },
      { id: 'po4', author: '星空拾荒者', title: '海子晚期诗歌中的死亡倒影：太阳意象的自我燔祭现象', views: '6700', likes: '2.5万', image: 'https://plus.unsplash.com/premium_photo-1661855511662-d27b3ad8b9e4?w=700&auto=format&fit=crop&q=60' },
      { id: 'po5', author: '字句解构', title: '废名诗作中的禅宗意味与留白艺术：中国先锋诗歌的早期尝试', views: '1900', likes: '5.1k', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=700&auto=format&fit=crop&q=60' },
      { id: 'po6', author: '韵脚流浪', title: '狄兰·托马斯音步重音解析：死求不屈的句法暴力美学', views: '2200', likes: '6.4k', image: 'https://plus.unsplash.com/premium_photo-1724138462612-89c0f5141fb3?w=700&auto=format&fit=crop&q=60' },
      { id: 'po7', author: '译本考据', title: '特拉克尔《冬夜》意象翻译的缺失：德语原诗德复合词重组困境', views: '1100', likes: '2.9k', image: 'https://images.unsplash.com/photo-1594453576738-8a6ad41feca4?w=700&auto=format&fit=crop&q=60' },
      { id: 'po8', author: '星空拾荒者', title: '曼德尔施塔姆的迷宫：镜子与无限循环的时间拓扑学', views: '4500', likes: '1.4万', image: 'https://images.unsplash.com/photo-1764067185982-a74981a8abda?w=700&auto=format&fit=crop&q=60' },
      { id: 'po9', author: '字句解构', title: '策兰诗歌的失语症：大屠杀后德语词汇的“骨质化”硬核重塑', views: '3100', likes: '8.8k', image: 'https://plus.unsplash.com/premium_photo-1661855511662-d27b3ad8b9e4?w=700&auto=format&fit=crop&q=60' },
      { id: 'po10', author: '韵脚流浪', title: '庞德《比萨诗章》的拼贴画结构：东方表意文字的西方重组', views: '1800', likes: '4.7k', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=700&auto=format&fit=crop&q=60' },
      { id: 'po11', author: '译本考据', title: '惠特曼《地铁车站的幽灵》中分号与冒号在译文中的断句迷失', views: '1300', likes: '3.5k', image: 'https://plus.unsplash.com/premium_photo-1724138462612-89c0f5141fb3?w=700&auto=format&fit=crop&q=60' },
      { id: 'po12', author: '星空拾荒者', title: '顾城童话诗的黑暗底色：水晶意象背后的易碎与极权', views: '7200', likes: '3.1万', image: 'https://images.unsplash.com/photo-1594453576738-8a6ad41feca4?w=700&auto=format&fit=crop&q=60' },
      { id: 'po13', author: '字句解构', title: '艾略特《荒原》的互文性索引网络：现代派诗歌的“掉书袋”逻辑', views: '2600', likes: '7.2k', image: 'https://images.unsplash.com/photo-1764067185982-a74981a8abda?w=700&auto=format&fit=crop&q=60' },
      { id: 'po14', author: '韵脚流浪', title: '说唱(Rap)歌词与现代口语诗的双押与内韵比较研究', views: '5400', likes: '1.9万', image: 'https://plus.unsplash.com/premium_photo-1661855511662-d27b3ad8b9e4?w=700&auto=format&fit=crop&q=60' },
      { id: 'po15', author: '译本考据', title: '聂鲁达情诗译本的过度浪漫化：西语原本肉欲符号的被动审查', views: '3900', likes: '1.1万', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=700&auto=format&fit=crop&q=60' },
      { id: 'po16', author: '星空拾荒者', title: '佩索阿与四个异名的复调诗歌结构：自我解构的精神分裂', views: '4100', likes: '1.2万', image: 'https://plus.unsplash.com/premium_photo-1724138462612-89c0f5141fb3?w=700&auto=format&fit=crop&q=60' },
      { id: 'po17', author: '字句解构', title: '阿赫玛托娃诗作中的城市隐喻：彼得堡作为冰冷绞肉机的建构', views: '1700', likes: '4.8k', image: 'https://images.unsplash.com/photo-1594453576738-8a6ad41feca4?w=700&auto=format&fit=crop&q=60' },
      { id: 'po18', author: '韵脚流浪', title: '俳句(Haiku)格式的跨语种嫁接：5-7-5音节在汉语语境的失真', views: '2300', likes: '6.1k', image: 'https://images.unsplash.com/photo-1764067185982-a74981a8abda?w=700&auto=format&fit=crop&q=60' },
      { id: 'po19', author: '译本考据', title: '辛波斯卡诗歌的讽刺性剥离：波兰语中性代词的性别翻转', views: '2100', likes: '5.7k', image: 'https://plus.unsplash.com/premium_photo-1661855511662-d27b3ad8b9e4?w=700&auto=format&fit=crop&q=60' },
      { id: 'po20', author: '星空拾荒者', title: '洛夫《石室之死亡》的超现实张力：台湾现代诗的汉字爆破', views: '5800', likes: '1.8万', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=700&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: 'indie-game',
    name: '硬核独立游戏舱',
    tags: ['关卡设计', '动作帧数', '叙事诡计', '肉鸽构筑'],
    members: 4120,
    headline: '硬核，沉浸，通关。',
    desc: '拒绝氪金手游，我们只为真正触动人心的“第九艺术”买单。',
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    icon: Gamepad2,
    iconTheme: 'from-[#10b981] to-[#047857]',
    founder: '第九艺术研究室 认证',
    heroTitle: '弹反，构筑，远征。\n重塑游戏荣光。',
    lore: '我们不追求绚丽的氪金抽卡，只沉迷于精妙的关卡设计。',
    quiz: [
      { question: '宫崎英高因为其设计的游戏难度极高且常设陷阱，被玩家尊称为什么？', options: ['A. 老贼', 'B. 大哥', 'C. 跌神'], answer: 0 },
      { question: '“银河恶魔城(Metroidvania)”类游戏最核心的关卡设计特征是？', options: ['A. 纯线性通关', 'B. 获得新能力后解锁并回溯探索旧区域', 'C. 无尽的随机生成地牢'], answer: 1 },
      { question: '“肉鸽(Roguelike)”游戏两大最硬核的特征通常是指？', options: ['A. 永久死亡与程序生成关卡', 'B. 多人在线与开放世界', 'C. 实时光线追踪与高帧率'], answer: 0 }
    ], 
    privatePosts: [
      { id: 'ig1', author: '代码审查员', title: '《空洞骑士》跳跃曲线代码拆解：重力加速度与Coyote Time的完美调校', views: '1.2万', likes: '4.5万', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig2', author: '肉鸽狂热粉', title: '随机数种子算法：《以撒的结合》房间生成与掉落池伪随机概率链', views: '8900', likes: '3.1万', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig3', author: '至诚老猎人', title: '《黑神话悟空》动作受击反馈：卡肉感(Hitstop)的帧数延迟数据测算', views: '2.4万', likes: '8.8万', image: 'https://images.unsplash.com/photo-1580234811432-5202e524d77d?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig4', author: '叙事解构师', title: 'Meta游戏《史丹利的寓言》叙事树图：玩家选择与旁白控制的博弈拓扑', views: '5600', likes: '1.8万', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig5', author: '像素游侠', title: '《蔚蓝(Celeste)》关卡设计：心流(Flow)体验下隐性宽容碰撞框的设定', views: '1.1万', likes: '4.2万', image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig6', author: '代码审查员', title: 'Unity还是Godot？2D像素游戏基于Tilemap渲染的Draw Call优化对比', views: '3200', likes: '8.5k', image: 'https://plus.unsplash.com/premium_photo-1674374443275-20dae04975ac?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig7', author: '肉鸽狂热粉', title: '《杀戮尖塔》卡组构筑深度数学模型：抽牌概率与费用曲线期望值', views: '9500', likes: '3.7万', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig8', author: '至诚老猎人', title: '魂系地图箱庭理论：《黑魂1》传火祭祀场垂直捷径连通的三维坐标复刻', views: '1.8万', likes: '6.5万', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig9', author: '叙事解构师', title: '碎片化叙事陷阱：物品说明(Lore)过度隐藏对玩家认知负荷的损害', views: '4200', likes: '1.2万', image: 'https://images.unsplash.com/photo-1580234811432-5202e524d77d?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig10', author: '像素游侠', title: '《星露谷物语》时间系统与玩家强迫症(FOMO)效应的数值陷阱', views: '1.5万', likes: '5.2万', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig11', author: '代码审查员', title: '2D光影算法：2D网格生成软阴影与法线贴图(Normal Map)在像素中的应用', views: '2800', likes: '6k', image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig12', author: '肉鸽狂热粉', title: '《黑帝斯(Hades)》祝福(Boon)互斥池：Duo祝福生成的隐藏先决代码表', views: '8100', likes: '2.9万', image: 'https://plus.unsplash.com/premium_photo-1674374443275-20dae04975ac?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig13', author: '至诚老猎人', title: '《血源诅咒》怪兽动作AI：基于距离探测的攻击模组(MoveSet)触发权重', views: '1.3万', likes: '4.8万', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig14', author: '叙事解构师', title: '《极乐迪斯科》无字天书：UI界面的极简主义与潜台词传递', views: '3700', likes: '1.1万', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig15', author: '像素游侠', title: '银河恶魔城(Metroidvania)能力锁死设计：通过视觉引导代替空气墙', views: '7600', likes: '2.6万', image: 'https://images.unsplash.com/photo-1580234811432-5202e524d77d?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig16', author: '代码审查员', title: '体素艺术(Voxel)与Marching Cubes算法在现代独立游戏中的性能极限', views: '1900', likes: '4.2k', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig17', author: '肉鸽狂热粉', title: '《吸血鬼幸存者》难度衰减曲线：为什么后期构建会不可避免走向同质化', views: '9200', likes: '3.4万', image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig18', author: '至诚老猎人', title: '《只狼》弹反系统(Deflect)帧数判定宽容度逐帧切片硬核分析', views: '2.1万', likes: '7.6万', image: 'https://plus.unsplash.com/premium_photo-1674374443275-20dae04975ac?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig19', author: '叙事解构师', title: '环保主义或虚无主义：《雨世界(Rain World)》废墟生态的隐喻剥离', views: '4800', likes: '1.5万', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60' },
      { id: 'ig20', author: '像素游侠', title: '类魂2D的攻击前摇(Wind-up)与后摇(Recovery)动画关键帧调优经验', views: '6400', likes: '2.1万', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=700&auto=format&fit=crop&q=60' }
    ]
  },
  {
    id: 'coffee',
    name: '精品咖啡研习所',
    tags: ['冲煮参数', '烘焙曲线', '生豆产区', '拉花进阶'],
    members: 1890,
    headline: '萃取，风味，醇香。',
    desc: '从一颗生豆到一杯滴滤，探讨咖啡背后关于温度与时间的科学。',
    cover: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200',
    icon: Coffee,
    iconTheme: 'from-[#d97706] to-[#78350f]',
    founder: '至诚学院咖啡同好 创办',
    heroTitle: '注水，焖蒸，品鉴。\n唤醒沉睡的风味。',
    lore: '放下速溶和流水线奶咖，我们在这里静享滴滤的时光。',
    quiz: [
      { question: '推荐的手冲水粉比大约是多少？', options: ['A. 1:5', 'B. 1:15', 'C. 1:30'], answer: 1 },
      { question: '相比于深烘焙，浅烘焙的咖啡豆通常更突出什么风味？', options: ['A. 焦糖与巧克力味', 'B. 花果香与酸质', 'C. 烟熏与醇厚度'], answer: 1 },
      { question: '制作一杯标准的意式浓缩咖啡(Espresso)，通常需要的萃取压力约为？', options: ['A. 1 bar', 'B. 9 bar', 'C. 20 bar'], answer: 1 }
    ], 
    privatePosts: [
      { id: 'cf1', author: '至诚萃取师', title: '浅烘埃塞的萃取率与水温关系：93℃与96℃下的TDS浓度实测图表', views: '4500', likes: '1.5万', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf2', author: '烘焙曲线', title: '梅拉德反应深度拆解：烘焙一爆至二爆期间糖分褐变的温度阈值', views: '3800', likes: '9.2k', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf3', author: '生豆寻猎', title: '哥伦比亚瑰夏种(Gesha)与原始种(Heirloom)的基因图谱与风味溯源', views: '2600', likes: '7.4k', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf4', author: '压纹拉花', title: 'WPM压纹郁金香的物理流体力学：奶泡微小气泡比与融合手法的关联', views: '6100', likes: '2.1万', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf5', author: '至诚萃取师', title: 'WDT布粉针能否根除通道效应？通过无底手柄的高速摄像慢放分析', views: '5800', likes: '1.9万', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf6', author: '烘焙曲线', title: '热风烘焙机与半直火烘焙机的热辐射传导对咖啡豆脱水阶段的影响', views: '1700', likes: '4.1k', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf7', author: '生豆寻猎', title: '厌氧发酵与二氧化碳浸渍法：特殊处理法产生的酒香酯类化学物成分', views: '3200', likes: '8.8k', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf8', author: '压纹拉花', title: '打发牛奶的蛋白质变性界限：为什么超过65度会丧失甜感与流动性', views: '5500', likes: '1.6万', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf9', author: '至诚萃取师', title: '平刀磨豆机与锥刀磨豆机粒径分布(PSD)实测数据及对均匀萃取的意义', views: '7200', likes: '2.6万', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf10', author: '烘焙曲线', title: 'ROR(升温速率)剧烈波动的原因诊断：排风量与火力配合的滞后性纠正', views: '1400', likes: '3.5k', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf11', author: '生豆寻猎', title: '云南保山小粒咖啡的土壤微量元素测定与“土腥味”克服改良探讨', views: '2900', likes: '7.8k', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf12', author: '压纹拉花', title: '拉花缸嘴形影响测试：尖嘴与圆嘴对摆动(Wiggle)流量控制的流体阻力', views: '4800', likes: '1.4万', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf13', author: '至诚萃取师', title: '水质矿物质硬度(TDS)对咖啡弱酸风味析出的反渗透缓冲机制探究', views: '3600', likes: '1万', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf14', author: '烘焙曲线', title: '浅烘焙咖啡排气期(Degassing)二氧化碳释出的分光光度计监测数据', views: '1900', likes: '5.2k', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf15', author: '生豆寻猎', title: '肯尼亚水洗法分级：AA与AB颗粒度筛网分级对焦糖化一致性的实际影响', views: '2300', likes: '6.6k', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf16', author: '压纹拉花', title: '如何抢救分离的奶泡：表面张力重组的二次摇匀动作有效性实验', views: '4100', likes: '1.2万', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf17', author: '至诚萃取师', title: '手冲四六法(4:6 Method)的数学验证：分段注水切割萃取不同风味层的科学论证', views: '8800', likes: '3.1万', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf18', author: '烘焙曲线', title: '冷萃咖啡的生豆烘焙策略调整：为什么冷萃需要更高的焦糖化反应？', views: '3100', likes: '8.4k', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf19', author: '生豆寻猎', title: '咖啡锈叶病(La Roya)防御：抗病新品种Castillo与传统波旁的杯测盲品', views: '1600', likes: '4.5k', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&auto=format&fit=crop&q=60' },
      { id: 'cf20', author: '压纹拉花', title: '反手天鹅拉花解析：非对称握缸状态下的手腕倾角与回流补偿', views: '5200', likes: '1.5万', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&auto=format&fit=crop&q=60' }
    ]
  }
];

const HERO_ACTIVITIES = [
  { id: 'hero1', title: '「破界」全能数字艺术特展', circle: '数字视觉前沿', date: '本周五 19:30', cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600' },
  { id: 'hero2', title: '2026 高校街舞争霸赛', circle: '街舞交流圈', date: '下周六 18:00', cover: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1600' },
  { id: 'hero3', title: '「时光」复古胶片摄影展', circle: '胶片摄影研习社', date: '本周末 全天', cover: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=1600' }
];

const ACTIVITIES = [
  { id: 'act1', title: '独立短片展映与导演对谈', date: '周六 14:00', cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800', circle: '光影记录' },
  { id: 'act2', title: '极限飞盘高校联赛选拔', date: '周日 09:00', cover: 'https://images.unsplash.com/photo-1591262714562-55ae3aef9b8f?w=800&auto=format&fit=crop&q=60', circle: '运动竞技' },
  { id: 'act3', title: '现代先锋艺术画廊巡展', date: '下周三 15:00', cover: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800', circle: '文艺创作' },
  { id: 'act4', title: '「墨韵」书法现场临摹雅集', date: '下周五 19:00', cover: 'https://images.unsplash.com/photo-1616564826355-b0021c684dc8?w=800&auto=format&fit=crop&q=60', circle: '书法国风社' },
  { id: 'act5', title: '福州老城区寻线之旅', date: '下周日 08:30', cover: 'https://images.unsplash.com/photo-1588695658260-19787878f590?w=800&auto=format&fit=crop&q=60', circle: '交通迷运转群' },
  { id: 'act6', title: '深夜读诗：里尔克专题', date: '下周二 21:00', cover: 'https://images.unsplash.com/photo-1693128871234-178319fca4bc?w=800&auto=format&fit=crop&q=60', circle: '深夜读诗会' },
  { id: 'act7', title: '魂系游戏极限挑战赛', date: '下周四 14:00', cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', circle: '硬核独立游戏舱' },
  { id: 'act8', title: '耶加雪菲：产地风味赏析', date: '下周六 15:30', cover: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800', circle: '精品咖啡研习所' },
  { id: 'act9', title: '动漫周边交流签售会', date: '本月末 10:00', cover: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&q=80&w=800', circle: '动漫研习社' },
  { id: 'act10', title: 'Street Session 快闪赛', date: '下月首周', cover: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&q=80&w=800', circle: '街舞交流圈' }
];

const PUBLIC_TOPICS = [
  { id: 't1', title: '汉服日常', count: '2340 个话题', color: 'text-rose-500', bg: 'bg-rose-100' },
  { id: 't2', title: '摄影器材', count: '1890 个话题', color: 'text-indigo-500', bg: 'bg-indigo-100' },
  { id: 't3', title: '独立游戏', count: '3420 个话题', color: 'text-emerald-500', bg: 'bg-emerald-100' },
  { id: 't4', title: '漫展扩列', count: '5600 个话题', color: 'text-[#a78bfa]', bg: 'bg-[#a78bfa]/20' },
  { id: 't5', title: '其他类型', count: '890 个话题', color: 'text-amber-500', bg: 'bg-amber-100' },
];

const TOP_DISCUSSIONS = [
  { id: 1, rank: 'TOP1', rankColor: 'text-[#a78bfa]', title: '今年最值得期待的独立/魂系游戏是哪款？', views: '2340', likes: '14.5万' },
  { id: 2, rank: 'TOP2', rankColor: 'text-indigo-400', title: '新手入门胶片摄影，第一台机子推荐买什么？', views: '1890', likes: '8.2万' }
];

const PUBLIC_QUESTIONS = [
  { id: 1, text: '入坑指南：2026年值得尝试的小众高质量爱好', author: '今天我又小众了', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
  { id: 2, text: '汉服小白怎么买？避开这些“影楼风”雷区', author: '鼓楼区信奉店退我钱', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
  { id: 3, text: '不会画画也能混二次元？盘点那些低门槛吃谷指南', author: '我对家被开除祖籍了', avatar: 'https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&q=80&w=150' },
  { id: 4, text: '从零开始的胶片摄影：年轻人的第一台相机推荐！', author: '又从咸鱼赚了第一桶金', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150' }
];

// ==========================================
// 💡 大众资讯流数据 (面向小白/未加圈用户的公共内容)
// ==========================================
const PUBLIC_ARTICLES = [
  // Top Stories (4篇)
  { id: 'pa1', category: '生活方式', title: '入坑指南：2026年值得尝试的小众高质量爱好', author: '今天我又小众了', image: 'https://images.unsplash.com/photo-1610558128766-64f6b95ba135?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa2', category: '书法国风', title: '汉服小白怎么买？避开这些“影楼风”雷区', author: '鼓楼区信奉店退我钱', image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=800&auto=format&fit=crop&q=60' },
  { id: 'pa3', category: '动漫研习', title: '不会画画也能混二次元？盘点那些低门槛吃谷指南', author: '我对家被开除祖籍了', image: 'https://images.unsplash.com/photo-1620336655052-b57986f5a26a?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa4', category: '胶片摄影', title: '从零开始的胶片摄影：年轻人的第一台相机推荐', author: '又从咸鱼赚了第一桶金', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60' },
  
  // Culture & Trends (4篇)
  { id: 'pa5', category: '青年文化', title: '为什么现在的年轻人越来越喜欢周末逛漫展？', author: '穷游每一天', image: 'https://media.istockphoto.com/id/1932920317/photo/female-cosplayer-in-a-pink-anime-costume-wearing-pink-hair.webp?a=1&b=1&s=612x612&w=0&k=20&c=urM9rZZwDs6HCotIYPG4FVJyX-pf5zfXYWQ5wZ9G_bQ=' },
  { id: 'pa6', category: '精品咖啡', title: '咖啡豆怎么选？3分钟弄懂浅烘与深烘的区别', author: '专注office', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa7', category: '独立游戏', title: '好玩的游戏推荐，无门槛下载即入门', author: '每天都在被羊毛薅', image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa8', category: '深夜读诗', title: '读诗：在快节奏的碎片化时代寻找内心的宁静', author: '就这个文艺范', image: 'https://plus.unsplash.com/premium_photo-1661855511662-d27b3ad8b9e4?w=800&auto=format&fit=crop&q=60' },
  
  // Latest News (8篇)
  { id: 'pa9', category: '街舞交流', title: '街舞入门：没有任何舞蹈基础，我该从什么舞种开始学？', author: '被女神男神同时拒绝的那个雨夜', image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa10', category: '交通运转', title: '交通迷都在玩什么？运转记录与路书制作基础科普', author: '我出生应该在火车上', image: 'https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa11', category: '书法国风', title: '硬笔软笔怎么选？新手毛笔字第一堂课', author: '笔墨小生', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa12', category: '动漫研习', title: '那些被名字耽误的神作，高分动画安利向', author: '补番小能手', image: 'https://images.unsplash.com/photo-1667419674822-1a9195436f1c?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa13', category: '光影记录', title: '不买胶片机，如何用手机调色出复古胶片感？', author: '摄影小白狗', image: 'https://plus.unsplash.com/premium_photo-1678189755687-b6d5587bd643?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa14', category: '独立游戏', title: '什么是“第九艺术”？独立游戏和3A大作究竟有什么区别', author: '你想装出怎样的人生', image: 'https://plus.unsplash.com/premium_photo-1723600942485-b1c02c8a0a81?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa15', category: '精品咖啡', title: '挂耳、速溶、胶囊、手冲...咖啡小白该如何进阶？', author: '人咖分离自动爆炸', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa16', category: '二次元文化', title: '第一次参加线下同人展面基，你需要注意这几件事', author: '亲友问我出的什么', image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&auto=format&fit=crop&q=60' },

  // Deep Dives (4篇)
  { id: 'pa17', category: '深度观察', title: '亚文化破圈：从小众硬核爱好到大众消费潮流的演变史', author: '都说了不是贞子', image: 'https://media.istockphoto.com/id/2169209453/photo/high-angle-view-of-fabric.webp?a=1&b=1&s=612x612&w=0&k=20&c=v-u3Kojgbaq8IjN1JqI26QJ9FlVOStZr9lZblR4vvt8=' },
  { id: 'pa18', category: '文化探讨', title: '数字时代的「复古回潮」：我们为何依然迷恋实体胶片与黑胶', author: '今天也是没出片', image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa19', category: '艺术评论', title: '交互的艺术：拆解优秀独立游戏的叙事结构与关卡设计', author: '编辑不', image: 'https://plus.unsplash.com/premium_photo-1719613532262-c9a3b2fc7d24?w=700&auto=format&fit=crop&q=60' },
  { id: 'pa20', category: '趋势报告', title: '新国风运动：传统非遗文化在Z世代的现代重塑与表达', author: '从科普到离谱', image: 'https://plus.unsplash.com/premium_photo-1673574716729-c116c094f677?w=700&auto=format&fit=crop&q=60' }
];

const NOTIFICATIONS = [
  { id: 1, type: 'system', title: '系统更新', desc: '全量圈层与海量活动现已更新完毕。', time: '刚刚', unread: true },
  { id: 2, type: 'system', title: '认证通知', desc: '「福大至诚」现已成为986院校。', time: '1小时前', unread: true },
  { id: 3, type: 'interaction', title: '云中君', desc: '赞同了你的帖子：“你好呀！期待在线下活动见到你~”', time: '2小时前', unread: false },
];

const USER_INFO = { name: '福大至诚用户', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150', id: 'user_8829' };

const CATEGORIES = [
  { icon: Palette, label: '文艺创作' },
  { icon: Activity, label: '运动竞技' },
  { icon: Headphones, label: '音乐交流' },
  { icon: Gamepad2, label: '电子竞技' },
  { icon: BookOpen, label: '学术探讨' },
  { icon: Camera, label: '光影记录' }
];

const COLLAGE_IMAGES = [
  { src: CIRCLES[0].cover, pos: "top-[-5%] left-[-10%] w-[45vw] h-[30vh] md:w-[22vw] md:h-[35vh]" },
  { src: ACTIVITIES[0].cover, pos: "top-[5%] left-[38%] w-[30vw] h-[22vh] md:top-[-5%] md:left-[28%] md:w-[16vw] md:h-[25vh]" },
  { src: CIRCLES[1].cover, pos: "top-[-2%] right-[-15%] w-[40vw] h-[32vh] md:top-[8%] md:right-[15%] md:w-[20vw] md:h-[30vh]" },
  { src: ACTIVITIES[1].cover, pos: "hidden md:block md:top-[-8%] md:right-[-5%] md:w-[18vw] md:h-[28vh]" },
  { src: CIRCLES[2].cover, pos: "top-[32%] left-[-20%] w-[38vw] h-[28vh] md:top-[38%] md:left-[-5%] md:w-[18vw] md:h-[28vh]" },
  { src: CIRCLES[3].cover, pos: "top-[35%] right-[-10%] w-[42vw] h-[30vh] md:top-[45%] md:right-[-2%] md:w-[22vw] md:h-[32vh]" },
  { src: ACTIVITIES[3].cover, pos: "bottom-[-5%] left-[-5%] w-[48vw] h-[34vh] md:bottom-[5%] md:left-[12%] md:w-[24vw] md:h-[36vh]" },
  { src: CIRCLES[4].cover, pos: "bottom-[-8%] right-[-10%] w-[50vw] h-[38vh] md:bottom-[-2%] md:right-[18%] md:w-[26vw] md:h-[40vh]" },
  { src: ACTIVITIES[4].cover, pos: "hidden md:block md:bottom-[-10%] md:left-[45%] md:w-[20vw] md:h-[28vh]" },
  { src: CIRCLES[5].cover, pos: "hidden md:block md:top-[20%] md:left-[15%] md:w-[14vw] md:h-[20vh]" },
  { src: ACTIVITIES[5].cover, pos: "hidden md:block md:top-[25%] md:right-[32%] md:w-[15vw] md:h-[22vh]" },
];

const MATRIX_IMAGES = [
  { id: 'shufa-guofeng', type: 'circle', src: CIRCLES[0].cover, pos: "top-[10%] left-[2%] md:top-[12%] md:left-[8%] w-32 h-40 md:w-48 md:h-64", rot: "-rotate-6", delay: "200ms", z: "z-20" },
  { id: 'anime-research', type: 'circle', src: CIRCLES[1].cover, pos: "top-[15%] right-[2%] md:top-[15%] md:right-[8%] w-40 h-32 md:w-60 md:h-48", rot: "rotate-6", delay: "350ms", z: "z-20" },
  { id: 'dance', type: 'circle', src: CIRCLES[2].cover, pos: "bottom-[10%] left-[5%] md:bottom-[15%] md:left-[12%] w-40 h-40 md:w-56 md:h-56", rot: "rotate-12", delay: "500ms", z: "z-20" },
  { id: 'indie-game', type: 'circle', src: CIRCLES[6].cover, pos: "bottom-[8%] right-[2%] md:bottom-[12%] md:right-[10%] w-32 h-48 md:w-48 md:h-64", rot: "-rotate-12", delay: "650ms", z: "z-20" },
  { id: 'coffee', type: 'circle', src: CIRCLES[7].cover, pos: "top-[40%] left-[-2%] md:left-[2%] w-32 h-32 md:w-40 md:h-40 hidden md:block", rot: "-rotate-12", delay: "800ms", z: "z-20" },
  { id: 'transit', type: 'circle', src: CIRCLES[3].cover, pos: "top-[50%] right-[-2%] md:right-[2%] w-40 h-28 md:w-48 md:h-32 hidden md:block", rot: "rotate-12", delay: "950ms", z: "z-20" },
  
  { id: 'act1', type: 'activity', src: ACTIVITIES[0].cover, pos: "top-[5%] left-[30%] md:top-[6%] md:left-[35%] w-20 h-20 md:w-32 md:h-32", rot: "rotate-12", delay: "250ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'act2', type: 'activity', src: ACTIVITIES[1].cover, pos: "bottom-[5%] right-[30%] md:bottom-[8%] md:right-[35%] w-24 h-24 md:w-36 md:h-36", rot: "-rotate-6", delay: "400ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'act4', type: 'activity', src: ACTIVITIES[3].cover, pos: "top-[30%] right-[25%] md:top-[35%] md:right-[25%] w-20 h-28 md:w-32 md:h-40 hidden md:block", rot: "rotate-6", delay: "700ms", z: "z-10 opacity-50 brightness-50" },
  { id: 'act9', type: 'activity', src: ACTIVITIES[8].cover, pos: "top-[50%] right-[30%] w-40 h-28 md:w-48 md:h-32 hidden md:block", rot: "rotate-12", delay: "950ms", z: "z-10 opacity-50 brightness-50" },
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

const MascotSquirrel = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M 70 45 C 100 40, 110 70, 90 85 C 80 95, 65 90, 68 75 C 70 60, 65 55, 60 60" fill="#FFC107" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M 82 52 C 92 60, 92 75, 82 82" fill="#FFF3E0" stroke="none" />
    <path d="M 35 70 C 35 98, 65 98, 65 70 Z" fill="#FFC107" stroke="#1e1b4b" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 40 75 C 40 92, 60 92, 60 75 Z" fill="#FFF3E0" stroke="none" />
    <path d="M 28 25 L 22 8 L 40 18" fill="#FFC107" stroke="#1e1b4b" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 72 25 L 78 8 L 60 18" fill="#FFC107" stroke="#1e1b4b" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 15 55 C 10 25, 25 15, 50 15 C 75 15, 90 25, 85 55 C 85 75, 75 80, 50 80 C 25 80, 15 75, 15 55 Z" fill="#FFC107" stroke="#1e1b4b" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 16.5 55 C 16.5 55, 30 45, 50 45 C 70 45, 83.5 55, 83.5 55 C 83.5 73, 75 78.5, 50 78.5 C 25 78.5, 16.5 73, 16.5 55 Z" fill="#FFF3E0" stroke="none" />
    <path d="M 15 55 C 15 75, 25 80, 50 80 C 75 80, 85 75, 85 55" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="33" cy="46" r="9" fill="#1e1b4b" />
    <circle cx="35" cy="43" r="3" fill="white" />
    <circle cx="30" cy="49" r="1.5" fill="white" />
    <circle cx="67" cy="46" r="9" fill="#1e1b4b" />
    <circle cx="69" cy="43" r="3" fill="white" />
    <circle cx="64" cy="49" r="1.5" fill="white" />
    <ellipse cx="23" cy="54" rx="4" ry="2.5" fill="#FFA4A2" opacity="0.9" />
    <ellipse cx="77" cy="54" rx="4" ry="2.5" fill="#FFA4A2" opacity="0.9" />
    <circle cx="50" cy="51" r="1.5" fill="#1e1b4b" />
    <path d="M 44 56 Q 47 60 50 56 Q 53 60 56 56" fill="none" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="48.5" y="58" width="3" height="3" rx="1" fill="white" stroke="#1e1b4b" strokeWidth="1" />
    <ellipse cx="42" cy="78" rx="6" ry="3" fill="#FFC107" stroke="#1e1b4b" strokeWidth="2" transform="rotate(45 42 78)" />
    <ellipse cx="58" cy="78" rx="6" ry="3" fill="#FFC107" stroke="#1e1b4b" strokeWidth="2" transform="rotate(-45 58 78)" />
  </svg>
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
  // 1. 通知相关的动态状态
  const [notifications, setNotifications] = useState(NOTIFICATIONS); // 把顶部的常量变成可变状态
  // 👇 1. 新增：控制私聊对话框的状态
  const [activeChatUser, setActiveChatUser] = useState(null); // 当前私聊的用户
  const [chatInput, setChatInput] = useState(''); // 私聊输入框
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'other', text: '你好呀！期待在线下活动见到你~', time: '10:00' }
  ]); // 模拟私聊记录

  // 👇 2. 新增：发送私聊消息及触发自动回复的逻辑
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return showToast('消息不能为空~');

    // 把自己的消息加入聊天记录
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: chatInput.trim(),
      time: '刚刚'
    };
    setChatHistory(prev => [...prev, newMessage]);
    setChatInput('');

    // 模拟对方 2 秒后自动回复
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        sender: 'other',
        text: '收到你的消息啦！那就现场见咯，记得注意安全~ ✌️',
        time: '刚刚'
      };
      setChatHistory(prev => [...prev, autoReply]);
    }, 2000);
  };
  const [toast, setToast] = useState('');
  
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const [matrixRefEl, setMatrixRefEl] = useState(null);
  const [matrixInView, setMatrixInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [customPosts, setCustomPosts] = useState({});
  const [activeActivity, setActiveActivity] = useState(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showCircleAllPosts, setShowCircleAllPosts] = useState(false);

  const [activePost, setActivePost] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [commentInput, setCommentInput] = useState('');

  // 👇 新增状态：控制每个圈子的冷却锁定时间
  const [quizLockouts, setQuizLockouts] = useState({});

  useEffect(() => {
    let timer;
    if (isAuth && currentTab === 'discover') {
      timer = setInterval(() => {
        setCurrentHeroIdx((prev) => (prev + 1) % HERO_ACTIVITIES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isAuth, currentTab]);

  useEffect(() => {
    if (!matrixRefEl) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMatrixInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(matrixRefEl);
    return () => observer.disconnect();
  }, [matrixRefEl]);

  useEffect(() => {
    if (isAuth) return;
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuth]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => { 
      setAuthLoading(false); 
      setIsAuth(true); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
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

    // 👇 拦截：检查该圈子是否处于 30 分钟冷却期
    const lockoutTime = quizLockouts[circle.id];
    if (lockoutTime && Date.now() < lockoutTime) {
      const remainingMins = Math.ceil((lockoutTime - Date.now()) / 60000);
      showToast(`冷却中，请 ${remainingMins} 分钟后再试~`);
      return;
    }

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
    const imgOpacity = Math.max(0, 1 - scrollProgress * 3);
    const imgScale = 1 + scrollProgress * 3;
    const textProgress = Math.min(1, Math.max(0, (scrollProgress - 0.3) * 2.5));
    const textOpacity = textProgress;
    const textScale = 0.9 + textProgress * 0.1;
    const textTranslateY = (1 - textProgress) * 40;

    return (
      <div className="h-[250vh] bg-[#F8F7FF] relative">
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#F8F7FF] via-[#EAE1FF] to-[#FFFFFF]">
          
          <div 
            className="absolute inset-0 pointer-events-none origin-center"
            style={{
              opacity: imgOpacity,
              transform: `scale(${imgScale})`,
            }}
          >
            {COLLAGE_IMAGES.map((img, i) => (
              <div 
                key={i} 
                className={`absolute rounded-2xl md:rounded-[24px] overflow-hidden shadow-2xl border-4 border-white/60 ${img.pos}`}
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                <img src={img.src} className="w-full h-full object-cover" alt="collage" />
              </div>
            ))}
          </div>

          <div 
            className="relative z-10 w-full max-w-sm flex flex-col items-center transition-all duration-75"
            style={{
              opacity: textOpacity,
              transform: `scale(${textScale}) translateY(${textTranslateY}px)`,
              pointerEvents: textOpacity > 0.8 ? 'auto' : 'none'
            }}
          >
            <div className="mb-12 text-center relative">
              <h1 className="text-6xl font-extrabold tracking-tighter mb-4 text-[#1e1b4b] drop-shadow-lg">
                同频<span className="text-[#a78bfa]">.</span>
              </h1>
              <p className="text-indigo-800/60 font-bold tracking-wide">找到属于你的精神角落</p>
            </div>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <button className="w-full bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white font-bold text-lg rounded-full py-5 shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">
                {authLoading ? '正在开启空间...' : '进入空间'}
              </button>
            </form>
          </div>
          
          <div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-300"
            style={{ opacity: imgOpacity }}
          >
            <span className="text-[10px] font-black text-indigo-900/40 tracking-[0.2em] uppercase">向下滑动探索</span>
            <div className="w-6 h-10 border-2 border-indigo-900/20 rounded-full flex justify-center p-1">
               <div className="w-1 h-2 bg-indigo-900/40 rounded-full animate-bounce"></div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const renderSidebar = () => (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white/50 backdrop-blur-3xl border-r border-white/60 p-8 z-40 text-left">
      <div className="mb-12 relative">
        <h1 className="text-2xl font-extrabold text-indigo-950 tracking-tight flex items-center gap-2">
          <Sparkles className="text-[#a78bfa]" size={24} />
          数字文化
        </h1>
        <p className="text-[10px] text-indigo-800/50 mt-1 font-black tracking-[0.2em] uppercase">This Circle</p>
        <MascotSquirrel className="absolute -top-3 -right-4 w-14 h-14 rotate-12 hover:rotate-0 hover:scale-110 transition-all cursor-pointer z-10 drop-shadow-md" />
      </div>
      <nav className="flex-1 space-y-3">
        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setCurrentTab(item.id); setActiveCircle(null); setActiveActivity(null); setShowAllPosts(false); setShowCircleAllPosts(false); setActivePost(null); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black transition-all ${
                isActive ? 'bg-white/80 text-[#a78bfa] shadow-sm scale-[1.02]' : 'text-indigo-800/40 hover:bg-white/30 hover:text-indigo-950'
              }`}
            >
              <IconComponent size={22} strokeWidth={isActive ? 3 : 2} />
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
      <div className="flex items-center gap-2 relative">
        <Sparkles className="text-[#a78bfa]" size={24} />
        <h1 className="text-xl font-black text-indigo-950 tracking-tight">数字文化</h1>
        <MascotSquirrel className="absolute -top-2 -right-10 w-10 h-10 rotate-12 z-10 drop-shadow-sm" />
      </div>
      <img src={USER_INFO.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-white" />
    </header>
  );

  const renderBottomNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-3xl border-t border-white/60 pb-safe z-40 shadow-lg">
      <div className="flex justify-around items-center h-16 px-4">
        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button key={item.id} onClick={() => { setCurrentTab(item.id); setActiveCircle(null); setActiveActivity(null); setShowAllPosts(false); setShowCircleAllPosts(false); setActivePost(null); }} className="flex flex-col items-center justify-center w-12 h-full relative">
              <IconComponent size={26} strokeWidth={isActive ? 3 : 2} className={`transition-all duration-300 ${isActive ? 'text-[#a78bfa] scale-110' : 'text-indigo-800/30'}`} />
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

      <section className="space-y-16 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(234,88,12,0.2)] bg-[#ea580c]">
          <div className="absolute inset-0">
             <img src={CIRCLES[0].cover} alt="Banner" className="w-full h-full object-cover mix-blend-overlay opacity-60 hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#9a3412]/90 via-[#ea580c]/40 to-transparent"></div>
             <div className="absolute -right-6 top-1/2 -translate-y-1/2 -rotate-90 text-white/10 font-black text-[6rem] md:text-[8rem] tracking-widest pointer-events-none whitespace-nowrap">
                GUOFENG
             </div>
          </div>
          <div className="relative z-10 p-8 md:p-14 flex flex-col justify-between min-h-[50vh] md:min-h-[60vh]">
            <div className="flex justify-between items-start">
              <div className="bg-white text-orange-600 font-black text-[10px] md:text-xs px-5 py-2.5 rounded-full tracking-[0.2em] uppercase shadow-lg flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                 Top Recommended
              </div>
            </div>
            
            <div className="mt-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="text-6xl md:text-[6rem] lg:text-[7.5rem] font-black text-white leading-[0.85] tracking-tighter mb-6 drop-shadow-xl">
                  书法<br/><span className="text-orange-300">国风社.</span>
                </h1>
                <p className="text-white/90 font-bold text-base md:text-lg max-w-md leading-relaxed border-l-4 border-orange-400 pl-4">
                  {CIRCLES[0].desc}
                </p>
              </div>
              <button onClick={() => { setActiveCircle(CIRCLES[0]); handleOpenQuiz(CIRCLES[0]); }} className="self-start md:self-end bg-white text-orange-600 px-10 py-5 rounded-full text-base font-black flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 transition-all shrink-0 shadow-xl">
                立即申请 <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:gap-12 pt-2">
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-indigo-100/60 pb-8">
              <h2 className="text-[2.8rem] md:text-6xl lg:text-[4.5rem] font-black text-indigo-950 uppercase leading-[0.85] tracking-tighter">
                CULTURE<br className="hidden md:block lg:hidden"/>
                <span className="text-indigo-950/40"> THAT WORKS.</span><br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                  PASSION
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 opacity-60">
                  {' '}THAT LASTS.
                </span>
              </h2>
              <div className="flex items-center gap-4 text-indigo-800/60 font-black tracking-widest uppercase text-xs md:text-sm lg:pb-3">
                 <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
                 深度圈内功能解析
              </div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              <GlassCard className="p-6 md:p-8 flex flex-col border-t-8 border-t-orange-500 bg-white hover:-translate-y-2 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.06)] h-full">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6 md:mb-8 shadow-inner border border-orange-100 shrink-0">
                    <MessageSquare size={24} className="md:w-7 md:h-7" strokeWidth={2.5} />
                 </div>
                 <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2 block">Feature 01</span>
                 <h3 className="text-xl md:text-2xl font-black text-indigo-950 mb-3 md:mb-4">高质量同频共振</h3>
                 <p className="text-indigo-900/60 font-bold leading-relaxed text-xs md:text-sm flex-1">
                    设立严格的认知考核门槛。无论是考据历代汉服形制，还是切磋极具张力的同人画作，这里彻底隔绝引战与杂音，只为纯粹的热爱服务。
                 </p>
              </GlassCard>
              
              <GlassCard className="p-6 md:p-8 flex flex-col border-t-8 border-t-rose-500 bg-white hover:-translate-y-2 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.06)] h-full">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 md:mb-8 shadow-inner border border-rose-100 shrink-0">
                    <Calendar size={24} className="md:w-7 md:h-7" strokeWidth={2.5} />
                 </div>
                 <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 block">Feature 02</span>
                 <h3 className="text-xl md:text-2xl font-black text-indigo-950 mb-3 md:mb-4">官方组织跨次元雅集</h3>
                 <p className="text-indigo-900/60 font-bold leading-relaxed text-xs md:text-sm flex-1">
                    我们不满足于停留在屏幕另一端。从热血的线下同人面基，到春日时节的古风摄影交流，官方为您搭建跨越次元的真实相聚桥梁。
                 </p>
              </GlassCard>

              <GlassCard className="p-6 md:p-8 flex flex-col border-t-8 border-t-emerald-500 bg-white hover:-translate-y-2 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.06)] h-full">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 md:mb-8 shadow-inner border border-emerald-100 shrink-0">
                    <Camera size={24} className="md:w-7 md:h-7" strokeWidth={2.5} />
                 </div>
                 <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 block">Feature 03</span>
                 <h3 className="text-xl md:text-2xl font-black text-indigo-950 mb-3 md:mb-4">沉浸式美学探索</h3>
                 <p className="text-indigo-900/60 font-bold leading-relaxed text-xs md:text-sm flex-1">
                    从胶片暗房里纯粹的物理显影，到硬核独立游戏中的关卡机制解构。拒绝快餐式的碎片消费，在这里重拾专注与长篇深度创作。
                 </p>
              </GlassCard>

              <GlassCard className="p-6 md:p-8 flex flex-col border-t-8 border-t-blue-500 bg-white hover:-translate-y-2 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.06)] h-full">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 md:mb-8 shadow-inner border border-blue-100 shrink-0">
                    <Train size={24} className="md:w-7 md:h-7" strokeWidth={2.5} />
                 </div>
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 block">Feature 04</span>
                 <h3 className="text-xl md:text-2xl font-black text-indigo-950 mb-3 md:mb-4">极客级硬核记录</h3>
                 <p className="text-indigo-900/60 font-bold leading-relaxed text-xs md:text-sm flex-1">
                    丈量城市交通脉络的列车运转路书，亦或是精确到秒的手冲咖啡萃取曲线。无论领域多小众，都有极客级同好与你进行参数级研讨。
                 </p>
              </GlassCard>
           </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
        {[
          { label: '兴趣圈子', value: '128+', icon: Compass },
          { label: '活跃成员', value: '8,420+', icon: User },
          { label: '讨论帖子', value: '26,890+', icon: MessageCircle },
          { label: '精彩活动', value: '340+', icon: Zap },
        ].map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <GlassCard key={idx} className="p-6 md:p-8 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out" style={{ animationDelay: `${idx * 120}ms` }}>
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-gradient-to-br from-[#EAE1FF] to-indigo-50 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-1000 ease-out"></div>
              <div className="relative z-10 flex items-center gap-3 mb-3 text-left text-indigo-950">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm text-[#a78bfa] flex items-center justify-center shrink-0">
                  <IconComponent size={20} strokeWidth={3} />
                </div>
                <p className="text-xs text-indigo-800/50 font-black tracking-widest uppercase">{stat.label}</p>
              </div>
              <p className="relative z-10 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] to-[#818cf8] tracking-tighter truncate text-left">
                {stat.value}
              </p>
            </GlassCard>
          );
        })}
      </section>

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
        
        <div className="relative w-full h-[500px] md:h-[650px] bg-indigo-950 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex items-center justify-center text-center">
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-indigo-950 to-[#0c0a20] pointer-events-none"></div>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {MATRIX_IMAGES.map((img, index) => (
              <div 
                key={index} 
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
                  <img src={img.src} className={`w-full h-full object-cover border-[3px] border-white/10 group-hover:border-white/30 transition-all duration-500`} alt="" />
                  
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

      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-10 shadow-xl border border-white/50 group">
         
         <div 
           className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
           style={{ transform: `translateX(-${currentHeroIdx * 100}%)` }}
         >
           {HERO_ACTIVITIES.map((hero) => (
             <div key={hero.id} className="relative w-full h-full shrink-0 cursor-pointer" onClick={() => setActiveActivity(hero)}>
               <img src={hero.cover} className="w-full h-full object-cover" alt={hero.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left text-white">
                  <div className="max-w-lg text-left">
                     <div className="flex items-center gap-2 mb-3">
                       <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase border border-white/30">Top Event</span>
                       <span className="text-xs font-bold text-white/90">{hero.circle}</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">{hero.title}</h2>
                     <p className="text-sm md:text-base text-white/80 font-medium">{hero.desc}</p>
                  </div>
                  <button
                     onClick={(e) => { e.stopPropagation(); handleRegisterEvent(hero.id, e); }}
                     className="bg-white text-indigo-950 px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
                  >
                     {registeredEvents.includes(hero.id) ? '已报名' : '立即报名'}
                  </button>
               </div>
             </div>
           ))}
         </div>
         
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

      <div className="relative w-full overflow-hidden mb-8 animate-in fade-in slide-in-from-bottom-8">
        <h2 className="text-2xl font-black text-indigo-950 mb-5 flex items-center gap-2 px-1 text-left">
           <Ticket className="text-[#a78bfa]" /> 近期活动
        </h2>
        <div className="flex w-max gap-4 md:gap-5 animate-scroll-x hover:[animation-play-state:paused] py-2">
           {[...ACTIVITIES, ...ACTIVITIES].map((activity, idx) => {
             const isRegistered = registeredEvents.includes(activity.id);
             return (
               <div key={`${activity.id}-${idx}`} className="min-w-[260px] md:min-w-[320px] w-[260px] md:w-[320px] shrink-0 flex flex-col group cursor-pointer snap-start" onClick={() => setActiveActivity(activity)}>
                 <div className="w-full aspect-video rounded-2xl overflow-hidden mb-3 shadow-md border border-black/5 relative bg-indigo-50">
                   <img src={activity.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={activity.title} />
                 </div>
                 <div className="px-1 flex items-start justify-between gap-3 text-left">
                   <div className="flex-1 min-w-0 flex flex-col pt-1 text-left">
                     <h3 className="font-black text-indigo-950 text-base leading-tight truncate">{activity.title}</h3>
                     <p className="text-xs text-indigo-800/60 font-semibold mt-1 truncate">{activity.circle} · {activity.date}</p>
                   </div>
                   <button
                      onClick={(e) => { e.stopPropagation(); handleRegisterEvent(activity.id, e); }}
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

      <div className="space-y-8 text-left mt-8 border-t border-white/60 pt-10 animate-in fade-in slide-in-from-bottom-8">
        <div className="flex items-center justify-between mb-4">
           <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
             <MessageCircle className="text-[#a78bfa]" size={24}/> 大众讨论区
           </h2>
           <span className="text-xs font-bold text-indigo-800/50 hidden sm:block">与同频者畅所欲言</span>
        </div>

        <div className="flex flex-wrap gap-4">
           {PUBLIC_TOPICS.map(topic => (
              <GlassCard key={topic.id} className="flex-1 min-w-[140px] p-5 flex flex-col relative group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
                 <div className={`text-[11px] font-black ${topic.color} mb-3 flex items-center justify-between`}>
                    {topic.count}
                    <div className={`w-5 h-5 rounded-full ${topic.bg} flex items-center justify-center`}>
                      <ArrowRight size={10} className="text-current" />
                    </div>
                 </div>
                 <span className="font-black text-indigo-950 text-lg">{topic.title}</span>
              </GlassCard>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {TOP_DISCUSSIONS.map(top => (
              <GlassCard key={top.id} className="p-6 flex flex-col justify-between cursor-pointer group hover:shadow-xl transition-all min-h-[190px]">
                 <div>
                    <span className={`text-2xl font-black ${top.rankColor} mb-3 block`}>{top.rank}</span>
                    <h3 className="font-black text-indigo-950 text-[15px] leading-snug group-hover:text-[#a78bfa] transition-colors">{top.title}</h3>
                 </div>
                 <div className="flex items-center justify-between text-xs text-indigo-800/50 font-bold mt-4">
                    <div className="flex items-center gap-3">
                       <span className="flex items-center gap-1"><MessageCircle size={14}/> {top.views}</span>
                       <span className="flex items-center gap-1"><Heart size={14}/> {top.likes}</span>
                    </div>
                    <ArrowRight size={16} className="text-indigo-300 group-hover:translate-x-1 transition-transform"/>
                 </div>
              </GlassCard>
           ))}
           
           <GlassCard className="p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[190px] cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EAE1FF] to-white/50 opacity-80"></div>
              <h3 className="text-3xl font-black text-indigo-950 z-10 drop-shadow-sm tracking-widest group-hover:scale-105 transition-transform flex items-center gap-2">
                畅所欲言 <MessageSquare className="text-[#a78bfa]" size={24} />
              </h3>
              <p className="text-indigo-800/60 font-bold mt-3 z-10 text-sm">分享你的独特见解</p>
              
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#c084fc] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-8 -left-8 w-28 h-28 bg-[#38bdf8] rounded-full opacity-20 blur-2xl"></div>
           </GlassCard>
        </div>

        <div className="mt-8 relative bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-sm">
           <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center relative shadow-sm border border-amber-200 shrink-0">
                    <span className="text-amber-500 font-black text-2xl">?</span>
                    <span className="absolute -top-1 -right-2 text-amber-400 text-sm font-black rotate-[15deg]">??</span>
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
                       Why ? 
                    </h2>
                    <p className="text-[11px] md:text-xs text-indigo-800/60 font-bold mt-0.5">好多同频者有疑问，快去帮他们一下吧</p>
                 </div>
              </div>
              <button onClick={() => setShowAllPosts(true)} className="text-xs font-black text-indigo-500 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1 shrink-0">
                 查看全部 <ArrowRight size={12}/>
              </button>
           </div>

           <div className="space-y-2 relative z-10">
              {PUBLIC_QUESTIONS.map(q => (
                 <div key={q.id} className="flex items-center gap-3 p-4 hover:bg-white/80 rounded-2xl cursor-pointer transition-colors group border border-transparent hover:border-white shadow-sm hover:shadow-md">
                    <div className="w-6 h-6 rounded-full bg-[#a78bfa]/20 text-[#a78bfa] flex items-center justify-center font-black text-[10px] shrink-0">?</div>
                    <p className="flex-1 min-w-0 text-sm font-bold text-indigo-950 truncate group-hover:text-[#a78bfa] transition-colors">{q.text}</p>
                    <div className="flex items-center gap-3 shrink-0">
                       <div className="flex items-center gap-2">
                         <img src={q.avatar} className="w-6 h-6 rounded-full object-cover border border-white shadow-sm" alt={q.author} />
                         <span className="text-[11px] font-black text-indigo-800/60 hidden sm:block max-w-[80px] truncate">{q.author}</span>
                       </div>
                       <ArrowRight size={14} className="text-indigo-200 group-hover:translate-x-1 transition-transform"/>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  const renderCircles = () => (
    <div className="pt-6 md:pt-10 max-w-5xl mx-auto animate-in fade-in pb-24 hide-scrollbar">
      <div className="flex items-start justify-start md:justify-center overflow-x-auto gap-6 md:gap-10 lg:gap-16 px-6 py-8 mb-4 hide-scrollbar text-center">
        {CATEGORIES.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <div key={idx} className="flex flex-col items-center gap-4 cursor-pointer group min-w-[4rem] animate-in zoom-in duration-700" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/70 backdrop-blur-md shadow-sm border border-white flex items-center justify-center text-indigo-900 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#b7a8ff] group-hover:to-[#c084fc] group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                <IconComponent size={28} />
              </div>
              <span className="text-[11px] font-black text-indigo-950/80 whitespace-nowrap tracking-wide">{cat.label}</span>
            </div>
          )
        })}
      </div>
      
      <div className="px-6 text-center mt-8 mb-24 relative flex flex-col items-center">
        <style>{`@keyframes hugeShrink { 0% { transform: scale(3.5); opacity: 0; filter: blur(12px); } 40% { opacity: 1; filter: blur(0px); } 100% { transform: scale(1); opacity: 1; filter: blur(0px); } } .animate-huge-shrink { animation: hugeShrink 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }`}</style>
        <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#a78bfa] uppercase mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">Find Your Spiritual Sanctuary</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-indigo-950 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">遇见，你的</h2>
        <div className="mt-[-0.5rem] md:mt-[-1.5rem] relative z-20">
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black text-white tracking-tighter drop-shadow-xl animate-huge-shrink leading-none text-center">精神领地<span className="text-indigo-200">.</span></h1>
        </div>
        <p className="text-sm md:text-base font-bold text-indigo-800/70 leading-relaxed max-w-xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 text-center">这里只有最纯粹的文化和沉浸体验 —— 仅限同频者入内。</p>
      </div>

      <div className="px-6 space-y-8 text-left">
        <h2 className="text-2xl font-black text-indigo-950 text-left">正在开放的圈层</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {CIRCLES.map(circle => {
            const isJoined = joinedCircles.includes(circle.id);
            return (
              <GlassCard key={circle.id} onClick={() => setActiveCircle(circle)} className="p-6 flex items-center gap-6 group border-0 shadow-xl hover:bg-white transition-all text-left">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 relative">
                  <img src={circle.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={circle.name} />
                  {isJoined && (
                    <div className="absolute inset-0 bg-[#a78bfa]/20 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white/90 p-2 rounded-full text-[#a78bfa] shadow-lg scale-110"><Unlock size={16} strokeWidth={4} /></div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2 text-left">
                  <h3 className="text-xl font-black text-indigo-950 truncate">{circle.name}</h3>
                  <p className="text-xs text-indigo-800/60 font-bold line-clamp-2 leading-relaxed">{circle.desc}</p>
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
              
              {/* 👇 点击触发私聊弹窗 */}
              {msg.type === 'interaction' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveChatUser(msg.title); }}
                  className="text-[11px] font-black text-white bg-[#a78bfa] px-4 py-1.5 rounded-full self-start mt-3 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center gap-1"
                >
                  <MessageSquare size={12} strokeWidth={3} /> 私聊回复
                </button>
              )}
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );

  // 👇 3. 新增：渲染私聊对话框组件
  const renderChatWindow = () => {
    if (!activeChatUser) return null;

    return (
      <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-indigo-950/20 backdrop-blur-sm animate-in fade-in duration-200 md:pl-64">
        <div className="bg-white/95 backdrop-blur-2xl w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[70vh] animate-in zoom-in-95 relative border border-white">
          
          {/* 聊天框头部 */}
          <div className="px-6 py-4 border-b border-indigo-50 flex justify-between items-center bg-white/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#a78bfa] shadow-inner">
                <User size={20} strokeWidth={2.5}/>
              </div>
              <div>
                <h3 className="font-black text-indigo-950">{activeChatUser}</h3>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>在线
                </span>
              </div>
            </div>
            <button onClick={() => setActiveChatUser(null)} className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
              <X size={16} strokeWidth={3} />
            </button>
          </div>

          {/* 聊天记录展示区 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#F8F7FF]/50 hide-scrollbar">
            {chatHistory.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${msg.sender === 'me' ? 'bg-gradient-to-br from-[#b7a8ff] to-[#c084fc] text-white rounded-tr-sm' : 'bg-white border border-indigo-50 text-indigo-950 rounded-tl-sm'}`}>
                  <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                  <span className={`text-[9px] font-black uppercase tracking-widest mt-2 block ${msg.sender === 'me' ? 'text-white/70 text-right' : 'text-indigo-300'}`}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 聊天输入区域 */}
          <div className="p-4 bg-white border-t border-indigo-50">
            <form onSubmit={handleSendChatMessage} className="flex gap-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`发送消息给 ${activeChatUser}...`}
                className="flex-1 bg-[#F8F7FF] border border-indigo-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a78bfa] transition-colors font-bold text-indigo-950 placeholder:text-indigo-300"
                autoFocus
              />
              <button type="submit" className="bg-[#1e1b4b] text-white px-5 rounded-xl flex items-center justify-center hover:bg-[#a78bfa] transition-colors shadow-sm active:scale-95">
                <Send size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    if (currentTab === 'profile_events') {
      const userEvents = [...HERO_ACTIVITIES, ...ACTIVITIES].filter(a => registeredEvents.includes(a.id));
      return (
        <div className="pt-6 md:pt-10 px-4 sm:px-6 pb-24 max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 hide-scrollbar">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setCurrentTab('profile')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1e1b4b] hover:bg-gray-50 transition-all"><ArrowLeft size={20} strokeWidth={3} /></button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#1e1b4b]">已报名活动</h1>
          </div>
          <div className="space-y-4">
            {userEvents.length > 0 ? userEvents.map(act => (
              <div key={act.id} className="bg-white p-4 rounded-2xl flex gap-4 items-center shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveActivity(act)}>
                <img src={act.cover} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-sm" alt={act.title}/>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-[#1e1b4b] truncate text-base sm:text-lg">{act.title}</h3>
                  <p className="text-xs font-bold text-[#a78bfa] mt-1">{act.circle}</p>
                  <p className="text-xs font-bold text-gray-400 mt-2 flex items-center gap-1.5"><Clock size={12}/> {act.date}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 text-gray-400 font-bold">还没有报名任何活动哦~</div>
            )}
          </div>
        </div>
      );
    }

    if (currentTab === 'profile_posts') {
      const userPosts = Object.values(customPosts || {}).flat();
      return (
        <div className="pt-6 md:pt-10 px-4 sm:px-6 pb-24 max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 hide-scrollbar">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setCurrentTab('profile')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1e1b4b] hover:bg-gray-50 transition-all"><ArrowLeft size={20} strokeWidth={3} /></button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#1e1b4b]">已发布帖子</h1>
          </div>
          <div className="space-y-4">
            {userPosts.length > 0 ? userPosts.map(post => (
              <div key={post.id} className="bg-white p-5 rounded-2xl flex flex-col gap-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-gray-50" onClick={() => setActivePost(post)}>
                <h3 className="font-black text-[#1e1b4b] text-[15px] leading-snug">{post.title}</h3>
                <div className="flex items-center gap-4 text-xs font-bold mt-2">
                  <span className="flex items-center gap-1.5 text-gray-500"><MessageCircle size={14}/> {post.comments || 0}</span>
                  <span className="flex items-center gap-1.5 text-rose-500"><Heart size={14}/> {post.likes || 0}</span>
                  <span className="flex items-center gap-1 ml-auto text-gray-400"><Clock size={12}/> 刚刚发布</span>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 text-gray-400 font-bold">还没有发布任何帖子哦，快去圈子讨论吧~</div>
            )}
          </div>
        </div>
      );
    }

    // 👇 新增：我的评论列表视图
    if (currentTab === 'profile_comments') {
      const allPostsMap = {};
      CIRCLES.forEach(c => {
         c.privatePosts.forEach(p => allPostsMap[p.id] = p);
      });
      PUBLIC_ARTICLES.forEach(p => allPostsMap[p.id] = p);
      Object.values(customPosts).flat().forEach(p => allPostsMap[p.id] = p);

      const userComments = Object.entries(postComments).flatMap(([postId, comments]) => {
         const post = allPostsMap[postId];
         return comments.filter(c => c.author === USER_INFO.name).map(c => ({
            ...c,
            postTitle: post ? post.title : '未知帖子',
            post
         }));
      }).reverse(); // 最新的在前面

      return (
        <div className="pt-6 md:pt-10 px-4 sm:px-6 pb-24 max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 hide-scrollbar">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setCurrentTab('profile')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1e1b4b] hover:bg-gray-50 transition-all"><ArrowLeft size={20} strokeWidth={3} /></button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#1e1b4b]">我的精彩评论</h1>
          </div>
          <div className="space-y-6">
            {userComments.length > 0 ? userComments.map(comment => (
              <div key={comment.id} className="bg-white p-6 rounded-[24px] flex flex-col gap-4 shadow-sm border border-indigo-50">
                <p className="font-serif text-[#1e1b4b] text-base leading-relaxed break-words border-l-4 border-[#a78bfa] pl-4 italic">
                  "{comment.text}"
                </p>
                <div 
                  className="bg-[#F8F7FF] p-3 rounded-xl flex items-center justify-between cursor-pointer hover:bg-indigo-50 transition-colors"
                  onClick={() => { if(comment.post) setActivePost(comment.post); }}
                >
                   <div className="flex-1 min-w-0 pr-4">
                     <span className="text-[10px] uppercase tracking-widest font-black text-indigo-400 block mb-1">评论于帖子</span>
                     <h4 className="font-black text-sm text-indigo-950 truncate">{comment.postTitle}</h4>
                   </div>
                   <ArrowRight size={16} className="text-indigo-300 shrink-0"/>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 text-gray-400 font-bold">还没有发表过任何评论哦，快去参与讨论吧~</div>
            )}
          </div>
        </div>
      );
    }

    const userPostsCount = Object.values(customPosts || {}).flat().length;
    // 获取用户评论总数
    const userCommentsCount = Object.values(postComments).flat().filter(c => c.author === USER_INFO.name).length;

    return (
      <div className="pt-6 md:pt-10 px-4 sm:px-6 pb-24 max-w-4xl mx-auto animate-in fade-in space-y-6 hide-scrollbar">
        <h1 className="text-[2.2rem] font-black tracking-tighter text-[#1e1b4b] mb-4 pl-1">我的</h1>
        
        <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm flex items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] shrink-0">
            <img src={USER_INFO.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="flex flex-col gap-1.5 justify-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] tracking-tight">{USER_INFO.name}</h2>
            <p className="text-[11px] sm:text-xs font-bold text-indigo-300 tracking-widest">ID: {USER_INFO.id}</p>
            <div className="mt-1">
              <span className="bg-[#a78bfa] text-white px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm inline-block">
                PRO VERIFIED
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
           <div onClick={() => setCurrentTab('profile_events')} className="bg-white rounded-[24px] p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition-all shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#a78bfa]"><Ticket size={20} strokeWidth={2.5}/></div>
                 <span className="font-black text-[#1e1b4b] text-base sm:text-lg">我的活动报名单 <span className="text-indigo-400 ml-1 font-bold text-sm">({registeredEvents.length})</span></span>
              </div>
              <ChevronRight className="text-gray-300" size={24} strokeWidth={3} />
           </div>
           
           <div onClick={() => setCurrentTab('profile_posts')} className="bg-white rounded-[24px] p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition-all shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#a78bfa]"><MessageSquare size={20} strokeWidth={2.5}/></div>
                 <span className="font-black text-[#1e1b4b] text-base sm:text-lg">我的发布帖 <span className="text-indigo-400 ml-1 font-bold text-sm">({userPostsCount})</span></span>
              </div>
              <ChevronRight className="text-gray-300" size={24} strokeWidth={3} />
           </div>

           {/* 👇 新增：我的精彩评论入口 👇 */}
           <div onClick={() => setCurrentTab('profile_comments')} className="bg-white rounded-[24px] p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition-all shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#a78bfa]"><MessageCircle size={20} strokeWidth={2.5}/></div>
                 <span className="font-black text-[#1e1b4b] text-base sm:text-lg">我的精彩评论 <span className="text-indigo-400 ml-1 font-bold text-sm">({userCommentsCount})</span></span>
              </div>
              <ChevronRight className="text-gray-300" size={24} strokeWidth={3} />
           </div>

           <button onClick={() => { setIsAuth(false); setCurrentTab('home'); setActiveCircle(null); setActiveActivity(null); setShowAllPosts(false); setShowCircleAllPosts(false); setActivePost(null); }} className="w-full bg-white rounded-[24px] py-6 flex items-center justify-center text-[#e11d48] font-black hover:bg-rose-50 transition-colors shadow-sm text-base sm:text-lg mt-4">
             退出登录
           </button>
        </div>
      </div>
    );
  };

  const renderCircleDetail = () => {
    const isJoined = joinedCircles.includes(activeCircle.id);
    const ActiveIconComponent = activeCircle.icon || Sparkles;
    return (
      <div className="fixed inset-0 bg-[#F8F7FF] text-indigo-950 z-[100] animate-in slide-in-from-right-full duration-500 flex flex-col md:left-64 text-center overflow-hidden">
        <div className="absolute top-8 left-6 right-6 flex justify-between z-[60] max-w-5xl mx-auto">
          <button onClick={() => setActiveCircle(null)} className="w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-sm border border-indigo-100 hover:bg-white transition-all text-indigo-900"><ArrowLeft size={24} strokeWidth={3} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pt-24 pb-32 max-w-4xl mx-auto w-full hide-scrollbar">
           {!isJoined ? (
             <div className="text-center space-y-8 animate-in fade-in mt-12 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl rotate-3 text-indigo-900"><Lock size={40} className="text-[#a78bfa]" strokeWidth={3} /></div>
                <h1 className="text-4xl font-black">{activeCircle.name}</h1>
                <p className="text-indigo-800/60 font-bold max-w-xs mx-auto">完成认知验证以加入此圈层。</p>
                <button onClick={() => handleOpenQuiz(activeCircle)} className="w-full max-w-xs bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white font-black py-5 rounded-3xl shadow-xl hover:scale-105 transition-transform">开始验证</button>
             </div>
           ) : (
             <div className="pb-10">
                <style>{`@keyframes sfUp { 0% { opacity: 0; transform: translateY(30px); filter: blur(4px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0px); } } .ani-up { animation: sfUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }`}</style>
                
                <div className="relative w-full pt-10 pb-4 flex flex-col items-center text-center bg-gradient-to-b from-[#EAE1FF]/80 via-[#F8F7FF] to-[#F8F7FF] -mx-6 px-6 md:-mx-12 md:px-12" style={{ width: 'calc(100% + 3rem)' }}>
                  
                  <div className="absolute top-4 left-[5%] text-[#c084fc]/15 rotate-[-15deg] pointer-events-none">
                    <Rocket size={160} strokeWidth={1} />
                  </div>
                  <div className="absolute top-28 right-[2%] text-[#a78bfa]/15 rotate-[25deg] pointer-events-none hidden md:block">
                    <TreePine size={200} strokeWidth={1} />
                  </div>
                  <div className="absolute bottom-32 left-[12%] text-[#818cf8]/15 rotate-[45deg] pointer-events-none">
                    <DollarSign size={140} strokeWidth={1} />
                  </div>
                  <div className="absolute top-20 right-[10%] text-[#a78bfa]/15 rotate-[-10deg] pointer-events-none md:hidden">
                    <Mail size={120} strokeWidth={1} />
                  </div>

                  <h1 className="relative z-10 text-[2.5rem] sm:text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] font-serif font-black tracking-tight text-[#1e1b4b] leading-[1.2] max-w-4xl mx-auto px-2 ani-up" style={{ animationDelay: '100ms' }}>
                    {(activeCircle.heroTitle || activeCircle.name).split('\n').map((line, index) => (
                      <span key={index} className="block">{line}</span>
                    ))}
                 </h1>

                  <p className="relative z-10 text-[15px] md:text-[17px] font-bold text-indigo-900/60 max-w-2xl mx-auto mt-8 leading-relaxed px-4 ani-up" style={{ animationDelay: '250ms' }}>
                    {activeCircle.desc}
                  </p>

                  <div className="relative z-10 mt-12 flex w-full max-w-md mx-auto px-4 ani-up" style={{ animationDelay: '400ms' }}>
                    <input 
                      type="text" 
                      placeholder="Your email address or search..." 
                      className="flex-1 bg-white border border-indigo-100 rounded-l-lg pl-6 pr-4 py-3 md:py-4 text-sm font-bold text-indigo-950 focus:outline-none focus:border-[#a78bfa] shadow-sm placeholder:text-indigo-300"
                    />
                    <button className="bg-[#1e1b4b] text-white px-5 py-3 md:py-4 rounded-r-lg hover:bg-[#a78bfa] transition-colors shadow-sm flex items-center justify-center">
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <div className="relative w-full max-w-5xl mx-auto mt-20 mb-8 ani-up" style={{ animationDelay: '500ms' }}>
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-indigo-950/20 -translate-y-1/2 z-0"></div>
                    <div className="flex justify-between items-center relative z-10 text-[10px] md:text-[11px] font-bold text-indigo-900/60 uppercase tracking-widest px-2">
                      <span className="bg-[#F8F7FF] pr-4">{activeCircle.founder || '17 February 2026'}</span>
                      <span className="bg-[#F8F7FF] pl-4">{activeCircle.members} Members</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className={`w-20 h-28 md:w-24 md:h-32 rounded-[3rem] bg-gradient-to-br ${activeCircle.iconTheme || 'from-[#b7a8ff] to-[#c084fc]'} shadow-xl flex items-center justify-center border-[6px] border-[#F8F7FF] relative overflow-hidden`}>
                         <div className="absolute inset-0 bg-white/20"></div>
                         <ActiveIconComponent size={36} strokeWidth={2} className="text-white relative z-10 drop-shadow-md" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 pb-12 px-2 md:px-0 max-w-5xl mx-auto w-full text-left ani-up" style={{ animationDelay: '700ms' }}>
                   <div className="flex justify-between items-end mb-8 border-b border-indigo-900/10 pb-4">
                      <h2 className="text-4xl md:text-5xl font-serif font-black text-[#1e1b4b]">Latest</h2>
                      <button onClick={() => setShowCircleAllPosts(true)} className="bg-[#1e1b4b] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#a78bfa] transition-colors shadow-sm tracking-wide">Browse All</button>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                      <div className="lg:col-span-7 group cursor-pointer" onClick={() => {
                        const topPost = customPosts[activeCircle.id]?.[0] || activeCircle.privatePosts?.[0];
                        if (topPost) setActivePost(topPost);
                      }}>
                         <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-[1rem] overflow-hidden mb-6 shadow-sm border border-indigo-50 relative bg-indigo-50">
                            <img src={customPosts[activeCircle.id]?.[0]?.image || activeCircle.privatePosts?.[0]?.image || activeCircle.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Featured" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-950 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                               🔥 热议榜首
                            </div>
                         </div>
                         <h3 className="text-2xl md:text-[2rem] font-serif font-black text-[#1e1b4b] mb-4 group-hover:text-[#a78bfa] transition-colors leading-snug line-clamp-2">
                            {customPosts[activeCircle.id]?.[0]?.title || activeCircle.privatePosts?.[0]?.title || '欢迎来到本圈子，快来发布第一篇讨论吧！'}
                         </h3>
                         <div className="flex items-center gap-3 text-xs font-bold text-indigo-900/60">
                            <img src={USER_INFO.avatar} className="w-6 h-6 rounded-full object-cover shadow-sm" alt="author" />
                            <span className="text-[#1e1b4b]">{customPosts[activeCircle.id]?.[0]?.author || activeCircle.privatePosts?.[0]?.author || '官方系统'}</span>
                            <span className="text-indigo-200">•</span>
                            <span>刚刚更新</span>
                         </div>
                      </div>

                      <div className="lg:col-span-5 flex flex-col justify-start gap-6">
                         {[1, 2, 3].map((idx) => {
                            const posts = activeCircle.privatePosts || [];
                            const post = posts[idx % posts.length]; 
                            if(!post) return null;

                            return (
                              <div key={`latest-${idx}`} className="flex gap-5 group cursor-pointer hover:bg-white/60 p-3 rounded-2xl transition-colors -mx-3" onClick={() => setActivePost(post)}>
                                 <div className="w-28 h-20 md:w-36 md:h-24 rounded-xl overflow-hidden shadow-sm shrink-0 bg-indigo-50">
                                    <img src={post.image || activeCircle.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Thumb" onError={(e) => { e.target.src = activeCircle.cover; }} />
                                 </div>
                                 <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <h4 className="text-[15px] md:text-[17px] font-serif font-black text-[#1e1b4b] mb-3 line-clamp-2 group-hover:text-[#a78bfa] transition-colors leading-snug">
                                      {post.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900/60">
                                      <img src={USER_INFO.avatar} className="w-5 h-5 rounded-full object-cover shadow-sm" alt="author" />
                                      <span className="truncate text-[#1e1b4b]">{post.author}</span>
                                    </div>
                                 </div>
                              </div>
                            )
                         })}
                      </div>
                   </div>
                </div>

                <div className="fixed bottom-10 right-10 flex items-center z-50 animate-in slide-in-from-bottom-8 duration-700" style={{animationDelay: '800ms'}}>
                   <button onClick={() => setShowPostModal(true)} className="bg-[#1e1b4b] text-white text-sm font-black px-6 py-4 rounded-full shadow-2xl hover:scale-105 hover:bg-[#a78bfa] transition-all flex items-center gap-2">
                      <Plus size={18} strokeWidth={3} /> 发帖
                   </button>
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
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-indigo-950/40 backdrop-blur-xl animate-in fade-in duration-300 md:pl-64 flex flex-col items-center text-center">
        <GlassCard className="w-full max-w-sm p-10 shadow-2xl relative bg-white/95 border-0">
          <button onClick={() => setShowQuiz(false)} className="absolute top-6 right-6 w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-400"><X size={20} /></button>
          <div className="mb-10 text-center"><span className="bg-indigo-50 text-[#a78bfa] text-[10px] font-black px-4 py-1.5 rounded-full uppercase border">验证申请 {quizStep + 1} / {activeCircle.quiz.length}</span><h3 className="font-black text-3xl mt-6 text-indigo-950 text-center">身份认同</h3></div>
          <h4 className="font-bold text-xl mb-10 text-indigo-900/80 text-left">{q.question}</h4>
          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button key={idx} onClick={() => { 
                if (idx === q.answer) { 
                  if (quizStep < activeCircle.quiz.length - 1) {
                    setQuizStep(prev => prev + 1); 
                  } else {
                    handleJoinCircle(activeCircle.id); 
                  }
                } else {
                  // 👇 答错处理：锁定该圈子 30 分钟，重置题目进度并关闭弹窗
                  setQuizLockouts(prev => ({ ...prev, [activeCircle.id]: Date.now() + 30 * 60 * 1000 }));
                  setQuizStep(0);
                  setShowQuiz(false);
                  showToast('认知不匹配，请 30 分钟后再试~');
                }
              }} className="w-full text-left px-6 py-5 rounded-2xl bg-indigo-50/50 hover:bg-gradient-to-r hover:from-[#b7a8ff] hover:to-[#c084fc] hover:text-white font-black transition-all">{opt}</button>
            ))}
          </div>
        </GlassCard>
      </div>
    );
  };

  const renderPostModal = () => {
    if (!showPostModal) return null;
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-indigo-950/20 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl mx-auto animate-in zoom-in-95 duration-300 mt-10">
          
          <button onClick={() => setShowPostModal(false)} className="absolute -top-12 right-0 md:-right-8 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-indigo-900 hover:bg-white hover:text-rose-500 transition-colors z-50 shadow-md">
            <X size={16} strokeWidth={3} />
          </button>

          <div className="absolute -top-12 right-8 flex items-end z-10 pointer-events-none">
            <div className="w-12 h-14 bg-amber-200/90 backdrop-blur-md border-4 border-white/60 rounded-t-full relative translate-y-3 rotate-[-8deg] z-10 shadow-sm">
              <div className="flex gap-1 absolute top-4 left-1/2 -translate-x-1/2"><div className="w-1 h-2 bg-indigo-900/40 rounded-full"></div><div className="w-1 h-2 bg-indigo-900/40 rounded-full"></div></div>
            </div>
            <div className="w-16 h-16 bg-[#EAE1FF]/90 backdrop-blur-md border-4 border-white/60 rounded-t-full relative z-20 -ml-2 shadow-sm">
              <div className="flex gap-1.5 absolute top-5 left-1/2 -translate-x-1/2"><div className="w-1.5 h-2.5 bg-indigo-900/40 rounded-full"></div><div className="w-1.5 h-2.5 bg-indigo-900/40 rounded-full"></div></div>
            </div>
            <div className="w-10 h-20 bg-gradient-to-b from-[#c084fc]/90 to-[#a78bfa]/90 backdrop-blur-md border-4 border-white/60 rounded-t-full relative translate-y-2 rotate-[6deg] z-10 -ml-2 shadow-sm">
              <div className="flex gap-1 absolute top-5 left-1/2 -translate-x-1/2"><div className="w-1 h-2 bg-white/60 rounded-full"></div><div className="w-1 h-2 bg-white/60 rounded-full"></div></div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl rounded-[20px] shadow-[0_20px_60px_rgba(167,139,250,0.2)] relative z-30 flex flex-col border border-white overflow-hidden">
            <div className="bg-gradient-to-r from-[#EAE1FF]/80 to-white/40 px-6 py-4 flex items-center justify-between border-b border-white/60">
              <h3 className="text-xl font-black text-indigo-950 tracking-widest italic">沃来发帖</h3>
            </div>
            <div className="p-6 md:p-8 flex-1">
              <textarea 
                className="w-full h-32 md:h-40 bg-transparent resize-none focus:outline-none text-indigo-950 text-sm font-bold placeholder:text-indigo-300 placeholder:font-normal leading-relaxed"
                placeholder="若为提问，描述具体问题及需求，方便同学精准帮你解答"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
            <div className="bg-white/50 px-6 py-4 flex justify-end gap-3 border-t border-white/60">
              <button onClick={() => setShowPostModal(false)} className="px-6 py-2.5 rounded-xl bg-white text-indigo-900 text-sm font-black hover:bg-indigo-50 transition-colors shadow-sm">
                取消
              </button>
              <button onClick={() => {
                if (!postContent.trim()) return showToast('请输入内容后再发送哦~');
                
                const newPost = {
                  id: 'cp_' + Date.now(),
                  author: USER_INFO.name,
                  title: postContent,
                  views: '0',
                  likes: '0',
                  comments: '0',
                  image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60'
                };
                
                setCustomPosts(prev => ({
                  ...prev,
                  [activeCircle.id]: [newPost, ...(prev[activeCircle.id] || [])]
                }));

                setShowPostModal(false);
                setPostContent('');
                showToast('🎉 帖子发送成功！');
              }} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#b7a8ff] to-[#c084fc] text-white text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-md">
                一键发送
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActivityDetail = () => {
    if (!activeActivity) return null;
    const isRegistered = registeredEvents.includes(activeActivity.id);

    return (
      <div className="fixed inset-0 bg-[#Fdfbf7] text-[#111] z-[120] animate-in slide-in-from-right-full duration-500 flex flex-col md:left-64 overflow-y-auto hide-scrollbar selection:bg-rose-200">
        <style>
          {`
            .drop-cap::first-letter {
              float: left;
              font-size: 4rem;
              line-height: 0.8;
              padding-top: 4px;
              padding-right: 8px;
              padding-left: 2px;
              font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
              font-weight: 900;
              color: #e11d48;
            }
          `}
        </style>
        
        {/* 顶部导航栏：干净的边框切分 */}
        <div className="sticky top-0 bg-[#Fdfbf7]/90 backdrop-blur-md z-50 border-b border-[#111]/20 px-6 py-4 flex justify-between items-center">
           <button onClick={() => setActiveActivity(null)} className="flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:text-rose-600 transition-colors">
             <ArrowLeft size={16} strokeWidth={3} /> Back
           </button>
           <span className="font-serif font-black tracking-widest text-sm uppercase hidden md:block">The Editorial</span>
           <div className="w-16"></div>
        </div>

        <div className="max-w-5xl mx-auto w-full px-6 pt-10 pb-32">
           
           {/* 极致复刻：报纸风格头部 (THE EVENT) */}
           <div className="text-center border-b-4 border-[#111] pb-6 mb-4">
             <h1 className="text-[3.5rem] md:text-[6.5rem] font-serif font-black tracking-tighter leading-[0.85] uppercase">
               THE EVENT.
             </h1>
           </div>

           {/* 信息副条 (细线切分风格) */}
           <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#111] pb-3 mb-12 text-[10px] md:text-xs font-black uppercase tracking-widest">
             <span className="text-[#111]/60">Vol. 1 — {new Date().getFullYear()}</span>
             <span className="text-rose-600 flex items-center gap-1"><Zap size={12} className="fill-rose-600"/> {activeActivity.circle}</span>
             <span className="text-[#111]/60">{activeActivity.date}</span>
           </div>

           {/* 图2复刻：带十字架线条的区块标题 */}
           <div className="flex items-center gap-4 mb-8">
             <h2 className="font-serif font-black text-4xl md:text-5xl tracking-tight text-[#111]">Details</h2>
             <div className="flex-1 h-[2px] bg-[#111]"></div>
             <div className="w-8 h-8 bg-[#111] text-white flex items-center justify-center shrink-0">
                <Plus size={16} strokeWidth={3} />
             </div>
           </div>

           {/* 主图文网格排版 */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              
              {/* 左侧：主图与文章 (Editorial Reading) */}
              <div className="lg:col-span-8">
                 <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-snug">
                   {activeActivity.title}
                 </h3>
                 <p className="font-serif text-lg text-[#111]/70 mb-8 leading-relaxed">
                    {activeActivity.desc || "在这个充满不确定性的时代，寻找志同道合的灵魂变得尤为珍贵。本次活动将深入探讨圈层文化的核心价值，打破现实与虚拟的边界。我们诚邀每一位热爱生活、追求极致的同频者，共同参与这场极具启发性的深度交流。"}
                 </p>
                 
                 <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-gray-200 mb-8 border border-[#111]/10 overflow-hidden relative group">
                   <img src={activeActivity.cover} alt={activeActivity.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                   <div className="absolute bottom-0 left-0 bg-[#111] text-white text-[10px] font-black tracking-widest uppercase px-4 py-2">
                     Featured Image
                   </div>
                 </div>
                 
                 {/* 极具杂志特色的首字母放大 (Drop Cap) */}
                 <p className="font-serif text-base text-[#111]/80 leading-relaxed drop-cap mb-6 text-justify">
                    作为本季度的核心主打活动，我们将汇聚业内最顶尖的资源与视角。无论是初入圈子的萌新，还是资深的高级玩家，这场活动都将为你提供一个绝佳的展示与交流平台。准备好你的热情，带上你的好奇心，让我们在现场不见不散。
                 </p>
                 <p className="font-serif text-base text-[#111]/80 leading-relaxed text-justify">
                    活动现场还将提供独家定制的周边纪念品。在这里，每一个观点都将被认真倾听，每一次碰撞都可能激发出全新的灵感火花。我们期待你的加入，共同塑造属于我们这一代的独特文化记忆。
                 </p>
              </div>

              {/* 右侧：报名栏与关键信息 (Side Action Bar) */}
              <div className="lg:col-span-4 space-y-8">
                 
                 {/* 黑底红边的醒目报名区块 */}
                 <div className="bg-[#111] text-[#Fdfbf7] p-8 border-t-8 border-rose-600">
                   <h4 className="font-serif font-black text-2xl mb-4 italic">Action Required.</h4>
                   <p className="text-xs opacity-70 mb-8 font-bold leading-relaxed">Secure your spot for this exclusive gathering. Limited availability, reserve now.</p>
                   <button 
                     onClick={(e) => { e.stopPropagation(); handleRegisterEvent(activeActivity.id, e); }}
                     disabled={isRegistered}
                     className={`w-full py-4 font-black tracking-widest uppercase text-xs transition-all flex items-center justify-center gap-2 ${isRegistered ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700 hover:-translate-y-1'}`}
                   >
                     {isRegistered ? '已报名 (Registered)' : <>立即报名 (Register) <ArrowRight size={14} strokeWidth={3} /></>}
                   </button>
                 </div>

                 {/* 带小红块的列表信息 */}
                 <div>
                   <div className="flex items-center gap-3 border-b-2 border-[#111] pb-2 mb-4">
                     <span className="w-2.5 h-2.5 bg-rose-600 inline-block"></span>
                     <h4 className="font-black uppercase tracking-widest text-sm">Key Info</h4>
                   </div>
                   <ul className="space-y-4 text-sm font-bold">
                     <li className="flex flex-col border-b border-[#111]/10 pb-3">
                       <span className="text-[#111]/50 uppercase text-[10px] tracking-widest mb-1">Host Circle</span>
                       <span className="text-lg font-serif">{activeActivity.circle}</span>
                     </li>
                     <li className="flex flex-col border-b border-[#111]/10 pb-3">
                       <span className="text-[#111]/50 uppercase text-[10px] tracking-widest mb-1">Date & Time</span>
                       <span className="text-lg font-serif">{activeActivity.date}</span>
                     </li>
                     <li className="flex flex-col border-b border-[#111]/10 pb-3">
                       <span className="text-[#111]/50 uppercase text-[10px] tracking-widest mb-1">Location</span>
                       <span className="text-lg font-serif">福州大学至诚学院活动中心</span>
                     </li>
                   </ul>
                 </div>
                 
                 {/* 填补视觉的副宣传块 */}
                 <div className="bg-[#ea580c] p-8 text-white text-center flex flex-col items-center shadow-inner">
                    <span className="text-[10px] font-black tracking-widest uppercase mb-3 opacity-80">Official Partner</span>
                    <Compass size={32} strokeWidth={2} className="mb-3" />
                    <h5 className="font-serif font-black text-2xl leading-none">Culture<br/>That Works.</h5>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderAllPosts = () => {
    if (!showAllPosts) return null;

    const featured = PUBLIC_ARTICLES.slice(0, 4);
    const fashion = PUBLIC_ARTICLES.slice(4, 8);
    const latest = PUBLIC_ARTICLES.slice(8, 16);
    const deepDives = PUBLIC_ARTICLES.slice(16, 20);

    return (
      <div className="fixed inset-0 bg-[#Fdfbf7] text-[#111] z-[120] animate-in slide-in-from-bottom-8 duration-500 flex flex-col md:left-64 overflow-y-auto hide-scrollbar selection:bg-yellow-200">
        
        {/* 顶部导航栏 */}
        <div className="sticky top-0 bg-[#Fdfbf7]/90 backdrop-blur-md z-50 border-b border-[#111]/20 px-6 py-4 flex justify-between items-center">
           <button onClick={() => setShowAllPosts(false)} className="flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:text-[#ea580c] transition-colors">
             <ArrowLeft size={16} strokeWidth={3} /> Back
           </button>
           <span className="font-serif font-black tracking-widest text-sm uppercase hidden md:block">Daily Digest</span>
           <div className="w-16"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-6 pt-16 pb-32">
           
           {/* 图2复刻：顶部 Slogan 与搜索栏 */}
           <div className="text-center mb-16 max-w-2xl mx-auto">
             <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-serif font-black tracking-tight leading-[1.1] mb-8 text-[#111]">
               Get the <span className="relative inline-block px-1"><span className="relative z-10 text-[#111]">real signals</span><span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300 -skew-x-6 z-0"></span></span> behind trends and culture.
             </h1>
             <div className="flex w-full max-w-md mx-auto shadow-sm">
               <input type="text" placeholder="Search the archives..." className="flex-1 border border-[#111]/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#111] font-serif" />
               <button className="bg-[#111] text-white px-6 py-3 font-bold text-sm hover:bg-[#ea580c] transition-colors">Search</button>
             </div>
           </div>

           {/* 图2复刻：Top Stories 区块 (4栏网格) */}
           <div className="mb-12">
             <div className="border-y border-[#111] py-2 mb-8 flex justify-between items-center">
               <h2 className="font-serif font-black text-xl uppercase tracking-wider">Top Stories</h2>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {featured.map((post, i) => (
                 <div key={i} className="group cursor-pointer" onClick={() => setActivePost(post)}>
                   <div className="w-full aspect-[4/3] overflow-hidden mb-4 bg-gray-200">
                     <img src={post.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" alt={post.title}/>
                   </div>
                   <h4 className="text-[10px] uppercase tracking-widest text-[#ea580c] font-black mb-2">{post.category}</h4>
                   <h3 className="font-serif text-lg font-bold leading-snug mb-2 group-hover:text-[#ea580c] transition-colors">{post.title}</h3>
                   <div className="flex items-center gap-2 text-[10px] text-[#111]/50 uppercase tracking-widest">
                      <span>By {post.author}</span>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* 图2复刻：横向拉通的巨型横幅 (Banner) */}
           <div className="w-full bg-[#111] text-[#Fdfbf7] p-10 md:p-16 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 border-y-8 border-[#ea580c]">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="font-serif text-3xl md:text-5xl font-black mb-4 leading-tight text-white">How to find a hobby that suits you in 2026.</h2>
                <p className="font-serif text-lg opacity-80 text-white/80">Download our proprietary reports to stay ahead.</p>
              </div>
              <button className="bg-[#Fdfbf7] text-[#111] font-black uppercase tracking-widest text-xs px-8 py-4 hover:bg-[#ea580c] hover:text-white transition-colors shrink-0">
                Read Now
              </button>
           </div>

           {/* 图2复刻：Culture & Trends 区块 */}
           <div className="mb-16">
             <div className="border-y border-[#111] py-2 mb-8">
               <h2 className="font-serif font-black text-xl uppercase tracking-wider">Culture & Trends</h2>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {fashion.map((post, i) => (
                 <div key={i} className="group cursor-pointer" onClick={() => setActivePost(post)}>
                   <div className="w-full aspect-square overflow-hidden mb-4 bg-gray-200">
                     <img src={post.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" alt={post.title}/>
                   </div>
                   <h4 className="text-[10px] uppercase tracking-widest text-[#ea580c] font-black mb-2">{post.category}</h4>
                   <h3 className="font-serif text-lg font-bold leading-snug mb-2 group-hover:text-[#ea580c] transition-colors">{post.title}</h3>
                 </div>
               ))}
             </div>
           </div>

           {/* 图2复刻：Latest News 密集的左右列表版式 */}
           <div className="mb-16">
             <div className="border-y border-[#111] py-2 mb-8">
               <h2 className="font-serif font-black text-xl uppercase tracking-wider">Latest News</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               {latest.map((post, i) => (
                 <div key={i} className="flex gap-5 group cursor-pointer border-b border-[#111]/10 pb-6" onClick={() => setActivePost(post)}>
                   <div className="flex-1">
                     <h4 className="text-[10px] uppercase tracking-widest text-rose-600 font-black mb-2">{post.category}</h4>
                     <h3 className="font-serif text-[15px] md:text-[17px] font-bold leading-snug mb-3 group-hover:text-rose-600 transition-colors">{post.title}</h3>
                     <p className="text-[10px] text-[#111]/50 uppercase tracking-widest">By {post.author}</p>
                   </div>
                   <div className="w-28 h-20 md:w-36 md:h-28 shrink-0 bg-gray-200 overflow-hidden">
                     <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt=""/>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* 图2复刻：Deep Dives 黑底区块 */}
           {deepDives.length > 0 && (
             <div className="bg-[#111] text-[#Fdfbf7] p-8 md:p-12 -mx-6 md:-mx-12 mb-16">
               <div className="border-y border-[#Fdfbf7]/20 py-2 mb-10">
                 <h2 className="font-serif font-black text-xl uppercase tracking-wider">Deep Dives</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {deepDives.map((post, i) => (
                   <div key={i} className="group cursor-pointer" onClick={() => setActivePost(post)}>
                     <div className="w-full aspect-[4/5] overflow-hidden mb-5">
                       <img src={post.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt={post.title}/>
                     </div>
                     <h3 className="font-serif text-lg font-bold leading-snug mb-3 group-hover:text-rose-400 transition-colors">{post.title}</h3>
                     <p className="text-[10px] text-[#Fdfbf7]/50 uppercase tracking-widest">{post.category}</p>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* 图2复刻：底部居中大字呼吁栏 (Upgrade to Pro) */}
           <div className="text-center border-y-4 border-[#111] py-16 px-4">
              <h2 className="font-serif text-4xl md:text-[4rem] font-black mb-6 tracking-tight">Upgrade to Pro</h2>
              <p className="font-serif text-lg opacity-80 mb-8 max-w-lg mx-auto">Get smarter in 5 minutes. Support independent culture writing and gain full access to private sections.</p>
              <button className="bg-[#111] text-white px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-[#ea580c] transition-colors shadow-xl">Subscribe Now</button>
           </div>

        </div>
      </div>
    );
  };

  const renderCircleAllPosts = () => {
    if (!showCircleAllPosts || !activeCircle) return null;

    // 获取并填充帖子，保证数量足以排版出报纸的密集感
    const basePosts = [...(customPosts[activeCircle.id] || []), ...(activeCircle.privatePosts || [])];
    const displayPosts = basePosts.slice(0, 20); // 截取前面提供的20条硬核数据

    const mainLeft = displayPosts[0];
    const mainCenter = displayPosts[1];
    const mainRight1 = displayPosts[2];
    const mainRight2 = displayPosts[3];
    
    const row2Tag = activeCircle.tags[0] || 'Culture';
    const row2Posts = displayPosts.slice(4, 8);
    
    const row3Tag = activeCircle.tags[1] || 'Lifestyle';
    const row3Posts = displayPosts.slice(8, 12);
    
    const row4Tag = activeCircle.tags[2] || 'Insights';
    const row4Posts = displayPosts.slice(12, 16);
    
    const row5Tag = activeCircle.tags[3] || 'Archives';
    const row5Posts = displayPosts.slice(16, 20);

    return (
      <div className="fixed inset-0 bg-[#F4F1EA] text-[#111] z-[125] animate-in slide-in-from-bottom-8 duration-500 flex flex-col md:left-64 overflow-y-auto hide-scrollbar selection:bg-rose-200">
        
        {/* 顶部导航栏 */}
        <div className="sticky top-0 bg-[#F4F1EA]/90 backdrop-blur-md z-50 border-b border-[#111]/20 px-6 py-4 flex justify-between items-center">
           <button onClick={() => setShowCircleAllPosts(false)} className="flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:text-rose-600 transition-colors">
             <ArrowLeft size={16} strokeWidth={3} /> Back to Circle
           </button>
           <span className="font-serif font-black tracking-widest text-sm uppercase hidden md:block">Circle Press</span>
           <div className="w-16"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 md:px-8 pt-10 pb-32">
           
           {/* 报纸头部 THE FREE PRESS 风格 */}
           <div className="text-center mb-2 flex flex-col items-center">
             <h1 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-serif font-black tracking-tighter leading-[0.85] uppercase text-[#111]">
               THE {activeCircle.name}
             </h1>
           </div>

           {/* 日期/期数横条 (上下细线) */}
           <div className="flex justify-between items-center border-y border-[#111] py-2 mb-8 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-[#111]/70">
             <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
             <span className="hidden sm:block">A DIGITAL PUBLICATION BY THIS CIRCLE</span>
             <span>Vol. {activeCircle.members}</span>
           </div>

           {/* 头版 Top News 排版区 */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b-2 border-[#111] pb-10 mb-10">
              
              {/* 左栏：标题在上，图片在下 */}
              <div className="md:col-span-3 flex flex-col group cursor-pointer border-b md:border-b-0 md:border-r border-[#111]/20 pb-6 md:pb-0 md:pr-8" onClick={() => { if(mainLeft) setActivePost(mainLeft); }}>
                 <h3 className="font-serif text-2xl font-black leading-tight mb-4 group-hover:text-rose-600 transition-colors">{mainLeft?.title}</h3>
                 <div className="w-full aspect-square bg-gray-200 overflow-hidden mb-4">
                   <img src={mainLeft?.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" alt=""/>
                 </div>
                 <p className="text-xs font-serif text-[#111]/70 line-clamp-3 mb-2">圈内最新硬核探讨，点击阅读深度解析与同好们的思想交锋...</p>
                 <span className="text-[9px] uppercase tracking-widest font-black text-[#111]/50 border-t border-[#111]/10 pt-2 block mt-auto">By {mainLeft?.author}</span>
              </div>

              {/* 中栏：图片在上，标题在下 (视觉核心) */}
              <div className="md:col-span-6 flex flex-col group cursor-pointer border-b md:border-b-0 md:border-r border-[#111]/20 pb-6 md:pb-0 md:pr-8" onClick={() => { if(mainCenter) setActivePost(mainCenter); }}>
                 <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden mb-6">
                   <img src={mainCenter?.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" alt=""/>
                 </div>
                 <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight mb-4 text-center group-hover:text-rose-600 transition-colors">{mainCenter?.title}</h2>
                 <p className="text-sm font-serif text-[#111]/80 text-center max-w-md mx-auto line-clamp-2 mb-4">深入探讨圈子核心文化，带来前所未有的思想碰撞与硬核价值认同。</p>
                 
                 {/* 中栏内部作者模块 */}
                 <div className="mt-auto border border-[#111]/20 p-4 text-center">
                    <span className="text-[10px] uppercase tracking-widest font-black text-[#111]/50 block mb-2">— TOP CONTRIBUTOR —</span>
                    <div className="flex items-center justify-center gap-3">
                       <img src={USER_INFO.avatar} className="w-8 h-8 rounded-full grayscale" alt=""/>
                       <span className="font-serif font-bold text-sm">{mainCenter?.author}</span>
                    </div>
                 </div>
              </div>

              {/* 右栏：上下两篇小新闻 */}
              <div className="md:col-span-3 flex flex-col gap-6">
                 <div className="group cursor-pointer border-b border-[#111]/20 pb-6" onClick={() => { if(mainRight1) setActivePost(mainRight1); }}>
                    <div className="w-full aspect-[3/2] bg-gray-200 overflow-hidden mb-3">
                      <img src={mainRight1?.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" alt=""/>
                    </div>
                    <h3 className="font-serif text-lg font-black leading-snug mb-2 group-hover:text-rose-600 transition-colors">{mainRight1?.title}</h3>
                    <span className="text-[9px] uppercase tracking-widest font-black text-[#111]/50">By {mainRight1?.author}</span>
                 </div>
                 <div className="group cursor-pointer" onClick={() => { if(mainRight2) setActivePost(mainRight2); }}>
                    <h3 className="font-serif text-lg font-black leading-snug mb-3 group-hover:text-rose-600 transition-colors">{mainRight2?.title}</h3>
                    <div className="w-full aspect-[3/2] bg-gray-200 overflow-hidden mb-2">
                      <img src={mainRight2?.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" alt=""/>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-black text-[#111]/50">By {mainRight2?.author}</span>
                 </div>
              </div>
           </div>

           {/* 分类阅读区 1 */}
           {row2Posts.length > 0 && (
             <div className="mb-12">
               <div className="border-b-[2px] border-[#111] mb-6 flex items-center">
                 <h2 className="font-serif font-black text-2xl uppercase tracking-widest bg-[#111] text-white px-4 py-1">{row2Tag}</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {row2Posts.map((p, i) => (
                     <div key={i} className="group cursor-pointer flex flex-col" onClick={() => setActivePost(p)}>
                        <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden mb-4">
                           <img src={p?.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt=""/>
                        </div>
                        <h3 className="font-serif text-lg font-bold leading-snug mb-2 group-hover:text-rose-600 transition-colors flex-1">{p?.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                           <MessageCircle size={12} className="text-[#111]/40" />
                           <span className="text-[10px] uppercase tracking-widest font-black text-[#111]/50">{p?.views || '1.2w'}</span>
                        </div>
                     </div>
                  ))}
               </div>
             </div>
           )}

           {/* 分类阅读区 2 */}
           {row3Posts.length > 0 && (
             <div className="mb-12">
               <div className="border-b-[2px] border-[#111] mb-6 flex items-center">
                 <h2 className="font-serif font-black text-2xl uppercase tracking-widest px-1">{row3Tag}</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {row3Posts.map((p, i) => (
                     <div key={i} className="group cursor-pointer flex flex-col border border-[#111]/10 p-4 hover:bg-white transition-colors shadow-sm h-full" onClick={() => setActivePost(p)}>
                        <div className="w-full aspect-square bg-gray-200 overflow-hidden mb-4 rounded-full max-w-[120px] mx-auto shrink-0">
                           <img src={p?.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700" alt=""/>
                        </div>
                        <h3 className="font-serif text-base font-bold leading-snug mb-2 group-hover:text-rose-600 transition-colors text-center flex-1">{p?.title}</h3>
                        <div className="text-center mt-auto border-t border-[#111]/10 pt-3">
                           <span className="text-[9px] uppercase tracking-widest font-black text-[#111]/50">By {p?.author}</span>
                        </div>
                     </div>
                  ))}
               </div>
             </div>
           )}

           {/* 分类阅读区 3 (复用阅读区1样式) */}
           {row4Posts.length > 0 && (
             <div className="mb-12">
               <div className="border-b-[2px] border-[#111] mb-6 flex items-center">
                 <h2 className="font-serif font-black text-2xl uppercase tracking-widest bg-[#ea580c] text-white px-4 py-1">{row4Tag}</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {row4Posts.map((p, i) => (
                     <div key={i} className="group cursor-pointer flex flex-col" onClick={() => setActivePost(p)}>
                        <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden mb-4">
                           <img src={p?.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt=""/>
                        </div>
                        <h3 className="font-serif text-lg font-bold leading-snug mb-2 group-hover:text-[#ea580c] transition-colors flex-1">{p?.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                           <MessageCircle size={12} className="text-[#111]/40" />
                           <span className="text-[10px] uppercase tracking-widest font-black text-[#111]/50">{p?.views || '1.2w'}</span>
                        </div>
                     </div>
                  ))}
               </div>
             </div>
           )}

           {/* 分类阅读区 4 (复用阅读区2样式) */}
           {row5Posts.length > 0 && (
             <div className="mb-12">
               <div className="border-b-[2px] border-[#111] mb-6 flex items-center">
                 <h2 className="font-serif font-black text-2xl uppercase tracking-widest px-1">{row5Tag}</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {row5Posts.map((p, i) => (
                     <div key={i} className="group cursor-pointer flex flex-col border border-[#111]/10 p-4 hover:bg-white transition-colors shadow-sm h-full" onClick={() => setActivePost(p)}>
                        <div className="w-full aspect-square bg-gray-200 overflow-hidden mb-4 rounded-full max-w-[120px] mx-auto shrink-0">
                           <img src={p?.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700" alt=""/>
                        </div>
                        <h3 className="font-serif text-base font-bold leading-snug mb-2 group-hover:text-rose-600 transition-colors text-center flex-1">{p?.title}</h3>
                        <div className="text-center mt-auto border-t border-[#111]/10 pt-3">
                           <span className="text-[9px] uppercase tracking-widest font-black text-[#111]/50">By {p?.author}</span>
                        </div>
                     </div>
                  ))}
               </div>
             </div>
           )}

        </div>
      </div>
    );
  };

  // 👇 全新的独立杂志风帖子详情页 (带点赞与评论互动)
  const renderPostDetail = () => {
    if (!activePost) return null;
    
    const isLiked = likedPosts.includes(activePost.id);
    const comments = postComments[activePost.id] || [];

    const handleLikeToggle = () => {
      if (isLiked) {
        setLikedPosts(likedPosts.filter(id => id !== activePost.id));
      } else {
        setLikedPosts([...likedPosts, activePost.id]);
      }
    };

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      if (!commentInput.trim()) return showToast('评论不能为空~');
      
      const newComment = {
        id: Date.now(),
        author: USER_INFO.name,
        avatar: USER_INFO.avatar,
        text: commentInput.trim(),
        time: '刚刚'
      };

      setPostComments(prev => ({
        ...prev,
        [activePost.id]: [...(prev[activePost.id] || []), newComment]
      }));
      setCommentInput('');
      showToast('🎉 评论发表成功！');
    };

    return (
      <div className="fixed inset-0 bg-[#Fdfbf7] text-[#111] z-[130] animate-in slide-in-from-bottom-8 duration-500 flex flex-col md:left-64 overflow-y-auto hide-scrollbar selection:bg-rose-200">
        <style>
          {`
            .drop-cap::first-letter {
              float: left;
              font-size: 5rem;
              line-height: 0.8;
              padding-top: 4px;
              padding-right: 12px;
              padding-left: 2px;
              font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
              font-weight: 900;
              color: #111;
            }
          `}
        </style>
        
        {/* 顶部导航栏 */}
        <div className="sticky top-0 bg-[#Fdfbf7]/95 backdrop-blur-md z-50 border-b border-[#111]/10 px-6 py-4 flex justify-between items-center">
           <button onClick={() => setActivePost(null)} className="flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:text-rose-600 transition-colors">
             <ArrowLeft size={16} strokeWidth={3} /> Close Article
           </button>
           <div className="flex items-center gap-4">
             <button onClick={handleLikeToggle} className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-rose-600' : 'text-[#111]/50 hover:text-[#111]'}`}>
               <Heart size={18} strokeWidth={2.5} className={isLiked ? "fill-rose-600" : ""} />
             </button>
             <button className="text-[#111]/50 hover:text-[#111] transition-colors"><Share2 size={18} strokeWidth={2.5} /></button>
           </div>
        </div>

        <article className="max-w-4xl mx-auto w-full px-6 pt-12 pb-24">
           {/* 杂志风排版头部 */}
           <div className="text-center mb-12">
             <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#ea580c] mb-6">
               — {activePost.category || 'Editorial Reading'} —
             </h4>
             <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif font-black tracking-tight leading-[1.15] text-[#111] mb-8 max-w-3xl mx-auto">
               {activePost.title}
             </h1>
             <div className="flex items-center justify-center gap-4 text-xs font-bold text-[#111]/60 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <img src={USER_INFO.avatar} className="w-6 h-6 rounded-full grayscale" alt="" />
                  By {activePost.author}
                </span>
                <span>•</span>
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
             </div>
           </div>

           {/* 巨幅主视觉图 */}
           <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-200 mb-14 overflow-hidden border border-[#111]/10">
             <img src={activePost.image || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80'} className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-1000" alt={activePost.title} />
           </div>

           {/* 模拟的富文本阅读区域 */}
           <div className="max-w-2xl mx-auto font-serif text-lg md:text-xl text-[#111]/80 leading-[1.8] space-y-8">
              <p className="drop-cap text-justify">
                 关于「{activePost.title}」，这不仅是一个简单的话题，更是我们深度探索该领域的关键切入点。在这个快速消费的时代，我们往往容易忽略事物背后严谨的逻辑与文化脉络。正如我们在本篇中所探讨的，细节决定了最终的质感与沉浸体验。
              </p>
              <p className="text-justify">
                 每一个热爱的背后，都有着无数个日夜的钻研与打磨。无论是参数的精细微调，还是历史文献的溯源考究，这不仅是对专业度的一种执着，更是一种对抗同质化趋势的文化自证。
              </p>
              <blockquote className="border-l-4 border-rose-600 pl-6 py-2 my-10 italic font-black text-2xl text-[#111]">
                "真正的硬核，不是为了炫耀门槛，而是为了触达那份不可替代的纯粹。"
              </blockquote>
              <p className="text-justify">
                 无论你是刚刚涉足此领域的初学者，还是已经深耕多年的资深爱好者，掌握这些核心逻辑都将帮助你构建更为完整且深刻的认知体系。这也是我们社区之所以存在的意义：过滤掉杂音，留下真正有价值的探讨。
              </p>
           </div>

           {/* 底部点赞分享行动区 */}
           <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-[#111]/20 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button onClick={handleLikeToggle} className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all ${isLiked ? 'text-rose-600' : 'text-[#111]/60 hover:text-[#111]'}`}>
                  <Heart size={20} strokeWidth={3} className={isLiked ? "fill-rose-600" : ""} /> {isLiked ? '已赞 (Liked)' : '点赞 (Like)'}
                </button>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#111]/40 uppercase tracking-widest font-black">
                <span>{activePost.views || '8.2k'} Views</span>
              </div>
           </div>

           {/* 👇 互动评论区 👇 */}
           <div className="max-w-2xl mx-auto mt-16 bg-white border border-[#111]/10 p-6 md:p-10 shadow-sm">
              <h3 className="font-serif font-black text-2xl mb-8 flex items-center gap-3">
                 <MessageCircle size={24} /> Discussions <span className="text-[#111]/40 text-lg">({comments.length})</span>
              </h3>

              {/* 评论列表 */}
              <div className="space-y-6 mb-10">
                 {comments.length > 0 ? comments.map(comment => (
                   <div key={comment.id} className="flex gap-4 border-b border-[#111]/5 pb-6 last:border-0 last:pb-0">
                     <img src={comment.avatar} className="w-10 h-10 rounded-full object-cover shrink-0 grayscale-[20%]" alt=""/>
                     <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                         <span className="font-black text-sm text-[#111]">{comment.author}</span>
                         <span className="text-[10px] text-[#111]/40 uppercase tracking-widest font-bold">{comment.time}</span>
                       </div>
                       <p className="text-sm font-serif text-[#111]/80 leading-relaxed">{comment.text}</p>
                     </div>
                   </div>
                 )) : (
                   <div className="text-center py-10 text-[#111]/40 font-serif italic text-sm">
                     "Be the first to share your thoughts on this editorial."
                   </div>
                 )}
              </div>

              {/* 发表评论输入框 */}
              <form onSubmit={handleCommentSubmit} className="flex gap-3 relative">
                 <img src={USER_INFO.avatar} className="w-10 h-10 rounded-full object-cover shrink-0 hidden sm:block" alt=""/>
                 <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Share your insights..." 
                      className="w-full bg-[#Fdfbf7] border border-[#111]/20 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#111] font-serif transition-colors pr-12"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111]/50 hover:text-[#ea580c] transition-colors">
                      <Send size={18} strokeWidth={2.5} />
                    </button>
                 </div>
              </form>
           </div>
        </article>
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
          {currentTab.startsWith('profile') && renderProfile()}
        </div>
        {activeCircle && renderCircleDetail()}
        {showQuiz && renderQuiz()}
        {renderPostModal()}
        {renderActivityDetail()}
        {renderAllPosts()}
        {renderCircleAllPosts()}
        {renderPostDetail()}
        {renderChatWindow()}
      </main>
      {renderBottomNav()}
    </div>
  );
}