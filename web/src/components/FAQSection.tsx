import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: "Listary Pro 许可证校验算法的底层原理是什么？",
      a: "Listary 在本地执行 CheckLicense 校验，对输入邮箱计算 H1（多项式滚动）、H2（ELF 风格）、H3（4 轮移位异或）三个 32 位哈希，拼接为 96 位整数后，按 5-bit 分组映射为 19 字符 Base32 校验串，嵌入在 192 字符密钥的 160 至 178 位置。其余 173 字符不参与校验，因此可通过邮箱离线推导完整密钥。",
    },
    {
      q: "该激活工具会影响或覆盖我原有的 Listary 搜索配置吗？",
      a: "完全不会。工具在执行任何写入前会自动将当前配置备份为 Preferences.json.bak。写入时仅针对 Settings 节点下的 Listary5.ProLicense 授权键值进行安全更新，您的所有自定义搜索命令、历史与动作均原样保留。",
    },
    {
      q: "激活过程需要连接网络吗？是否支持离线环境？",
      a: "全程 100% 离线运行。Listary 原生支持完全离线的本地许可证验证机制，本工具与生成的密钥均无需任何网络请求即可生效。",
    },
    {
      q: "该算法支持哪些 Listary 版本？",
      a: "经逆向分析与字节级对比验证，该算法完全兼容 Listary 6.x 正式版（如 v6.3）及 Listary 7.0 Beta（如 v7.0.0.9），两版本校验逻辑完全一致。",
    },
    {
      q: "如果在日常生产环境中长期使用，如何购买正版支持？",
      a: "本项目仅供逆向技术学习与安全研究交流。建议在日常工作中前往 Listary 中文官网 (https://www.listary.net) 或国际官网 (https://www.listary.com/pro) 购买正版授权，支持优秀独立开发者的持续创作。",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-neutral-800">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono mb-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100">
          常见技术问题解答
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          针对算法原理、配置安全与版本兼容性的详细说明。
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-lg bg-[#141414] border border-neutral-800 transition-colors overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-medium text-neutral-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-neutral-200' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-0 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60 mt-1 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
