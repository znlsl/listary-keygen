import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, ShieldCheck, XCircle } from 'lucide-react';
import {
  calcH1,
  calcH2,
  calcH3,
  getChecksum,
  generateLicense,
  verifyLicense,
  generateRandomEmail,
} from '../lib/licenseAlgo';

export const KeygenSimulator: React.FC = () => {
  const [email, setEmail] = useState<string>('test@listary.com');
  const [license, setLicense] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = (customEmail?: string) => {
    const targetEmail = (customEmail !== undefined ? customEmail : email).trim() || 'test@listary.com';
    const key = generateLicense(targetEmail);
    setLicense(key);
  };

  const handleRandom = () => {
    const randomEmail = generateRandomEmail();
    setEmail(randomEmail);
    handleGenerate(randomEmail);
  };

  const handleCopy = () => {
    if (!license) return;
    navigator.clipboard.writeText(license);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanEmail = email.trim().toLowerCase();
  const h1 = cleanEmail ? calcH1(cleanEmail) : 0;
  const h2 = cleanEmail ? calcH2(cleanEmail) : 0;
  const h3 = cleanEmail ? calcH3(cleanEmail) : 0;
  const checksum = cleanEmail ? getChecksum(cleanEmail) : '';
  const isVerified = license ? verifyLicense(cleanEmail, license) : false;

  return (
    <section id="playground" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-neutral-800">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100">
          在线算法计算器
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          在浏览器中直接体验 3 个哈希函数计算与 19 位 Base32 校验串推导。
        </p>
      </div>

      <div className="rounded-lg bg-[#141414] border border-neutral-800 p-5 sm:p-6 space-y-5">
        {/* Email Input Bar */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-400">
            邮箱（Email）
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim()) {
                  handleGenerate(e.target.value);
                }
              }}
              placeholder="输入任意邮箱，如 user@example.com"
              className="flex-1 bg-[#0a0a0a] border border-neutral-700 rounded-md px-3 py-2 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 font-mono"
            />
            <div className="flex gap-2">
              <button
                onClick={handleRandom}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md border border-neutral-700 text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>随机邮箱</span>
              </button>
              <button
                onClick={() => handleGenerate()}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-100 hover:bg-white text-neutral-950 rounded-md text-xs font-semibold transition-colors"
              >
                <span>重新生成</span>
              </button>
            </div>
          </div>
        </div>

        {/* Realtime Hash Calculation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-md bg-[#0a0a0a] border border-neutral-800">
            <div className="text-[11px] text-neutral-500 font-mono">H1 (多项式 x43)</div>
            <div className="text-xs sm:text-sm font-mono text-neutral-200 font-semibold mt-1">
              0x{h1.toString(16).toUpperCase().padStart(8, '0')}
            </div>
          </div>
          <div className="p-3 rounded-md bg-[#0a0a0a] border border-neutral-800">
            <div className="text-[11px] text-neutral-500 font-mono">H2 (ELF 风格)</div>
            <div className="text-xs sm:text-sm font-mono text-neutral-200 font-semibold mt-1">
              0x{h2.toString(16).toUpperCase().padStart(8, '0')}
            </div>
          </div>
          <div className="p-3 rounded-md bg-[#0a0a0a] border border-neutral-800">
            <div className="text-[11px] text-neutral-500 font-mono">H3 (4 轮移位异或)</div>
            <div className="text-xs sm:text-sm font-mono text-neutral-200 font-semibold mt-1">
              0x{h3.toString(16).toUpperCase().padStart(8, '0')}
            </div>
          </div>
        </div>

        {/* 19-char Checksum Slice */}
        <div className="p-3.5 rounded-md bg-[#0a0a0a] border border-neutral-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-medium">
              19 字符有效校验串（96 位切片）：
            </span>
            {isVerified ? (
              <span className="font-mono text-neutral-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>校验通过 (Verify=True)</span>
              </span>
            ) : (
              <span className="font-mono text-neutral-400 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                <span>未通过</span>
              </span>
            )}
          </div>
          <div className="font-mono text-xs sm:text-sm tracking-wider text-neutral-100 font-semibold break-all bg-neutral-900/60 p-2 rounded border border-neutral-800 select-all">
            {checksum || '...'}
          </div>
        </div>

        {/* Full 192-char License */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-neutral-400">
              完整 192 字符密钥（前缀 160 + 校验 19 + 后缀 13）
            </label>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-neutral-300 hover:text-white font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制' : '复制密钥'}</span>
            </button>
          </div>

          <textarea
            readOnly
            rows={3}
            value={license}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-2.5 text-[11px] sm:text-xs font-mono text-neutral-300 focus:outline-none focus:border-neutral-600 resize-none leading-relaxed select-all"
          />
        </div>
      </div>
    </section>
  );
};
