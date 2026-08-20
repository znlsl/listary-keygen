import React from 'react';
import { Github, KeyRound, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0a]/90 border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-200 group-hover:border-neutral-500 transition-colors">
            <KeyRound className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-neutral-100 text-sm tracking-tight">
            Listary <span className="font-mono text-xs text-neutral-400 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">Activate</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
          <a href="#playground" className="hover:text-neutral-100 transition-colors">在线计算</a>
          <a href="#features" className="hover:text-neutral-100 transition-colors">核心特性</a>
          <a href="#workflow" className="hover:text-neutral-100 transition-colors">激活流程</a>
          <a href="#disclaimer" className="hover:text-neutral-100 transition-colors">免责声明</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/LING71671/listary-keygen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://github.com/LING71671/listary-keygen/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-100 hover:bg-white text-neutral-950 font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>下载 v1.0.0</span>
          </a>
        </div>
      </div>
    </header>
  );
};
