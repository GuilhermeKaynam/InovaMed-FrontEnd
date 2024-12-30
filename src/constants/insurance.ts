export const INSURANCE_OPTIONS = [
  'Unimed',
  'Bradesco Saúde',
  'SulAmérica',
  'Amil'
] as const;

export type InsuranceProvider = typeof INSURANCE_OPTIONS[number];