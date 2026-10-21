export function setupExportMotion() {
  const cleanups = [setupCanvasFrames(), setupCapturedTimelines(), setupMarquees(), setupPulsingDots(), setupRotatingWords(), setupScrollNavVariants(), setupCapturedScrollStates(), setupEntryVariants(), setupCardVariants(), setupScrollProgressLines(), setupRotatingLogo(), setupComparisonSliders(), setupPolygonComparisons(), setupServiceCardHover(), setupCapturedHover(), setupNetlifyContactForm()];
  return () => cleanups.forEach(cleanup => cleanup());
}

function setupNetlifyContactForm() {
  const form = document.querySelector('form[data-netlify="true"][name="contact"]');
  if (!form || form.dataset.netlifyReady) return () => {};
  form.dataset.netlifyReady = 'true';

  let status = form.querySelector('[data-netlify-status]');
  if (!status) {
    status = document.createElement('p');
    status.className = 'netlify-form-status';
    status.dataset.netlifyStatus = '';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.append(status);
  }

  const submit = async event => {
    event.preventDefault();
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      status.textContent = 'O envio será ativado depois da publicação no Netlify.';
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    status.textContent = 'Enviando…';

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!response.ok) throw new Error('Falha ao enviar o formulário.');
      form.reset();
      status.textContent = 'Mensagem enviada. Obrigado pelo contato!';
    } catch {
      status.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
    } finally {
      if (button) {
        button.disabled = false;
      }
    }
  };

  form.addEventListener('submit', submit);
  return () => {
    form.removeEventListener('submit', submit);
    delete form.dataset.netlifyReady;
  };
}

function setupMarquees() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const animations = [];
  for (const track of document.querySelectorAll('ul')) {
    const items = [...track.children].filter(item => item.classList.contains('ticker-item'));
    const viewport = track.parentElement;
    if (items.length < 4 || !viewport || !['hidden', 'clip'].includes(getComputedStyle(viewport).overflowX)) continue;
    if (!track.getBoundingClientRect().width || track.dataset.exportMotionReady) continue;

    const start = new DOMMatrixReadOnly(getComputedStyle(track).transform);
    const cycle = track.scrollWidth;
    if (!Number.isFinite(cycle) || cycle < viewport.clientWidth) continue;
    track.dataset.exportMotionReady = 'true';
    for (const item of items) {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.append(clone);
    }
    const pixelsPerSecond = 50.4;
    animations.push(track.animate(
      [{ transform: `translateX(${start.e}px)` }, { transform: `translateX(${start.e - cycle}px)` }],
      { duration: cycle / pixelsPerSecond * 1000, iterations: Infinity, easing: 'linear' }
    ));
  }
  return () => animations.forEach(animation => animation.cancel());
}

function setupPulsingDots() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const animations = [...document.querySelectorAll('[data-framer-name="Green dot"] [data-framer-name="dot"]')]
    .map(dot => dot.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }],
      { duration: 1500, iterations: Infinity, easing: 'ease-in-out' }
    ));
  return () => animations.forEach(animation => animation.cancel());
}

function setupServiceCardHover() {
  const cleanups=[];
  for(const card of document.querySelectorAll('[data-framer-name="What I do"] .framer-DmZhT')) {
  const nodes=[card,...card.querySelectorAll('[data-framer-name="Black layer"],[data-framer-name="Wrap"],[data-framer-name="Icon wrap"],[data-framer-name="Top Left"],[data-framer-name="Top Right"],[data-framer-name="Bottom Left"],[data-framer-name="Bottom Right"],[data-framer-component-type="RichTextContainer"],[data-framer-name="Icon"]')];
    const original=nodes.map(node=>[node,node.getAttribute('style')]);
    const transitions=new Map(nodes.map(node=>[node,node.style.transition]));
    for(const node of nodes)node.style.transition='color .24s ease, background-color .3s ease, border-color .3s ease, height .32s ease, top .32s ease, opacity .24s ease, transform .3s ease';
    const setHover=active=>{
      card.classList.toggle('hover',active);
      const layer=card.querySelector('[data-framer-name="Black layer"]');
      if(layer){layer.style.height=active?'100%':'';layer.style.top=active?'0px':'';}
      for(const name of ['Wrap','Icon wrap'])for(const node of card.querySelectorAll(`[data-framer-name="${name}"]`))if(node.hasAttribute('data-border'))node.style.setProperty('--border-color',active?'rgb(69, 71, 71)':'');
      for(const name of ['Top Left','Top Right','Bottom Left','Bottom Right'])for(const node of card.querySelectorAll(`[data-framer-name="${name}"]`))node.style.setProperty('--border-color',active?'rgb(234, 108, 17)':'');
      for(const node of card.querySelectorAll('[data-framer-component-type="RichTextContainer"]')){
        if(node.querySelector('h3'))node.style.setProperty('--extracted-a0htzi',active?'rgb(226, 226, 226)':'var(--token-a1798839-2317-4c12-9128-7d2692c3c993, rgb(26, 28, 28))');
        if(node.querySelector('p'))node.style.setProperty('--extracted-r6o4lv',active?'rgb(144, 145, 145)':'var(--token-109f501f-f17f-46a2-87e8-1f797866ae90, rgb(69, 71, 71))');
      }
      for(const node of card.querySelectorAll('[data-framer-name="Icon"]')){
        node.style.setProperty('--21h8s6',active?'rgb(255, 237, 230)':'var(--token-7eb78f5e-df78-402d-866a-4a2a896daa1e, rgb(0, 25, 70))');
        node.style.transform=active?'rotate(45deg) scale(1.12)':'';
      }
      for(const node of card.querySelectorAll('[data-framer-component-type="RichTextContainer"] h3, [data-framer-component-type="RichTextContainer"] p')) node.style.color=active?(node.tagName==='H3'?'rgb(226, 226, 226)':'rgb(144, 145, 145)'):'';
    };
    const enter=()=>setHover(true),leave=()=>setHover(false);
    card.addEventListener('pointerenter',enter);card.addEventListener('pointerleave',leave);card.addEventListener('focusin',enter);card.addEventListener('focusout',leave);
    cleanups.push(()=>{card.removeEventListener('pointerenter',enter);card.removeEventListener('pointerleave',leave);card.removeEventListener('focusin',enter);card.removeEventListener('focusout',leave);card.classList.remove('hover');for(const [node,style] of original){if(style===null)node.removeAttribute('style');else node.setAttribute('style',style);node.style.transition=transitions.get(node)||''}});
  }
  return ()=>cleanups.forEach(cleanup=>cleanup());
}

// Compatibility with projects generated while the motion module was being upgraded.
export const setupScrollCardVariants = setupExportMotion;

function setupCapturedTimelines() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const animations = [];
  for (const element of document.querySelectorAll('[data-export-timeline]')) {
    try {
      const frames = JSON.parse(element.getAttribute('data-export-timeline') || '[]');
      const duration = Number(element.getAttribute('data-export-timeline-duration'));
      if (frames.length < 2 || !Number.isFinite(duration) || duration <= 0) continue;
      animations.push(element.animate(frames, { duration, iterations: Infinity, easing: 'linear' }));
    } catch {
      // Ignore malformed captures and keep the rest of the exported page running.
    }
  }
  return () => animations.forEach(animation => animation.cancel());
}

function setupCanvasFrames() {
  const cleanups = [];
  for (const canvas of document.querySelectorAll('canvas[data-export-canvas-frames]')) {
    const paths = JSON.parse(canvas.getAttribute('data-export-canvas-frames') || '[]');
    if (!paths.length) continue;
    const context = canvas.getContext('2d');
    if (!context) continue;
    let cancelled = false;
    let timer;
    const images = paths.map(path => {
      const image = new Image();
      image.src = path;
      return image;
    });
    Promise.all(images.map(image => image.decode())).then(() => {
      if (cancelled) return;
      let frame = 0;
      const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[frame], 0, 0, canvas.width, canvas.height);
        frame = (frame + 1) % images.length;
      };
      draw();
      timer = setInterval(draw, 100);
    }).catch(() => {});
    cleanups.push(() => { cancelled = true; clearInterval(timer); });
  }
  return () => cleanups.forEach(cleanup => cleanup());
}

function setupRotatingWords() {
  const cleanups = [];
  for (const group of document.querySelectorAll('[data-export-rotating-words]')) {
    const words = [...group.children].filter(child => child.hasAttribute('data-export-rotating-word'));
    if (words.length < 2) continue;
    const observed = JSON.parse(group.getAttribute('data-export-observed-words') || '{}');
    const initial = observed.initial || [];
    const capturedActive = observed.active || [];
    let active = capturedActive.length ? words.findIndex(word => capturedActive.includes((word.textContent || '').trim().toLowerCase())) : initial.length ? Math.max(0, words.findIndex(word => {
      const state = initial.find(entry => entry.text === (word.textContent || '').trim().toLowerCase());
      return state && Number(state.opacity) > .5;
    })) : Math.max(0, words.findIndex(word => Number(word.style.opacity) > .5));
    if (active < 0) active = 0;
    const originalGroupStyle = group.getAttribute('style');
    const originalWordStyles = words.map(word => word.getAttribute('style'));
    const box = group.getBoundingClientRect();
    const width = Math.max(box.width, ...words.map(word => word.getBoundingClientRect().width));
    const height = Math.max(box.height, ...words.map(word => word.getBoundingClientRect().height));
    group.style.position = 'relative';
    group.style.display = 'inline-block';
    group.style.width = `${width}px`;
    group.style.height = `${height}px`;
    words.forEach((word, index) => {
      word.style.position = 'absolute';
      word.style.left = '0';
      word.style.top = '0';
      word.style.bottom = 'auto';
      word.style.transition = 'opacity .24s ease, filter .24s ease, transform .24s ease';
      word.style.opacity = index === active ? '1' : '0';
      word.style.filter = index === active ? 'blur(0px)' : 'blur(5px)';
      word.style.transform = index === active ? 'translateY(0)' : 'translateY(7px)';
    });
    let transitionTimer;
    const timer = setInterval(() => {
      const previous = active;
      const next = (active + 1) % words.length;
      const outgoing = words[previous];
      const incoming = words[next];
      outgoing.style.opacity = '0';
      outgoing.style.filter = 'blur(5px)';
      outgoing.style.transform = 'translateY(-7px)';
      transitionTimer = setTimeout(() => {
        incoming.style.transform = 'translateY(7px)';
        incoming.style.filter = 'blur(5px)';
        incoming.style.opacity = '0';
        requestAnimationFrame(() => {
          incoming.style.opacity = '1';
          incoming.style.filter = 'blur(0px)';
          incoming.style.transform = 'translateY(0)';
        });
        active = next;
      }, 260);
    }, 2200);
    cleanups.push(() => {
      clearInterval(timer);
      clearTimeout(transitionTimer);
      if (originalGroupStyle === null) group.removeAttribute('style'); else group.setAttribute('style', originalGroupStyle);
      words.forEach((word, index) => {
        if (originalWordStyles[index] === null) word.removeAttribute('style'); else word.setAttribute('style', originalWordStyles[index]);
      });
    });
  }
  return () => cleanups.forEach(cleanup => cleanup());
}

function setupEntryVariants() {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const root = entry.target;
      const changes = JSON.parse(root.getAttribute('data-export-entry-state') || '[]');
      for (const change of changes) {
        let element = root;
        for (const index of change.path) element = element?.children[index];
        if (!element) continue;
        for (const [name, value] of Object.entries(change.after)) element.setAttribute(name, value);
      }
      observer.unobserve(root);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  for (const element of document.querySelectorAll('[data-export-entry-state]')) observer.observe(element);
  return () => observer.disconnect();
}

function setupCapturedScrollStates() {
  const states = [...document.querySelectorAll('[data-export-scroll-state]')].map(root => ({
    root, config: JSON.parse(root.getAttribute('data-export-scroll-state')), active: false
  }));
  if (!states.length) return () => {};
  const apply = (root, changes, direction) => {
    for (const change of changes) {
      let element = root;
      for (const index of change.path) element = element?.children[index];
      if (!element) continue;
      for (const [name, value] of Object.entries(change[direction])) {
        if (value === null) element.removeAttribute(name);
        else element.setAttribute(name, value);
      }
    }
  };
  const update = () => {
    for (const state of states) {
      const active = scrollY >= state.config.threshold;
      if (active === state.active) continue;
      apply(state.root, state.config.changes, active ? 'after' : 'before');
      state.active = active;
    }
  };
  update();
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  return () => {
    removeEventListener('scroll', update);
    removeEventListener('resize', update);
  };
}

function setupPolygonComparisons() {
  const cleanups=[];
  for(const first of document.querySelectorAll('[style*="clip-path"]')) {
    const root=first.parentElement;
    const a=first.style.clipPath.replace(/\s/g,'').replace(/0px/g,'0');
    if(!root || !first.querySelector('img') || !/^polygon\(00,[\d.]+%0,[\d.]+%100%,0100%\)$/.test(a))continue;
    const second=[...root.children].find(e=>e!==first&&e.querySelector('img')&&/^polygon\([\d.]+%0,100%0,100%100%,[\d.]+%100%\)$/.test(e.style.clipPath.replace(/\s/g,'').replace(/0px/g,'0')));
    if(!second)continue;
    const divider=[...root.children].find(e=>e!==first&&e!==second&&e.style.left.endsWith('%')&&e.style.height==='100%');
    const cursor=[...root.children].find(e=>e.style.pointerEvents==='none'&&e.querySelector('svg'));
    const update=event=>{
      const rect=root.getBoundingClientRect();if(!rect.width)return;
      const percent=Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100));
      first.style.clipPath=`polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
      second.style.clipPath=`polygon(${percent}% 0, 100% 0, 100% 100%, ${percent}% 100%)`;
      if(divider)divider.style.left=`${percent}%`;
      if(cursor){cursor.style.left=`${percent}%`;cursor.style.top='50%';cursor.style.transform='translate(-50%, -50%)'}
    };
    root.addEventListener('pointermove',update);
    root.addEventListener('pointerdown',update);
    cleanups.push(()=>{root.removeEventListener('pointermove',update);root.removeEventListener('pointerdown',update)});
  }
  return ()=>cleanups.forEach(cleanup=>cleanup());
}

function setupCapturedHover() {
  const cleanups=[];
  for(const root of document.querySelectorAll('[data-export-hover]')) {
    if(root.querySelector('.framer-DmZhT'))continue;
    const changes=JSON.parse(root.getAttribute('data-export-hover'));
    const touched=[];
    for(const change of changes){let node=root;for(const index of change.path)node=node?.children[index];if(!node)continue;touched.push([node,node.style.transition]);node.style.transition='color .22s ease, background-color .22s ease, border-color .22s ease, box-shadow .25s ease, opacity .22s ease, transform .28s ease, filter .22s ease'}
    const apply=state=>{for(const change of changes){let node=root;for(const index of change.path)node=node?.children[index];if(node)for(const [key,value] of Object.entries(change[state]))node.setAttribute(key,value)}};
    const enter=()=>apply('after'),leave=()=>apply('before');
    root.addEventListener('mouseenter',enter);root.addEventListener('mouseleave',leave);
    root.addEventListener('focusin',enter);root.addEventListener('focusout',leave);
    cleanups.push(()=>{root.removeEventListener('mouseenter',enter);root.removeEventListener('mouseleave',leave);root.removeEventListener('focusin',enter);root.removeEventListener('focusout',leave);for(const [node,transition] of touched)node.style.transition=transition});
  }
  return ()=>cleanups.forEach(cleanup=>cleanup());
}

function setupComparisonSliders() {
  const cleanups = [];
  for (const input of document.querySelectorAll('input[type="range"]')) {
    const parent = input.parentElement;
    const clipped = parent?.querySelector('[style*="clip-path"]');
    const handle = [...(parent?.children || [])].find(node => node !== clipped && node.style.left?.endsWith('%'));
    if (!clipped || !handle || !/inset\(/.test(clipped.style.clipPath)) continue;
    const initial = clipped.style.clipPath;
    const update = () => {
      const percent = Math.max(0, Math.min(100, (Number(input.value) - Number(input.min || 0)) / Math.max(1, Number(input.max || 100) - Number(input.min || 0)) * 100));
      clipped.style.clipPath = initial.replace(/-?[\d.]+%/, `${percent}%`);
      handle.style.left = `${percent}%`;
    };
    input.addEventListener('input', update);
    update();
    cleanups.push(() => input.removeEventListener('input', update));
  }
  return () => cleanups.forEach(cleanup => cleanup());
}

function setupScrollNavVariants() {
  const initial = new WeakMap();
  const update = () => {
    for (const element of document.querySelectorAll('[data-export-scroll-class]')) {
      let state = initial.get(element);
      if (!state) {
        state = {
          className: element.className,
          style: element.getAttribute('style') || '',
          name: element.getAttribute('data-framer-name') || '',
          active: false
        };
        initial.set(element, state);
      }
      const active = scrollY >= Number(element.getAttribute('data-export-scroll-threshold'));
      if (active === state.active) continue;
      element.className = active ? element.getAttribute('data-export-scroll-class') : state.className;
      element.setAttribute('style', active ? element.getAttribute('data-export-scroll-style') || '' : state.style);
      element.setAttribute('data-framer-name', active ? element.getAttribute('data-export-scroll-name') || state.name : state.name);
      state.active = active;
    }
  };
  const schedule = () => update();
  update();
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  const observer = new MutationObserver(schedule);
  observer.observe(document.body, { childList: true, subtree: true });
  return () => {
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
    observer.disconnect();
  };
}

function setupScrollProgressLines() {
  const lines = [...document.querySelectorAll('[data-framer-name="Active Line Wrapper"]')]
    .map(element => ({ element, track: element.parentElement }))
    .filter(({ element, track }) => track?.getAttribute('data-framer-name') === 'Line Wrapper' && element.getBoundingClientRect().width > 0);
  if (!lines.length) return () => {};

  const geometry = lines.map(({ element, track }) => {
    const trackRect = track.getBoundingClientRect();
    const lineRect = element.getBoundingClientRect();
    const initialFill = Math.max(0, lineRect.bottom - trackRect.top);
    return { element, track, initialFill };
  });
  let frame = 0;
  const update = () => {
    frame = 0;
    for (const { element, track, initialFill } of geometry) {
      const rect = track.getBoundingClientRect();
      const start = rect.top + scrollY - innerHeight * .33;
      const end = rect.bottom + scrollY - innerHeight * .5;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / Math.max(1, end - start)));
      const distance = Math.max(0, rect.height - initialFill);
      element.style.transform = `translateY(${Math.round(progress * distance)}px)`;
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  update();
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  const timer = setInterval(schedule, 120);
  return () => {
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
    clearInterval(timer);
    cancelAnimationFrame(frame);
  };
}

function setupRotatingLogo() {
  const animations = [];
  for (const logo of document.querySelectorAll('[data-framer-name="Logo"] img')) {
    const match = logo.style.transform.match(/^rotate\((-?[\d.]+)deg\)$/);
    if (!match || !logo.style.willChange.includes('transform')) continue;
    const start = Number(match[1]);
    animations.push(logo.animate(
      [{ transform: `rotate(${start}deg)` }, { transform: `rotate(${start + 360}deg)` }],
      { duration: 10000, iterations: Infinity, easing: 'linear' }
    ));
  }
  return () => animations.forEach(animation => animation.cancel());
}

// Rebuild scroll-driven Active/Inactive card variants without the Framer runtime.
function setupCardVariants() {
  const candidates = [...document.querySelectorAll(
    '[data-framer-name="Process Card Active"], [data-framer-name="Process Card Inactive"]'
  )].filter(element => element.getBoundingClientRect().width > 0);
  const active = candidates.find(element => element.getAttribute('data-framer-name') === 'Process Card Active');
  const inactive = candidates.find(element => element.getAttribute('data-framer-name') === 'Process Card Inactive');
  if (!active || !inactive || candidates.length < 2) return () => {};

  const variantToken = element => [...element.classList].find(token => token.startsWith('framer-v-'));
  const activeToken = variantToken(active);
  const inactiveToken = variantToken(inactive);
  if (!activeToken || !inactiveToken || activeToken === inactiveToken) return () => {};

  for (const element of candidates) {
    element.dataset.exportCardMotion = '';
  }
  const style = document.createElement('style');
  style.textContent = '[data-export-card-motion], [data-export-card-motion] [data-framer-name] {' +
    'transition: transform .45s ease, opacity .45s ease, background-color .45s ease, color .45s ease, box-shadow .45s ease, border-color .45s ease;}';
  document.head.append(style);

  let frame = 0;
  const update = () => {
    frame = 0;
    let selected = 0;
    for (let index = 0; index < candidates.length; index++) {
      if (candidates[index].getBoundingClientRect().top <= innerHeight * .6) selected = index;
    }
    candidates.forEach((element, index) => {
      const isActive = index === selected;
      element.classList.toggle(activeToken, isActive);
      element.classList.toggle(inactiveToken, !isActive);
      element.setAttribute('data-framer-name', isActive ? 'Process Card Active' : 'Process Card Inactive');
    });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  update();
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  const timer = setInterval(schedule, 120);
  return () => {
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
    clearInterval(timer);
    cancelAnimationFrame(frame);
    style.remove();
  };
}

