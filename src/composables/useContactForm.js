import { services } from '../data/contactServices.js';
import { reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { office } from '../config/office.js';

export function useContactForm() {
  const { t, locale } = useI18n();

  const form = reactive({ name: '', email: '', service: services[0], description: '' });
  const status = ref('');
  watch(locale, () => {
    status.value = '';
  });
  function submitRequest() {
    if (!office.email) {
      status.value = t('contact.emailMissing');
      return;
    }
    const body = [
      `${t('contact.name')}: ${form.name}`,
      `${t('contact.email')}: ${form.email}`,
      `${t('contact.service')}: ${t(`contact.services.${services.indexOf(form.service)}`)}`,
      `${t('contact.documents')}: ${form.description}`,
    ].join('\n\n');
    window.location.href = `mailto:${encodeURIComponent(
      office.email,
    )}?subject=${encodeURIComponent(t('contact.emailSubject'))}&body=${encodeURIComponent(body)}`;
    status.value = t('contact.emailReady');
  }

  return { services, form, status, submitRequest };
}
