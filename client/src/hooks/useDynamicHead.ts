import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useActiveSection, sections } from './useActiveSection';
import { setFaviconHref, buildCircularFavicon } from '../lib/favicon';

// Keep in sync with the <title> in index.html, which is what shows before the
// app hydrates.
const SITE_NAME = 'Stancy Ngereso';

export const useDynamicHead = () => {
  const { activeSection } = useActiveSection();

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: api.settings.get,
  });

  const s = settings as Record<string, string> | undefined;
  const heroImageUrl = s?.heroImageUrl ?? null;

  // Update <title> on every section change
  useEffect(() => {
    const section = sections.find(sec => sec.id === activeSection);
    const label = section?.label ?? 'Portfolio';
    document.title = activeSection === 'hero'
      ? `${SITE_NAME} — Portfolio`
      : `${label} | ${SITE_NAME}`;
  }, [activeSection]);

  // Update favicon whenever heroImageUrl changes
  useEffect(() => {
    if (!heroImageUrl) {
      setFaviconHref('/favicon.svg');
      return;
    }
    buildCircularFavicon(heroImageUrl).then((dataUrl) => {
      setFaviconHref(dataUrl || '/favicon.svg');
    });
  }, [heroImageUrl]);
};
