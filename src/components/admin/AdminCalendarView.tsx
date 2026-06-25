/**
 * AdminCalendarView — Month/week view calendar with meeting cards
 * TODO: Connect to real calendar backend when Supabase is ready.
 */
import { useState } from 'react';
import type { CalendarEvent } from '../../types/admin';
import { adminUsers } from '../../data/admin-demo.data';

interface Props {
  events: CalendarEvent[];
}

const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export default function AdminCalendarView({ events }: Props) {
  const [view, setView] = useState<'month' | 'week'>('month');
  const [memberFilter, setMemberFilter] = useState<string>('all');

  // Demo: show June 2026
  const year = 2026;
  const month = 5; // 0-indexed (June)

  const filteredEvents = memberFilter === 'all'
    ? events
    : events.filter((e) => e.member === memberFilter);

  const uniqueMembers = [...new Set(events.map((e) => e.member))];

  // Month view: build 6-week grid
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: { date: number; month: number; isCurrentMonth: boolean }[] = [];

  // Previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({ date: daysInPrevMonth - i, month: month - 1, isCurrentMonth: false });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ date: i, month, isCurrentMonth: true });
  }
  // Fill remaining to complete grid (up to 42 = 6 weeks)
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ date: i, month: month + 1, isCurrentMonth: false });
  }

  const getEventsForDate = (dateNum: number, m: number) => {
    const dateStr = `${year}-${String(m + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
    return filteredEvents.filter((e) => e.date === dateStr);
  };

  const today = 24; // June 24

  // Week view: show the week of June 22-28 (Mon-Sun)
  const weekDates = [22, 23, 24, 25, 26, 27, 28];
  const timeSlots = Array.from({ length: 10 }, (_, i) => `${String(8 + i).padStart(2, '0')}:00`);

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          <button
            className={`admin-calendar-nav-btn${view === 'month' ? ' active' : ''}`}
            onClick={() => setView('month')}
          >
            Mois
          </button>
          <button
            className={`admin-calendar-nav-btn${view === 'week' ? ' active' : ''}`}
            onClick={() => setView('week')}
          >
            Semaine
          </button>
        </div>

        <h3 className="admin-calendar-title">
          {view === 'month' ? `${monthNames[month]} ${year}` : `22 – 28 ${monthNames[month]} ${year}`}
        </h3>

        <select
          className="admin-filter-select"
          value={memberFilter}
          onChange={(e) => setMemberFilter(e.target.value)}
        >
          <option value="all">Tous les membres</option>
          {uniqueMembers.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      <div className="admin-calendar">
        {view === 'month' ? (
          <>
            <div className="admin-calendar-grid">
              {dayNames.map((d) => (
                <div key={d} className="admin-calendar-day-header">{d}</div>
              ))}
              {calendarDays.map((day, idx) => {
                const dayEvents = getEventsForDate(day.date, day.month);
                const isToday = day.isCurrentMonth && day.date === today;
                return (
                  <div
                    key={idx}
                    className={`admin-calendar-cell${!day.isCurrentMonth ? ' other-month' : ''}${isToday ? ' today' : ''}`}
                  >
                    <div className="admin-calendar-cell-date">
                      {isToday ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'rgba(25,43,99,0.08)', fontWeight: 700, color: '#192B63' }}>
                          {day.date}
                        </span>
                      ) : day.date}
                    </div>
                    {dayEvents.slice(0, 3).map((evt) => (
                      <div
                        key={evt.id}
                        className="admin-calendar-event"
                        style={{
                          background: evt.type === 'meeting' ? evt.color : evt.color,
                          color: evt.type === 'availability' ? '#192B63' : '#fff',
                        }}
                        title={`${evt.title} (${evt.startTime}–${evt.endTime})`}
                      >
                        {evt.startTime} {evt.title.split('—')[0].trim().slice(0, 18)}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div style={{ fontSize: '0.5625rem', color: 'var(--admin-text-muted)', padding: '0.125rem 0.375rem' }}>
                        +{dayEvents.length - 3} autres
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Week view */
          <div style={{ overflowX: 'auto' }}>
            <div className="admin-calendar-week" style={{ minWidth: 700 }}>
              {/* Header row */}
              <div className="admin-calendar-day-header" style={{ borderRight: '1px solid var(--admin-border)' }}></div>
              {weekDates.map((d, i) => (
                <div key={d} className="admin-calendar-day-header" style={{ textAlign: 'center' }}>
                  {dayNames[i]} {d}
                </div>
              ))}

              {/* Time slots */}
              {timeSlots.map((time) => (
                <>
                  <div key={`time-${time}`} className="admin-calendar-time-slot">{time}</div>
                  {weekDates.map((d) => {
                    const dateStr = `2026-06-${String(d).padStart(2, '0')}`;
                    const cellEvents = filteredEvents.filter(
                      (e) => e.date === dateStr && e.startTime <= time && e.endTime > time
                    );
                    return (
                      <div key={`${d}-${time}`} className="admin-calendar-week-cell">
                        {cellEvents.map((evt) => (
                          <div
                            key={evt.id}
                            className="admin-calendar-event"
                            style={{
                              background: evt.color,
                              color: evt.type === 'availability' ? '#192B63' : '#fff',
                              position: 'absolute',
                              inset: '1px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            title={evt.title}
                          >
                            {evt.title.slice(0, 20)}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: '#192B63', display: 'inline-block' }}></span>
          Confirmé
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: '#D6B45A', display: 'inline-block' }}></span>
          En attente
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: '#8896b3', display: 'inline-block' }}></span>
          Passé
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: 'rgba(25,43,99,0.1)', display: 'inline-block' }}></span>
          Disponibilité
        </div>
      </div>
    </div>
  );
}
