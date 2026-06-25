/**
 * AdminCalendarContent — Calendar interface wrapper
 * TODO: Connect to real calendar backend (Supabase) when ready.
 */
import AdminPageHeader from '../AdminPageHeader';
import AdminCalendarView from '../AdminCalendarView';
import { calendarEvents } from '../../../data/admin-demo.data';

export default function AdminCalendarContent() {
  return (
    <div>
      <AdminPageHeader
        title="Calendrier"
        subtitle="Vue d'ensemble des rendez-vous et disponibilités"
      />
      <AdminCalendarView events={calendarEvents} />
    </div>
  );
}
