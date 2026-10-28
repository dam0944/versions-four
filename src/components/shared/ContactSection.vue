<script setup>
import { useI18n } from "vue-i18n";
import { useContactForm } from "../../composables/useContactForm.js";

const { t } = useI18n();
const { services, form, status, submitRequest } = useContactForm();
</script>

<template>
  <section id="contact" class="ct">
    <div class="in">
      <div>
        <div class="tag">
          <b>06</b><span>{{ t("contact.label") }}</span>
        </div>
        <h2>{{ t("contact.title") }}</h2>
        <p class="intro">{{ t("contact.intro") }}</p>
        <div class="office">
          <small>{{ t("contact.officeLabel") }}</small>
          <b>{{ t("contact.location") }}</b>
          <i>{{ t("contact.appointmentOnly") }}</i>
        </div>
      </div>
      <form @submit.prevent="submitRequest">
        <div class="row">
          <label class="f">
            <span>{{ t("contact.name") }}</span>
            <input
              v-model="form.name"
              name="Name"
              :placeholder="t('contact.namePlaceholder')"
              required
            />
          </label>
          <label class="f">
            <span>{{ t("contact.email") }}</span>
            <input
              v-model="form.email"
              name="Email"
              type="email"
              placeholder="name@email.com"
              required
            />
          </label>
        </div>
        <label class="f sel">
          <span>{{ t("contact.service") }}</span>
          <select v-model="form.service" name="Service">
            <option v-for="(service, index) in services" :key="service" :value="service">
              {{ t(`contact.services.${index}`) }}
            </option>
          </select>
        </label>
        <label class="f">
          <span>{{ t("contact.documents") }}</span>
          <textarea
            v-model="form.description"
            name="Description"
            :placeholder="t('contact.documentsPlaceholder')"
          ></textarea>
        </label>
        <button class="go2" type="submit">
          {{ t("contact.submit") }}
          <span aria-hidden="true">→</span>
        </button>
        <p id="form-status" class="form-status" role="status" aria-live="polite">
          {{ status }}
        </p>
        <p class="fine">
          {{ t("contact.privacyNote") }} <span>{{ t("contact.privacyPolicy") }}</span>
        </p>
      </form>
    </div>
  </section>
</template>
