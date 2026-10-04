import { services } from '../data/contactServices.js';
import { inject, reactive, ref, watch } from 'vue';
import { office } from '../config/office.js';

export function useContactForm() {
  const language = inject('language');

  const form = reactive({ name: '', email: '', service: services[0].en, description: '' });
  const status = ref('');
  watch(language, () => {
    status.value = '';
  });
  function submitRequest() {
    if (!office.email) {
      status.value =
        language.value === 'km'
          ? 'អ៊ីមែលការិយាល័យមិនទាន់បានកំណត់។ សំណើមិនត្រូវបានផ្ញើទេ។'
          : 'The office email is not configured. No request was sent.';
      return;
    }
    const body = `Name: ${form.name}\n\nEmail: ${form.email}\n\nService: ${form.service}\n\nDescription: ${form.description}`;
    window.location.href = `mailto:${encodeURIComponent(
      office.email,
    )}?subject=${encodeURIComponent('Appointment request')}&body=${encodeURIComponent(body)}`;
    status.value =
      language.value === 'km'
        ? 'សូមផ្ញើសំណើពីកម្មវិធីអ៊ីមែល ហើយរង់ចាំការបញ្ជាក់។'
        : 'Please send the prepared email and wait for office confirmation.';
  }

  return { services, form, status, submitRequest };
}
