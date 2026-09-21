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
menuBtn.addEventListener("click",()=>setMobileMenu(!desktopNav.classList.contains("mobile-open")));
$$('#desktopNav a').forEach(link=>link.addEventListener("click",()=>setMobileMenu(false)));
addEventListener("resize",()=>{if(innerWidth>=900)setMobileMenu(false)},{passive:true});

// AI assistant
const assistant=$("#assistant"),chat=$("#chat"),input=$("#chatInput");let lastFocusedElement;
function openAI(){lastFocusedElement=document.activeElement;assistant.classList.add("open");assistant.setAttribute("aria-hidden","false");input.focus()}
function closeAI(){const wasOpen=assistant.classList.contains("open");assistant.classList.remove("open");assistant.setAttribute("aria-hidden","true");if(wasOpen&&lastFocusedElement)lastFocusedElement.focus()}
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
$("#chatForm").addEventListener("submit",e=>{e.preventDefault();let q=input.value.trim();if(!q)return;appendMessage(q,"user");input.value="";setTimeout(()=>reply(q),250)});
$$(".suggestions button").forEach(b=>b.onclick=()=>{input.value=b.dataset.q;$("#chatForm").dispatchEvent(new Event("submit",{cancelable:true}))});
assistant.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const focusable=[...assistant.querySelectorAll("button,input")];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
addEventListener("keydown",e=>{if(e.key!=="Escape")return;if(assistant.classList.contains("open"))closeAI();else setMobileMenu(false)});

// Small keyboard Easter egg: type "matrix"
let key="";addEventListener("keydown",e=>{key=(key+e.key.toLowerCase()).slice(-6);if(key==="matrix"){document.body.style.setProperty("--blue","#55ff88");setTimeout(()=>document.body.style.setProperty("--blue","#2e9bff"),3000)}});
