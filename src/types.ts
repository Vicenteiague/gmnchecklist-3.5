export interface GmnFormData {
  nomeEmpresa: string;
  descricao: string;
  endereco: string;
  cep: string;
  dataAbertura: string;
  site: string;
  areaCobertura: string;
  servicos: string;
  produtos: string;
  horario: string;
  horarioSabado: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  observacoes: string;
}

export type FieldKey = keyof GmnFormData;

export interface FieldConfig {
  key: FieldKey;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'tel' | 'url' | 'date';
  category: 'basico' | 'localizacao' | 'atividades' | 'contato' | 'redes' | 'operacao';
  helpText?: string;
}
