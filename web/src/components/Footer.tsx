import React from 'react';
import { Github, Download, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-[#0a0a0a] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div>
          <p>© 2026 listary-keygen contributors. MIT Licensed.</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/LING71671/listary-keygen"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-300 transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://github.com/LING71671/listary-keygen/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-300 transition-colors flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Releases</span>
          </a>

          <a
            href="https://github.com/LING71671/listary-keygen/blob/main/docs/algorithm.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-300 transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>算法原理</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
