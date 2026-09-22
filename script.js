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

// AI assistant
const assistant=$("#assistant"),chat=$("#chat"),input=$("#chatInput"),assistantTriggers=[$("#assistantFab"),$("#openAssistant")];let lastFocusedElement,assistantEpoch=0;
function setAssistantState(open){assistant.classList.toggle("open",open);assistant.setAttribute("aria-hidden",String(!open));assistantTriggers.forEach(b=>{if(b)b.setAttribute("aria-expanded",String(open))})}
function openAI(){assistantEpoch++;setAssistantState(true);lastFocusedElement=document.activeElement;input.focus()}
function closeAI(){const wasOpen=assistant.classList.contains("open");assistantEpoch++;setAssistantState(false);if(wasOpen&&lastFocusedElement)lastFocusedElement.focus()}
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
function appendMessage(message,role){const element=document.createElement("div");element.className=`msg ${role}`;element.textContent=message;chat.append(element);chat.scrollTop=chat.scrollHeight}
function reply(q){q=q.toLowerCase();let a=answers.find(([r])=>r.test(q))?.[1]||"I can answer about Erick's projects, AI/ML skills, software stack, education, experiments, or contact information. Try asking: “What are his AI skills?”";appendMessage(a,"bot")}
$("#chatForm").addEventListener("submit",e=>{e.preventDefault();if(!assistant.classList.contains("open"))return;let q=input.value.trim();if(!q)return;appendMessage(q,"user");input.value="";const epoch=assistantEpoch;setTimeout(()=>{if(epoch!==assistantEpoch||!assistant.classList.contains("open"))return;reply(q)},250)});
$$(".suggestions button").forEach(b=>b.onclick=()=>{input.value=b.dataset.q;$("#chatForm").dispatchEvent(new Event("submit",{cancelable:true}))});
assistant.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const focusable=[...assistant.querySelectorAll("button,input")];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});

// Command palette (Ctrl/Cmd+K)
const paletteOverlay=$("#paletteOverlay"),paletteInput=$("#paletteInput"),paletteList=$("#paletteList"),paletteHint=$("#paletteHint");
const paletteItems=[...$$(".palette-item")],paletteEmpty=$("#paletteEmpty");
let paletteOpener=null,paletteIndex=0;
function visiblePaletteItems(){return paletteItems.filter(li=>!li.hidden)}
function setPaletteOpen(open){paletteOverlay.classList.toggle("open",open);paletteOverlay.setAttribute("aria-hidden",String(!open));if(paletteHint)paletteHint.setAttribute("aria-expanded",String(open))}
function setActivePalette(){const vis=visiblePaletteItems();if(!vis.length){paletteIndex=0;paletteItems.forEach(li=>{li.classList.remove("active");li.setAttribute("aria-selected","false")});paletteInput.setAttribute("aria-activedescendant","");return}paletteIndex=Math.min(Math.max(paletteIndex,0),vis.length-1);paletteItems.forEach(li=>{const on=vis[paletteIndex]===li;li.classList.toggle("active",on);li.setAttribute("aria-selected",String(on))});paletteInput.setAttribute("aria-activedescendant",vis[paletteIndex].id)}
function filterPalette(){const q=paletteInput.value.trim().toLowerCase();let hits=0;paletteItems.forEach(li=>{const btn=li.querySelector("button");const match=!q||(btn.dataset.search||"").includes(q)||btn.textContent.toLowerCase().includes(q);li.hidden=!match;if(match)hits++});if(paletteEmpty)paletteEmpty.hidden=hits>0;paletteIndex=0;setActivePalette()}
function openPalette(){if(assistant.classList.contains("open"))closeAI();paletteOpener=document.activeElement;paletteInput.value="";filterPalette();setPaletteOpen(true);paletteInput.focus()}
function closePalette(){if(!paletteOverlay.classList.contains("open"))return;setPaletteOpen(false);if(paletteOpener)paletteOpener.focus()}
function paletteRun(){const vis=visiblePaletteItems();const item=vis[paletteIndex];if(!item)return;const action=item.querySelector("button").dataset.action;closePalette();if(action==="assistant"){openAI();return}const target=action==="home"?document.getElementById("main-content"):document.getElementById(action);if(target)target.scrollIntoView({behavior:motionQuery.matches?"auto":"smooth",block:"start"})}
paletteInput.addEventListener("input",filterPalette);
paletteInput.addEventListener("keydown",e=>{if(e.key==="ArrowDown"){e.preventDefault();paletteIndex=Math.min(paletteIndex+1,visiblePaletteItems().length-1);setActivePalette()}else if(e.key==="ArrowUp"){e.preventDefault();paletteIndex=Math.max(paletteIndex-1,0);setActivePalette()}else if(e.key==="Enter"){e.preventDefault();paletteRun()}else if(e.key==="Escape"){e.preventDefault();e.stopPropagation();closePalette()}});
paletteList.addEventListener("click",e=>{const btn=e.target.closest(".palette-item button");if(!btn)return;const li=btn.closest(".palette-item");const vis=visiblePaletteItems();paletteIndex=Math.max(0,vis.indexOf(li));paletteRun()});
if(paletteHint)paletteHint.addEventListener("click",e=>{e.preventDefault();openPalette()});
$("#paletteClose").addEventListener("click",closePalette);
paletteOverlay.addEventListener("click",e=>{if(e.target===paletteOverlay)closePalette()});
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
  termForm.addEventListener("submit",e=>{e.preventDefault();const v=termInput.value.trim();termInput.value="";if(v)termHistory.push(v);termHistIdx=termHistory.length;termEcho(v);if(!v)return;const key=v.toLowerCase().split(/\s+/)[0];if(key==="clear"){termOut.replaceChildren();return}termResult(key)});
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
