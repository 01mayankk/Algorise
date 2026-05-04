"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  language: 'javascript' | 'python' | 'cpp';
  setLanguage: (lang: 'javascript' | 'python' | 'cpp') => void;
}

export function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
  return (
    <Select value={language} onValueChange={(val: 'javascript' | 'python' | 'cpp' | null) => { if (val) setLanguage(val); }}>
      <SelectTrigger className="w-[180px] bg-background/80 backdrop-blur">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="javascript">JavaScript / TS</SelectItem>
        <SelectItem value="python">Python</SelectItem>
        <SelectItem value="cpp">C++</SelectItem>
      </SelectContent>
    </Select>
  );
}
