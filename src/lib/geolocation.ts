// @/lib/geolocation.ts
// Utility to get user's country from Vercel geolocation headers
import { headers } from 'next/headers';

export type Country = 'IT' | 'CH' | 'IE' | 'GB' | string;

export async function getUserCountry(): Promise<Country> {
  try {
    const headersList = await headers();
    const country = headersList.get('x-vercel-ip-country') || 'IE'; // Default to Ireland
    return country;
  } catch (error) {
    return 'IE'; // Fallback to Ireland if headers unavailable
  }
}

export function getCountryLabel(country: Country): string {
  switch (country) {
    case 'IT':
      return 'Italia';
    case 'CH':
      return 'Svizzera';
    case 'IE':
      return 'Ireland';
    case 'GB':
      return 'UK';
    case 'RU':
      return 'Russia';
    default:
      return 'Worldwide';
  }
}

export function isSwissItalian(country: Country): boolean {
  return country === 'CH';
}

export function isItalian(country: Country): boolean {
  return country === 'IT';
}

export function isIrish(country: Country): boolean {
  return country === 'IE';
}

export function isUK(country: Country): boolean {
  return country === 'GB';
}
