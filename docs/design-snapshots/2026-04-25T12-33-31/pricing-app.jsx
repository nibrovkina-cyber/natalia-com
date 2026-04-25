// Tweaks app for pricing-v3.html
// Mounts the TweaksPanel and writes CSS variables on <html> live.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "heroSize": 88,
  "priceSize": 88,
  "sectionRhythm": 120,
  "cardRadius": 0,
  "showPhoto": true,
  "ctaCopy": "Попробовать бесплатно"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const r = document.documentElement;
  r.setAttribute('data-palette', t.palette);
  r.style.setProperty('--hero-size', t.heroSize + 'px');
  r.style.setProperty('--price-size', t.priceSize + 'px');
  r.style.setProperty('--section-rhythm', t.sectionRhythm + 'px');
  r.style.setProperty('--card-radius', t.cardRadius + 'px');
  document.body.dataset.showPhoto = t.showPhoto ? '1' : '0';
  document.querySelectorAll('[data-cta-primary]').forEach(el => {
    const arr = el.querySelector('.arr');
    el.firstChild.nodeValue = t.ctaCopy + ' ';
    if (!arr) {
      const s = document.createElement('span');
      s.className = 'arr';
      s.textContent = '→';
      el.appendChild(s);
    }
  });
}

function App() {
  const [t, setT] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette" />
      <TweakRadio label="Theme" value={t.palette}
        options={[{value:'warm',label:'Warm AI'},{value:'navy',label:'Navy'}]}
        onChange={v => setT('palette', v)} />

      <TweakSection label="Hero" />
      <TweakSlider label="Headline size" value={t.heroSize} min={56} max={128} unit="px"
        onChange={v => setT('heroSize', v)} />
      <TweakText label="Primary CTA copy" value={t.ctaCopy}
        onChange={v => setT('ctaCopy', v)} />
      <TweakToggle label="Show photo" value={t.showPhoto}
        onChange={v => setT('showPhoto', v)} />

      <TweakSection label="Pricing cards" />
      <TweakSlider label="Price size" value={t.priceSize} min={56} max={128} unit="px"
        onChange={v => setT('priceSize', v)} />
      <TweakSlider label="Card radius" value={t.cardRadius} min={0} max={24} unit="px"
        onChange={v => setT('cardRadius', v)} />

      <TweakSection label="Layout" />
      <TweakSlider label="Section rhythm" value={t.sectionRhythm} min={64} max={200} unit="px"
        onChange={v => setT('sectionRhythm', v)} />
    </TweaksPanel>
  );
}

const root = document.getElementById('tweaks-root');
applyTweaks(TWEAK_DEFAULTS);
ReactDOM.createRoot(root).render(<App />);
