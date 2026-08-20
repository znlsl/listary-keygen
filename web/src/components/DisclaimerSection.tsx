import React from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';

export const DisclaimerSection: React.FC = () => {
  return (
    <section id="disclaimer" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-neutral-800">
      <div className="rounded-lg bg-[#141414] border border-neutral-800 p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#0a0a0a] border border-neutral-700 flex items-center justify-center text-neutral-300">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-200">法律声明与正版支持</h3>
            <p className="text-[11px] text-neutral-500">Legal & Research Disclaimer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-neutral-400 leading-relaxed">
          <div className="p-3.5 rounded-md bg-[#0a0a0a] border border-neutral-800 space-y-1.5">
            <div className="font-medium text-neutral-300">仅供学习与学术交流</div>
            <p>
              本项目所有源码、算法文档及编译产物仅用于计算机逆向工程与软件安全机制研究，严禁用于商业牟利或未授权的生产环境中。
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-[#0a0a0a] border border-neutral-800 space-y-1.5">
            <div className="font-medium text-neutral-300">免责与责任自负</div>
            <p>
              本项目按“现状 (AS IS)”提供，作者不提供任何形式的保证。因使用本项目所产生的直接或间接法律责任及数据风险由使用者自行承担。
            </p>
          </div>
        </div>

        {/* Genuine Purchase Action Banner */}
        <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <span className="text-neutral-400">日常生产环境请支持官方正版：</span>

          <div className="flex flex-wrap gap-2">
            <a
              href="https://www.listary.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              <span>中文官网（中国特惠）</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>

            <a
              href="https://www.listary.com/pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              <span>国际官网</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
