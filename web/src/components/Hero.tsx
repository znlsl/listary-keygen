import React from 'react';
import { Download, Github, Terminal, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Version badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300 mb-6">
        <span>Listary 6.3 & 7.0 Beta 算法还原</span>
        <span className="text-neutral-600">/</span>
        <span className="text-neutral-200">v1.0.0</span>
      </div>

      {/* Main headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 max-w-3xl mx-auto leading-tight">
        Listary Pro 一键激活工具
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
        基于 .NET Framework 4.8 原生构建，单窗口完成密钥生成、自校验与 Preferences.json 自动备份写入，零外部依赖，双击即用。
      </p>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://github.com/LING71671/listary-keygen/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold bg-neutral-100 hover:bg-white text-neutral-950 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>下载 ListaryActivate.exe</span>
        </a>

        <a
          href="#playground"
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-colors"
        >
          <Terminal className="w-4 h-4 text-neutral-400" />
          <span>在线计算演练</span>
        </a>

        <a
          href="https://github.com/LING71671/listary-keygen"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>查看源码</span>
        </a>
      </div>

      {/* Technical tags */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-500 font-mono">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-neutral-400" />
          <span>.NET 4.8 原生零依赖</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5 text-neutral-400" />
          <span>原子备份与复读校验</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
          <span>100% 离线本地运行</span>
        </div>
      </div>
    </section>
  );
};
