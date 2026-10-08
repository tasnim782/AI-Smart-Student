import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

interface PresetPrompt {
  id: string;
  category: string;
  badPrompt: {
    text: string;
    aiResponse: string;
    risk: string;
    humanScore: string;
    issues: string[];
  };
  goodPrompt: {
    text: string;
    aiResponse: string;
    benefit: string;
    humanScore: string;
    strengths: string[];
  };
}

const PRESETS: PresetPrompt[] = [
  {
    id: 'report-topic',
    category: 'การทำรายงานวิชาการ',
    badPrompt: {
      text: '“ทำรายงานเรื่อง AI ให้ฉันทั้งหมด”',
      aiResponse: 'นี่คือรายงานเรื่อง AI ความยาว 2,000 คำ: ปัญญาประดิษฐ์เริ่มต้นขึ้นในปี 1956... (เนื้อหาทั่วไปกว้างมาก ไม่มีอ้างอิง และไม่ตรงกับโจทย์อาจารย์)',
      risk: 'เสี่ยงถูกจับได้ว่าให้ AI เขียนทั้งหมด ผู้เรียนไม่ได้ฝึกคิด และได้เนื้อหาทั่วไปที่ไม่ตอบโจทย์วิชา',
      humanScore: '2/10 (ขาดความซื่อสัตย์ทางวิชาการ)',
      issues: [
        'ไม่มีการระบุระดับชั้นหรือบริบท',
        'ไม่ได้กำหนดหัวข้อย่อยหรือประเด็นเฉพาะ',
        'ทิ้งการควบคุมทั้งหมดให้ AI'
      ]
    },
    goodPrompt: {
      text: '“ช่วยเสนอหัวข้อสำหรับรายงานเรื่อง AI Literacy จำนวน 5 หัวข้อ พร้อมอธิบายจุดเด่นของแต่ละหัวข้อ เพื่อให้ฉันนำไปเลือกทำรายงานระดับมหาวิทยาลัย”',
      aiResponse: 'ยินดีครับ! นี่คือ 5 หัวข้อที่น่าสนใจ:\n1. ภาพหลอนของ AI (Hallucination) กับความท้าทายในการวิจัย\n2. จริยธรรมและลิขสิทธิ์ของศิลปินในยุค GenAI\n3. การปกป้องข้อมูลส่วนบุคคล (PDPA) เมื่อใช้ AI ในสถานศึกษา\n4. อคติทางเพศและภาษาในโมเดล LLM\n5. แนวทางการใช้ AI เพื่อการศึกษาอย่างยั่งยืน...',
      benefit: 'ได้ไอเดียหลากหลายมาพิจารณา ผู้เรียนเป็นผู้ตัดสินใจเลือก และนำไปค้นคว้าเขียนรายงานด้วยตนเอง',
      humanScore: '10/10 (ใช้เป็นคู่คิดอย่างชาญฉลาด)',
      strengths: [
        'ระบุงานชัดเจน (เสนอ 5 หัวข้อ + อธิบายจุดเด่น)',
        'ระบุบริบท (ระดับมหาวิทยาลัย)',
        'รักษาความเป็นเจ้าของผลงานไว้ที่ตัวนักศึกษา'
      ]
    }
  },
  {
    id: 'exam-prep',
    category: 'การเตรียมตัวสอบ',
    badPrompt: {
      text: '“สรุปหนังสือฟิสิกส์ ม.ปลาย ให้หมด”',
      aiResponse: 'ฟิสิกส์แบ่งเป็นกลศาสตร์ คลื่น ไฟฟ้า นิวเคลียร์... (สรุปแบบผิวเผิน ไม่ตรงกับจุดที่นักเรียนยังไม่เข้าใจ)',
      risk: 'ได้เนื้อหากว้างเกินไป อ่านแล้วไม่เข้าใจสูตรที่สงสัย และจำไม่ได้เมื่อเข้าห้องสอบ',
      humanScore: '3/10 (ไม่ได้ช่วยแก้จุดอ่อน)',
      issues: ['ขอบเขตกว้างเกินไป', 'ไม่เจาะจงบทที่ตนเองมีปัญหา']
    },
    goodPrompt: {
      text: '“ฉันกำลังทบทวนวิชาฟิสิกส์เรื่องกฎของนิวตัน ช่วยอธิบายความแตกต่างระหว่างกฎข้อ 1 และ 2 ด้วยตัวอย่างในชีวิตประจำวันที่เข้าใจง่าย พร้อมสุ่มคำถามทดสอบฉัน 1 ข้อ”',
      aiResponse: 'ได้เลยครับ! นึกถึงภาพนี้:\n• กฎข้อ 1 (ความเฉื่อย): เช่น เวลารถเมล์เบรกกะทันหัน ตัวเราพุ่งไปข้างหน้าเพราะวัตถุพยายามรักษาสภาพเดิม\n• กฎข้อ 2 (F=ma): ถ้าผลักรถเข็นเปล่าจะพุ่งเร็ว แต่ถ้ามีของเต็มคันต้องออกแรงมากเพื่อให้มีความเร่งเท่าเดิม\n\nคำถามทดสอบ: หากมวลเพิ่มขึ้น 2 เท่า แต่แรงคงที่ ความเร่งจะเป็นอย่างไร?',
      benefit: 'ได้คำอธิบายที่เห็นภาพ มีการจำลองข้อสอบแบบ Interactive ช่วยประเมินความเข้าใจทันที',
      humanScore: '10/10 (การเรียนรู้เชิงรุก Active Learning)',
      strengths: [
        'เจาะจงเนื้อหาเฉพาะจุด',
        'กำหนดให้ใช้ตัวอย่างชีวิตประจำวัน',
        'มี Interactive Quiz ให้ผู้เรียนได้ทดสอบตนเอง'
      ]
    }
  }
];

export const PromptLab: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('report-topic');
  const [activeTab, setActiveTab] = useState<'compare' | 'try'>('compare');

  // Custom try state
  const [roleInput, setRoleInput] = useState('ติวเตอร์คณิตศาสตร์ใจดี');
  const [taskInput, setTaskInput] = useState('อธิบายเรื่องความน่าจะเป็น');
  const [contextInput, setContextInput] = useState('สำหรับเตรียมสอบเข้ามหาวิทยาลัย');
  const [formatInput, setFormatInput] = useState('สรุป 3 ข้อสั้น ๆ พร้อมตัวอย่างไพ่หรือลูกเต๋า');

  const preset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm my-6">
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-5 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Interactive Prompt Laboratory</span>
            </div>
            <h3 className="text-xl font-bold">ห้องทดลองเปรียบเทียบ Prompt สำหรับนักเรียน</h3>
          </div>
          <div className="flex items-center bg-blue-900/50 p-1 rounded-xl text-xs font-medium self-start sm:self-auto border border-blue-400/30">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('compare');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'compare' ? 'bg-white text-blue-900 shadow-sm font-semibold' : 'text-blue-100 hover:text-white'
              }`}
            >
              เปรียบเทียบคำสั่ง
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('try');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'try' ? 'bg-white text-blue-900 shadow-sm font-semibold' : 'text-blue-100 hover:text-white'
              }`}
            >
              สร้างคำสั่งสูตร R-T-C-F
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'compare' ? (
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">เลือกตัวอย่างสถานการณ์:</span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPresetId(p.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedPresetId === p.id
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bad Prompt Box */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-200/80">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-rose-800 text-sm">แบบไม่เหมาะสม (ผลเสียระยะยาว)</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-semibold">
                    {preset.badPrompt.humanScore}
                  </span>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-rose-900 block mb-1">คำสั่งที่ใช้ (Prompt):</label>
                  <p className="p-3 bg-white rounded-lg border border-rose-200 text-rose-950 font-mono text-sm">
                    {preset.badPrompt.text}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">ผลลัพธ์จาก AI:</label>
                  <p className="p-3 bg-slate-50 rounded-lg text-slate-700 text-xs leading-relaxed border border-slate-200 font-mono">
                    {preset.badPrompt.aiResponse}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-rose-900 block">จุดบกพร่องสำคัญ:</span>
                  {preset.badPrompt.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-rose-800">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-200 text-xs text-rose-900 font-medium">
                ⚠️ ผลเสีย: {preset.badPrompt.risk}
              </div>
            </div>

            {/* Good Prompt Box */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-800 text-sm">แบบเหมาะสม (ใช้เป็นผู้ช่วยคิด)</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">
                    {preset.goodPrompt.humanScore}
                  </span>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-emerald-900 block mb-1">คำสั่งที่ใช้ (Prompt):</label>
                  <p className="p-3 bg-white rounded-lg border border-emerald-200 text-emerald-950 font-mono text-sm leading-relaxed">
                    {preset.goodPrompt.text}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-600 block mb-1">ผลลัพธ์จาก AI:</label>
                  <pre className="p-3 bg-slate-50 rounded-lg text-slate-700 text-xs leading-relaxed border border-slate-200 font-sans whitespace-pre-wrap">
                    {preset.goodPrompt.aiResponse}
                  </pre>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-emerald-900 block">จุดเด่นที่ทำให้เกิดการเรียนรู้:</span>
                  {preset.goodPrompt.strengths.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-emerald-800">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-200 text-xs text-emerald-900 font-medium">
                ✨ ประโยชน์: {preset.goodPrompt.benefit}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* R-T-C-F Prompt Builder */
        <div className="p-6">
          <div className="mb-4 text-xs text-slate-600">
            ทดลองประกอบคำสั่งตามสูตร <strong className="text-blue-700">R-T-C-F</strong> (Role, Task, Context, Format)
            เพื่อดูว่าคำสั่งที่สมบูรณ์มีหน้าตาอย่างไร:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-blue-900 mb-1">
                R - Role (บทบาทที่ให้ AI สวม)
              </label>
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น ติวเตอร์ฟิสิกส์, บรรณาธิการภาษา"
              />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-blue-900 mb-1">
                T - Task (ภารกิจหรือสิ่งที่ต้องการให้ช่วย)
              </label>
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น ช่วยอธิบายทฤษฎี, ช่วยเสนอ 3 ไอเดีย"
              />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-blue-900 mb-1">
                C - Context (บริบทและกลุ่มเป้าหมาย)
              </label>
              <input
                type="text"
                value={contextInput}
                onChange={(e) => setContextInput(e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น สำหรับนักศึกษามหาวิทยาลัยปี 1"
              />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-blue-900 mb-1">
                F - Format / Constraint (รูปแบบและข้อจำกัด)
              </label>
              <input
                type="text"
                value={formatInput}
                onChange={(e) => setFormatInput(e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น สรุปเป็น 3 ข้อย่อย สั้น ๆ ไม่เกิน 200 คำ"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                คำสั่ง Prompt แบบมือโปรที่ประกอบเสร็จแล้ว:
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setRoleInput('ติวเตอร์คณิตศาสตร์ใจดี');
                  setTaskInput('อธิบายเรื่องความน่าจะเป็น');
                  setContextInput('สำหรับเตรียมสอบเข้ามหาวิทยาลัย');
                  setFormatInput('สรุป 3 ข้อสั้น ๆ พร้อมตัวอย่างไพ่หรือลูกเต๋า');
                }}
                className="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                รีเซ็ตค่าเริ่มต้น
              </button>
            </div>
            <p className="p-3 bg-white rounded-lg border border-blue-200 font-mono text-sm text-slate-800 leading-relaxed shadow-xs">
              “คุณคือ {roleInput} ช่วย {taskInput} {contextInput} โดยขอให้ {formatInput}”
            </p>
            <p className="mt-2 text-xs text-blue-800">
              💡 เคล็ดลับ: การเขียนแบบนี้จะทำให้ AI เข้าใจขอบเขตงานได้ทันที ไม่ตอบกว้างเกินไป และได้คำตอบที่มีคุณภาพสูงสุด!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
