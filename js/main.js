/* ═══════════════════════════════════════════════════════════════════
   ELEVATE FRAME GROUP — main.js v4
   Video · D-ID Avatar · Interactive Charts · Animations
═══════════════════════════════════════════════════════════════════ */
(function () {
'use strict';

const VIDEOS = {
  hero_home:    'videos/aerial.mp4',
  hero_studios: 'videos/studio.mp4',
  hero_air:     'videos/drone.mp4',
  hero_academy: 'videos/training.mp4',
  hero_work:    'videos/studio.mp4',
  hero_contact: 'videos/city.mp4',
  hero_plan:    'videos/city.mp4',
  hero_pitch:   'videos/beach.mp4',
  aerial:       'videos/aerial.mp4',
  construction: 'videos/aerial.mp4',
  agriculture:  'videos/drone.mp4',
  studio:       'videos/studio.mp4',
  training:     'videos/training.mp4',
  drone:        'videos/drone.mp4',
  city_night:   'videos/city.mp4',
  camera:       'videos/studio.mp4',
  card_studios: 'videos/studio.mp4',
  card_air:     'videos/drone.mp4',
  card_academy: 'videos/training.mp4',
};

const PATH = window.location.pathname;
const PAGE = PATH.includes('studios') ? 'studios'
           : PATH.includes('air') ? 'air'
           : PATH.includes('academy') ? 'academy'
           : PATH.includes('work') ? 'work'
           : PATH.includes('contact') ? 'contact'
           : PATH.includes('business-plan') ? 'plan'
           : PATH.includes('pitch') ? 'pitch' : 'home';
document.body.classList.add('page-' + PAGE);

/* NAV */
const nav = document.querySelector('.nav');
if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), {passive:true});

/* MOBILE NAV */
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    if (isOpen) { s1.style.transform='rotate(45deg) translate(4px,4px)'; s2.style.opacity='0'; s3.style.transform='rotate(-45deg) translate(4px,-4px)'; }
    else { [s1,s2,s3].forEach(s => { s.style.transform=''; s.style.opacity=''; }); }
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileNav.classList.remove('open'); hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; }); }));
}

/* VIDEO HELPERS */
function makeVid(src, opts = {}) {
  const v = document.createElement('video');
  v.src = src; v.muted = true; v.loop = true; v.playsInline = true; v.preload = opts.preload || 'auto';
  if (opts.autoplay !== false) v.autoplay = true;
  if (opts.className) v.className = opts.className;
  return v;
}

/* HERO VIDEO INJECTION */
function injectHeroVideos() {
  const map = { home:VIDEOS.hero_home, studios:VIDEOS.hero_studios, air:VIDEOS.hero_air, academy:VIDEOS.hero_academy, work:VIDEOS.hero_work, contact:VIDEOS.hero_contact, plan:VIDEOS.hero_plan, pitch:VIDEOS.hero_pitch };
  const src = map[PAGE] || VIDEOS.hero_home;
  document.querySelectorAll('.hero, .hero-page').forEach(section => {
    if (section.querySelector('.hero-video, video')) return;
    const v = makeVid(src, {className:'hero-video'});
    section.insertBefore(v, section.firstChild);
    v.play().catch(()=>{});
  });
}

/* INLINE VIDEO PLAYERS — click to play */
function initVideoPlayers() {
  document.querySelectorAll('.video-player').forEach(player => {
    const vid = player.querySelector('video');
    if (!vid) return;
    vid.muted = true; vid.preload = 'metadata';
    player.addEventListener('click', () => {
      if (vid.paused) { vid.muted = false; vid.play().then(()=>player.classList.add('playing')).catch(()=>{}); }
      else { vid.pause(); player.classList.remove('playing'); }
    });
    player.setAttribute('tabindex','0');
    player.addEventListener('keydown', e => { if(e.key===' '||e.key==='Enter'){e.preventDefault();player.click();} });
  });

  /* REEL CARDS — hover to play */
  document.querySelectorAll('.reel-card').forEach(card => {
    const vid = card.querySelector('video');
    if (!vid) return;
    vid.muted = true; vid.loop = true; vid.preload = 'metadata';
    card.addEventListener('mouseenter', () => vid.play().catch(()=>{}));
    card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime=0; });
  });
}

/* DIVISION CARD HOVER VIDEOS */
function initCardVideos() {
  const map = { studios:VIDEOS.card_studios, air:VIDEOS.card_air, academy:VIDEOS.card_academy };
  document.querySelectorAll('.division-card').forEach(card => {
    const href = card.getAttribute('href') || '';
    const key = Object.keys(map).find(k => href.includes(k));
    if (!key) return;
    const wrap = document.createElement('div'); wrap.className = 'card-video';
    const vid = makeVid(map[key], {preload:'none', autoplay:false}); vid.loop = true;
    wrap.appendChild(vid); card.insertBefore(wrap, card.firstChild);
    card.addEventListener('mouseenter', () => vid.play().catch(()=>{}));
    card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime=0; });
  });
}

/* SECTION VIDEO BACKGROUNDS — data-section-video attr */
function initSectionVideos() {
  document.querySelectorAll('[data-section-video]').forEach(el => {
    const src = VIDEOS[el.dataset.sectionVideo]; if (!src) return;
    el.classList.add('has-video-bg');
    const overlay = document.createElement('div'); overlay.className = 'section-video-overlay';
    const vid = makeVid(src, {className:'section-video'});
    el.insertBefore(overlay, el.firstChild); el.insertBefore(vid, el.firstChild);
    vid.play().catch(()=>{});
  });
}

/* REPLACE SVG PHOTO PLACEHOLDERS WITH VIDEO */
function upgradePhotoGrids() {
  const ctx = {
    'south-florida-aerial': VIDEOS.aerial,
    'construction-site-aerial': VIDEOS.construction,
    'agricultural-drone': VIDEOS.agriculture,
    'team-training-session': VIDEOS.training,
    'classroom-instruction': VIDEOS.training,
    'studio-cinema-production': VIDEOS.studio,
    'cinema-camera-closeup': VIDEOS.camera,
    'aerial-coastline-hero': VIDEOS.aerial,
    'dji-inspire-drone': VIDEOS.drone,
    'drone-mavic-flight': VIDEOS.drone,
  };
  document.querySelectorAll('.photo-grid-3 img, .photo-grid-2 img').forEach(img => {
    const src = img.getAttribute('src') || '';
    if (!src.includes('.svg') && !src.includes('placeholder')) return;
    const key = Object.keys(ctx).find(k => src.includes(k));
    const vsrc = key ? ctx[key] : VIDEOS.aerial;
    const vid = makeVid(vsrc); vid.style.cssText = img.style.cssText; vid.className = img.className;
    img.parentNode.replaceChild(vid, img); vid.play().catch(()=>{});
  });
}

/* ══════ D-ID AVATAR ══════ */
const DID = {
  apiKey: null,
  baseUrl: 'https://api.d-id.com',
  agentId: 'v2_agt_ff1_AILj',
  clientKey: 'Z29vZ2xlLW9hdXRoMnwxMDY2MDc0NjgyMTUyMzQzNjE4ODI6ZTNQZ0I4Y21UVXVXakdaQjhkWXlV',
  presenters: {
    pitch:     { source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Sophia_f/image.jpeg', voice_id: 'en-US-AriaNeural' },
    plan:      { source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Eric_m/image.jpeg',   voice_id: 'en-US-GuyNeural' },
    executive: { source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Sophia_f/image.jpeg', voice_id: 'en-US-JennyNeural' },
    founder:   { source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Eric_m/image.jpeg',   voice_id: 'en-US-GuyNeural' },
  },
  async createTalk(text, key='executive') {
    if (!this.apiKey && !this.clientKey) return null;
    const p = this.presenters[key];
    const authKey = this.apiKey || this.clientKey;
    
    // Try Agent chat endpoint first (uses your Pro agent, better CORS support)
    try {
      const agentRes = await fetch(this.baseUrl+'/agents/'+this.agentId+'/chat', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic '+authKey,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({
          sessionId: window._didSessionId || undefined,
          userMessage: text,
        })
      });
      if (agentRes.ok) {
        const data = await agentRes.json();
        window._didSessionId = data.sessionId || window._didSessionId;
        return { id: data.id, type: 'agent', result_url: data.result_url };
      }
    } catch(e) { console.warn('Agent endpoint failed, trying talks:', e); }

    // Fallback: standard talks endpoint
    const res = await fetch(this.baseUrl+'/talks', { method:'POST',
      headers:{'Authorization':'Basic '+authKey,'Content-Type':'application/json'},
      body: JSON.stringify({ source_url:p.source_url, script:{type:'text',input:text,provider:{type:'microsoft',voice_id:p.voice_id}}, config:{fluent:true,pad_audio:0} })
    });
    if (!res.ok) {
      const err = await res.json().catch(()=>({}));
      console.error('D-ID error:', res.status, JSON.stringify(err));
      throw new Error('D-ID '+res.status+': '+(err.description||err.message||'unknown'));
    }
    return res.json();
  },
  async pollTalk(id, max=30000) {
    const t=Date.now();
    while(Date.now()-t<max) {
      await new Promise(r=>setTimeout(r,1500));
      const d = await (await fetch(this.baseUrl+'/talks/'+id,{headers:{'Authorization':'Basic '+this.apiKey}})).json();
      if(d.status==='done') return d.result_url;
      if(d.status==='error') throw new Error('D-ID failed');
    } throw new Error('D-ID timeout');
  }
};

const AVATAR_SCRIPTS = {
  pitch: [
    {title:'The Opportunity',text:'Elevate Frame Group is seeking $250,000 in Series Seed funding. A Florida-based, disabled minority veteran-owned aerial media enterprise — three integrated divisions: Studios, Air, and Academy — built around one principle: story is the operating system.'},
    {title:'The Problem',text:'The market is full of imagery. It is empty of meaning. Most media companies produce footage, not meaning. Technical operators capture data interpretable by no one. Most firms do not monetize their standards — turning expertise into a cost center instead of a revenue engine.'},
    {title:'The Solution',text:'Story as the central operating system. Studios shapes meaning. Air expands what can be seen. Academy disciplines how the work is executed — consistently, credibly, at scale. Three divisions. One system. Compounding client lifetime value.'},
    {title:'The Market',text:'Twenty-one point four billion dollars in addressable U.S. market. Florida alone has over fourteen billion in active construction permits — all requiring site documentation and aerial reporting. Core Air services. Immediately serviceable.'},
    {title:'The Financials',text:'Year one revenue: $316,500. Cash flow positive Month 4. EBITDA positive Month 9. Five-year projection of $1.84 million at 27.1% net margin. Fewer than five meaningful engagements per month to hit Year 1 targets.'},
    {title:'The Ask',text:'$250,000. Eighteen-month runway to cash-flow positive. Plus $25 billion in annual veteran set-aside procurement through SDVOSB. This is not a content company. This is a story-first visual intelligence platform.'},
  ],
  plan_intro: [
    {title:'Executive Summary',text:'Elevate Frame Group is a Florida-based, disabled, minority veteran-owned media firm operating at the intersection of narrative production, aerial and terrestrial cinematography, and standards-driven execution. What distinguishes this company is the system behind how it works.'},
    {title:'Three Divisions',text:'Studios is the narrative engine. Air is the perspective system. Academy is the standards arm. A client enters through Studios, adds Air for scale and context, and deepens through Academy for operational standards and training. Three lanes. One relationship. Compounding lifetime value.'},
  ]
};

class AvatarWidget {
  constructor(el, opts={}) {
    this.el = el; this.opts = opts; this.slide = 0;
    this.vidEl = el.querySelector('.did-video');
    this.dot = el.querySelector('.did-status-dot');
    this.txt = el.querySelector('.did-status-text');
    this.transcript = el.querySelector('.did-transcript');
    this.nav = el.querySelector('.did-slide-nav');
    this.btn = el.querySelector('.did-speak-btn');
    this.slides = opts.slides || [];
    this.presenter = opts.presenter || 'executive';
    DID.apiKey = window.DID_API_KEY || el.dataset.didKey || document.querySelector('[data-did-key]')?.dataset.didKey || null;
    this.setup();
  }
  setup() {
    if (this.nav && this.slides.length > 1) {
      this.slides.forEach((_,i) => {
        const d = document.createElement('button'); d.className='did-slide-dot'+(i===0?' active':'');
        d.addEventListener('click', ()=>this.goto(i)); this.nav.appendChild(d);
      });
    }
    if (this.btn) this.btn.addEventListener('click', ()=>this.speak());
    this.showTranscript(this.slides[0]?.text||'');
    this.setStatus('idle','Ready');
    if (!DID.apiKey) {
      const notice = this.el.querySelector('.did-api-notice');
      if (notice) { notice.style.display='block'; notice.textContent='Demo mode active — add D-ID API key to enable video avatar: window.DID_API_KEY = "base64_key"'; }
    } else {
      // Has API key — hide the key hint
      const hint = document.getElementById('did-key-hint');
      if (hint) hint.style.display = 'none';
    }
  }
  goto(i) {
    this.slide = i;
    this.nav?.querySelectorAll('.did-slide-dot').forEach((d,idx)=>d.classList.toggle('active',idx===i));
    this.showTranscript(this.slides[i]?.text||'');
    const content = this.el.closest('.did-pitch-layout')?.querySelector('.did-slide-content');
    if (content && this.slides[i]) {
      const s = this.slides[i];
      const t=content.querySelector('.did-slide-title'); const b=content.querySelector('.did-slide-body');
      if(t) t.textContent=s.title||''; if(b) b.innerHTML=s.html||s.text||'';
    }
  }
  showTranscript(txt) {
    if (!this.transcript) return;
    this.transcript.style.opacity='0';
    setTimeout(()=>{ this.transcript.textContent=txt; this.transcript.style.opacity='1'; }, 200);
  }
  setStatus(state, txt) {
    if (this.dot) this.dot.className='did-status-dot '+state;
    if (this.txt) this.txt.textContent=txt;
  }
  async speak() {
    const s = this.slides[this.slide]; if (!s) return;
    if (!DID.apiKey) {
      // Demo mode — no API key, simulate timing
      if(this.btn){this.btn.textContent='Speaking…';this.btn.disabled=true;}
      this.setStatus('speaking','Speaking…');
      this.showTranscript(s.text);
      setTimeout(()=>{ this.setStatus('idle','Ready'); if(this.btn){this.btn.disabled=false; if(this.slide<this.slides.length-1){this.btn.textContent='Next Slide →';}else{this.btn.textContent='Restart';}} if(this.slide<this.slides.length-1) setTimeout(()=>this.goto(this.slide+1),600); }, Math.min(s.text.length*45, 8000));
      return;
    }
    try {
      this.setStatus('speaking','Generating…'); if(this.btn) this.btn.disabled=true;
      const talk = await DID.createTalk(s.text, this.presenter); if(!talk) return;
      this.setStatus('speaking','Processing…');
      const url = await DID.pollTalk(talk.id);
      if (this.vidEl) {
        this.vidEl.src=url; this.vidEl.load(); await this.vidEl.play();
        this.setStatus('speaking','Speaking…');
        this.vidEl.onended=()=>{ this.setStatus('idle','Ready'); if(this.btn) this.btn.disabled=false; if(this.slide<this.slides.length-1) setTimeout(()=>this.goto(this.slide+1),800); };
      }
    } catch(e) { console.error('D-ID:',e); this.setStatus('idle',e.message||'Error — check console'); if(this.btn){this.btn.disabled=false;this.btn.textContent='Retry';} }
  }
}

function initAvatars() {
  document.querySelectorAll('[data-did-widget]').forEach(el => {
    const slides = AVATAR_SCRIPTS[el.dataset.didWidget] || [];
    new AvatarWidget(el, { slides, presenter: el.dataset.presenter||'executive' });
  });
}

/* CHARTS TABS */
function enhanceCharts() {
  document.querySelectorAll('.chart-tabs').forEach(tabs => {
    tabs.querySelectorAll('.chart-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.querySelectorAll('.chart-tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        document.dispatchEvent(new CustomEvent('chartTabChange',{detail:{chartId:tabs.dataset.chart,view:tab.dataset.view}}));
      });
    });
  });
}

/* SCROLL REVEAL */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(e=>e.classList.add('visible')); return; }
  const ro = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);}}),{threshold:.08,rootMargin:'0px 0px -40px 0px'});
  els.forEach(e=>ro.observe(e));
}

/* COUNTERS */
function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const co = new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;
      const target=parseInt(el.dataset.counter,10), suffix=el.dataset.suffix||''; let start=0;
      const step=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/1400,1),ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(ease*target)+suffix;if(p<1)requestAnimationFrame(step);};
      requestAnimationFrame(step);co.unobserve(e.target);}),{threshold:.5});
    co.observe(el);
  });
}

/* BAR ANIMATIONS */
function initBars() {
  const fills = document.querySelectorAll('.bar-fill');
  if (!fills.length) return;
  const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.style.width=(e.target.dataset.w||'0')+'%';io.unobserve(e.target);}}),{threshold:.3});
  fills.forEach(f=>io.observe(f));
}

/* WORK FILTER */
function initFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const tiles = document.querySelectorAll('.work-tile[data-division]');
  if (!btns.length||!tiles.length) return;
  btns.forEach(btn=>btn.addEventListener('click',()=>{
    btns.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
    btn.classList.add('active');btn.setAttribute('aria-selected','true');
    const f=btn.dataset.filter;
    tiles.forEach(t=>{const show=f==='all'||t.dataset.division===f;t.style.opacity=show?'1':'0.15';t.style.transform=show?'':'scale(.97)';t.style.pointerEvents=show?'':'none';t.style.transition='opacity .3s,transform .3s';});
  }));
}

/* CONTACT */
function initContact() {
  const p=new URLSearchParams(window.location.search),div=p.get('division');
  if(div){const t=document.querySelector('.routing-card[data-division="'+div+'"]');if(t)t.classList.add('active');const s=document.querySelector('#division-select');if(s)s.value=div;}
  document.querySelectorAll('.routing-card[data-division]').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.routing-card').forEach(x=>x.classList.remove('active'));c.classList.add('active');const s=document.querySelector('#division-select');if(s)s.value=c.dataset.division;}));
  const form=document.querySelector('.contact-form');
  if(form)form.addEventListener('submit',e=>{e.preventDefault();const b=form.querySelector('[type="submit"]');if(!b)return;b.textContent='Sending…';b.disabled=true;setTimeout(()=>{b.textContent='✓ Sent — We\'ll be in touch';b.style.background='#1a3a2a';b.style.color='#5dbf8a';},1200);});
}

/* SMOOTH SCROLL */
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.getElementById(a.getAttribute('href').slice(1));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}}));
}




/* SCROLL-TRIGGERED VIDEO PLAY — no src manipulation, just play/pause */
function initScrollVideos() {
  const vids = document.querySelectorAll(
    '.reel-card video, .video-grid-3 video, .video-grid-2 video, .section-video'
  );
  if (!vids.length || !('IntersectionObserver' in window)) return;

  const vo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        // Only play reel cards on hover (handled elsewhere)
        // Section background videos — play when in view
        if (v.classList.contains('section-video')) {
          v.play().catch(() => {});
        }
      } else {
        if (!v.paused) v.pause();
      }
    });
  }, { rootMargin: '100px', threshold: 0.1 });

  vids.forEach(v => vo.observe(v));
}

/* BOOT */
function init() {
  injectHeroVideos(); initVideoPlayers(); initCardVideos(); initScrollVideos();
  initSectionVideos(); upgradePhotoGrids(); initAvatars();
  enhanceCharts(); initReveal(); initCounters(); initBars();
  initFilter(); initContact(); initScroll();
}

document.readyState==='loading' ? document.addEventListener('DOMContentLoaded',init) : init();
window.EFG = { DID, AvatarWidget, VIDEOS, AVATAR_SCRIPTS };
})();
