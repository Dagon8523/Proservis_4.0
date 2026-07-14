import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Constantes de contacto ─────────────────────────────────────
export const CONTACT_INFO = {
  phones: ["3114880034", "3144807148"],
  address: "Calle 8A N°33-04",
  email: "COMERCIAL@PROSERVIS.COM",
  emailAlt: ["GERENCIA@PROSERVIS.COM", "FACTURACION@PROSERVIS.COM"],
  whatsapp: "573114880034", // formato internacional sin +
} as const;

export const WHATSAPP_MESSAGE =
  "Hola, estoy interesado en los servicios de transporte de carga de PROSERVIS S.A.S. ¿Podrían darme más información?";

export function formatWhatsAppUrl(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}