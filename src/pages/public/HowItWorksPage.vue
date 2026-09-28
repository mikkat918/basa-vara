<script setup>
const tenantSteps = [
  {
    number: '01',
    title: 'Find a place that fits',
    text: 'Search available homes by area, rent, bedrooms, and the features that matter to you.',
  },
  {
    number: '02',
    title: 'Review the details',
    text: 'Compare photos, amenities, availability, and listing information before you reach out.',
  },
  {
    number: '03',
    title: 'Talk with the landlord',
    text: 'Send a message to ask questions and arrange a viewing. Your conversation stays in your account.',
  },
  {
    number: '04',
    title: 'Arrange your move',
    text: 'Meet, confirm the terms directly, and complete your rental agreement before moving in.',
  },
]

const landlordSteps = [
  'Create a listing with clear photos, accurate rent, and complete property details.',
  'Submit it for review and keep its availability up to date.',
  'Reply to tenant questions and arrange viewings through messages.',
]
</script>

<template>
  <div class="how-page">
    <section class="hero">
      <div class="container hero-inner">
        <span class="eyebrow">A simpler way to rent</span>
        <h1>How Basa Vara works</h1>
        <p>From your first search to your first day at home, keep the important steps clear and in one place.</p>
        <div class="hero-actions">
          <RouterLink class="btn btn-primary" to="/properties">Browse homes</RouterLink>
          <RouterLink class="text-link" to="/register">Create an account <span aria-hidden="true">→</span></RouterLink>
        </div>
      </div>
    </section>

    <main class="container content">
      <section aria-labelledby="tenant-heading">
        <div class="section-intro">
          <span class="eyebrow">For tenants</span>
          <h2 id="tenant-heading">Your next home, step by step</h2>
          <p>Take your time to compare listings and speak with the landlord before making a decision.</p>
        </div>

        <ol class="steps">
          <li v-for="step in tenantSteps" :key="step.number" class="step-card">
            <span class="step-number">{{ step.number }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="landlord-section" aria-labelledby="landlord-heading">
        <div class="landlord-copy">
          <span class="eyebrow">For landlords</span>
          <h2 id="landlord-heading">Reach people looking for a home</h2>
          <p>Share an accurate listing, respond to interested tenants, and manage your properties from your landlord dashboard.</p>
          <RouterLink class="btn btn-secondary" to="/register?role=landlord">List your property</RouterLink>
        </div>
        <ol class="landlord-steps">
          <li v-for="(step, index) in landlordSteps" :key="step">
            <span>{{ index + 1 }}</span>
            <p>{{ step }}</p>
          </li>
        </ol>
      </section>

      <section class="closing">
        <div>
          <h2>Ready to get started?</h2>
          <p>Explore current listings and find a place that feels right.</p>
        </div>
        <RouterLink class="btn btn-primary" to="/properties">Search properties</RouterLink>
      </section>
    </main>
  </div>
</template>

<style scoped>
.how-page { min-height: 60vh; color: #1c2923; }
.hero { padding: clamp(56px, 8vw, 104px) 0; background: linear-gradient(135deg, #f0f8f3, #f8faf8 65%); border-bottom: 1px solid #e2eae5; }
.hero-inner { max-width: 960px; }
.eyebrow { display: inline-block; color: #16734b; font-size: 0.78rem; font-weight: 750; letter-spacing: .08em; text-transform: uppercase; }
h1 { max-width: 700px; margin-top: 14px; font-size: clamp(2.2rem, 5vw, 3.5rem); }
.hero p { max-width: 620px; margin-top: 18px; color: #5e6d65; font-size: 1.1rem; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 22px; margin-top: 28px; }
.text-link { font-weight: 650; }
.content { padding-top: clamp(44px, 7vw, 76px); padding-bottom: 72px; }
.section-intro { max-width: 680px; }
.section-intro h2, .landlord-copy h2 { margin-top: 9px; font-size: clamp(1.6rem, 3vw, 2.2rem); }
.section-intro > p, .landlord-copy > p { margin-top: 12px; color: #64736a; }
.steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin: 30px 0 0; padding: 0; list-style: none; }
.step-card { display: flex; flex-direction: column; gap: 24px; min-height: 210px; padding: 22px; border: 1px solid #e0e8e3; border-radius: 12px; background: #fff; box-shadow: 0 2px 8px rgb(24 46 34 / 4%); transition: transform .18s ease, box-shadow .18s ease; }
.step-card:hover { transform: translateY(-3px); box-shadow: 0 12px 26px rgb(24 46 34 / 9%); }
.step-number { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 10px; background: #eaf5ee; color: #16734b; font-weight: 750; }
.step-card h3 { font-size: 1.1rem; }
.step-card p { margin-top: 8px; color: #64736a; font-size: .95rem; }
.landlord-section { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 72px; padding: clamp(24px, 5vw, 42px); border: 1px solid #e0e8e3; border-radius: 16px; background: #fff; }
.landlord-copy .btn { margin-top: 22px; }
.landlord-steps { display: grid; gap: 18px; margin: 0; padding: 0; list-style: none; }
.landlord-steps li { display: flex; align-items: flex-start; gap: 14px; }
.landlord-steps li > span { display: grid; place-items: center; flex: 0 0 30px; height: 30px; border-radius: 50%; background: #f0f5f2; color: #16734b; font-weight: 700; }
.landlord-steps p { color: #53635a; }
.closing { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 56px; padding: 28px 0 0; border-top: 1px solid #e0e8e3; }
.closing h2 { font-size: 1.4rem; }
.closing p { margin-top: 6px; color: #64736a; }
@media (max-width: 900px) { .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .steps, .landlord-section { grid-template-columns: 1fr; } .step-card { min-height: auto; gap: 16px; } .landlord-section { gap: 30px; margin-top: 48px; } .closing { align-items: flex-start; flex-direction: column; } }
@media (prefers-reduced-motion: reduce) { .step-card { transition: none; } .step-card:hover { transform: none; } }
</style>
