<script setup>
import { useContactForm } from '../../composables/useContactForm.js';
const { services, form, status, submitRequest } = useContactForm();
</script>
<template>
  <section id="contact" class="ct">
    <div class="in">
      <div>
        <div class="tag">
          <b>04</b><span class="en">CONTACT</span><span class="km">ទំនាក់ទំនង</span>
        </div>
        <h2>
          <span class="en">Let us discuss what you need</span
          ><span class="km">សូមពិភាក្សាអំពីតម្រូវការរបស់លោកអ្នក</span>
        </h2>
        <p class="intro">
          <span class="en"
            >Tell us about the document you need notarised or certified. Our office will reply to
            confirm your requirements and arrange a time.</span
          ><span class="km"
            >សូមប្រាប់យើងអំពីឯកសារដែលលោកអ្នកត្រូវការធ្វើសារការី ឬបញ្ជាក់។ ការិយាល័យរបស់យើងនឹងឆ្លើយតប
            ដើម្បីបញ្ជាក់តម្រូវការ និងកំណត់ពេលណាត់ជួប។</span
          >
        </p>
        <div class="office">
          <small><span class="en">Office</span><span class="km">ការិយាល័យ</span></small
          ><b
            ><span class="en">Phnom Penh, Kingdom of Cambodia</span
            ><span class="km">រាជធានីភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា</span></b
          ><i><span class="en">By appointment</span><span class="km">ជួបតាមការណាត់ជាមុន</span></i>
        </div>
      </div>
      <form @submit.prevent="submitRequest">
        <div class="row">
          <label class="f"
            ><span class="en">Full name</span><span class="km">ឈ្មោះពេញ</span
            ><input
              name="Name"
              v-model="form.name"
              :placeholder="language === 'km' ? 'ឈ្មោះរបស់លោកអ្នក' : 'Your full name'"
              required
          /></label>
          <label class="f"
            ><span class="en">Email address</span><span class="km">អាសយដ្ឋានអ៊ីមែល</span
            ><input
              name="Email"
              v-model="form.email"
              type="email"
              placeholder="name@email.com"
              required
          /></label>
        </div>
        <label class="f sel"
          ><span class="en">Service required</span><span class="km">សេវាកម្មដែលត្រូវការ</span
          ><select name="Service" v-model="form.service">
            <option v-for="service in services" :key="service.en" :value="service.en">
              {{ service[language] }}
            </option>
          </select></label
        >
        <label class="f"
          ><span class="en">What documents do you have?</span
          ><span class="km">តើលោកអ្នកមានឯកសារអ្វីខ្លះ?</span
          ><textarea
            name="Description"
            v-model="form.description"
            :placeholder="
              language === 'km'
                ? 'សូមរៀបរាប់ខ្លីៗអំពីឯកសារ និងគោលបំណង'
                : 'Briefly describe your documents and their purpose'
            "
          ></textarea>
        </label>
        <button class="go2" type="submit">
          <span class="en">Prepare Appointment Request</span><span class="km">រៀបចំសំណើណាត់ជួប</span
          ><span>→</span>
        </button>
        <p id="form-status" class="form-status" role="status" aria-live="polite">
          {{ status }}
        </p>
        <p class="fine">
          <span class="en"
            >Once the office email is configured, this form opens your email application. Please
            send the prepared email; the office will confirm the appointment. Do not include
            confidential information. <span>Privacy policy to be added</span></span
          ><span class="km"
            >នៅពេលកំណត់អ៊ីមែលការិយាល័យរួច បែបបទនេះនឹងបើកកម្មវិធីអ៊ីមែលរបស់លោកអ្នក។
            សូមផ្ញើអ៊ីមែលដែលបានរៀបចំ ហើយការិយាល័យនឹងបញ្ជាក់ការណាត់ជួប។ សូមកុំបញ្ចូលព័ត៌មានសម្ងាត់។
            <span>នឹងបន្ថែមគោលការណ៍ឯកជនភាព</span></span
          >
        </p>
      </form>
    </div>
  </section>
</template>
