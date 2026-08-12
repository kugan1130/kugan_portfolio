import React, { useState } from 'react';
import { SkillCategory } from '../../types';
import { Brain, Cpu, Eye, Server, Database, Layout, Wrench, Sparkles, Code2, Check } from 'lucide-react';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skillCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-indigo-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-fuchsia-400" />;
      default: return <Wrench className="w-5 h-5 text-teal-400" />;
    }
  };

  const filteredCategories = selectedCategory === 'All'
    ? skillCategories
    : skillCategories.filter(cat => cat.title.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="capabilities" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>CORE TECHNICAL STACK</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            Technical Skills & <span className="text-[#2563EB]">Capabilities</span>
          </h2>
          <p className="mt-3 text-[#4B5563] max-w-2xl text-sm sm:text-base">
            Structured, production-oriented tech stack across autonomous agents, vision pipelines, databases, and backend infrastructure.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'All'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setSelectedCategory('AI')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'AI'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
              }`}
            >
              AI & LLM
            </button>
            <button
              onClick={() => setSelectedCategory('Agentic')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'Agentic'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
              }`}
            >
              Agentic AI
            </button>
            <button
              onClick={() => setSelectedCategory('Vision')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'Vision'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
              }`}
            >
              Computer Vision
            </button>
            <button
              onClick={() => setSelectedCategory('Backend')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'Backend'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
              }`}
            >
              Backend & DB
            </button>
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-[#E5E7EB] glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <h3 className="font-heading font-bold text-[#111827] text-base">{cat.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#4B5563] border border-[#E5E7EB]">
                    {cat.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9FA] text-xs font-medium text-[#111827] border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:text-[#2563EB] hover:bg-white transition-all cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
