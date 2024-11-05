export interface ContactInfo {
  wpp: string;
  phone: string;
}

export interface BrandNumbers {
  peugeot: ContactInfo;
  citroen: ContactInfo;
  ds: ContactInfo;
  fiat: ContactInfo;
}

export interface Numbers {
  VentaDirecta: BrandNumbers;
  PlanAhorro: BrandNumbers;
  Postventa: BrandNumbers;
  VentaRespuestos: BrandNumbers;
  CompraVentaUsados: BrandNumbers;
}