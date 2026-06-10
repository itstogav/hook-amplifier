import { useState } from "react";

const HOOK_TYPES = [
  {
    id: "problem_aware",
    label: "Problem Aware",
    description: "Names a problem the viewer already knows they have.",
    example: "I was skipping breakfast every single morning.",
    color: "#E8590C",
  },
  {
    id: "problem_solution",
    label: "Problem Solution",
    description: "Problem and resolution delivered in the same breath.",
    example: "I was running on empty until I found this.",
    color: "#2D6A4F",
  },
  {
    id: "curiosity",
    label: "Curiosity",
    description: "Disarming and unexpected. Creates a pattern interrupt.",
    example: "I didn't expect this to be so good.",
    color: "#185FA5",
  },
  {
    id: "social_proof",
    label: "Social Proof",
    description: "Numbers, time, or crowd behaviour as the opener.",
    example: "3,000 people bought this last week and I finally understand why.",
    color: "#6B3FA0",
  },
  {
    id: "contrarian",
    label: "Contrarian",
    description: "Challenges an assumption the viewer holds.",
    example: "You don't need a $400 Vitamix. You never did.",
    color: "#B5451B",
  },
  {
    id: "transformation",
    label: "Transformation",
    description: "Before and after compressed into one line.",
    example: "Six months ago I was exhausted by 9am. One thing changed that.",
    color: "#0D7377",
  },
  {
    id: "urgency",
    label: "Urgency / Direct CTA",
    description: "Leads with the offer or the stakes.",
    example: "This is 50% off right now and you need to see why.",
    color: "#8A5A00",
  },
];

const SYSTEM_PROMPT = `You are an expert ecommerce ad copywriter specialising in short-form video hooks for Meta, TikTok, and Instagram Reels. You write in a natural, unscripted tone — conversational, not salesy. Hooks are 10 to 20 words maximum. Never use em dashes. Respond only with valid JSON.`;

async function callClaude(messages, maxTokens = 1500) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  const data = await res.json();
  const text = data.content?.find((b) => b.type === "text")?.text || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ── Styles ────────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0C0C0B;
    --surface: #161614;
    --surface2: #1E1E1B;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.15);
    --white: #F5F4F0;
    --mid: #888880;
    --orange: #1877F2;
    --orange-dim: rgba(24,119,242,0.10);
    --grad: linear-gradient(135deg, #1877F2 0%, #00C8FF 100%);
    --grad-full: linear-gradient(135deg, #0A1628 0%, #1877F2 50%, #00C8FF 100%);
    --grad-dim: linear-gradient(135deg, rgba(24,119,242,0.12) 0%, rgba(0,200,255,0.12) 100%);
    --green: rgba(45,106,79,0.15);
    --radius: 10px;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--white);
    min-height: 100vh;
    font-size: 14px;
    line-height: 1.6;
  }

  .app {
    max-width: 860px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Header */
  .header {
    margin-bottom: 40px;
  }
  .header-tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: var(--grad);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
  }
  .header h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 800;
    color: var(--white);
    line-height: 1.05;
    margin-bottom: 10px;
  }
  .header h1 span { background: var(--grad-full); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .header p {
    font-size: 14px;
    color: var(--mid);
    max-width: 480px;
    line-height: 1.7;
  }

  /* Step indicator */
  .steps {
    display: flex;
    gap: 0;
    margin-bottom: 36px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .step {
    flex: 1;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    font-weight: 500;
    color: var(--mid);
    border-right: 1px solid var(--border);
    transition: background 0.2s;
  }
  .step:last-child { border-right: none; }
  .step.active { background: rgba(24,119,242,0.1); color: var(--white); }
  .step.done { color: #00C8FF; }
  .step-num {
    width: 20px; height: 20px;
    border-radius: 50%;
    border: 1px solid currentColor;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700;
    flex-shrink: 0;
  }
  .step.active .step-num { background: var(--grad); border-color: transparent; color: #fff; }
  .step.done .step-num { background: var(--grad); border-color: transparent; color: #fff; }

  /* URL Input */
  .url-section { margin-bottom: 32px; }
  .url-label {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--mid); margin-bottom: 10px;
  }
  .url-row {
    display: flex; gap: 10px;
  }
  .url-input {
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 13px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--white);
    outline: none;
    transition: border-color 0.2s;
  }
  .url-input::placeholder { color: var(--mid); }
  .url-input:focus { border-color: #1877F2; }

  /* Buttons */
  .btn {
    padding: 13px 22px;
    border-radius: var(--radius);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .btn-primary {
    background: var(--grad);
    color: #fff;
  }
  .btn-primary:hover { opacity: 0.88; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--mid);
  }
  .btn-ghost:hover { border-color: var(--border-hover); color: var(--white); }
  .btn-generate {
    width: 100%;
    padding: 16px;
    font-size: 15px;
    background: var(--grad);
    color: #fff;
    border-radius: var(--radius);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    cursor: pointer;
    border: none;
    margin-top: 24px;
    transition: opacity 0.15s;
  }
  .btn-generate:hover { opacity: 0.88; }
  .btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Loading */
  .loading {
    display: flex; align-items: center; gap: 12px;
    padding: 20px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--mid);
    font-size: 13px;
  }
  .spinner {
    width: 18px; height: 18px;
    border: 2px solid var(--border);
    border-top-color: var(--orange);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Product preview */
  .product-preview {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 20px;
    margin-bottom: 28px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .product-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--grad);
    margin-top: 5px;
    flex-shrink: 0;
  }
  .product-name {
    font-weight: 600;
    font-size: 13px;
    color: var(--white);
    margin-bottom: 2px;
  }
  .product-desc {
    font-size: 12px;
    color: var(--mid);
    line-height: 1.6;
  }

  /* Section heading */
  .section-heading {
    margin-bottom: 20px;
  }
  .section-tag {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    background: var(--grad);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 6px;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px; font-weight: 700;
    color: var(--white); margin-bottom: 4px;
  }
  .section-sub {
    font-size: 12px; color: var(--mid);
  }

  /* Hook type group */
  .hook-group {
    margin-bottom: 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .hook-group-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }
  .hook-type-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .hook-type-name {
    font-weight: 700;
    font-size: 13px;
    color: var(--white);
    flex: 1;
  }
  .hook-type-desc {
    font-size: 11px;
    color: var(--mid);
  }
  .hook-options {
    background: var(--bg);
  }
  .hook-option {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 13px 16px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.15s;
  }
  .hook-option:last-child { border-bottom: none; }
  .hook-option:hover { background: var(--surface2); }
  .hook-option.selected { background: var(--grad-dim); }
  .hook-radio {
    width: 18px; height: 18px;
    border-radius: 50%;
    border: 1.5px solid var(--border-hover);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    transition: all 0.15s;
  }
  .hook-option.selected .hook-radio {
    border-color: #1877F2;
    background: var(--grad);
  }
  .hook-radio-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: white;
    display: none;
  }
  .hook-option.selected .hook-radio-dot { display: block; }
  .hook-option-text {
    font-size: 13px;
    color: var(--white);
    line-height: 1.6;
    flex: 1;
  }
  .hook-option-num {
    font-size: 10px;
    font-weight: 600;
    color: var(--mid);
    margin-top: 2px;
    width: 14px;
    flex-shrink: 0;
  }

  /* Selection count */
  .selection-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin-bottom: 16px;
    font-size: 13px;
  }
  .selection-count {
    color: var(--mid);
  }
  .selection-count strong { color: var(--white); }
  .selection-pips {
    display: flex; gap: 4px;
  }
  .pip {
    width: 20px; height: 4px;
    border-radius: 2px;
    background: var(--border);
    transition: background 0.2s;
  }
  .pip.filled { background: var(--grad); }

  /* Results */
  .results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .results-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(24,119,242,0.1);
    border: 1px solid rgba(24,119,242,0.25);
    border-radius: 100px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    color: #00C8FF;
  }

  .result-group {
    margin-bottom: 20px;
  }
  .result-group-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius) var(--radius) 0 0;
    border-bottom: none;
  }
  .result-group-name {
    font-weight: 700;
    font-size: 12px;
    color: var(--white);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .result-items {
    border: 1px solid var(--border);
    border-radius: 0 0 var(--radius) var(--radius);
    overflow: hidden;
  }
  .result-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 13px 16px;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
    cursor: pointer;
    position: relative;
  }
  .result-item:last-child { border-bottom: none; }
  .result-item:hover { background: var(--surface2); }
  .result-num {
    font-size: 10px;
    font-weight: 700;
    color: var(--mid);
    width: 18px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .result-text {
    font-size: 13px;
    color: var(--white);
    line-height: 1.6;
    flex: 1;
  }
  .copy-btn {
    font-size: 10px;
    font-weight: 600;
    color: var(--mid);
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 3px 8px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.15s;
    font-family: 'Inter', sans-serif;
  }
  .copy-btn:hover { border-color: var(--border-hover); color: var(--white); }
  .copy-btn.copied { color: #00C8FF; border-color: rgba(0,200,255,0.3); }

  /* Copy all */
  .copy-all-row {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;
  }

  /* Error */
  .error {
    background: rgba(220,38,38,0.08);
    border: 1px solid rgba(220,38,38,0.2);
    border-radius: var(--radius);
    padding: 14px 18px;
    font-size: 13px;
    color: #FCA5A5;
    margin-bottom: 16px;
  }

  /* Divider */
  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 32px 0;
  }

  @media (max-width: 600px) {
    .steps { flex-direction: column; }
    .step { border-right: none; border-bottom: 1px solid var(--border); }
    .step:last-child { border-bottom: none; }
    .url-row { flex-direction: column; }
    .hook-type-desc { display: none; }
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

export default function HookAmplifier() {
  const [url, setUrl]               = useState("");
  const [product, setProduct]       = useState(null);
  const [hookOptions, setHookOptions] = useState(null);
  const [selected, setSelected]     = useState({});
  const [results, setResults]       = useState(null);
  const [loading, setLoading]       = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError]           = useState("");
  const [copied, setCopied]         = useState({});
  const [step, setStep]             = useState(1);

  const selectionCount = Object.keys(selected).length;
  const allSelected    = selectionCount === 7;

  // Step 1 — analyse product URL and generate 3 hooks per type
  async function analyseProduct() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setLoadingMsg("Analysing your product...");

    try {
      const prompt = `Analyse this product URL and generate video ad hooks for it: ${url}

Return a JSON object with this exact structure:
{
  "product": {
    "name": "short product name",
    "description": "one sentence describing what it does and who it is for"
  },
  "hooks": {
    "problem_aware": ["hook 1", "hook 2", "hook 3"],
    "problem_solution": ["hook 1", "hook 2", "hook 3"],
    "curiosity": ["hook 1", "hook 2", "hook 3"],
    "social_proof": ["hook 1", "hook 2", "hook 3"],
    "contrarian": ["hook 1", "hook 2", "hook 3"],
    "transformation": ["hook 1", "hook 2", "hook 3"],
    "urgency": ["hook 1", "hook 2", "hook 3"]
  }
}

Rules for hooks:
- Each hook is 10 to 20 words maximum
- Natural, conversational tone. Not salesy.
- Written as if a real customer is speaking
- No em dashes
- No hashtags
- Make each of the 3 variations meaningfully different from each other
- problem_aware: name a specific problem the viewer already has. No solution yet.
- problem_solution: state the problem and the fix in the same breath
- curiosity: unexpected, disarming, makes them want to know more
- social_proof: lead with a number, crowd behaviour, or review signal
- contrarian: challenge a common assumption about the product category
- transformation: before and after compressed into one line
- urgency: lead with the offer, deadline, or stakes`;

      setLoadingMsg("Generating your 21 hook options...");
      const data = await callClaude([{ role: "user", content: prompt }], 2000);
      setProduct(data.product);
      setHookOptions(data.hooks);
      setSelected({});
      setResults(null);
      setStep(2);
    } catch (e) {
      setError("Could not analyse that URL. Try pasting your product description instead, or check the URL and try again.");
    } finally {
      setLoading(false);
      setLoadingMsg("");
    }
  }

  // Step 2 — generate 5 variations of each selected hook
  async function generateVariations() {
    if (!allSelected) return;
    setLoading(true);
    setError("");
    setLoadingMsg("Generating your 35 ad openers...");

    try {
      const selectedHooks = HOOK_TYPES.map((ht) => ({
        type: ht.id,
        label: ht.label,
        chosen: hookOptions[ht.id][selected[ht.id]],
      }));

      const prompt = `I have selected one hook per hook type for my product: ${product.name} (${product.description}).

For each selected hook below, write 5 variations that keep the same emotional angle and structure but use different specific wording. Each variation should feel like a fresh ad opener, not just a synonym swap.

${selectedHooks.map((h) => `${h.label}: "${h.chosen}"`).join("\n")}

Return a JSON object with this exact structure:
{
  "problem_aware": ["variation 1", "variation 2", "variation 3", "variation 4", "variation 5"],
  "problem_solution": ["variation 1", "variation 2", "variation 3", "variation 4", "variation 5"],
  "curiosity": ["variation 1", "variation 2", "variation 3", "variation 4", "variation 5"],
  "social_proof": ["variation 1", "variation 2", "variation 3", "variation 4", "variation 5"],
  "contrarian": ["variation 1", "variation 2", "variation 3", "variation 4", "variation 5"],
  "transformation": ["variation 1", "variation 2", "variation 3", "variation 4", "variation 5"],
  "urgency": ["variation 1", "variation 2", "variation 3", "variation 4", "variation 5"]
}

Rules:
- 10 to 20 words each maximum
- Natural, unscripted tone
- No em dashes, no hashtags
- Each variation is meaningfully different, not just a word swap
- Stay true to the hook type's psychological angle`;

      const data = await callClaude([{ role: "user", content: prompt }], 2500);
      setResults(data);
      setStep(3);
    } catch (e) {
      setError("Something went wrong generating variations. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMsg("");
    }
  }

  function selectHook(typeId, index) {
    setSelected((prev) => ({ ...prev, [typeId]: index }));
  }

  function copyText(text, key) {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 1500);
  }

  function copyAll() {
    const lines = [];
    HOOK_TYPES.forEach((ht) => {
      if (results?.[ht.id]) {
        lines.push(`--- ${ht.label.toUpperCase()} ---`);
        results[ht.id].forEach((v, i) => lines.push(`${i + 1}. ${v}`));
        lines.push("");
      }
    });
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied((prev) => ({ ...prev, all: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, all: false })), 1500);
  }

  function reset() {
    setUrl(""); setProduct(null); setHookOptions(null);
    setSelected({}); setResults(null); setError(""); setStep(1);
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* Header */}
        <div className="header">
          <div className="header-tag">The Business Builders</div>
          <h1>Hook <span>Amplifier</span></h1>
          <p>Enter your product URL. Pick one hook per type. Get 35 unique ad openers ready to film.</p>
        </div>

        {/* Steps */}
        <div className="steps">
          {[
            { n: 1, label: "Product URL" },
            { n: 2, label: "Pick your hooks" },
            { n: 3, label: "35 openers" },
          ].map(({ n, label }) => (
            <div
              key={n}
              className={`step ${step === n ? "active" : step > n ? "done" : ""}`}
            >
              <div className="step-num">{step > n ? "✓" : n}</div>
              {label}
            </div>
          ))}
        </div>

        {/* Error */}
        {error && <div className="error">{error}</div>}

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner" />
            {loadingMsg}
          </div>
        )}

        {/* STEP 1 — URL input */}
        {!loading && step === 1 && (
          <div className="url-section">
            <div className="url-label">Product URL or description</div>
            <div className="url-row">
              <input
                className="url-input"
                type="text"
                placeholder="e.g. https://www.yourstore.com/products/your-product-name"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && analyseProduct()}
              />
              <button className="btn btn-primary" onClick={analyseProduct} disabled={!url.trim()}>
                Analyse
              </button>
            </div>
            <div style={{ fontSize: 11, color: "var(--mid)", marginTop: 8, lineHeight: 1.6 }}>
              Copy the full URL from your browser address bar — include the https:// at the start.
              Example: https://www.yourstore.com/products/portable-charger
            </div>
          </div>
        )}

        {/* STEP 2 — Hook selection */}
        {!loading && step === 2 && hookOptions && (
          <>
            {product && (
              <div className="product-preview">
                <div className="product-dot" />
                <div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.description}</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 11, padding: "6px 12px" }} onClick={reset}>
                  Change
                </button>
              </div>
            )}

            <div className="section-heading">
              <div className="section-tag">Step 2 of 3</div>
              <div className="section-title">Pick your favourite hook for each type</div>
              <div className="section-sub">Select one per row. You need all 7 to generate your 35 variations.</div>
            </div>

            {/* Selection progress */}
            <div className="selection-bar">
              <div className="selection-count">
                <strong>{selectionCount}</strong> of 7 hook types selected
              </div>
              <div className="selection-pips">
                {HOOK_TYPES.map((ht) => (
                  <div key={ht.id} className={`pip ${selected[ht.id] !== undefined ? "filled" : ""}`} />
                ))}
              </div>
            </div>

            {HOOK_TYPES.map((ht) => (
              <div className="hook-group" key={ht.id}>
                <div className="hook-group-header">
                  <div className="hook-type-dot" style={{ background: ht.color }} />
                  <div className="hook-type-name">{ht.label}</div>
                  <div className="hook-type-desc">{ht.description}</div>
                  {selected[ht.id] !== undefined && (
                    <div style={{ fontSize: 11, color: "#00C8FF", fontWeight: 600 }}>Selected</div>
                  )}
                </div>
                <div className="hook-options">
                  {(hookOptions[ht.id] || []).map((hook, idx) => (
                    <div
                      key={idx}
                      className={`hook-option ${selected[ht.id] === idx ? "selected" : ""}`}
                      onClick={() => selectHook(ht.id, idx)}
                    >
                      <div className="hook-option-num">{idx + 1}</div>
                      <div className="hook-radio">
                        <div className="hook-radio-dot" />
                      </div>
                      <div className="hook-option-text">{hook}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              className="btn-generate"
              onClick={generateVariations}
              disabled={!allSelected}
            >
              {allSelected ? "Generate my 35 ad openers" : `Select all 7 hooks to continue (${selectionCount}/7)`}
            </button>
          </>
        )}

        {/* STEP 3 — Results */}
        {!loading && step === 3 && results && (
          <>
            {product && (
              <div className="product-preview">
                <div className="product-dot" />
                <div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.description}</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 11, padding: "6px 12px" }} onClick={reset}>
                  Start over
                </button>
              </div>
            )}

            <div className="results-header">
              <div className="section-heading" style={{ marginBottom: 0 }}>
                <div className="section-tag">Step 3 of 3</div>
                <div className="section-title">Your 35 ad openers</div>
                <div className="section-sub">5 variations per hook type. Film the body and CTA once. Swap the opener.</div>
              </div>
              <div className="results-badge">
                <span>✓</span> 35 unique openers
              </div>
            </div>

            {HOOK_TYPES.map((ht, gi) => (
              <div className="result-group" key={ht.id}>
                <div className="result-group-header">
                  <div className="hook-type-dot" style={{ background: ht.color, width: 8, height: 8, borderRadius: "50%", flexShrink: 0 }} />
                  <div className="result-group-name">{ht.label}</div>
                </div>
                <div className="result-items">
                  {(results[ht.id] || []).map((v, i) => {
                    const key = `${ht.id}-${i}`;
                    const adNum = gi * 5 + i + 1;
                    return (
                      <div className="result-item" key={i}>
                        <div className="result-num">{adNum}</div>
                        <div className="result-text">{v}</div>
                        <button
                          className={`copy-btn ${copied[key] ? "copied" : ""}`}
                          onClick={() => copyText(v, key)}
                        >
                          {copied[key] ? "Copied" : "Copy"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="copy-all-row">
              <button className="btn btn-ghost" onClick={() => setStep(2)}>
                Back to selection
              </button>
              <button
                className={`btn btn-primary ${copied.all ? "copied" : ""}`}
                onClick={copyAll}
              >
                {copied.all ? "Copied all 35!" : "Copy all 35"}
              </button>
            </div>
          </>
        )}

      </div>
    </>
  );
}
