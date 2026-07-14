export interface ContactFormData {
  nombre: string
  empresa: string
  telefono: string
  correo: string
  ciudadOrigen: string
  ciudadDestino: string
  tipoCarga: string
  pesoAproximado: string
  mensaje: string
  honeypot?: string
}

export interface ApiResponse {
  success: boolean
  message: string
}
