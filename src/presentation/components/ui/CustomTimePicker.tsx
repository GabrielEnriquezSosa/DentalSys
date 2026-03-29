import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CustomTimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
  placeholder?: string;
}

export const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value = '',
  onChange,
  className = '',
  placeholder = '--:--',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse initial value or default to 10:00 a.m.
  const initialMatch = value.match(/(\d{1,2}):(\d{2})\s*(a\.m\.|p\.m\.)/i);
  const [hour, setHour] = useState(initialMatch ? initialMatch[1].padStart(2, '0') : '10');
  const [minute, setMinute] = useState(initialMatch ? initialMatch[2] : '00');
  const [period, setPeriod] = useState(initialMatch ? initialMatch[3].toLowerCase() : 'a.m.');

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const periods = ['a.m.', 'p.m.'];

  const handleTimeChange = (h: string, m: string, p: string) => {
    setHour(h);
    setMinute(m);
    setPeriod(p);
    if (onChange) {
      onChange(`${h}:${m} ${p}`);
    }
  };

  const getDisplayValue = () => {
    if (value) return value;
    if (!isOpen && !value && hour === '10' && minute === '00' && period === 'a.m.') return ''; // completely empty state
    return `${hour}:${minute} ${period}`;
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        className={`${className} cursor-pointer`}
        placeholder={placeholder}
        value={getDisplayValue()}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
      />
      <Clock 
        size={16} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer pointer-events-none" 
      />

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-[240px] bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="flex bg-white h-48">
            {/* Hours Column */}
            <div className="flex-1 overflow-y-auto border-r border-slate-100 flex flex-col no-scrollbar">
              {hours.map((h) => (
                <button
                  key={`h-${h}`}
                  type="button"
                  onClick={() => handleTimeChange(h, minute, period)}
                  className={`py-2 text-center text-sm font-medium transition-colors ${
                    hour === h
                      ? 'bg-[#1877F2] text-white border border-blue-600 font-bold m-1 rounded'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Minutes Column */}
            <div className="flex-1 overflow-y-auto border-r border-slate-100 flex flex-col no-scrollbar">
              {minutes.map((m) => (
                <button
                  key={`m-${m}`}
                  type="button"
                  onClick={() => handleTimeChange(hour, m, period)}
                  className={`py-2 text-center text-sm font-medium transition-colors ${
                    minute === m
                      ? 'bg-[#1877F2] text-white border border-blue-600 font-bold m-1 rounded'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Period Column */}
            <div className="flex-1 overflow-y-auto flex flex-col no-scrollbar">
              {periods.map((p) => (
                <button
                  key={`p-${p}`}
                  type="button"
                  onClick={() => handleTimeChange(hour, minute, p)}
                  className={`py-2 text-center text-sm font-medium transition-colors ${
                    period === p
                      ? 'bg-[#1877F2] text-white border border-blue-600 font-bold m-1 rounded'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
