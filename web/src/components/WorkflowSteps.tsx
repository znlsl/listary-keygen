import React from 'react';
import { Mail, Key, Check } from 'lucide-react';

export const WorkflowSteps: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: <Mail className="w-4 h-4 text-neutral-300" />,
      title: "输入或随机邮箱",
      desc: "手动填入常用邮箱，或点击「随机邮箱」一键生成合规邮箱。",
    },
    {
      num: "02",
      icon: <Key className="w-4 h-4 text-neutral-300" />,
      title: "自动生成与自检",
      desc: "根据算法推导 19 字符校验串并生成 192 位密钥，前置执行 Verify 断言。",
    },
    {
      num: "03",
      icon: <Check className="w-4 h-4 text-neutral-300" />,
      title: "一键写入配置",
      desc: "自动备份原始 Preferences.json，安全写入三键并复读校验，重启生效。",
    },
  ];

  return (
    <section id="workflow" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-neutral-800">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100">
          激活流程
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          基于 Listary 官方离线配置规范，简单三步完成激活。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-5 rounded-lg bg-[#141414] border border-neutral-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-neutral-500">{step.num}</span>
              <div className="w-7 h-7 rounded-md bg-[#0a0a0a] border border-neutral-800 flex items-center justify-center">
                {step.icon}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-neutral-200">{step.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
