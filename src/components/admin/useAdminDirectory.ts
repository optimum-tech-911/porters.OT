import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { CmsAdmin } from '../../types/cms';

export function useAdminDirectory() {
  const [admins, setAdmins] = useState<CmsAdmin[]>([]);

  useEffect(() => {
    let active = true;

    void supabase
      .from('cms_admins')
      .select('user_id,display_name,role,enabled')
      .eq('enabled', true)
      .order('display_name', { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error('[Admin] Unable to load the admin directory:', error);
          return;
        }
        setAdmins((data || []) as CmsAdmin[]);
      });

    return () => {
      active = false;
    };
  }, []);

  return admins;
}
