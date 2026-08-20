import React from 'react';
import { Minus, Square, X, FolderOpen, RefreshCw, Check } from 'lucide-react';

export const AppPreview: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 max-w-3xl mx-auto pb-16">
      <div className="rounded-lg bg-[#141414] border border-neutral-800 shadow-xl overflow-hidden">
        {/* Window Title Bar */}
        <div className="bg-[#1a1a1a] px-3.5 py-2 flex items-center justify-between border-b border-neutral-800 select-none">
          <span className="text-xs text-neutral-300 font-sans">Listary Pro 一键激活</span>
          <div className="flex items-center gap-3 text-neutral-500 text-xs">
            <Minus className="w-3 h-3 hover:text-neutral-300 cursor-pointer" />
            <Square className="w-2.5 h-2.5 hover:text-neutral-300 cursor-pointer" />
            <X className="w-3 h-3 hover:text-neutral-300 cursor-pointer" />
          </div>
        </div>

        {/* Mockup Form Content */}
        <div className="p-5 space-y-3.5 text-xs font-sans">
          {/* Row 1: Name */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <label className="text-neutral-400">用户名（Name）:</label>
            <div className="sm:col-span-3">
              <input
                type="text"
                readOnly
                value="Pro User"
                className="w-full bg-[#0a0a0a] border border-neutral-700/80 rounded px-2.5 py-1 text-neutral-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <label className="text-neutral-400">邮箱（Email）:</label>
            <div className="sm:col-span-3 flex gap-2">
              <input
                type="text"
                readOnly
                value="user_test@example.com"
                className="flex-1 bg-[#0a0a0a] border border-neutral-700/80 rounded px-2.5 py-1 text-neutral-200 focus:outline-none"
              />
              <button className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 text-xs flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                <span>随机邮箱</span>
              </button>
            </div>
          </div>

          {/* Row 3: Key */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
            <label className="text-neutral-400">密钥（License）:</label>
            <div className="sm:col-span-3">
              <input
                type="text"
                readOnly
                value="3E4GU97PFQ6Q82NMAZ...MXCVAYS2XVS7U6S93FR...RKHURERGKBST2"
                className="w-full bg-[#0a0a0a] border border-neutral-700/80 rounded px-2.5 py-1 text-neutral-200 font-mono text-[11px] focus:outline-none truncate"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2.5 pt-0.5">
            <button className="px-3.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 font-medium text-xs">
              仅生成密钥
            </button>
            <button className="px-4 py-1 bg-neutral-200 hover:bg-white text-neutral-950 rounded font-semibold text-xs flex items-center gap-1 shadow-sm">
              <Check className="w-3 h-3" />
              <span>一键激活</span>
            </button>
          </div>

          {/* Row 4: Config Path */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 pt-1 border-t border-neutral-800">
            <label className="text-neutral-400">配置文件:</label>
            <div className="sm:col-span-3 flex gap-2">
              <input
                type="text"
                readOnly
                value="%APPDATA%\Listary\UserProfile\Settings\Preferences.json"
                className="flex-1 bg-[#0a0a0a] border border-neutral-700/80 rounded px-2.5 py-1 text-neutral-400 font-mono text-[11px] focus:outline-none"
              />
              <button className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 text-xs flex items-center gap-1">
                <FolderOpen className="w-3 h-3" />
                <span>浏览...</span>
              </button>
            </div>
          </div>

          {/* Log Console Mockup */}
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded p-2.5 font-mono text-[11px] text-neutral-400 space-y-1 h-28 overflow-y-auto">
            <div className="text-neutral-500">[18:30:00] 就绪（v1.0.0）。目标配置: %APPDATA%\...\Preferences.json</div>
            <div className="text-neutral-500">[18:30:01] 提示：写入前请退出 Listary，否则退出时内存数据会覆盖新配置。</div>
            <div className="text-neutral-300">[18:30:05] 已为 user_test@example.com 生成密钥，自校验通过（Verify=True）</div>
            <div className="text-neutral-300">[18:30:06] 完成：已备份原配置 → Preferences.json.bak</div>
            <div className="text-neutral-200">[18:30:06] 完成：激活配置已写入。重启 Listary 后 Pro 状态生效。</div>
          </div>

          {/* Footer inside app */}
          <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] text-neutral-500 gap-1">
            <span>仅供授权范围内的逆向学习与研究，请遵守 Listary 服务条款</span>
            <span className="text-neutral-400">正版购买: listary.net | 开源仓库: GitHub</span>
          </div>
        </div>
      </div>
    </section>
  );
};
