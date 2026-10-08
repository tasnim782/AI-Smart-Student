import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Check, X, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

interface DataItem {
  id: string;
  name: string;
  category: string;
  isSafe: boolean;
  reason: string;
  guideline: string;
}

const DATA_ITEMS: DataItem[] = [
  {
    id: 'id-card',
    name: 'รูปถ่ายบัตรประชาชน หรือ เลขประจำตัว 13 หลัก',
    category: 'ข้อมูลระบุตัวตน (PII)',
    isSafe: false,
    reason: 'เป็นข้อมูลส่วนบุคคลที่มีความอ่อนไหวสูง หากหลุดไปอาจถูกนำไปสวมรอยทำธุรกรรมหรือกู้เงินได้',
    guideline: 'ห้ามป้อนเด็ดขาด ไม่ว่ากรณีใดก็ตาม'
  },
  {
    id: 'math-formula',
    name: 'โจทย์สมการฟิสิกส์ หรือ ทฤษฎีบททางคณิตศาสตร์',
    category: 'ข้อมูลวิชาการสาธารณะ',
    isSafe: true,
    reason: 'เป็นความรู้สาธารณะ ไม่มีข้อมูลที่สามารถเชื่อมโยงถึงตัวบุคคลหรือก่อให้เกิดความเสียหาย',
    guideline: 'ปลอดภัย สามารถให้ AI ช่วยอธิบายวิธีคำนวณได้เต็มที่'
  },
  {
    id: 'friend-contact',
    name: 'รายชื่อและเบอร์โทรศัพท์ของเพื่อนร่วมชั้นทั้งห้อง',
    category: 'ข้อมูลส่วนตัวของผู้อื่น',
    isSafe: false,
    reason: 'การนำข้อมูลของผู้อื่นไปป้อนให้ระบบภายนอกโดยไม่ได้รับความยินยอม ละเมิดกฎหมาย PDPA',
    guideline: 'ห้ามป้อน หากต้องการวิเคราะห์ข้อมูลให้ลบชื่อและเบอร์ออกก่อน'
  },
  {
    id: 'password',
    name: 'รหัสผ่านเข้า Wi-Fi มหาวิทยาลัย หรือ รหัสผ่านอีเมล',
    category: 'ข้อมูลความปลอดภัยระบบ',
    isSafe: false,
    reason: 'รหัสผ่านอาจถูกบันทึกในฐานข้อมูลฝึกโมเดลและอาจรั่วไหลสู่ผู้อื่นได้',
    guideline: 'ห้ามป้อนเด็ดขาด!'
  },
  {
    id: 'essay-draft',
    name: 'ร่างเรียงความภาษาอังกฤษที่เราเขียนเอง เพื่อให้ช่วยตรวจ Grammar',
    category: 'ผลงานการเรียนรู้ของผู้เรียน',
    isSafe: true,
    reason: 'ไม่มีข้อมูลระบุตัวบุคคล และเป็นการใช้ AI ตรวจสอบภาษาเพื่อพัฒนาทักษะตนเอง',
    guideline: 'ปลอดภัยและแนะนำ แต่อย่าลืมตรวจทานว่าไม่มีข้อมูลส่วนตัวหลงเหลืออยู่ในข้อความ'
  }
];

export const PrivacyScanner: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(DATA_ITEMS[0].id);

  const activeItem = DATA_ITEMS.find((item) => item.id === selectedId) || DATA_ITEMS[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs my-6">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-4 text-white">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>Interactive Privacy Scanner</span>
        </div>
        <h3 className="text-lg font-bold">เครื่องมือตรวจเช็ก: ข้อมูลนี้ "ปลอดภัย" ที่จะใส่ใน AI หรือไม่?</h3>
        <p className="text-slate-300 text-xs mt-1">
          คลิกเลือกประเภทข้อมูลด้านล่าง เพื่อดูการประเมินความเสี่ยงตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA)
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {DATA_ITEMS.map((item) => {
            const isCurrent = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedId(item.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer border ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.isSafe ? (
                  <Check className={`w-3.5 h-3.5 ${isCurrent ? 'text-emerald-300' : 'text-emerald-600'}`} />
                ) : (
                  <X className={`w-3.5 h-3.5 ${isCurrent ? 'text-rose-300' : 'text-rose-600'}`} />
                )}
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            activeItem.isSafe
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/70 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-black/10">
            <div className="flex items-center gap-2.5">
              {activeItem.isSafe ? (
                <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
              ) : (
                <ShieldAlert className="w-7 h-7 text-rose-600 shrink-0" />
              )}
              <div>
                <span className="text-xs uppercase font-bold tracking-wider opacity-75">
                  ประเภท: {activeItem.category}
                </span>
                <h4 className="text-base font-bold">{activeItem.name}</h4>
              </div>
            </div>
            <div
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto ${
                activeItem.isSafe
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-rose-600 text-white shadow-xs'
              }`}
            >
              {activeItem.isSafe ? '✅ ปลอดภัยที่จะนำเข้า AI' : '🚫 อันตราย! ห้ามนำเข้า AI'}
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div>
              <strong className="font-semibold block mb-0.5">เหตุผลความเสี่ยง:</strong>
              <p className="opacity-90">{activeItem.reason}</p>
            </div>
            <div className="pt-2">
              <strong className="font-semibold block mb-0.5">แนวทางปฏิบัติที่ถูกต้อง:</strong>
              <p className="font-medium underline underline-offset-2">{activeItem.guideline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
