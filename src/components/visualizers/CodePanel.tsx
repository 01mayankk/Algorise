"use client";

import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Algorithm } from '@/lib/types';
import { LanguageSelector } from '@/components/controls/LanguageSelector';
import { useTheme } from 'next-themes';

interface CodePanelProps {
  algorithm: Algorithm;
}

export function CodePanel({ algorithm }: CodePanelProps) {
  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp'>('javascript');
  const { theme } = useTheme();

  return (
    <div className="w-full h-full flex flex-col bg-background/80 backdrop-blur border rounded-xl shadow-sm overflow-hidden min-h-[400px]">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="text-sm font-semibold text-muted-foreground ml-2">Implementation</div>
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          value={algorithm.code[language]}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
}
