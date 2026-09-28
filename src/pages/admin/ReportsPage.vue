<script setup>
const reports = [
  { title: 'Fraudulent listing', count: 4, priority: 'High' },
  { title: 'Payment disputes', count: 2, priority: 'Medium' },
  { title: 'Profile verification', count: 9, priority: 'Low' },
]
</script>

```vue id="z1r4p2"
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Platform monitoring</span>
        <h1>Reports</h1>
        <p class="muted">
          Review reported activity and monitor platform issues.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="M4 19c0-1.1.9-2 2-2h14M8 7h8M8 11h8M8 15h5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>

        <span>{{ reports?.length || 0 }} reports</span>
      </div>
    </div>

    <!-- Reports Card -->
    <div class="card panel">
      <div class="panel-header">
        <div class="panel-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 4h14v16H5z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M8 8h8M8 12h8M8 16h5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <span class="section-eyebrow">Report center</span>
            <h2>Reported Activity</h2>
          </div>
        </div>

        <span class="count-badge">
          {{ reports?.length || 0 }}
        </span>
      </div>

      <!-- Empty State -->
      <div
        v-if="!reports?.length"
        class="empty-state"
      >
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3 3.8 6.5v5.2c0 4.5 3.2 7.8 8.2 9.3 5-1.5 8.2-4.8 8.2-9.3V6.5L12 3Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
            <path
              d="M12 8v4M12 15.5v.01"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <h3>No reports found</h3>
        <p>There are currently no reports to review.</p>
      </div>

      <!-- Report List -->
      <ul
        v-else
        class="list"
      >
        <li
          v-for="report in reports"
          :key="report.title"
          class="row item"
        >
          <!-- Report Info -->
          <div class="report-info">
            <div class="report-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 4h14v16H5z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 8h8M8 12h6M8 16h4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="report-text">
              <strong>{{ report.title }}</strong>
              <span>Platform report</span>
            </div>
          </div>

          <!-- Count -->
          <div class="report-count">
            <span class="count-label">Reports</span>
            <strong>{{ report.count }}</strong>
          </div>

          <!-- Priority -->
          <span
            :class="[
              'badge',
              report.priority?.toLowerCase() === 'high'
                ? 'badge-danger'
                : report.priority?.toLowerCase() === 'medium'
                  ? 'badge-warning'
                  : report.priority?.toLowerCase() === 'low'
                    ? 'badge-success'
                    : 'badge-muted'
            ]"
          >
            <span class="badge-dot"></span>
            {{ report.priority }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 40px);
  background:
    radial-gradient(
      circle at 88% 4%,
      rgba(16, 185, 129, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 8% 92%,
      rgba(20, 184, 166, 0.06),
      transparent 30%
    ),
    #f6f8f7;
  color: #17221d;
}

/* =========================
   Page Header
========================= */

.page-header {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  display: block;
  margin-bottom: 5px;
  color: #17845f;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #17221d;
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.page-header p {
  margin: 6px 0 0;
  color: #7b8881;
  font-size: 12px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #dceae3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: #557066;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.header-badge svg {
  width: 17px;
  height: 17px;
  color: #17845f;
}

/* =========================
   Main Card
========================= */

.card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 22px;
  box-sizing: border-box;
}

/* =========================
   Panel Header
========================= */

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 11px;
}

.title-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.title-icon svg {
  width: 21px;
  height: 21px;
}

.section-eyebrow {
  display: block;
  color: #17845f;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.panel-header h2 {
  margin: 4px 0 0;
  color: #24322b;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.count-badge {
  min-width: 30px;
  height: 26px;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #177653;
  font-size: 10px;
  font-weight: 850;
}

/* =========================
   Report List
========================= */

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 9px;
}

.item {
  min-height: 68px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 18px;
  padding: 12px 15px;
  box-sizing: border-box;
  border: 1px solid #e8eeeb;
  border-radius: 14px;
  background: #fff;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.item:hover {
  transform: translateY(-1px);
  border-color: #d7e8df;
  background: #fcfefd;
  box-shadow: 0 7px 20px rgba(28, 53, 43, 0.045);
}

/* =========================
   Report Info
========================= */

.report-info {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 11px;
}

.report-icon {
  width: 39px;
  height: 39px;
  flex: 0 0 39px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: #f0f8f4;
  border: 1px solid #dceee6;
  color: #16805c;
}

.report-icon svg {
  width: 19px;
  height: 19px;
}

.report-text {
  min-width: 0;
}

.report-text strong {
  display: block;
  overflow: hidden;
  color: #304038;
  font-size: 12px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.report-text span {
  display: block;
  margin-top: 3px;
  color: #8a958f;
  font-size: 9px;
}

/* =========================
   Count
========================= */

.report-count {
  min-width: 75px;
  text-align: right;
}

.count-label {
  display: block;
  margin-bottom: 3px;
  color: #929c97;
  font-size: 8px;
  font-weight: 750;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.report-count strong {
  color: #33443b;
  font-size: 16px;
  font-weight: 850;
}

/* =========================
   Priority Badge
========================= */

.badge {
  min-width: 72px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 9px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 850;
  line-height: 1;
  text-transform: capitalize;
  white-space: nowrap;
  border: 1px solid transparent;
}

.badge-dot {
  width: 5px;
  height: 5px;
  flex: 0 0 5px;
  border-radius: 50%;
  background: currentColor;
}

.badge-success {
  color: #177a55;
  background: #ecf9f2;
  border-color: #d3eee0;
}

.badge-warning {
  color: #9a6a13;
  background: #fff8e7;
  border-color: #f3e4bd;
}

.badge-danger {
  color: #b54848;
  background: #fff0f0;
  border-color: #f3d4d4;
}

.badge-muted {
  color: #68756f;
  background: #f1f4f2;
  border-color: #e0e6e2;
}

/* =========================
   Empty State
========================= */

.empty-state {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 18px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.empty-icon svg {
  width: 29px;
  height: 29px;
}

.empty-state h3 {
  margin: 0;
  color: #33423a;
  font-size: 16px;
  font-weight: 800;
}

.empty-state p {
  margin: 6px 0 0;
  color: #8a958f;
  font-size: 11px;
}

/* =========================
   Responsive
========================= */

@media (max-width: 700px) {
  .page {
    padding: 22px 18px;
  }

  .header-badge {
    display: none;
  }

  .panel {
    padding: 18px;
  }

  .item {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
  }

  .report-count {
    min-width: 55px;
  }

  .item > .badge {
    grid-column: 1 / -1;
    justify-self: flex-start;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .panel {
    padding: 14px;
    border-radius: 17px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .panel-header h2 {
    font-size: 16px;
  }

  .title-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .item {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 14px;
  }

  .report-count {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: left;
  }

  .count-label {
    margin: 0;
  }

  .report-count strong {
    font-size: 14px;
  }

  .item > .badge {
    width: fit-content;
    grid-column: auto;
  }

  .report-text strong {
    white-space: normal;
    line-height: 1.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .item {
    transition: none;
  }
}
</style>