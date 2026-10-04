<template>
  <section id="map">
    <div class="in map-wrap">
      <div class="map-info">
        <p class="eyebrow">
          <span class="en">Office Location</span><span class="km">ទីតាំងការិយាល័យ</span>
        </p>
        <h2><span class="en">Visit our office</span><span class="km">ចូលមកការិយាល័យយើង</span></h2>
        <p class="lead">
          <span class="en">Address: [full office address pending], Phnom Penh, Cambodia</span
          ><span class="km">អាសយដ្ឋាន៖ [រង់ចាំ] ភ្នំពេញ កម្ពុជា</span>
        </p>
        <p>
          <span class="en">Opening hours and appointment requirements: pending.</span
          ><span class="km">ម៉ោងធ្វើការ និងលក្ខខណ្ឌណាត់ជួប៖ រង់ចាំ។</span>
        </p>
        <a class="btn" href="#contact"
          ><span class="en">Ask for Directions</span><span class="km">សួរអំពីទីតាំង</span></a
        >
      </div>
      <iframe
        class="office-map"
        title="Map of Phnom Penh, Cambodia"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125085.58246146356!2d104.9034752!3d11.557273599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1790957578914!5m2!1sen!2skh"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  </section>
</template>

<style scoped>
#map {
  padding-block: 0;
  padding-left: max(var(--page-gutter, 24px), calc((100% - var(--content-max-width)) / 2));
  padding-right: 0;
}

.map-info .eyebrow {
  font-family: var(--font-khmer);
}

.map-wrap {
  max-width: none;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: clamp(24px, 4vw, 64px);
}

.map-info {
  min-width: 0;
  align-self: start;
  padding-block: 48px;
}

.office-map {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 450px;
  border: 0;
  border-radius: 0;
  background: var(--cream2);
}

@media (max-width: 900px) {
  #map {
    padding-left: 20px;
    padding-right: 0;
  }

  .map-wrap {
    grid-template-columns: minmax(0, 1fr);
  }

  .map-info {
    padding-bottom: 0;
  }

  .office-map {
    height: clamp(320px, 60vw, 450px);
    min-height: 0;
  }
}
</style>
