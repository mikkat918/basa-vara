<script setup>
const rows = [{ label: 'Fraud alerts', count: 4 }, { label: 'Chargebacks', count: 2 }, { label: 'Verification issues', count: 7 }]
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 19V5M4 19h16M8 16v-5M12 16V7M16 16v-8M20 16V4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Reporting & insights
        </span>

        <h1>Reports</h1>

        <p class="muted">
          Review platform reports and monitor important activity summaries.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 20V9m7 11V5m7 15v-8M3 20h18"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <span>{{ rows.length }} Reports</span>
      </div>
    </header>

    <!-- Main Reports Card -->
    <section class="card panel">
      <div class="panel-header">
        <div>
          <span class="section-eyebrow">Report overview</span>

          <h2>Platform reports</h2>

          <p class="muted">
            A quick overview of available reports and their current counts.
          </p>
        </div>

        <div class="count-badge">
          {{ rows.length }}
          <span>reports</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!rows.length" class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 3.5h9l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
            <path
              d="M14 3.5V8h5M8.5 12h7M8.5 15.5h7"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h3>No reports available</h3>

        <p class="muted">
          There are currently no report records to display.
        </p>
      </div>

      <!-- Reports Table -->
      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Report</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="row in rows"
              :key="row.label"
              class="report-row"
            >
              <td>
                <div class="report-cell">
                  <div class="report-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M6 19V9M10 19V5M14 19v-7M18 19V3"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>

                  <div class="report-copy">
                    <strong>{{ row.label }}</strong>
                    <span>Platform report</span>
                  </div>
                </div>
              </td>

              <td>
                <span class="count-value">
                  {{ row.count }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 3vw, 42px);
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
  margin: 0 auto 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.header-copy {
  min-width: 0;
}

.eyebrow,
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #17845f;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
}

.page h1 {
  margin: 7px 0 7px;
  color: #17221d;
  font-size: clamp(27px, 3vw, 38px);
  line-height: 1.1;
  letter-spacing: -0.035em;
  font-weight: 800;
}

.muted {
  color: #718078;
  line-height: 1.55;
}

.page-header .muted {
  margin: 0;
  font-size: 14px;
}

.header-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #d8e8e0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #28785b;
  font-size: 13px;
  font-weight: 750;
  box-shadow: 0 5px 18px rgba(23, 53, 42, 0.05);
}

.header-badge svg {
  width: 17px;
  height: 17px;
}

/* =========================
   Main Card
========================= */

.card {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  overflow: hidden;
}

/* =========================
   Panel Header
========================= */

.panel-header {
  min-height: 104px;
  padding: 23px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #edf1ef;
}

.panel-header h2 {
  margin: 5px 0 4px;
  color: #1b2821;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.panel-header .muted {
  margin: 0;
  font-size: 13px;
}

.count-badge {
  flex: 0 0 auto;
  min-width: 54px;
  padding: 9px 12px;
  border-radius: 12px;
  background: #eff9f4;
  color: #147b58;
  border: 1px solid #d8eee4;
  font-size: 15px;
  font-weight: 850;
  text-align: center;
}

.count-badge span {
  margin-left: 3px;
  color: #6b8277;
  font-size: 11px;
  font-weight: 650;
}

/* =========================
   Table
========================= */

.table-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  min-width: 620px;
  border-collapse: collapse;
  border-spacing: 0;
}

thead {
  background: #f8faf9;
}

th {
  padding: 14px 24px;
  color: #738079;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  border-bottom: 1px solid #e8eeeb;
}

th:last-child,
td:last-child {
  width: 180px;
  text-align: right;
}

td {
  padding: 17px 24px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #edf1ef;
}

tbody tr:last-child td {
  border-bottom: none;
}

.report-row {
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.report-row:hover {
  background: #fbfdfc;
}

/* =========================
   Report Cell
========================= */

.report-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.report-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #edf8f3;
  color: #16805c;
  border: 1px solid #dceee6;
}

.report-icon svg {
  width: 21px;
  height: 21px;
}

.report-copy {
  min-width: 0;
}

.report-copy strong {
  display: block;
  color: #26332d;
  font-size: 14px;
  font-weight: 750;
  line-height: 1.35;
}

.report-copy span {
  display: block;
  margin-top: 3px;
  color: #84918b;
  font-size: 11px;
  line-height: 1.3;
}

/* =========================
   Count
========================= */

.count-value {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  padding: 8px 12px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #f0f8f4;
  border: 1px solid #dceee6;
  color: #177653;
  font-size: 14px;
  font-weight: 850;
}

/* =========================
   Empty State
========================= */

.empty-state {
  min-height: 310px;
  padding: 45px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-icon {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  margin-bottom: 16px;
  border-radius: 18px;
  background: #eef8f4;
  color: #18815d;
  border: 1px solid #dceee6;
}

.empty-icon svg {
  width: 29px;
  height: 29px;
}

.empty-state h3 {
  margin: 0 0 6px;
  color: #29362f;
  font-size: 17px;
  font-weight: 800;
}

.empty-state p {
  margin: 0;
  max-width: 360px;
  font-size: 13px;
}

/* =========================
   Responsive
========================= */

@media (max-width: 850px) {
  .page {
    padding: 22px 18px;
  }

  .page-header {
    align-items: flex-start;
  }

  .panel-header {
    padding: 20px;
  }

  th,
  td {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 600px) {
  .page {
    padding: 18px 14px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 18px;
  }

  .header-badge {
    align-self: flex-start;
  }

  .page h1 {
    font-size: 27px;
  }

  .panel-header {
    min-height: auto;
    align-items: flex-start;
  }

  .panel-header h2 {
    font-size: 18px;
  }

  .count-badge {
    padding: 8px 10px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  td {
    padding-top: 14px;
    padding-bottom: 14px;
  }
}

@media (max-width: 460px) {
  .panel-header {
    flex-direction: column;
  }

  .count-badge {
    align-self: flex-start;
  }

  .report-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .report-copy strong {
    font-size: 13px;
  }

  .count-value {
    min-width: 50px;
    padding: 7px 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .report-row {
    transition: none;
  }
}
</style>