const usd = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const GROUPS = [
  { id: "landed", title: "Landed to the slab", blurb: "$25k per 40HQ × 1.5, from a 3-house order." },
  { id: "pad", title: "Pad, patio, ties, crane, net", blurb: "Civil on Lot 127. Patio and net come off for shell-only." },
  { id: "labor", title: "Assembly", blurb: "90 hours, China crew + Belize crew." },
  { id: "mep", title: "Site MEP", blurb: "Needed to live in it empty. Off for shell on the pad." },
  { id: "add", title: "Add or take away", blurb: "Solar and a ground deck — both off until you turn them on." },
  { id: "ffe", title: "FF&E", blurb: "Furniture plus a 20 ft container DDP to the gate. Off when unfurnished." },
];

const LINES = [
  {
    id: "landed",
    g: "landed",
    label: "1.5 × 40HQ landed to the slab",
    amount: 37500,
    hint: "$25,000 per 40HQ × 1.5. Bulk of 3 houses (4.5 HQ).",
  },
  { id: "pad", g: "pad", label: "Concrete pad", amount: 12000 },
  { id: "patio", g: "pad", label: "Rock patio and landscape to the front door", amount: 6500 },
  { id: "tie", g: "pad", label: "Hurricane tie-downs", amount: 2500 },
  { id: "crane", g: "pad", label: "Crane to set the modules", amount: 3500 },
  {
    id: "mosquito",
    g: "pad",
    label: "Mosquito net on the walk-out balcony",
    amount: 2800,
    hint: "The balcony is the evening room. No ground deck.",
  },
  {
    id: "labor",
    g: "labor",
    label: "Assembly · 90 hours China + Belize",
    amount: 3780,
    hint: "9 × 10-hour days at $42 / hour billed.",
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

const SHELL = ["landed", "pad", "tie", "crane", "labor"];
const LIVEABLE = [...SHELL, "patio", "mosquito", "mep"];
const FFE = ["living", "kitchen", "bed1", "bed2", "bath", "install", "ffefreight"];

const PRESETS = [
  {
    id: "shell",
    label: "Shell on the pad",
    hint: "Landed modules, concrete pad, crane, ties, 90 hours to assemble. Empty shell.",
    ids: SHELL,
  },
  {
    id: "unfurnished",
    label: "Unfurnished, liveable",
    hint: "Under $100k — pad, rock patio, mosquito net, MEP. No furniture, no solar, no ground deck.",
    ids: LIVEABLE,
  },
  {
    id: "solar",
    label: "Unfurnished + solar",
    hint: "Liveable shell plus 5 kW solar and battery. Crosses $100k on this add.",
    ids: [...LIVEABLE, "solar"],
  },
  {
    id: "furnished",
    label: "Fully furnished",
    hint: "Liveable plus Caribbean Salt kit, install, and a 20 ft furniture container DDP to the gate.",
    ids: [...LIVEABLE, ...FFE],
  },
];

let preset = "unfurnished";
let on = new Set();

function applyPreset(id) {
  preset = id;
  const p = PRESETS.find((x) => x.id === id);
  on = new Set(p.ids);
  render();
}

function toggle(id) {
  preset = "custom";
  if (on.has(id)) on.delete(id);
  else on.add(id);
  render();
}

function toggleGroup(g) {
  preset = "custom";
  const rows = LINES.filter((l) => l.g === g);
  const allOn = rows.every((l) => on.has(l.id));
  for (const l of rows) {
    if (allOn) on.delete(l.id);
    else on.add(l.id);
  }
  render();
}

function sum(section) {
  return LINES.filter((l) => (!section || l.g === section) && on.has(l.id)).reduce(
    (s, l) => s + l.amount,
    0,
  );
}

function presetTotal(id) {
  const ids = new Set(PRESETS.find((x) => x.id === id).ids);
  return LINES.filter((l) => ids.has(l.id)).reduce((s, l) => s + l.amount, 0);
}

function render() {
  document.getElementById("preset-chips").innerHTML = PRESETS.map(
    (p) =>
      `<button type="button" class="${preset === p.id ? "on" : ""}" data-preset="${p.id}"><span>${p.label}</span><strong>${usd(presetTotal(p.id))}</strong></button>`,
  ).join("");

  document.getElementById("preset-hint").textContent =
    preset === "custom"
      ? "Custom mix — numbers update as you check lines."
      : PRESETS.find((p) => p.id === preset).hint;

  document.getElementById("boq-groups").innerHTML = GROUPS.map((g) => {
    const rows = LINES.filter((l) => l.g === g.id);
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
  }).join("");

  const total = sum();
  const names = {
    shell: "Shell on the pad",
    unfurnished: "Unfurnished, liveable",
    solar: "Unfurnished + solar",
    furnished: "Fully furnished",
    custom: "Custom mix",
  };
  document.getElementById("total-kicker").textContent = names[preset] || "Custom mix";
  document.getElementById("total-num").textContent = usd(total);
  document.getElementById("total-badge").textContent =
    total <= 100000
      ? "Under the $100k unfurnished target"
      : "Over $100k — turn solar, deck, or furniture off to come back under.";
  document.getElementById("total-dl").innerHTML = GROUPS.map(
    (g) => `<div><dt>${g.title}</dt><dd>${usd(sum(g.id))}</dd></div>`,
  ).join("");
}

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
