import React from 'react';
import { Cpu, ShieldCheck, Zap, BookOpen } from 'lucide-react';

export const Features: React.FC = () => {
  const items = [
    {
      icon: <Cpu className="w-4 h-4 text-neutral-300" />,
      title: "零外部依赖构建",
      description: "基于 Windows 原生 .NET Framework 4.8，使用内置 csc 编译，无需安装任何额外依赖，双击即用。",
    },
    {
      icon: <Zap className="w-4 h-4 text-neutral-300" />,
      title: "单窗口全流程闭环",
      description: "密钥生成、自校验、进程检测、Preferences.json 写入与复读校验在一个极简界面中完成。",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-neutral-300" />,
      title: "原子备份与安全保护",
      description: "写入配置前自动生成 .json.bak 备份，检测 Listary 进程避免退出覆盖，写入后复读校验。",
    },
    {
      icon: <BookOpen className="w-4 h-4 text-neutral-300" />,
      title: "透明开源与算法文档",
      description: "提供详细的混淆加壳对抗记录、Harmony 动态 Hook 步骤与密码学算法原理文档，完全开源。",
    },
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-neutral-800">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100">
          核心特性
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          轻量、原生、注重数据安全与系统配置完整性。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-lg bg-[#141414] border border-neutral-800 space-y-2.5"
          >
            <div className="w-8 h-8 rounded-md bg-[#0a0a0a] border border-neutral-800 flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="text-sm font-semibold text-neutral-200">{item.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
