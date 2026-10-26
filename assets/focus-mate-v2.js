'use strict';
// This page previews the companions; it never starts AI calls or changes app data.
const mateData = {
  mizuki:{name:'美月',en:'MIZUKI',type:'GENTLE & THOUGHTFUL',summary:'穏やかに、あなたのペースで。',description:'小さな頑張りにも気づいてくれる、穏やかで聞き上手な相棒。静かに寄り添ってほしい日に。',tags:['穏やか','聞き上手','少し照れ屋'],line:'今日も、あなたのペースで。'},
  hinata:{name:'ひなた',en:'HINATA',type:'BRIGHT & ENCOURAGING',summary:'小さな一歩を、明るく一緒に。',description:'明るくて、人懐っこい相棒。少しだけ始めたい日にも、軽やかな空気でそばにいてくれます。',tags:['明るい','人懐っこい','褒め上手'],line:'少しだけでも、一緒にやってみよ！'},
  rin:{name:'凛',en:'RIN',type:'QUIET & SINCERE',summary:'静かな時間も、隣で一緒に。',description:'クールで、言葉は少なめ。たくさん話さなくても、それぞれの作業に向かう時間を一緒に。',tags:['クール','寡黙','静かな距離感'],line:'……うん。隣でやろう。'},
  yuma:{name:'悠真',en:'YUMA',type:'CALM & STEADY',summary:'落ち着いて、一つずつ。',description:'穏やかで落ち着いた相棒。一度に全部を頑張らず、目の前のひとつを進めたい日に。',tags:['落ち着き','穏やか','一つずつ'],line:'焦らなくていい。一つずつ進めよう。'},
  sora:{name:'空',en:'SORA',type:'SOFT & FRIENDLY',summary:'小さな達成も、一緒によろこびたい。',description:'柔らかくて、親しみやすい相棒。少し進めたことも、一緒にうれしくなれる時間を。',tags:['柔らかい','親しみやすい','一緒によろこぶ'],line:'それ、できたんだ。僕もうれしい！'}
};
const mateButtons = [...document.querySelectorAll('[data-mate-select]')];
const portrait = document.getElementById('mate-portrait');
mateButtons.forEach(button => button.addEventListener('click', () => {
  const id=button.dataset.mateSelect, mate=mateData[id];
  if (!mate) return;
  document.querySelector('.companion-stage').dataset.mate=id;
  portrait.src=id === "hinata" ? "assets/focus-mate/v2/hinata-seated-cutout.webp" : `assets/focus-mate/v2/${id}.webp`;
  portrait.alt=`${mate.name}の開発中キャラクターイラスト`;
  ['name','en','type','summary','description','line'].forEach(key => { document.getElementById(`mate-${key}`).textContent=mate[key]; });
  const tags=document.getElementById('mate-tags');
  tags.replaceChildren(...mate.tags.map(text=>{ const span=document.createElement('span');span.textContent=text;return span; }));
  mateButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
const stories={
  today:{date:'TODAY — 最初のひと区切り',activity:'資格の勉強',minutes:25,user:'資格の問題集、25分進めたよ。休憩にはほうじ茶が好き。',reply:'25分、おつかれさま。好きなほうじ茶で、ひと息つこう。'},
  tomorrow:{date:'THE NEXT DAY — 昨日の続きから',activity:'資格の勉強を、もう一度',minutes:25,user:'今日も続きをやろうかな。',reply:'昨日は資格の問題集を25分進めたんだよね。今日もあなたのペースで。終わったら、ほうじ茶でひと息だね。'},
  week:{date:'ONE WEEK LATER — 積み重ねを振り返る',activity:'この1週間の勉強',minutes:125,user:'今週は5回、勉強できた。',reply:'最初の25分から、5回も積み重ねたんだね。資格試験に向けて頑張っていること、覚えてるよ。'}
};
const storyButtons=[...document.querySelectorAll('[data-story]')];
storyButtons.forEach(button=>button.addEventListener('click',()=>{
  const story=stories[button.dataset.story];if(!story)return;
  ['date','activity','user','reply'].forEach(key=>{document.getElementById(`story-${key}`).textContent=story[key];});
  const minutes=document.getElementById('story-minutes');minutes.replaceChildren(String(story.minutes));const unit=document.createElement('span');unit.textContent=' min';minutes.append(unit);
  storyButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
