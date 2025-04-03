// utils/getLocalizedLink.ts
import { useParams } from 'next/navigation';

export const getLocalizedLink = (path: string) => {
  const params = useParams();
  const locale = params.locale as string;
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
};