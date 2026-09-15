const usd = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const NOW_GROUPS = [
  { id: "landed", title: "Landed to the slab", blurb: "$25k per 40HQ × 1.5, from a two-house order (three full 40HQ)." },
  { id: "pad", title: "Pad, patio, ties, crane, paint, fee", blurb: "Civil on Lot 127. Paint and the management fee stay on for shell and unfurnished." },
  { id: "labor", title: "Assembly", blurb: "4 workers · $9,440 all-in for this house." },
  { id: "mep", title: "Site MEP", blurb: "Needed to live in it empty. Off for shell on the pad." },
  { id: "add", title: "Add or take away", blurb: "Solar and a ground deck — both off until you turn them on." },
  { id: "ffe", title: "FF&E", blurb: "Furniture plus a 20 ft container DDP to the gate. Off when unfurnished." },
];

const PREV_GROUPS = [
  { id: "landed", title: "Landed shell", blurb: "Factory house, ocean freight, Belize inland — as previously quoted." },
  { id: "civil", title: "Civil and MEP", blurb: "Slab, excavation, electrical, plumbing, ties, crane, contingency." },
  { id: "site", title: "On the lot", blurb: "400 sf screened teak deck, rail, fence." },
  { id: "labor", title: "Assembly", blurb: "12 days Belize crew." },
  { id: "ffe", title: "FF&E", blurb: "Caribbean Salt kit fitted before ship. That previous sheet had no separate 20 ft furniture container." },
];

const NOW_SHELL = ["landed", "pad", "tie", "crane", "crew-cn", "crew-bz", "paint", "pm"];
const NOW_LIVEABLE = [...NOW_SHELL, "patio", "mosquito", "mep"];
const NOW_FFE = ["living", "kitchen", "bed1", "bed2", "bath", "install", "ffefreight"];

const NOW_LINES = [
  {
    id: "landed",
    g: "landed",
    label: "1.5 × 40HQ landed to the slab",
    amount: 37500,
    hint: "$25,000 per 40HQ × 1.5. Two houses fill three full 40HQ — no half-empty box.",
  },
  { id: "pad", g: "pad", label: "Concrete pad", amount: 12000 },
  { id: "patio", g: "pad", label: "Rock patio and landscape to the front door", amount: 6500 },
  { id: "tie", g: "pad", label: "Hurricane tie-downs", amount: 2500 },
  { id: "crane", g: "pad", label: "Crane to set the modules", amount: 3500 },
  {
    id: "paint",
    g: "pad",
    label: "Marine-grade cream paint on steel · 5-year coat",
    amount: 4800,
    hint: "Creme white marine enamel on exposed steel beams. Recoat at year five.",
  },
  {
    id: "pm",
    g: "pad",
    label: "Project management and contingency fee",
    amount: 12000,
  },
  {
    id: "mosquito",
    g: "pad",
    label: "Mosquito net on the walk-out balcony",
    amount: 2800,
    hint: "The balcony is the evening room. No ground deck.",
  },
  {
    id: "crew-cn",
    g: "labor",
    label: "Chinese skilled crew · 2 workers, fly-in",
    amount: 7200,
    hint: "Tickets, hotel, food, salary. Factory net. Share of a four-home run: 115, 127, two gate spec houses.",
  },
  {
    id: "crew-bz",
    g: "labor",
    label: "Belize helpers · 2 workers",
    amount: 2240,
    hint: "7–10 days per two homes at $280/day.",
  },
  {
    id: "labor-later",
    g: "labor",
    label: "Later Belize-only assembly (after training)",
    amount: 3780,
    hint: "Off on the first four homes.",
  },
  { id: "mep", g: "mep", label: "MEP — electrical, plumbing, septic, cistern", amount: 13000 },
  {
    id: "solar",
    g: "add",
    label: "5 kW solar + battery",
    amount: 22000,
    hint: "Optional. Leave off to stay under $100k.",
  },
  {
    id: "deck",
    g: "add",
    label: "Optional 400 sf teak deck + screen + rail",
    amount: 26700,
    hint: "Off by default — the balcony is the deck.",
  },
  { id: "living", g: "ffe", label: "Living furniture", amount: 3315 },
  { id: "kitchen", g: "ffe", label: "Kitchen loose", amount: 840 },
  { id: "bed1", g: "ffe", label: "Primary bedroom", amount: 3030 },
  { id: "bed2", g: "ffe", label: "Guest bedroom", amount: 2345 },
  { id: "bath", g: "ffe", label: "Bath linen and hardware", amount: 320 },
  { id: "install", g: "ffe", label: "Factory fit and island install", amount: 30000 },
  {
    id: "ffefreight",
    g: "ffe",
    label: "20 ft FF&E container, DDP to the gate",
    amount: 12000,
    hint: "China port to the Moonlight Bay entrance. Furniture only — not the house.",
  },
  {
    id: "deckffe",
    g: "ffe",
    label: "400 sf deck furniture (only if you add the deck)",
    amount: 3215,
  },
];

const PREV_LINES = [
  { id: "shell", g: "landed", label: "Unfurnished shell", amount: 26250, hint: "Factory module, on site" },
  { id: "freight", g: "landed", label: "Ocean freight", amount: 19000 },
  { id: "inland", g: "landed", label: "Inland haul and duties", amount: 5000 },
  { id: "civil", g: "civil", label: "Civil — slab, excavation, site prep", amount: 22000 },
  { id: "mep", g: "civil", label: "MEP — electrical, plumbing, septic tie", amount: 13000 },
  { id: "tie", g: "civil", label: "Hurricane tie-downs", amount: 2500 },
  { id: "crane", g: "civil", label: "Crane", amount: 3500 },
  { id: "contingency", g: "civil", label: "Contingency", amount: 20000 },
  { id: "deck", g: "site", label: "400 sf teak deck", amount: 14000 },
  { id: "screen", g: "site", label: "Mosquito screen walls and roof", amount: 9500 },
  { id: "rail", g: "site", label: "Deck rail", amount: 3200 },
  { id: "fence", g: "site", label: "Wood fence", amount: 7200 },
  { id: "labor", g: "labor", label: "Assembly labor · 12 days", amount: 5040 },
  { id: "living", g: "ffe", label: "Living furniture", amount: 3315 },
  { id: "kitchen", g: "ffe", label: "Kitchen loose", amount: 840 },
  { id: "bed1", g: "ffe", label: "Primary bedroom", amount: 3030 },
  { id: "bed2", g: "ffe", label: "Bedroom 2", amount: 2345 },
  { id: "bath1", g: "ffe", label: "Bath 1", amount: 320 },
  { id: "bath2", g: "ffe", label: "Bath 2", amount: 320 },
  { id: "deckffe", g: "ffe", label: "Screened 400 sf deck furniture", amount: 3215 },
  { id: "install", g: "ffe", label: "Factory fit and island install", amount: 30000 },
];

const PREV_UNFURNISHED = ["shell", "freight", "inland", "civil", "mep", "tie", "crane", "contingency", "deck", "screen", "rail", "fence", "labor"];
const PREV_FURNISHED = PREV_UNFURNISHED.concat(["living", "kitchen", "bed1", "bed2", "bath1", "bath2", "deckffe", "install"]);

const STYLES = {
  now: {
    name: "This quote · PT190249",
    groups: NOW_GROUPS,
    lines: NOW_LINES,
    defaultPreset: "unfurnished",
    presets: [
      { id: "shell", label: "Shell on the pad", hint: "Landed modules, pad, crane, ties, cream marine paint, project management, 4-worker assembly.", ids: NOW_SHELL },
      { id: "unfurnished", label: "Unfurnished, liveable", hint: "Pad, rock patio, mosquito net, MEP, 4-worker assembly. No furniture, no solar, no ground deck.", ids: NOW_LIVEABLE },
      { id: "solar", label: "Unfurnished + solar", hint: "Liveable shell plus 5 kW solar and battery. Crosses $100k on this add.", ids: [...NOW_LIVEABLE, "solar"] },
      { id: "furnished", label: "Fully furnished", hint: "Liveable plus Caribbean Salt kit, install, and a 20 ft furniture container DDP to the gate.", ids: [...NOW_LIVEABLE, ...NOW_FFE] },
    ],
  },
  previous: {
    name: "Previous · two-story gable",
    groups: PREV_GROUPS,
    lines: PREV_LINES,
    defaultPreset: "furnished",
    presets: [
      { id: "landed", label: "Shell, landed", hint: "Factory + freight + inland — as on the previous sheet.", ids: ["shell", "freight", "inland"] },
      { id: "civil", label: "Shell + civil / MEP", hint: "Landed, plus slab, MEP, ties, crane, contingency.", ids: ["shell", "freight", "inland", "civil", "mep", "tie", "crane", "contingency"] },
      { id: "unfurnished", label: "Unfurnished on the lot", hint: "Previous gable ready to live in empty — 400 sf screened deck, no furniture.", ids: PREV_UNFURNISHED },
      { id: "furnished", label: "Fully furnished", hint: "The $193,575 all-in we quoted on Lot 127 before.", ids: PREV_FURNISHED },
    ],
  },
};

const ORDER = ["now", "previous"];

let styleId = "now";
let preset = "unfurnished";
let on = new Set();

function style() {
  return STYLES[styleId];
}
function lines() {
  return style().lines;
}
function groups() {
  return style().groups;
}
function presets() {
  return style().presets;
}

function applyPreset(id) {
  preset = id;
  const p = presets().find((x) => x.id === id);
  on = new Set(p.ids);
  render();
}

function applyStyle(id) {
  styleId = id;
  applyPreset(style().defaultPreset);
}

function toggle(id) {
  preset = "custom";
  if (on.has(id)) on.delete(id);
  else on.add(id);
  render();
}

function toggleGroup(g) {
  preset = "custom";
  const rows = lines().filter((l) => l.g === g);
  const allOn = rows.every((l) => on.has(l.id));
  for (const l of rows) {
    if (allOn) on.delete(l.id);
    else on.add(l.id);
  }
  render();
}

function sum(section) {
  return lines()
    .filter((l) => (!section || l.g === section) && on.has(l.id))
    .reduce((s, l) => s + l.amount, 0);
}

function presetTotal(id) {
  const ids = new Set(presets().find((x) => x.id === id).ids);
  return lines()
    .filter((l) => ids.has(l.id))
    .reduce((s, l) => s + l.amount, 0);
}

function render() {
  document.getElementById("style-chips").innerHTML = ORDER.map(
    (id) =>
      `<button type="button" class="${id === styleId ? "on" : ""}" data-style="${id}">${STYLES[id].name}</button>`,
  ).join("");

  document.getElementById("preset-chips").innerHTML = presets()
    .map(
      (p) =>
        `<button type="button" class="${preset === p.id ? "on" : ""}" data-preset="${p.id}"><span>${p.label}</span><strong>${usd(presetTotal(p.id))}</strong></button>`,
    )
    .join("");

  const active = presets().find((p) => p.id === preset);
  document.getElementById("preset-hint").textContent =
    preset === "custom" ? "Custom mix — numbers update as you check lines." : active.hint;

  document.getElementById("boq-groups").innerHTML = groups()
    .map((g) => {
      const rows = lines().filter((l) => l.g === g.id);
      const sub = sum(g.id);
      return `<article class="group">
      <div class="group-head">
        <div>
          <h3>${g.title}</h3>
          <p class="muted">${g.blurb}</p>
        </div>
        <div class="group-actions">
          <span class="tabular">${usd(sub)}</span>
          <button type="button" class="ghost" data-group="${g.id}">${sub > 0 ? "Remove group" : "Add group"}</button>
        </div>
      </div>
      <ul>${rows
        .map(
          (l) => `<li>
            <button type="button" role="checkbox" aria-checked="${on.has(l.id)}" data-line="${l.id}" class="row">
              <span class="box ${on.has(l.id) ? "checked" : ""}"></span>
              <span class="grow">
                <span class="${on.has(l.id) ? "" : "off"}">${l.label}</span>
                ${l.hint ? `<small class="muted">${l.hint}</small>` : ""}
              </span>
              <span class="tabular ${on.has(l.id) ? "" : "off"}">${usd(on.has(l.id) ? l.amount : 0)}</span>
            </button>
          </li>`,
        )
        .join("")}</ul>
    </article>`;
    })
    .join("");

  const total = sum();
  const names = {
    shell: "Shell on the pad",
    landed: "Shell, landed",
    civil: "Shell + civil / MEP",
    unfurnished: styleId === "now" ? "Unfurnished, liveable" : "Unfurnished on the lot",
    solar: "Unfurnished + solar",
    furnished: "Fully furnished",
    custom: "Custom mix",
  };
  document.getElementById("total-kicker").textContent = `${style().name} · ${names[preset] || "Custom mix"}`;
  document.getElementById("total-num").textContent = usd(total);

  const prevFurnished = 193575;
  if (styleId === "previous") {
    document.getElementById("total-badge").textContent =
      preset === "furnished"
        ? "The previous Lot 127 quote, all-in furnished"
        : "Previous two-story gable — switch lines to match that sheet";
  } else if (total <= 100000) {
    document.getElementById("total-badge").textContent =
      "Under $100k · saves " + usd(prevFurnished - total) + " vs previous furnished gable";
  } else {
    document.getElementById("total-badge").textContent =
      "Saves " + usd(prevFurnished - total) + " vs previous furnished gable · turn solar, deck, or furniture off to come back under $100k.";
  }

  document.getElementById("total-dl").innerHTML = groups()
    .map((g) => `<div><dt>${g.title}</dt><dd>${usd(sum(g.id))}</dd></div>`)
    .join("");
}

document.getElementById("style-chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-style]");
  if (b) applyStyle(b.dataset.style);
});
document.getElementById("preset-chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-preset]");
  if (b) applyPreset(b.dataset.preset);
});
document.getElementById("boq-groups").addEventListener("click", (e) => {
  const g = e.target.closest("[data-group]");
  if (g) return toggleGroup(g.dataset.group);
  const l = e.target.closest("[data-line]");
  if (l) toggle(l.dataset.line);
});

applyPreset("unfurnished");
