import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';

interface CustomDatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
  placeholder?: string;
  align?: 'left' | 'right';
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value = '',
  onChange,
  className = '',
  placeholder = 'dd/mm/aaaa',
  align = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse initial value or default to current date
  const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/');
    if (day && month && year) {
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return null;
  };

  const initialDate = parseDate(value) || new Date(); // Use today as default view if no value
  const [selectedDate, setSelectedDate] = useState<Date | null>(parseDate(value));
  const [viewDate, setViewDate] = useState<Date>(initialDate);

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

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelectedDate(newDate);
    const formatted = `${day.toString().padStart(2, '0')}/${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${newDate.getFullYear()}`;
    if (onChange) {
      onChange(formatted);
    }
    setIsOpen(false); // Close on select
  };

  const handleClear = () => {
    setSelectedDate(null);
    if (onChange) {
      onChange('');
    }
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setViewDate(today);
    const formatted = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    if (onChange) {
      onChange(formatted);
    }
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const getDisplayValue = () => {
    if (selectedDate) {
      return `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()}`;
    }
    return '';
  };

  // Calendar logic
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 
  
  const prevMonthDays = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0).getDate();

  const renderCalendarDays = () => {
    const days = [];
    
    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="text-center py-1.5 text-sm text-gray-400">
          {prevMonthDays - i}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate && 
                         selectedDate.getDate() === i && 
                         selectedDate.getMonth() === viewDate.getMonth() && 
                         selectedDate.getFullYear() === viewDate.getFullYear();
                         
      days.push(
        <button
          key={`curr-${i}`}
          onClick={() => handleDateSelect(i)}
          className={`text-center py-1.5 text-sm rounded transition-colors ${
            isSelected 
              ? 'bg-[#1877F2] text-white font-bold' 
              : 'text-gray-700 hover:bg-slate-100'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next month days to fill grid (42 cells total)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="text-center py-1.5 text-sm text-gray-400">
          {i}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

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
      <CalendarIcon 
        size={16} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer pointer-events-none" 
      />

      {isOpen && (
        <div className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} mt-1 w-[280px] bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-4`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button className="flex items-center gap-1 font-bold text-slate-800 text-sm hover:text-sky-600 transition-colors">
              {monthNames[viewDate.getMonth()]} de {viewDate.getFullYear()}
              <ChevronDown size={14} className="text-slate-500" />
            </button>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded text-slate-600">
                <ArrowUp size={16} />
              </button>
              <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded text-slate-600">
                <ArrowDown size={16} />
              </button>
            </div>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 mb-2">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
              <div key={day + i} className="text-center text-xs font-semibold text-slate-800">
                {day}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {renderCalendarDays()}
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-4 pt-3 border-t border-slate-100">
            <button 
              onClick={handleClear}
              className="text-sm text-sky-500 hover:text-sky-600 font-medium px-2 py-1"
            >
              Borrar
            </button>
            <button 
              onClick={handleToday}
              className="text-sm text-sky-500 hover:text-sky-600 font-medium px-2 py-1"
            >
              Hoy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
