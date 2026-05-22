import { GmnFormData } from '../types';

export function formatWhatsappMessage(data: GmnFormData, progress: number): string {
  const fieldsMap: { [key in keyof GmnFormData]: { label: string; emoji: string } } = {
    nomeEmpresa: { label: 'Nome da Empresa', emoji: '🏢' },
    descricao: { label: 'Descrição', emoji: '📝' },
    endereco: { label: 'Endereço', emoji: '📍' },
    cep: { label: 'CEP', emoji: '📬' },
    dataAbertura: { label: 'Data de Abertura', emoji: '📅' },
    site: { label: 'Site', emoji: '🌐' },
    areaCobertura: { label: 'Área de Cobertura', emoji: '🗺️' },
    servicos: { label: 'Serviços', emoji: '🛠️' },
    produtos: { label: 'Produtos', emoji: '📦' },
    horario: { label: 'Horário de Funcionamento', emoji: '⏰' },
    horarioSabado: { label: 'Horário de Sábado', emoji: '⏰' },
    whatsapp: { label: 'WhatsApp', emoji: '💬' },
    facebook: { label: 'Facebook', emoji: '📘' },
    instagram: { label: 'Instagram', emoji: '📸' },
    linkedin: { label: 'LinkedIn', emoji: '💼' },
    tiktok: { label: 'TikTok', emoji: '🎵' },
    observacoes: { label: 'Observações Gerais', emoji: '✏️' },
  };

  let message = `🚀 *GMN CHECKLIST - GOOGLE MEU NEGÓCIO* 🚀\n`;
  message += `====================================\n\n`;

  (Object.keys(fieldsMap) as Array<keyof GmnFormData>).forEach((key) => {
    const field = fieldsMap[key];
    const val = data[key] ? data[key].trim() : '';
    message += `${field.emoji} *${field.label}:* ${val || '_Não informado_'}\n`;
  });

  message += `\n====================================\n`;
  message += `📊 *Progresso de Preenchimento:* ${progress}%\n`;
  message += `✨ Enviado em: ${new Date().toLocaleDateString('pt-BR')}\n`;

  return message;
}

export function getWhatsappShareUrl(data: GmnFormData, progress: number): string {
  const baseNumber = '5567993174612';
  const text = formatWhatsappMessage(data, progress);
  return `https://wa.me/${baseNumber}?text=${encodeURIComponent(text)}`;
}
export function getClaimProfileUrl(): string {
  return 'https://business.google.com/add';
}
