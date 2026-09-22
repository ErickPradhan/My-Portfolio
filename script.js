const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

// Neural background
const motionQuery=matchMedia("(prefers-reduced-motion: reduce)");
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
function openAI(){assistantEpoch++;setAssistantState(true);lastFocusedElement=document.activeElement;input.focus();const stale=chat.querySelector(".typing");if(stale)stale.remove()}
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
function openPalette(){if(assistant.classList.contains("open"))closeAI();paletteOpener=document.activeElement;paletteInput.value="";filterPalette();setPaletteOpen(true);paletteInput.focus()}
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
  closeMobileMenu(true)
});

// Small keyboard Easter egg: type "matrix"
let key="";addEventListener("keydown",e=>{key=(key+e.key.toLowerCase()).slice(-6);if(key==="matrix"){document.body.style.setProperty("--blue","#55ff88");setTimeout(()=>document.body.style.setProperty("--blue","#2e9bff"),3000)}});

// ===== V2-B — INTERACTION + UX POLISH =====

// Keyboard accessibility for chips, cards, facts (static upgrade; no new dependencies)
$$(".techs span").forEach(s=>s.setAttribute("tabindex","0"));
$$(".process-card.card-lift").forEach(c=>c.setAttribute("tabindex","0"));
$$(".fact-card").forEach(c=>c.setAttribute("tabindex","0"));
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
  const nameRe=/^\p{L}[\p{L}'\s-]*\p{L}$/u;
  function setErr(key,msg){const e=cfErr[key];if(e)e.textContent=msg}
  function validate(){let first=null;fields.forEach(([key,el])=>{const v=(el.value||"").trim();let m="";if(key==="name"){if(v.length<2)m="Please enter your name.";else if(!nameRe.test(v))m="Use your name — letters, spaces, hyphens, or apostrophes only (no digits or symbols).";else if(v.length>80)m="Name is too long — keep it under 80 characters."}else if(key==="email"){if(!emailRe.test(v))m="Enter a valid email address."}else if(key==="subject"){if(v.length<3)m="Add a short subject."}else if(v.length<10)m="Message should be at least 10 characters.";if(m){el.setAttribute("aria-invalid","true");setErr(key,m);if(!first)first=el}else{el.setAttribute("aria-invalid","false");setErr(key,"")}});return first}
  contactForm.addEventListener("submit",e=>{e.preventDefault();const bad=validate();if(bad){bad.focus();return}contactForm.hidden=true;contactSuccess.hidden=false});
  fields.forEach(([key,el])=>{el.addEventListener("input",()=>{const v=(el.value||"").trim();const ok=key==="name"?v.length>=2&&nameRe.test(v):key==="email"?emailRe.test(v):key==="subject"?v.length>=3:v.length>=10;if(ok){el.setAttribute("aria-invalid","false");setErr(key,"")}})});
  if(cfReset)cfReset.addEventListener("click",()=>{fields.forEach(([,el])=>{el.value="";el.setAttribute("aria-invalid","false")});Object.keys(cfErr).forEach(k=>setErr(k,""));contactSuccess.hidden=true;contactForm.hidden=false;const n=fields[0][1];if(n)n.focus()});
}

// Contact email → Gmail compose (opens a new tab; plain mailto stays as the href fallback). No API.
const emailCompose=$$(".email-compose");
emailCompose.forEach(a=>{
  a.addEventListener("click",e=>{
    const to=(a.dataset.to||"").trim();
    if(!to)return;
    const win=window.open("https://mail.google.com/mail/?view=cm&fs=1&to="+to,"_blank","noopener");
    if(win===null||win===undefined)return;
    e.preventDefault();
  });
});
