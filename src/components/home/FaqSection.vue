<script setup>
import { useSimpleMotion } from '../../utils/performance.js';

import { inject, onBeforeUnmount, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const language = inject('language', null);
const animations = new Map();

function finish(details, expanded) {
  details.open = expanded;
  gsap.set(details, { clearProps: 'height,overflow' });
  animations.delete(details);
}

function toggleAnswer(event) {
  event.preventDefault();
  const summary = event.currentTarget;
  const details = summary.parentElement;
  const previous = animations.get(details);
  const expanded = !(previous?.expanded ?? details.open);
  const startHeight = details.getBoundingClientRect().height;
  previous?.tween.kill();

  if (useSimpleMotion()) {
    finish(details, expanded);
    ScrollTrigger.refresh();
    return;
  }

  // Measure the natural destination, then keep the answer rendered while closing.
  gsap.set(details, { clearProps: 'height,overflow' });
  details.open = expanded;
  const endHeight = details.getBoundingClientRect().height;
  details.open = true;
  gsap.set(details, { height: startHeight, overflow: 'hidden' });

  const tween = gsap.to(details, {
    height: endHeight,
    duration: 0.38,
    ease: 'power2.inOut',
    onComplete: () => {
      finish(details, expanded);
      ScrollTrigger.refresh();
    },
  });
  animations.set(details, { tween, expanded });
}

function settleAnimations() {
  animations.forEach(({ tween, expanded }, details) => {
    tween.kill();
    finish(details, expanded);
  });
}

if (language) watch(language, settleAnimations);
onMounted(() => window.addEventListener('resize', settleAnimations));
onBeforeUnmount(() => {
  window.removeEventListener('resize', settleAnimations);
  settleAnimations();
});
</script>

<template>
  <section id="faq" class="alt faq">
    <div class="in faqgrid">
      <div class="list">
        <p class="eyebrow">FAQ</p>
        <h2><span class="en">Common questions</span><span class="km">សំណួរដែលសួរញឹកញាប់</span></h2>
        <p class="intro">
          <span class="en"
            >Answers to common questions about our notarial services, documents and
            appointments.</span
          ><span class="km">ចម្លើយចំពោះសំណួរទូទៅអំពីសេវាសារការី ឯកសារ និងការណាត់ជួប។</span>
        </p>
        <details>
          <summary @click="toggleAnswer">
            <span class="en">Which documents should I bring?</span
            ><span class="km">តើត្រូវនាំឯកសារអ្វីខ្លះ?</span>
          </summary>
          <p>
            <span class="en"
              >Prepare the documents you want reviewed and a valid identification document. Contact
              the office before your visit to confirm which originals, copies, and supporting
              documents to bring.</span
            >
            <span class="km"
              >សូមរៀបចំឯកសារដែលលោកអ្នកចង់ឱ្យពិនិត្យ និងឯកសារបញ្ជាក់អត្តសញ្ញាណដែលមានសុពលភាព។
              សូមទាក់ទងការិយាល័យមុនពេលមក ដើម្បីបញ្ជាក់ថាត្រូវនាំឯកសារដើម ច្បាប់ចម្លង
              និងឯកសារគាំទ្រអ្វីខ្លះ។</span
            >
          </p>
        </details>
        <details>
          <summary @click="toggleAnswer">
            <span class="en">Do I need to attend in person?</span
            ><span class="km">តើត្រូវមកដោយផ្ទាល់ទេ?</span>
          </summary>
          <p>
            <span class="en"
              >Please describe your request to the office before making travel arrangements. The
              team can confirm whether you and any other parties need to attend in person.</span
            >
            <span class="km"
              >សូមប្រាប់ការិយាល័យអំពីសំណើរបស់លោកអ្នក មុនពេលរៀបចំការធ្វើដំណើរ។
              ក្រុមការងារអាចបញ្ជាក់ថាតើលោកអ្នក និងភាគីពាក់ព័ន្ធផ្សេងទៀតត្រូវមកដោយផ្ទាល់ឬអត់។</span
            >
          </p>
        </details>
        <details>
          <summary @click="toggleAnswer">
            <span class="en">Do I need an appointment?</span
            ><span class="km">តើត្រូវណាត់ជួបជាមុនទេ?</span>
          </summary>
          <p>
            <span class="en"
              >Contact the office in advance to check availability and arrange a suitable time.
              Include a brief description of the service you need so you can confirm what to
              prepare.</span
            >
            <span class="km"
              >សូមទាក់ទងការិយាល័យជាមុន ដើម្បីសាកសួរពេលទំនេរ និងរៀបចំពេលវេលាសមស្រប។
              សូមពិពណ៌នាខ្លីៗអំពីសេវាដែលលោកអ្នកត្រូវការ ដើម្បីបញ្ជាក់អ្វីដែលត្រូវរៀបចំ។</span
            >
          </p>
        </details>
        <details>
          <summary @click="toggleAnswer">
            <span class="en">How are fees determined?</span
            ><span class="km">តើថ្លៃសេវាកំណត់យ៉ាងដូចម្តេច?</span>
          </summary>
          <p>
            <span class="en"
              >Request a quotation for your specific documents and service. Confirm what the quoted
              fee includes and whether any additional costs apply before proceeding.</span
            >
            <span class="km"
              >សូមស្នើសុំសម្រង់តម្លៃសម្រាប់ឯកសារ និងសេវាជាក់លាក់របស់លោកអ្នក។
              សូមបញ្ជាក់ថាតម្លៃនោះរួមបញ្ចូលអ្វីខ្លះ និងថាតើមានការចំណាយបន្ថែមឬអត់ មុនពេលបន្ត។</span
            >
          </p>
        </details>
        <details>
          <summary @click="toggleAnswer">
            <span class="en">How long does the service take?</span
            ><span class="km">តើសេវាចំណាយពេលប៉ុន្មាន?</span>
          </summary>
          <p>
            <span class="en"
              >Ask the office for an estimated completion time after describing your request and the
              documents available. If you have a deadline, mention it when arranging your
              appointment.</span
            >
            <span class="km"
              >សូមសាកសួរការិយាល័យអំពីពេលវេលាបញ្ចប់ដែលបានប៉ាន់ស្មាន បន្ទាប់ពីពិពណ៌នាសំណើ
              និងឯកសារដែលលោកអ្នកមាន។ ប្រសិនបើមានកាលបរិច្ឆេទកំណត់
              សូមជម្រាបនៅពេលរៀបចំការណាត់ជួប។</span
            >
          </p>
        </details>
        <details>
          <summary @click="toggleAnswer">
            <span class="en">Can documents be prepared for use abroad?</span
            ><span class="km">តើអាចរៀបចំឯកសារសម្រាប់ប្រើក្រៅប្រទេសបានទេ?</span>
          </summary>
          <p>
            <span class="en"
              >Tell the office which country and organisation will receive your documents, and share
              any instructions they provided. Ask the team to confirm whether it can assist with
              your request before proceeding.</span
            >
            <span class="km"
              >សូមជម្រាបការិយាល័យថាឯកសាររបស់លោកអ្នកនឹងត្រូវប្រើនៅប្រទេសណា និងស្ថាប័នណា
              ហើយផ្តល់ការណែនាំដែលស្ថាប័ននោះបានផ្តល់ជូន។
              សូមសាកសួរក្រុមការងារដើម្បីបញ្ជាក់ថាអាចជួយតាមសំណើរបស់លោកអ្នកបានឬអត់ មុនពេលបន្ត។</span
            >
          </p>
        </details>
        <details>
          <summary @click="toggleAnswer">
            <span class="en">Which languages does the office support?</span
            ><span class="km">ការិយាល័យគាំទ្រភាសាអ្វីខ្លះ?</span>
          </summary>
          <p>
            <span class="en"
              >Let the office know your preferred language and the language of your documents when
              you get in touch. Confirm the available language support and whether you need to
              arrange translation or interpretation.</span
            >
            <span class="km"
              >សូមជម្រាបការិយាល័យអំពីភាសាដែលលោកអ្នកចង់ប្រើ និងភាសានៃឯកសាររបស់លោកអ្នក នៅពេលទាក់ទង។
              សូមបញ្ជាក់អំពីជំនួយផ្នែកភាសាដែលមាន និងថាតើត្រូវរៀបចំការបកប្រែឯកសារ
              ឬការបកប្រែផ្ទាល់មាត់ឬអត់។</span
            >
          </p>
        </details>
      </div>
      <img
        loading="lazy"
        decoding="async"
        class="scales"
        src="/images/website-4.jpeg"
        alt="Golden scales of justice"
      />
    </div>
  </section>
</template>
