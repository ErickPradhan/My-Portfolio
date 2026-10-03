const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

// Neural background
const motionQuery=matchMedia("(prefers-reduced-motion: reduce)");
const portraitSlides=[...$$(".portrait-slide")];
if(portraitSlides.length>1&&!motionQuery.matches){
  let portraitIndex=0;
  setInterval(()=>{
    portraitSlides[portraitIndex].classList.remove("portrait-slide-active");
    portraitIndex=(portraitIndex+1)%portraitSlides.length;
    portraitSlides[portraitIndex].classList.add("portrait-slide-active");
  },15000);
}
const portraitQuote=$(".portrait-quote");
if(portraitQuote){
  const quoteText=portraitQuote.querySelector("span"),quoteAuthor=portraitQuote.querySelector("cite");
  const heroQuotes=[
    ["&quot;That's what she said!&quot;","— Michael Scott"]
  ];
  let quoteIndex=0;
  if(heroQuotes.length>1)setInterval(()=>{
    quoteIndex=(quoteIndex+1)%heroQuotes.length;
    const currentHeight=portraitQuote.offsetHeight;
    portraitQuote.style.height=`${currentHeight}px`;
    if(!motionQuery.matches)portraitQuote.classList.add("is-changing");
    setTimeout(()=>{
      quoteText.innerHTML=heroQuotes[quoteIndex][0];
      quoteAuthor.textContent=heroQuotes[quoteIndex][1];
      portraitQuote.style.height="auto";
      const nextHeight=portraitQuote.offsetHeight;
      if(motionQuery.matches){
        portraitQuote.style.height="";
        return;
      }
      portraitQuote.style.height=`${currentHeight}px`;
      requestAnimationFrame(()=>{
        portraitQuote.style.height=`${nextHeight}px`;
        portraitQuote.classList.remove("is-changing");
      });
      setTimeout(()=>{portraitQuote.style.height=""},240);
    },motionQuery.matches?0:220);
  },7000);
}
const canvas=$("#network"),ctx=canvas.getContext("2d");let nodes=[],networkFrame;
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;nodes=Array.from({length:Math.min(55,Math.floor(innerWidth/25))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22}))}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>canvas.width)n.vx*=-1;if(n.y<0||n.y>canvas.height)n.vy*=-1;ctx.fillStyle="rgba(46,155,255,.45)";ctx.fillRect(n.x,n.y,1.5,1.5)}for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){let a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<145){ctx.strokeStyle=`rgba(46,155,255,${.08*(1-d/145)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}if(!motionQuery.matches)networkFrame=requestAnimationFrame(draw)}
function startNetwork(){cancelAnimationFrame(networkFrame);resize();draw()}
startNetwork();addEventListener("resize",startNetwork,{passive:true});motionQuery.addEventListener("change",startNetwork);

// Reveal on scroll
const revealElements=$$(".reveal");
if(motionQuery.matches)revealElements.forEach(e=>e.classList.add("visible"));
else{const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});revealElements.forEach(e=>observer.observe(e))}

// Active nav
const sections=[...$$("main section[id]")], navLinks=[...$$(".nav nav a")];
function updateActiveNav(){let y=scrollY+150;let current=sections.reduce((a,s)=>s.offsetTop<=y?s:a,sections[0]);navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current.id))}
addEventListener("scroll",updateActiveNav,{passive:true});updateActiveNav();

// Cursor glow
const glow=$(".cursor-glow");if(!motionQuery.matches)addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});
// Magnetic buttons and card tilt
if(!motionQuery.matches){$$(".magnetic").forEach(b=>b.addEventListener("pointermove",e=>{let r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}));$$(".magnetic").forEach(b=>b.addEventListener("pointerleave",()=>b.style.transform=""));$$(".tilt").forEach(c=>c.addEventListener("pointermove",e=>{if(innerWidth<900)return;let r=c.getBoundingClientRect();c.style.transform=`perspective(900px) rotateX(${-(e.clientY-r.top-r.height/2)/30}deg) rotateY(${(e.clientX-r.left-r.width/2)/30}deg) translateY(-7px)`}));$$(".tilt").forEach(c=>c.addEventListener("pointerleave",()=>c.style.transform=""))}

// Mobile menu
const menuBtn=$("#menuBtn"),desktopNav=$("#desktopNav");
function setMobileMenu(open){desktopNav.classList.toggle("mobile-open",open);menuBtn.setAttribute("aria-expanded",String(open));menuBtn.setAttribute("aria-label",open?"Close menu":"Open menu")}
function openMobileMenu(){setMobileMenu(true);const first=desktopNav.querySelector("a");if(first)first.focus({preventScroll:true})}
function closeMobileMenu(returnFocus){if(!desktopNav.classList.contains("mobile-open"))return;setMobileMenu(false);if(returnFocus&&desktopNav.contains(document.activeElement))menuBtn.focus()}
menuBtn.addEventListener("click",()=>{desktopNav.classList.contains("mobile-open")?setMobileMenu(false):openMobileMenu()});
$$('#desktopNav a').forEach(link=>link.addEventListener("click",()=>setMobileMenu(false)));
addEventListener("resize",()=>{if(innerWidth>=900)setMobileMenu(false)},{passive:true});

// Ask Sheru — rule-based portfolio assistant (no external AI)
const assistant=$("#assistant"),chat=$("#chat"),input=$("#chatInput"),assistantTriggers=[$("#assistantFab"),$("#openAssistant")];let lastFocusedElement,assistantEpoch=0;
const SHERU_USE='<svg class="sheru-avatar" aria-hidden="true"><use href="#sheru-icon"/></svg>';
function setAssistantState(open){assistant.classList.toggle("open",open);assistant.setAttribute("aria-hidden",String(!open));assistantTriggers.forEach(b=>{if(b)b.setAttribute("aria-expanded",String(open))})}
function openAI(){if(updatesPanel&&updatesPanel.classList.contains("open"))closeUpdates();assistantEpoch++;setAssistantState(true);lastFocusedElement=document.activeElement;input.focus();const stale=chat.querySelector(".typing");if(stale)stale.remove()}
function closeAI(){const wasOpen=assistant.classList.contains("open");assistantEpoch++;setAssistantState(false);const stale=chat.querySelector(".typing");if(stale)stale.remove();if(wasOpen&&lastFocusedElement)lastFocusedElement.focus()}
$("#assistantFab").onclick=openAI;$("#openAssistant").onclick=openAI;$("#closeAssistant").onclick=closeAI;
const answers=[
[/what does erick do|who is erick|about erick/,"Erick Pradhan is an AI/ML Engineer and a BSc (Hons) Computing with Artificial Intelligence student at Islington College, affiliated with London Metropolitan University. He works across machine learning, software engineering, cloud, data analysis, generative AI, automation, and IoT."],
[/ai skills|machine learning|ml skills|artificial intelligence/,"His AI-focused toolkit includes Machine Learning, Generative AI, LLM APIs, AI Automation, data analysis, and AWS services such as EC2, S3, Lambda, SageMaker, and Comprehend."],
[/projects|work|built/,"Featured work includes an IoT Smart Agriculture system with automated irrigation and a Diwali Sales Data Analysis project using exploratory data analysis, visualisation, and statistical testing."],
[/education|degree|study|university|student/,"Erick has studied BSc (Hons) Computing with Artificial Intelligence at Islington College since 2024, in affiliation with London Metropolitan University."],
[/technology|tech stack|skills|languages|tools/,"Key technologies include Python, Java, JavaScript, SQL, React.js, Node.js, REST APIs, MySQL, MongoDB, Supabase, DynamoDB, AWS, Docker, Git, Linux, Raspberry Pi, and Arduino Uno."],
[/experience|tutor|job/,"Erick worked as a Mathematics and English Tutor from June to September 2025, planning lessons, tracking student progress, and providing individual support to Grade 9 and Grade 10 students."],
[/certification|certifications|aws academy|credential/,"Erick completed AWS Academy Cloud Foundations, Data Engineering, Machine Learning Foundations, and Machine Learning for Natural Language Processing in December 2024."],
[/contact|email|linkedin|github|youtube/,"You can reach Erick at erickpradhan2@gmail.com or find his GitHub, LinkedIn, and YouTube channel through the contact section."]
];
const CHAT_MAX=80;
function appendMessage(message,role){const element=document.createElement("div");element.className=`msg ${role}`;if(role==="bot")element.insertAdjacentHTML("afterbegin",SHERU_USE);const text=document.createElement("span");text.className="msg-text";text.textContent=message;element.append(text);chat.append(element);while(chat.children.length>CHAT_MAX)chat.children[0].remove();chat.scrollTop=chat.scrollHeight}
function showTyping(){const t=document.createElement("div");t.className="msg bot typing";t.insertAdjacentHTML("afterbegin",SHERU_USE);const dots=document.createElement("span");dots.className="msg-text typing-dots";dots.setAttribute("aria-hidden","true");t.append(dots);chat.append(t);chat.scrollTop=chat.scrollHeight;return t}
function reply(q){q=q.toLowerCase();let a=answers.find(([r])=>r.test(q))?.[1]||"I can answer about Erick's projects, AI/ML skills, software stack, education, experiments, or contact information. Try asking: “What are his AI skills?”";appendMessage(a,"bot")}
$("#chatForm").addEventListener("submit",e=>{e.preventDefault();if(!assistant.classList.contains("open"))return;let q=input.value.trim();if(!q)return;appendMessage(q,"user");input.value="";const epoch=assistantEpoch;const typing=showTyping();setTimeout(()=>{if(epoch!==assistantEpoch||!assistant.classList.contains("open"))return;typing.remove();reply(q)},450)});
$$(".suggestions button").forEach(b=>b.onclick=()=>{input.value=b.dataset.q;$("#chatForm").dispatchEvent(new Event("submit",{cancelable:true}))});
assistant.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const focusable=[...assistant.querySelectorAll("button,input")];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});

// Command palette (Ctrl/Cmd+K)
const paletteOverlay=$("#paletteOverlay"),paletteInput=$("#paletteInput"),paletteList=$("#paletteList"),paletteHint=$("#paletteHint");
const paletteItems=[...$$(".palette-item")],paletteEmpty=$("#paletteEmpty");
let paletteOpener=null,paletteIndex=0;
function flashHint(id){if(motionQuery.matches)return;const el=document.getElementById(id);if(!el)return;el.classList.add("glow");clearTimeout(el._flashT);el._flashT=setTimeout(()=>el.classList.remove("glow"),420)}
function visiblePaletteItems(){return paletteItems.filter(li=>!li.hidden)}
function setPaletteOpen(open){paletteOverlay.classList.toggle("open",open);paletteOverlay.setAttribute("aria-hidden",String(!open));if(paletteHint)paletteHint.setAttribute("aria-expanded",String(open))}
function setActivePalette(){const vis=visiblePaletteItems();if(!vis.length){paletteIndex=0;paletteItems.forEach(li=>{li.classList.remove("active");li.setAttribute("aria-selected","false")});paletteInput.setAttribute("aria-activedescendant","");return}paletteIndex=Math.min(Math.max(paletteIndex,0),vis.length-1);paletteItems.forEach(li=>{const on=vis[paletteIndex]===li;li.classList.toggle("active",on);li.setAttribute("aria-selected",String(on))});paletteInput.setAttribute("aria-activedescendant",vis[paletteIndex].id)}
function filterPalette(){const q=paletteInput.value.trim().toLowerCase();let hits=0;paletteItems.forEach(li=>{const btn=li.querySelector("button");const match=!q||(btn.dataset.search||"").includes(q)||btn.textContent.toLowerCase().includes(q);li.hidden=!match;if(match)hits++});if(paletteEmpty)paletteEmpty.hidden=hits>0;paletteIndex=0;setActivePalette()}
function openPalette(){if(assistant.classList.contains("open"))closeAI();if(updatesPanel&&updatesPanel.classList.contains("open"))closeUpdates();paletteOpener=document.activeElement;paletteInput.value="";filterPalette();setPaletteOpen(true);paletteInput.focus()}
function closePalette(){if(!paletteOverlay.classList.contains("open"))return;setPaletteOpen(false);if(paletteOpener)paletteOpener.focus()}
function paletteRun(){flashHint("hintRun");const vis=visiblePaletteItems();const item=vis[paletteIndex];if(!item)return;const action=item.querySelector("button").dataset.action;closePalette();if(action==="assistant"){openAI();return}const target=action==="home"?document.getElementById("main-content"):document.getElementById(action);if(target)target.scrollIntoView({behavior:motionQuery.matches?"auto":"smooth",block:"start"})}
paletteInput.addEventListener("input",filterPalette);
paletteInput.addEventListener("keydown",e=>{if(e.key==="ArrowDown"){e.preventDefault();flashHint("hintDown");paletteIndex=Math.min(paletteIndex+1,visiblePaletteItems().length-1);setActivePalette()}else if(e.key==="ArrowUp"){e.preventDefault();flashHint("hintUp");paletteIndex=Math.max(paletteIndex-1,0);setActivePalette()}else if(e.key==="Enter"){e.preventDefault();flashHint("hintRun");paletteRun()}else if(e.key==="Escape"){e.preventDefault();e.stopPropagation();flashHint("hintEsc");closePalette()}});
paletteList.addEventListener("click",e=>{const btn=e.target.closest(".palette-item button");if(!btn)return;flashHint("hintRun");const li=btn.closest(".palette-item");const vis=visiblePaletteItems();paletteIndex=Math.max(0,vis.indexOf(li));paletteRun()});
if(paletteHint)paletteHint.addEventListener("click",e=>{e.preventDefault();openPalette()});
$("#paletteClose").addEventListener("click",()=>{flashHint("hintEsc");closePalette()});
paletteOverlay.addEventListener("click",e=>{if(e.target===paletteOverlay){flashHint("hintEsc");closePalette()}});
paletteOverlay.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const stops=[...paletteOverlay.querySelectorAll("button,input")].filter(el=>el.getAttribute("tabindex")!=="-1");if(!stops.length){e.preventDefault();return}const first=stops[0],last=stops[stops.length-1];const cur=paletteOverlay.contains(document.activeElement)?document.activeElement:null;const idx=cur?stops.indexOf(cur):-1;if(e.shiftKey){e.preventDefault();(idx>0?stops[idx-1]:last).focus()}else{e.preventDefault();(idx>=0&&idx<stops.length-1?stops[idx+1]:first).focus()}});
document.addEventListener("focusin",e=>{if(paletteOverlay.classList.contains("open")&&!paletteOverlay.contains(e.target))paletteInput.focus()});

// AI Lab local interactive terminal (predefined, rule-based commands — no external AI)
const termForm=$("#terminalForm"),termInput=$("#terminalInput"),termOut=$("#terminalOut");
const termCmds={
  help:"Commands: about, projects, skills, stack, lab, contact, github, clear. This is a local, rule-based demo terminal — no external AI service.",
  about:"Erick Pradhan — AI/ML Engineer and BSc (Hons) Computing with Artificial Intelligence student at Islington College, in affiliation with London Metropolitan University. He builds practical AI, data, and software systems.",
  projects:"Featured work: 1) IoT Smart Agriculture — ESP32 field system with automated irrigation, Blynk monitoring, and a 6-phase build verification (project document available). 2) Diwali Sales Data Analysis — 11,251 transactions, EDA with ANOVA (F = 2.477, p = 0.00166) and Chi-square (χ² = 1634.97) testing.",
  skills:"AI / ML: Machine Learning, Generative AI, LLM APIs, AI Automation, Data Analysis. Engineering: Python, Java, JavaScript, SQL, REST APIs, React.js, Node.js, HTML/CSS. Data / Cloud: MySQL, MongoDB, Supabase, DynamoDB, AWS, Docker. Systems: Git/GitHub, Linux/WSL, Raspberry Pi, Arduino Uno, IoT.",
  stack:"Core: Python, JavaScript, SQL, AWS (EC2, S3, Lambda, SageMaker, Comprehend), Docker, REST APIs, React.js, Node.js, MongoDB, MySQL. See the Skills section for the full wall with self-assessed focus areas.",
  lab:"Four research slots are tracking experiments: LLM / RAG knowledge systems and AI automation (exploring), computer vision and edge AI (queued). This terminal is local — no external AI.",
  contact:"Email: erickpradhan2@gmail.com. GitHub: github.com/ErickPradhan. LinkedIn: linkedin.com/in/erick-pradhan. YouTube: youtube.com/@DevBy-x8e.",
  github:"github.com/ErickPradhan — public repos include Iot-Smart-Agricultural-System and DiwaliSales-DataAnalysis."
};
function termTrim(){while(termOut.children.length>60)termOut.children[0].remove()}
function termEcho(cmd){const line=document.createElement("div");line.className="terminal-line";const p=document.createElement("span");p.className="terminal-prompt";p.setAttribute("aria-hidden","true");p.textContent="erick@ai-lab:~$";line.append(p,cmd);termOut.append(line);termTrim()}
function termResult(key){const val=termCmds[key];const div=document.createElement("div");div.className=val?"terminal-result":"terminal-result terminal-error";div.textContent=val||`command not found: ${key} — type 'help' for available commands.`;termOut.append(div);termOut.scrollTop=termOut.scrollHeight;termTrim()}
if(termForm&&termInput&&termOut){
  const termHistory=[];let termHistIdx=0;
  termForm.addEventListener("submit",e=>{e.preventDefault();const v=termInput.value.trim();termInput.value="";if(v){termHistory.push(v);if(termHistory.length>60)termHistory.shift()}termHistIdx=termHistory.length;termEcho(v);if(!v)return;const key=v.toLowerCase().split(/\s+/)[0];if(key==="clear"){termOut.replaceChildren();return}termResult(key)});
  termInput.addEventListener("keydown",e=>{if((e.key!=="ArrowUp"&&e.key!=="ArrowDown")||!termHistory.length)return;e.preventDefault();termHistIdx+=e.key==="ArrowUp"?-1:1;termHistIdx=Math.max(0,Math.min(termHistIdx,termHistory.length));termInput.value=termHistIdx<termHistory.length?termHistory[termHistIdx]:""});
}

addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();paletteOverlay.classList.contains("open")?closePalette():openPalette();return}
  if(e.key!=="Escape")return;
  if(paletteOverlay.classList.contains("open")){closePalette();return}
  if(assistant.classList.contains("open")){closeAI();return}
  if(updatesPanel&&updatesPanel.classList.contains("open")){closeUpdates();return}
  closeMobileMenu(true)
});

// Small keyboard Easter egg: type "matrix"
let key="";addEventListener("keydown",e=>{key=(key+e.key.toLowerCase()).slice(-6);if(key==="matrix"){document.body.style.setProperty("--blue","#55ff88");setTimeout(()=>document.body.style.setProperty("--blue","#2e9bff"),3000)}});

// ===== V2-B — INTERACTION + UX POLISH =====

// Keyboard access for skill labels that expose contextual guidance.
$$(".skill-cluster span").forEach(s=>s.setAttribute("tabindex","0"));

// Typing effects (About callback statement + CV call-to-action).
// Pattern: type → hold 5s (idle) → clear → retype, ONLY while visible.
// Cleanup guards: one IntersectionObserver, timers cleared on leave and never re-entered twice.
const typeHeadings=[...$$(".type-heading")];
if(typeHeadings.length){
  const typers=new Map();
  const tio=new IntersectionObserver(es=>es.forEach(e=>{const t=typers.get(e.target);if(t)e.isIntersecting?t.start():t.stop()}),{threshold:.35});
  typeHeadings.forEach(el=>{
    if(motionQuery.matches)return;
    const full=el.dataset.type||"",render=el.querySelector(".type-render");
    if(!render)return;
    let i=0,visible=false,timer=null,sec=null;
    const stop=()=>{visible=false;clearTimeout(timer);clearTimeout(sec);timer=sec=null;i=0;render.textContent=""};
    const step=()=>{if(!visible)return;if(i>=full.length){sec=setTimeout(()=>{if(!visible)return;i=0;render.textContent="";step()},10000);return}i++;render.textContent=full.slice(0,i);timer=setTimeout(step,i%5===0?30:18)};
    el.classList.add("typing-on");
    typers.set(el,{start(){visible=true;clearTimeout(timer);clearTimeout(sec);timer=sec=null;i=0;render.textContent="";step()},stop});
    tio.observe(el);
  });
}

// Technical stack → contextual label (no fake proficiency values)
const skillMap={
  "machine learning":"Core focus — see the AI Lab and the Diwali Sales statistical analysis.",
  "generative ai":"Experiment territory — LLM / RAG research slot in AI Lab.",
  "llm apis":"Exploration track — LLM / RAG research slot in AI Lab.",
  "data analysis":"Applied end-to-end in the Diwali Sales Data Analysis project.",
  "python":"Used end-to-end in the Diwali Sales Data Analysis project.",
  "aws":"Cloud foundations — AWS Academy certifications (Dec 2024).",
  "raspberry pi":"Embedded lab experiments — see AI Lab.",
  "arduino uno":"Embedded lab experiments — see AI Lab.",
  "iot":"Applied live in the IoT Smart Agriculture field system."
};
const skillNote=$("#skillContext");
const DEF_SKILL="Hover or focus a skill to see how it shows up in my work.";
function showSkill(sp){if(skillNote){const k=(sp.textContent||"").trim().toLowerCase();const cat=sp.closest(".skill-cluster");skillNote.textContent=skillMap[k]||(cat?cat.querySelector("h3").textContent+" — part of my active toolkit.":"Skill highlighted.")}sp.classList.add("skill-hot")}
function clearSkills(){if(skillNote)skillNote.textContent=DEF_SKILL;$$(".skill-hot").forEach(s=>s.classList.remove("skill-hot"))}
$$(".skill-cluster span").forEach(sp=>{sp.addEventListener("focus",()=>showSkill(sp));sp.addEventListener("blur",clearSkills);sp.addEventListener("mouseenter",()=>showSkill(sp));sp.addEventListener("mouseleave",clearSkills)});

// AI Lab research slots — focus/hover preview, clearly exploration/queued
const labNote=$("#labSlotNote");
const DEF_LAB="Focus or hover a research slot to preview its status.";
function showLab(sl){if(labNote)labNote.textContent=sl.dataset.desc||DEF_LAB;sl.classList.add("lab-hot")}
function clearLab(){if(labNote)labNote.textContent=DEF_LAB;$$(".lab-hot").forEach(s=>s.classList.remove("lab-hot"))}
$$(".lab-slot").forEach(sl=>{sl.addEventListener("focus",()=>showLab(sl));sl.addEventListener("blur",clearLab);sl.addEventListener("mouseenter",()=>showLab(sl));sl.addEventListener("mouseleave",clearLab)});

// Contact form — local validation only + preview success (no service connected yet)
const contactForm=$("#contactForm"),contactSuccess=$("#contactSuccess"),cfReset=$("#cfReset");
if(contactForm&&contactSuccess){
  const fields=[
    ["name",$("#cfName")],
    ["email",$("#cfEmail")],
    ["subject",$("#cfSubject")],
    ["message",$("#cfMessage")]
  ];
  const cfErr={name:$("#cfNameErr"),email:$("#cfEmailErr"),subject:$("#cfSubjectErr"),message:$("#cfMessageErr")};
  const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const nameRe=/^\p{L}(?:[\p{L}\p{M}'’ -]*[\p{L}\p{M}])?$/u;
  function setErr(key,msg){const e=cfErr[key];if(e)e.textContent=msg}
  function validate(){let first=null;fields.forEach(([key,el])=>{const v=(el.value||"").trim();let m="";if(key==="name"){if(v.length<1)m="Please enter your name.";else if(!nameRe.test(v))m="Use your name — letters, spaces, hyphens, or apostrophes only (no digits or symbols).";else if(v.length>80)m="Name is too long — keep it under 80 characters."}else if(key==="email"){if(!emailRe.test(v))m="Enter a valid email address."}else if(key==="subject"){if(v.length<3)m="Add a short subject."}else if(v.length<10)m="Message should be at least 10 characters.";if(m){el.setAttribute("aria-invalid","true");setErr(key,m);if(!first)first=el}else{el.setAttribute("aria-invalid","false");setErr(key,"")}});return first}
  contactForm.addEventListener("submit",e=>{e.preventDefault();const bad=validate();if(bad){bad.focus();return}contactForm.hidden=true;contactSuccess.hidden=false});
  fields.forEach(([key,el])=>{el.addEventListener("input",()=>{const v=(el.value||"").trim();const ok=key==="name"?v.length>=1&&nameRe.test(v):key==="email"?emailRe.test(v):key==="subject"?v.length>=3:v.length>=10;if(ok){el.setAttribute("aria-invalid","false");setErr(key,"")}})});
  if(cfReset)cfReset.addEventListener("click",()=>{fields.forEach(([,el])=>{el.value="";el.setAttribute("aria-invalid","false")});Object.keys(cfErr).forEach(k=>setErr(k,""));contactSuccess.hidden=true;contactForm.hidden=false;const n=fields[0][1];if(n)n.focus()});
}

// Contact email → Gmail compose (opens a new tab; plain mailto stays as the href fallback). No API.
const emailCompose=$$(".email-compose");
emailCompose.forEach(a=>{
  a.addEventListener("click",e=>{
    const to=(a.dataset.to||"").trim();
    if(!to)return;
    const win=window.open("https://mail.google.com/mail/?view=cm&fs=1&to="+to,"_blank");
    if(win===null||win===undefined)return;
    win.opener=null;
    e.preventDefault();
  });
});

// ===== V2-C — ACTIVITY & CURRENT WORK =====
// Curated, portfolio-level content only. No backend, no build step, and no raw
// git/infrastructure events ever reach the UI. To publish an update, add an entry
// to UPDATES (or CURRENT_WORK) below — everything else is derived from it.

// Currently working on. `progress` is optional and only rendered when set to a
// real number, so no percentage is ever invented. Supported statuses:
// "In Progress", "Completed", "Planning", "On Hold", "Archived".
const CURRENT_WORK=[
  {id:"cw-llm-rag",project:"LLM / RAG Knowledge Systems",status:"In Progress",note:"Exploring retrieval-augmented generation pipelines and LLM API calls over custom documents.",link:"#lab",progress:null},
  {id:"cw-ai-automation",project:"AI Automation — Agentic Workflows",status:"In Progress",note:"Prototyping agentic workflows that compose LLM calls into small focused tools.",link:"#lab",progress:null},
  {id:"cw-vision",project:"Computer Vision — Visual Intelligence",status:"Planning",note:"Queued for OpenCV and vision-model experiments.",link:"#lab",progress:null},
  {id:"cw-edge",project:"Edge AI — IoT + Intelligence",status:"Planning",note:"Queued for running small models on edge hardware alongside the IoT field system.",link:"#lab",progress:null}
];

// Recent updates. `type` picks the icon: project | document | milestone | status | update | achievement
// Every entry carries an explicit lifetime:
//   publishedAt — YYYY-MM-DD the update went live (rendered as the relative time)
//   expiresAt   — YYYY-MM-DD the last day the update stays in the panel; omitted = never expires.
// Each update chooses its own lifetime, so nothing relies on a blanket "30 days" rule.
// DEFAULT_LIFETIME_DAYS applies only when an entry gives no explicit expiresAt.
// Keep this feed low-noise: new projects, major features, milestones, certifications and
// achievements only — not styling tweaks, spacing passes, typo fixes or internal refactors.
const DEFAULT_LIFETIME_DAYS=30;
const UPDATES=[
  {id:"u-notify-0930",type:"update",title:"Notifications Added",description:"Stay updated with the latest portfolio projects, achievements, and improvements.",project:"Portfolio",publishedAt:"2026-09-30",expiresAt:"2026-10-30",link:"#work"},
  {id:"u-iot-doc-0929",type:"document",title:"Project Document Added",description:"Published the full project report for the IoT Smart Agriculture system — ESP32 firmware, sensor wiring, automated irrigation, and Blynk monitoring.",project:"IoT Smart Agriculture",publishedAt:"2026-09-29",expiresAt:"2026-12-28",link:"#work"},
  {id:"u-cv-0929",type:"document",title:"CV Updated",description:"Refreshed the CV with current project work, technical skills, and certifications.",project:"Portfolio",publishedAt:"2026-09-29",expiresAt:"2026-12-28",link:"#cv"},
  {id:"u-lab-0925",type:"milestone",title:"AI Lab & Page Features Added",description:"Added the AI Lab experiments section, an Ask Sheru page guide, and a Ctrl+K command palette.",project:"Portfolio",publishedAt:"2026-09-25",expiresAt:"2026-12-24",link:"#lab"},
  {id:"u-hero-0923",type:"update",title:"Hero Presentation Refined",description:"Updated the hero portrait and overall page presentation for a cleaner first impression.",project:"Portfolio",publishedAt:"2026-09-23",expiresAt:"2026-12-22",link:"#main-content"},
  {id:"u-publish-0922",type:"status",title:"Portfolio Published",description:"Published the portfolio on its own domain at erickpradhan.com.np.",project:"Portfolio",publishedAt:"2026-09-22",expiresAt:"2026-10-22",link:"#main-content"},
  {id:"u-first-0921",type:"project",title:"First Projects Added",description:"Added the IoT Smart Agriculture system and the Diwali Sales Data Analysis project.",project:"Portfolio",publishedAt:"2026-09-21",link:"#work"}
];

const UPD_MAX=8;
const UPD_ICONS={
  project:'<path d="M12 5v14M5 12h14"/>',
  document:'<path d="M14 3v5h5"/><path d="M6 3h8l5 5v13H6z"/>',
  milestone:'<path d="m5 13 4 4L19 7"/>',
  status:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  update:'<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>',
  achievement:'<path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8z"/>'
};

const updatesPanel=$("#updatesPanel"),bellBtn=$("#openUpdates"),bellDot=$("#bellDot");
const updatesCurrent=$("#updatesCurrent"),updatesList=$("#updatesList"),updatesCount=$("#updatesCount"),markAllBtn=$("#markAllRead");
let updatesOpener=null;

const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// Dedupe by stable id, then newest first. Curated entries can't duplicate per edit,
// but this keeps a repeated id from ever rendering twice.
function dedupeById(list){const seen=new Set();return list.filter(e=>e&&e.id&&!seen.has(e.id)&&(seen.add(e.id),true))}
// `publishedAt` is the canonical field; `date` is still accepted so older entries keep working.
function publishedOf(e){return String(e&&(e.publishedAt||e.date)||"")}
// Parse "YYYY-MM-DD" as local midnight (ISO date strings would parse as UTC and can
// land on the previous day). Returns null when absent or malformed, which routes the
// entry to the default lifetime below rather than retiring it on a bad date string.
// The components are re-checked against the parsed Date because the engine silently
// rolls impossible dates over ("2026-02-31" becomes 3 March, "2026-02-29" becomes 1
// March), which would quietly give an update the wrong lifetime. Rejecting them routes
// them to the documented fallback instead. Leap days that really exist still parse.
function parseDay(iso){const s=String(iso||"").trim();if(!/^\d{4}-\d{2}-\d{2}/.test(s))return null;const y=+s.slice(0,4),m=+s.slice(5,7),d=+s.slice(8,10);const dt=new Date(y,m-1,d);return isNaN(dt)||dt.getFullYear()!==y||dt.getMonth()!==m-1||dt.getDate()!==d?null:dt}
// Today's local midnight, so an entry stays visible through the whole of its expiry day.
function todayDay(){const n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate())}
function addDays(day,n){const d=new Date(day.getTime());d.setDate(d.getDate()+n);return d}
// Effective expiry for an entry: its own stored date, or publishedAt + the default
// lifetime when no explicit date is given. null = no expiry.
function expiryOf(e,now){const explicit=parseDay(e&&e.expiresAt);if(explicit)return explicit;const pub=parseDay(publishedOf(e));return pub?addDays(pub,DEFAULT_LIFETIME_DAYS):null}
// Expired entries are dropped before rendering, so they can never appear anywhere in
// the active notification UI and can never count towards the unread badge.
function isActive(e,now){const exp=expiryOf(e,now);return !exp||exp>=now}
// Whole days left, inclusive of today, so the publication day of a 30-day entry reads
// "30 days left" and its final day reads "Expires today".
function remainingDays(e,now){const exp=expiryOf(e,now);return exp?Math.max(0,Math.round((exp-now)/864e5)):null}
function relTime(iso){const then=parseDay(iso);if(!then)return"";const days=Math.floor((Date.now()-then.getTime())/864e5);if(days<=0)return"Today";if(days===1)return"Yesterday";if(days<7)return days+" days ago";if(days<14)return"1 week ago";if(days<31)return Math.floor(days/7)+" weeks ago";return then.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}
function statusPill(status){return status?`<span class="upd-status" data-status="${esc(status)}">${esc(status)}</span>`:""}

const READ_KEY="ep.updates.seen";
const UPDATES_KEY="ep.updates.known";
// localStorage is untrusted input, so every stored value goes through this. It coerces
// anything (missing key, malformed JSON, non-array, nested junk) to a de-duplicated array
// of plain id strings. Never returns null, so read state can never become un-callable.
function normalizeIds(v){if(!Array.isArray(v))return[];return[...new Set(v.filter(x=>typeof x==="string"&&x))]}
function loadSeen(){try{return normalizeIds(JSON.parse(localStorage.getItem(READ_KEY)||"null"))}catch(e){return[]}}
function saveSeen(ids){try{localStorage.setItem(READ_KEY,JSON.stringify(ids))}catch(e){}}
// `known` keeps returning null for "never stored / unreadable" because null is what marks
// a first visit, and a corrupt value must not be mistaken for a real previous visit.
function loadKnown(){try{const v=JSON.parse(localStorage.getItem(UPDATES_KEY)||"null");return Array.isArray(v)?v.filter(x=>typeof x==="string"&&x):null}catch(e){return null}}
function saveKnown(ids){try{localStorage.setItem(UPDATES_KEY,JSON.stringify(ids))}catch(e){}}

let now0=todayDay();
// Only entries whose stored expiry has not passed are ever rendered or counted.
function activeUpdateEntries(now){
  return dedupeById(UPDATES).filter(e=>isActive(e,now)).sort((a,b)=>publishedOf(b).localeCompare(publishedOf(a))).slice(0,UPD_MAX);
}
let updateEntries=activeUpdateEntries(now0);
const currentEntries=dedupeById(CURRENT_WORK);
let currentIds=updateEntries.map(e=>e.id);
// Normalised on load, so `seen` is always a real array: a missing or corrupt key can no
// longer leave it null and throw inside the unread count or a row render below.
let seen=normalizeIds(loadSeen());
// Drops ids that are no longer active from BOTH stored collections. Pruning `seen` keeps
// the read list bounded; pruning `known` does the same for the previous-visit baseline,
// and is what lets a genuinely new update that reuses a retired id count as new — the id
// is gone from the baseline, so it is treated as unseen rather than as already known.
function pruneStoredIds(){
  let changed=false;
  if(seen.some(id=>!currentIds.includes(id))){seen=seen.filter(id=>currentIds.includes(id));changed=true}
  const k=loadKnown();
  if(k&&k.some(id=>!currentIds.includes(id))){saveKnown(k.filter(id=>currentIds.includes(id)));changed=true}
  if(changed)saveSeen(seen);
  return changed;
}
// Returned visitors get a bell dot for anything published since their last visit; the
// feed is rendered from data on every load, so nothing is ever duplicated.
const known=loadKnown();
const isFirstVisit=known===null;
// Prune first, so the baseline read below is already free of expired ids.
let dirty=pruneStoredIds();
// A returning visitor whose read state is missing or corrupt is repaired from their own
// previous-visit baseline rather than being treated as a first visit, so updates they had
// already seen stay read and only genuinely new ones light the bell.
if(!isFirstVisit&&!seen.length&&known.length){seen=known.filter(id=>currentIds.includes(id));dirty=true}
// First visit: treat everything already published as seen so the bell starts quiet.
// Returning visitor: existing read state is left alone and only the baseline is recorded,
// so previously read updates stay read and only genuinely new ids light the bell.
if(isFirstVisit){seen=currentIds.slice();saveKnown(currentIds);dirty=true}
else if(!currentIds.every(id=>known.includes(id))){saveKnown(currentIds);dirty=true}
if(dirty)saveSeen(seen);
const unreadCount=()=>currentIds.filter(id=>!seen.includes(id)).length;
// One-shot timer aimed at the next expiry boundary. While the panel is open this drops a
// lapsed update the moment its expiry day ends, instead of waiting for the next open or
// tab-return check. It is not a poll: exactly one timer exists, it re-arms from
// refreshUpdates, and it is cleared when the panel closes and on page unload.
let expiryTimer=null;
function clearExpiryTimer(){if(expiryTimer){clearTimeout(expiryTimer);expiryTimer=null}}
function armExpiryTimer(){
  clearExpiryTimer();
  if(!updatesPanel||!updatesPanel.classList.contains("open"))return;
  // Entries are inclusive of their expiry day, so the boundary is midnight after it.
  const next=updateEntries.reduce((min,e)=>{
    const exp=expiryOf(e,now0);
    if(!exp)return min;
    const at=addDays(exp,1).getTime();
    return at>Date.now()&&(min===null||at<min)?at:min;
  },null);
  if(next===null)return;
  // Clamped to the 32-bit setTimeout range; the timer re-arms for the next boundary.
  expiryTimer=setTimeout(()=>{expiryTimer=null;refreshUpdates()},Math.min(next-Date.now(),2147483647));
}
// Re-applies the expiry filter and re-renders, so an update that lapses while the tab
// is idle disappears on its own instead of lingering until the next full page load.
function refreshUpdates(){
  const today=todayDay();
  updateEntries=activeUpdateEntries(today);
  now0=today;
  currentIds=updateEntries.map(e=>e.id);
  pruneStoredIds();
  renderUpdates();renderBell();
  armExpiryTimer();
}

function renderCurrentWork(){
  if(!currentEntries.length){updatesCurrent.innerHTML='<p class="upd-empty">Nothing in active development right now.</p>';return}
  updatesCurrent.innerHTML=currentEntries.map(item=>{
    const pct=Number(item.progress);
    const bar=Number.isFinite(pct)&&pct>0?`<div class="upd-bar"><i style="width:${Math.min(100,Math.max(0,pct))}%"></i></div>`:"";
    const link=item.link?`<a class="upd-goal" href="${esc(item.link)}">View <span aria-hidden="true">↗</span></a>`:"";
    return `<article class="upd-current-item"><h4>${esc(item.project)}</h4>${statusPill(item.status)}${item.note?`<p>${esc(item.note)}</p>`:""}${bar}${link}</article>`;
  }).join("");
}
function renderUpdates(){
  if(!updateEntries.length){updatesList.innerHTML='<li class="upd-empty">No updates published yet.</li>';return}
  updatesList.innerHTML=updateEntries.map(item=>{
    const icon=`<span class="upd-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${UPD_ICONS[item.type]||UPD_ICONS.update}</svg></span>`;
    const link=item.link?`<a class="upd-goal" href="${esc(item.link)}">Open <span aria-hidden="true">↗</span></a>`:"";
    const isRead=seen.includes(item.id);
    // Keyboard-reachable way to clear a single unread item; mouse users can also just
    // click the row. Both routes run through markItemRead.
    const markBtn=isRead?"":`<button class="upd-markread" type="button" data-read-id="${esc(item.id)}" aria-label="Mark &quot;${esc(item.title)}&quot; as read">Mark read</button>`;
    // Honest lifetime label — the stored expiry date, never an invented percentage.
    const left=remainingDays(item,now0);
    const life=left===null?"":`<span class="upd-life">${left>1?`${left} days left`:left===1?"1 day left":"Expires today"}</span>`;
    const meta=[item.project?`<span class="upd-project">${esc(item.project)}</span>`:"",`<span class="upd-time">${esc(relTime(publishedOf(item)))}</span>`,life,markBtn,link].join("");
    return `<li class="upd-item${isRead?"":" unread"}" data-upd-id="${esc(item.id)}">${icon}<div class="upd-main"><div class="upd-title">${esc(item.title)}</div>${item.description?`<p class="upd-desc">${esc(item.description)}</p>`:""}<div class="upd-meta">${meta}</div></div></li>`;
  }).join("");
}
function renderBell(){
  const n=unreadCount();
  bellDot.hidden=n===0;
  bellBtn.setAttribute("aria-label",n?`Updates — ${n} unread`:"Updates — what is new and what I am working on");
  if(markAllBtn)markAllBtn.hidden=n===0;
  if(updatesCount)updatesCount.textContent=n?`${n} unread`:"All caught up";
}
// Marks one update read and persists immediately, so the state survives the session.
// Only the affected row is touched (rather than a full re-render) so keyboard focus is
// never dropped onto the page body when the row's own "Mark read" button disappears.
function markItemRead(id){
  if(!id||seen.includes(id))return false;
  seen=seen.concat(id);
  saveSeen(seen);
  const row=[...updatesList.querySelectorAll(".upd-item")].find(el=>el.dataset.updId===id);
  if(row){
    row.classList.remove("unread");
    const btn=row.querySelector(".upd-markread");
    if(btn){
      if(btn===document.activeElement)(row.querySelector(".upd-goal")||updatesPanel).focus({preventScroll:true});
      btn.remove();
    }
  }
  renderBell();
  return true;
}
function markAllRead(){seen=currentIds.slice();saveSeen(seen);renderUpdates();renderBell()}
function setUpdatesOpen(open){
  updatesPanel.classList.toggle("open",open);
  updatesPanel.setAttribute("aria-hidden",String(!open));
  if(bellBtn)bellBtn.setAttribute("aria-expanded",String(open));
  // Focus the panel itself rather than a child control: "Mark all as read" is
  // hidden when there is nothing unread, and focusing a hidden element is a no-op.
  if(open){refreshUpdates();updatesOpener=bellBtn||document.activeElement;updatesPanel.focus({preventScroll:true})}
  else{clearExpiryTimer();if(updatesOpener&&updatesOpener.isConnected){updatesOpener.focus();updatesOpener=null}}
}
function openUpdates(){
  if(paletteOverlay.classList.contains("open"))closePalette();
  if(assistant.classList.contains("open"))closeAI();
  setMobileMenu(false);
  setUpdatesOpen(true);
}
function closeUpdates(){setUpdatesOpen(false)}

if(updatesPanel&&bellBtn){
  renderCurrentWork();renderUpdates();renderBell();
  bellBtn.addEventListener("click",()=>updatesPanel.classList.contains("open")?closeUpdates():openUpdates());
  $("#closeUpdates").addEventListener("click",closeUpdates);
  if(markAllBtn)markAllBtn.addEventListener("click",markAllRead);
  // Opening an update marks it read. The per-row button handles keyboard users; a plain
  // click anywhere on the row does the same for pointer users. Following an in-panel
  // link navigates the page, so the panel closes too.
  // Clicks that start inside the panel are handled here and stop here: marking read
  // removes the button from the DOM, which would otherwise make the outside-click
  // handler below treat the click as external and close the panel under the user.
  updatesPanel.addEventListener("click",e=>{
    e.stopPropagation();
    const mark=e.target.closest(".upd-markread");
    if(mark){markItemRead(mark.dataset.readId);return}
    if(e.target.closest(".upd-goal")){const row=e.target.closest(".upd-item");if(row)markItemRead(row.dataset.updId);closeUpdates();return}
    const row=e.target.closest(".upd-item");
    if(row)markItemRead(row.dataset.updId);
  });
  document.addEventListener("click",e=>{if(!updatesPanel.contains(e.target)&&!bellBtn.contains(e.target))closeUpdates()});
  updatesPanel.addEventListener("keydown",e=>{if(e.key==="Escape"){e.stopPropagation();closeUpdates()}});
  // A notification that lapses while the tab sits idle drops out of the panel and out of
  // the unread count on the next check (on page load, on panel open, on tab return, and
  // at the expiry boundary itself while the panel is open).
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")refreshUpdates()});
  // The boundary timer exists only to serve an open panel, so it is cleared on unload.
  window.addEventListener("pagehide",clearExpiryTimer);
}
