import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, MapPin, PlusSquare, Send, Briefcase, CheckCircle, Star,
  Bookmark, Bell, User, Menu, X, ChevronRight, ChevronLeft, LogOut,
  Wrench, Zap, Hammer, PaintBucket, Sparkles, Mountain, Leaf, Car,
  HardHat, MoreHorizontal, Phone, Mail, MapPinned, Clock, Calendar,
  BadgeCheck, ShieldCheck, ArrowRight, Repeat, Camera, Home as HomeIcon,
  Info, MessageSquare, Facebook, Instagram, Twitter, Linkedin,
  ToggleLeft, ToggleRight, Trash2, Edit3, ThumbsUp, AlertCircle,
  Users, TrendingUp, Award, PhoneCall, CircleDot, Circle
} from "lucide-react";

/* ============================== THEME ============================== */
const Theme = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

    .llc { --navy:#152238; --navy2:#22345a; --amber:#f2a93b; --amber-dark:#c9861f;
      --rust:#c1440e; --teal:#16815a; --canvas:#f2efe6; --canvas2:#eae5d6;
      --ink:#181c22; --slate:#5c6470; --line:#d8d2c0; --white:#fffdf9;
      font-family:'Inter',sans-serif; background:var(--canvas); color:var(--ink);
      min-height:100vh; }
    .llc .fdisp{ font-family:'Space Grotesk',sans-serif; }
    .llc .fmono{ font-family:'IBM Plex Mono',monospace; }

    .llc .btn-p{ background:var(--amber); color:var(--navy); font-weight:700; border-radius:8px;
      padding:.7rem 1.5rem; border:2px solid var(--navy); box-shadow:3px 3px 0 var(--navy);
      transition:.15s ease; cursor:pointer; display:inline-flex; align-items:center; gap:.4rem; white-space:nowrap;}
    .llc .btn-p:hover{ transform:translate(-2px,-2px); box-shadow:5px 5px 0 var(--navy);}
    .llc .btn-p:active{ transform:translate(0,0); box-shadow:1px 1px 0 var(--navy);}
    .llc .btn-p:disabled{ opacity:.5; cursor:not-allowed; transform:none; box-shadow:3px 3px 0 var(--navy);}

    .llc .btn-o{ background:transparent; color:var(--navy); font-weight:600; border-radius:8px;
      padding:.65rem 1.4rem; border:2px solid var(--navy); cursor:pointer; transition:.15s;
      display:inline-flex; align-items:center; gap:.4rem; white-space:nowrap;}
    .llc .btn-o:hover{ background:var(--navy); color:var(--white); }
    .llc .btn-o.light{ border-color:var(--white); color:var(--white); }
    .llc .btn-o.light:hover{ background:var(--white); color:var(--navy); }

    .llc .btn-g{ color:var(--navy); font-weight:600; cursor:pointer; background:transparent; border:none;
      display:inline-flex; align-items:center; gap:.35rem; }
    .llc .btn-g:hover{ color:var(--amber-dark); }

    .llc .btn-danger{ background:transparent; color:var(--rust); font-weight:600; border:2px solid var(--rust);
      border-radius:8px; padding:.5rem 1.1rem; cursor:pointer; }
    .llc .btn-danger:hover{ background:var(--rust); color:var(--white); }

    .llc .card{ background:var(--white); border:2px solid var(--ink); border-radius:12px; }

    .llc .ticket{ position:relative; background:var(--white); border:2px solid var(--ink); border-radius:12px;
      padding-left:2.6rem; overflow:hidden; }
    .llc .stub{ position:absolute; left:0; top:0; bottom:0; width:2.1rem; background:var(--navy);
      display:flex; align-items:center; justify-content:center; }
    .llc .stub span{ writing-mode:vertical-rl; transform:rotate(180deg); color:var(--amber);
      font-family:'IBM Plex Mono',monospace; font-size:.62rem; letter-spacing:.18em; text-transform:uppercase; }
    .llc .punch{ position:absolute; left:.75rem; width:.4rem; height:.4rem; border-radius:50%; background:var(--canvas); }

    .llc .stamp{ display:inline-flex; align-items:center; gap:.3rem; border:2px solid currentColor; border-radius:5px;
      padding:.15rem .55rem; font-family:'IBM Plex Mono',monospace; font-size:.66rem; letter-spacing:.1em;
      text-transform:uppercase; transform:rotate(-2deg); font-weight:600; }
    .llc .stamp.pending{ color:var(--amber-dark); }
    .llc .stamp.accepted, .llc .stamp.active, .llc .stamp.inprogress{ color:var(--teal); }
    .llc .stamp.rejected{ color:var(--rust); }
    .llc .stamp.completed{ color:var(--navy); }

    .llc .dashed{ border-top:2px dashed var(--line); }
    .llc .skill-chip{ font-family:'IBM Plex Mono',monospace; font-size:.68rem; letter-spacing:.03em;
      background:var(--canvas2); border:1px solid var(--line); border-radius:999px; padding:.2rem .65rem; text-transform:uppercase;}
    .llc .skill-chip.on{ background:var(--navy); color:var(--white); border-color:var(--navy); }

    .llc .input{ width:100%; border:2px solid var(--line); border-radius:8px; padding:.6rem .8rem;
      background:var(--white); font-family:'Inter',sans-serif; font-size:.92rem; color:var(--ink); }
    .llc .input:focus{ outline:none; border-color:var(--navy); }
    .llc label.lbl{ font-size:.76rem; font-weight:600; color:var(--slate); text-transform:uppercase; letter-spacing:.04em; display:block; margin-bottom:.3rem; }

    .llc .navlink{ font-weight:600; color:var(--navy); opacity:.75; cursor:pointer; }
    .llc .navlink:hover, .llc .navlink.active{ opacity:1; }

    .llc .sidebtn{ display:flex; align-items:center; gap:.65rem; padding:.6rem .8rem; border-radius:8px; cursor:pointer;
      font-weight:600; font-size:.87rem; color:var(--navy); }
    .llc .sidebtn:hover{ background:var(--canvas2); }
    .llc .sidebtn.active{ background:var(--navy); color:var(--white); }

    .llc .avatar{ border-radius:50%; background:var(--navy); color:var(--amber); display:flex; align-items:center;
      justify-content:center; font-family:'Space Grotesk',sans-serif; font-weight:700; flex-shrink:0; }

    .llc .switch{ width:3rem; height:1.6rem; border-radius:999px; position:relative; cursor:pointer; transition:.2s; border:2px solid var(--ink); }
    .llc .switch.on{ background:var(--teal); }
    .llc .switch.off{ background:var(--line); }
    .llc .switch .knob{ position:absolute; top:.1rem; width:1.1rem; height:1.1rem; border-radius:50%; background:var(--white);
      transition:.2s; box-shadow:0 1px 2px rgba(0,0,0,.3);}
    .llc .switch.on .knob{ left:1.65rem; }
    .llc .switch.off .knob{ left:.15rem; }

    .llc .modal-backdrop{ position:fixed; inset:0; background:rgba(21,34,56,.55); display:flex; align-items:flex-start;
      justify-content:center; padding:2rem 1rem; overflow-y:auto; z-index:100; }
    .llc .modal-box{ background:var(--white); border:2px solid var(--ink); border-radius:14px; max-width:34rem; width:100%;
      margin:auto; }

    .llc .unread-dot{ width:.5rem; height:.5rem; border-radius:50%; background:var(--rust); display:inline-block; }

    @media (max-width:820px){ .llc .hide-mobile{ display:none; } }
    @media (min-width:821px){ .llc .hide-desktop{ display:none; } }
  `}</style>
);

/* ============================== HELPERS ============================== */
const SKILLS = ["Electrician","Plumber","Carpenter","Painter","Cleaner","Mason","Gardener","Mechanic","Construction Worker","Other"];
const SKILL_ICON = { Electrician:Zap, Plumber:Wrench, Carpenter:Hammer, Painter:PaintBucket, Cleaner:Sparkles,
  Mason:Mountain, Gardener:Leaf, Mechanic:Car, "Construction Worker":HardHat, Other:MoreHorizontal };

const uid = () => Math.random().toString(36).slice(2,10);
const initials = (name="") => name.trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase() || "U";

function StoreKey(){ return "llc:state"; }

async function loadState(){
  try{
    const r = await window.storage.get(StoreKey(), false);
    return r ? JSON.parse(r.value) : null;
  }catch(e){ return null; }
}
async function saveState(state){
  try{ await window.storage.set(StoreKey(), JSON.stringify(state), false); }
  catch(e){ /* best-effort, demo continues without persistence */ }
}

const seedWorkers = () => ([
  {id:"w1", name:"Murugan S.", primarySkill:"Electrician", skills:["Wiring","Fan Repair","Light Installation"], distanceKm:1.2, rating:4.8, reviews:132, experience:8, available:true, city:"Anna Nagar", bio:"Licensed electrician handling home & shop wiring, repairs and installations across North Chennai."},
  {id:"w2", name:"Kavitha R.", primarySkill:"Cleaner", skills:["Deep Cleaning","Sofa Wash","Office Cleaning"], distanceKm:0.8, rating:4.9, reviews:210, experience:5, available:true, city:"Kilpauk", bio:"Reliable home & office cleaning crew lead, specializes in move-in/move-out deep cleans."},
  {id:"w3", name:"Ravi Kumar", primarySkill:"Plumber", skills:["Leak Repair","Bathroom Fitting","Motor Repair"], distanceKm:2.4, rating:4.6, reviews:98, experience:11, available:false, city:"Aminjikarai", bio:"11 years fixing pipes, taps and water motors. Emergency leak response available."},
  {id:"w4", name:"Suresh P.", primarySkill:"Carpenter", skills:["Furniture Repair","Modular Work","Door Fitting"], distanceKm:3.1, rating:4.7, reviews:76, experience:9, available:true, city:"Villivakkam", bio:"Custom furniture, modular kitchen fitting, and general woodwork repairs."},
  {id:"w5", name:"Anitha M.", primarySkill:"Painter", skills:["Interior Painting","Texture Work","Waterproofing"], distanceKm:4.0, rating:4.5, reviews:54, experience:6, available:true, city:"Egmore", bio:"Neat, on-time interior and exterior painting with texture and waterproofing options."},
  {id:"w6", name:"Dinesh K.", primarySkill:"Mason", skills:["Wall Construction","Plastering","Tiling"], distanceKm:2.9, rating:4.4, reviews:41, experience:14, available:true, city:"Kolathur", bio:"Masonry crew for wall construction, plastering and tile work, small and large jobs."},
  {id:"w7", name:"Lakshmi V.", primarySkill:"Gardener", skills:["Lawn Care","Landscaping","Tree Trimming"], distanceKm:1.9, rating:4.9, reviews:63, experience:4, available:true, city:"Aminjikarai", bio:"Garden upkeep, landscaping and terrace-garden setup for homes and offices."},
  {id:"w8", name:"Prakash T.", primarySkill:"Mechanic", skills:["Two Wheeler","Car AC","General Service"], distanceKm:3.6, rating:4.3, reviews:88, experience:10, available:false, city:"Perambur", bio:"Doorstep two-wheeler and car servicing, AC repair and breakdown assistance."},
  {id:"w9", name:"Karthik B.", primarySkill:"Construction Worker", skills:["Loading","Demolition","General Labour"], distanceKm:2.2, rating:4.2, reviews:29, experience:7, available:true, city:"Vepery", bio:"General construction and site labour, available for daily or contract work."},
  {id:"w10", name:"Meena S.", primarySkill:"Electrician", skills:["Inverter Setup","Switch Board","Wiring"], distanceKm:5.1, rating:4.7, reviews:70, experience:6, available:true, city:"Purasaiwakkam", bio:"Home electrical setups, inverter installation and switchboard upgrades."},
  {id:"w11", name:"Vignesh R.", primarySkill:"Plumber", skills:["Pipe Fitting","Tank Cleaning","Drainage"], distanceKm:0.6, rating:4.8, reviews:151, experience:12, available:true, city:"Kilpauk", bio:"Full plumbing service from new fittings to drainage troubleshooting."},
  {id:"w12", name:"Geetha N.", primarySkill:"Cleaner", skills:["Kitchen Cleaning","Bathroom Cleaning","Utensils"], distanceKm:3.3, rating:4.6, reviews:47, experience:3, available:true, city:"Egmore", bio:"Thorough kitchen and bathroom deep cleaning on a flexible schedule."},
]);

const seedOtherJobs = () => ([
  {id:"j1", title:"Fix kitchen tap leakage", skill:"Plumber", description:"Kitchen sink tap leaking continuously, needs washer/cartridge replacement.", numWorkers:1, date:"2026-08-22", time:"10:00 AM", duration:"1-2 hrs", budget:"₹600", city:"Kilpauk", distanceKm:1.1, postedBy:"Ramesh (customer)"},
  {id:"j2", title:"Full house deep cleaning", skill:"Cleaner", description:"2BHK apartment, deep clean before move-in, includes bathrooms and kitchen.", numWorkers:2, date:"2026-08-23", time:"9:00 AM", duration:"4-5 hrs", budget:"₹2,200", city:"Aminjikarai", distanceKm:1.8, postedBy:"Priya (customer)"},
  {id:"j3", title:"Bedroom wall painting", skill:"Painter", description:"Single bedroom, 2 coats, off-white shade, furniture needs covering.", numWorkers:1, date:"2026-08-25", time:"8:30 AM", duration:"Full day", budget:"₹3,500", city:"Egmore", distanceKm:3.4, postedBy:"Arjun (customer)"},
  {id:"j4", title:"Fan and switchboard wiring", skill:"Electrician", description:"Install 2 ceiling fans and replace an old switchboard.", numWorkers:1, date:"2026-08-21", time:"4:00 PM", duration:"2 hrs", budget:"₹800", city:"Anna Nagar", distanceKm:0.9, postedBy:"Divya (customer)"},
  {id:"j5", title:"Compound wall plastering", skill:"Mason", description:"20 ft compound wall needs re-plastering after crack repair.", numWorkers:2, date:"2026-08-27", time:"7:30 AM", duration:"2 days", budget:"₹6,000", city:"Kolathur", distanceKm:2.6, postedBy:"Senthil (customer)"},
  {id:"j6", title:"Wardrobe door repair", skill:"Carpenter", description:"Two wardrobe doors misaligned, hinges need replacement.", numWorkers:1, date:"2026-08-24", time:"11:00 AM", duration:"2-3 hrs", budget:"₹700", city:"Villivakkam", distanceKm:3.0, postedBy:"Meera (customer)"},
  {id:"j7", title:"Terrace garden setup", skill:"Gardener", description:"Set up 15 potted plants and a drip line on terrace.", numWorkers:1, date:"2026-08-26", time:"9:00 AM", duration:"3 hrs", budget:"₹1,500", city:"Aminjikarai", distanceKm:1.7, postedBy:"Karthik (customer)"},
  {id:"j8", title:"Bike service at home", skill:"Mechanic", description:"General service for two scooters, doorstep required.", numWorkers:1, date:"2026-08-22", time:"5:00 PM", duration:"1.5 hrs", budget:"₹900", city:"Perambur", distanceKm:4.2, postedBy:"Vidya (customer)"},
]);

function timeAgo(ts){
  const s = Math.floor((Date.now()-ts)/1000);
  if(s<60) return "just now";
  if(s<3600) return Math.floor(s/60)+"m ago";
  if(s<86400) return Math.floor(s/3600)+"h ago";
  return Math.floor(s/86400)+"d ago";
}

/* ============================== SMALL UI PIECES ============================== */
const Stars = ({value, size=14}) => (
  <span style={{display:"inline-flex", gap:1, verticalAlign:"middle"}}>
    {[1,2,3,4,5].map(i=>(
      <Star key={i} size={size} fill={i<=Math.round(value)?"#f2a93b":"none"} color={i<=Math.round(value)?"#f2a93b":"#c9c2ac"} />
    ))}
  </span>
);

const StampBadge = ({status}) => {
  const label = {pending:"Pending", accepted:"Accepted", rejected:"Rejected", active:"Active",
    inprogress:"In Progress", completed:"Completed", applied:"Applied"}[status] || status;
  return <span className={`stamp ${status}`}>{label}</span>;
};

const Modal = ({title, onClose, children, wide}) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal-box" style={wide?{maxWidth:"42rem"}:{}} onClick={e=>e.stopPropagation()}>
      <div className="flex items-center justify-between p-4 dashed" style={{borderBottom:"2px solid var(--ink)", borderTop:"none"}}>
        <h3 className="fdisp font-semibold text-lg">{title}</h3>
        <button onClick={onClose} className="btn-g"><X size={20}/></button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

const EmptyState = ({icon:Icon=Info, title, sub}) => (
  <div className="card p-10 flex flex-col items-center text-center gap-2" style={{borderStyle:"dashed"}}>
    <Icon size={30} color="var(--slate)" />
    <div className="fdisp font-semibold">{title}</div>
    {sub && <div className="text-sm" style={{color:"var(--slate)"}}>{sub}</div>}
  </div>
);

/* ============================== LANDING PARTS ============================== */
const NavBar = ({onNav, onLogin, onGetStarted, page}) => {
  const [open,setOpen] = useState(false);
  const items = [["home","Home"],["findworkers","Find Workers"],["findjobs","Find Jobs"],["about","About Us"],["contact","Contact"]];
  return (
    <div style={{background:"var(--white)", borderBottom:"2px solid var(--ink)"}} className="sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 cursor-pointer" onClick={()=>onNav("home")}>
          <div className="avatar" style={{width:36,height:36}}><HardHat size={18}/></div>
          <span className="fdisp font-bold text-lg" style={{color:"var(--navy)"}}>Local Labour Connect</span>
        </div>
        <div className="hide-mobile flex items-center gap-6">
          {items.map(([k,l])=>(
            <span key={k} className={`navlink ${page===k?"active":""}`} onClick={()=>onNav(k)}>{l}</span>
          ))}
        </div>
        <div className="hide-mobile flex items-center gap-3">
          <button className="btn-g" onClick={onLogin}>Login</button>
          <button className="btn-p" onClick={onGetStarted}>Get Started <ArrowRight size={16}/></button>
        </div>
        <button className="hide-desktop btn-g" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
      </div>
      {open && (
        <div className="hide-desktop flex flex-col gap-1 px-4 pb-4">
          {items.map(([k,l])=>(
            <span key={k} className="navlink py-1" onClick={()=>{onNav(k);setOpen(false);}}>{l}</span>
          ))}
          <div className="flex gap-2 mt-2">
            <button className="btn-o" style={{flex:1}} onClick={onLogin}>Login</button>
            <button className="btn-p" style={{flex:1, justifyContent:"center"}} onClick={onGetStarted}>Get Started</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Footer = ({onNav}) => (
  <div style={{background:"var(--navy)", color:"var(--white)"}} className="mt-16">
    <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8" style={{gridTemplateColumns:"1.4fr 1fr 1fr 1fr"}}>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="avatar" style={{width:32,height:32}}><HardHat size={16}/></div>
          <span className="fdisp font-bold">Local Labour Connect</span>
        </div>
        <p className="text-sm" style={{color:"#c9d2df", maxWidth:"22rem"}}>Connecting local skills with local opportunities.</p>
        <div className="flex gap-3 mt-4">
          <Facebook size={18}/><Instagram size={18}/><Twitter size={18}/><Linkedin size={18}/>
        </div>
      </div>
      <div>
        <div className="fmono text-xs mb-2" style={{letterSpacing:".1em", color:"#8fa0bc"}}>NAVIGATE</div>
        {[["home","Home"],["about","About Us"],["findworkers","Find Workers"],["findjobs","Find Jobs"],["contact","Contact Us"]].map(([k,l])=>(
          <div key={k} className="text-sm py-1 cursor-pointer" style={{color:"#dfe5ee"}} onClick={()=>onNav(k)}>{l}</div>
        ))}
      </div>
      <div>
        <div className="fmono text-xs mb-2" style={{letterSpacing:".1em", color:"#8fa0bc"}}>LEGAL</div>
        {["Privacy Policy","Terms & Conditions","Help & Support"].map(l=>(
          <div key={l} className="text-sm py-1" style={{color:"#dfe5ee"}}>{l}</div>
        ))}
      </div>
      <div>
        <div className="fmono text-xs mb-2" style={{letterSpacing:".1em", color:"#8fa0bc"}}>SUPPORT</div>
        <div className="text-sm py-1" style={{color:"#dfe5ee"}}>support@laboureconnect.in</div>
        <div className="text-sm py-1" style={{color:"#dfe5ee"}}>+91 44 2345 6789</div>
      </div>
    </div>
    <div className="dashed text-center text-xs py-4" style={{color:"#8fa0bc", borderColor:"#33445f"}}>© 2026 Local Labour Connect. Built for demonstration purposes.</div>
  </div>
);

/* ============================== APP ============================== */
export default function App(){
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("landing"); // landing pages
  const [landingPage, setLandingPage] = useState("home");
  const [authMode, setAuthMode] = useState("register"); // register | login
  const [dashRole, setDashRole] = useState(null); // customer | worker
  const [tab, setTab] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [account, setAccount] = useState(null); // profile
  const [workerProfile, setWorkerProfile] = useState(null);
  const [savedWorkers, setSavedWorkers] = useState([]);
  const [myRequests, setMyRequests] = useState([]); // customer -> worker requests
  const [myJobs, setMyJobs] = useState([]); // customer posted jobs
  const [notifications, setNotifications] = useState([]);
  const [applications, setApplications] = useState([]); // worker applications to seeded jobs
  const [ratingsGiven, setRatingsGiven] = useState({}); // requestId -> {stars, review}
  const [workers, setWorkers] = useState(seedWorkers());

  const otherJobs = useRef(seedOtherJobs()).current;
  const timers = useRef([]);

  /* ---------- load / save ---------- */
  useEffect(()=>{
    (async()=>{
      const s = await loadState();
      if(s){
        setAccount(s.account||null);
        setWorkerProfile(s.workerProfile||null);
        setSavedWorkers(s.savedWorkers||[]);
        setMyRequests(s.myRequests||[]);
        setMyJobs(s.myJobs||[]);
        setNotifications(s.notifications||[]);
        setApplications(s.applications||[]);
        setRatingsGiven(s.ratingsGiven||{});
        if(s.workers) setWorkers(s.workers);
        if(s.account){ setView("dashboard"); setDashRole(s.account.activeRole||null); }
      }
      setLoaded(true);
    })();
    return ()=> timers.current.forEach(clearTimeout);
  },[]);

  const persist = useCallback((patch={})=>{
    const state = {
      account: patch.account!==undefined?patch.account:account,
      workerProfile: patch.workerProfile!==undefined?patch.workerProfile:workerProfile,
      savedWorkers: patch.savedWorkers!==undefined?patch.savedWorkers:savedWorkers,
      myRequests: patch.myRequests!==undefined?patch.myRequests:myRequests,
      myJobs: patch.myJobs!==undefined?patch.myJobs:myJobs,
      notifications: patch.notifications!==undefined?patch.notifications:notifications,
      applications: patch.applications!==undefined?patch.applications:applications,
      ratingsGiven: patch.ratingsGiven!==undefined?patch.ratingsGiven:ratingsGiven,
      workers: patch.workers!==undefined?patch.workers:workers,
    };
    saveState(state);
  },[account,workerProfile,savedWorkers,myRequests,myJobs,notifications,applications,ratingsGiven,workers]);

  const pushNotif = (title, message, type="info") => {
    setNotifications(prev=>{
      const next = [{id:uid(), title, message, type, read:false, ts:Date.now()}, ...prev];
      persist({notifications:next});
      return next;
    });
  };

  /* ---------- auth ---------- */
  const handleRegister = (data) => {
    const acc = {...data, id:uid(), activeRole:null};
    setAccount(acc);
    persist({account:acc});
    setView("roleselect");
  };
  const handleGoogleAuth = () => {
    const acc = {id:uid(), name:"Google User", email:"demo.user@gmail.com", mobile:"9876543210",
      address:"12, Lake View Street", city:"Chennai", pincode:"600010", activeRole:null, viaGoogle:true};
    setAccount(acc);
    persist({account:acc});
    setView("roleselect");
  };
  const handleLogin = () => {
    if(account){ setView(account.activeRole?"dashboard":"roleselect"); if(account.activeRole) setDashRole(account.activeRole); }
    else { setAuthMode("register"); setView("auth"); }
  };
  const chooseRole = (role) => {
    const acc = {...account, activeRole:role};
    setAccount(acc); persist({account:acc});
    if(role==="worker" && !workerProfile){
      const wp = {primarySkill:"Electrician", otherSkills:[], experience:"", bio:"", workingAreas:account?.city||"", availableNow:true};
      setWorkerProfile(wp); persist({workerProfile:wp});
    }
    setDashRole(role);
    setTab(role==="customer"?"nearby":"nearbyjobs");
    setView("dashboard");
  };
  const switchRole = () => {
    const role = dashRole==="customer"?"worker":"customer";
    chooseRole(role);
  };
  const logout = () => {
    setView("landing"); setLandingPage("home"); setDashRole(null); setTab(null);
  };

  /* ---------- customer actions ---------- */
  const toggleSave = (workerId) => {
    setSavedWorkers(prev=>{
      const next = prev.includes(workerId)? prev.filter(i=>i!==workerId) : [...prev, workerId];
      persist({savedWorkers:next});
      return next;
    });
  };

  const sendRequest = (worker, form) => {
    const req = {id:uid(), workerId:worker.id, workerName:worker.name, workerSkill:worker.primarySkill,
      ...form, status:"pending", createdAt:Date.now()};
    setMyRequests(prev=>{ const next=[req,...prev]; persist({myRequests:next}); return next; });
    pushNotif("Request Sent", `Your request to ${worker.name} for ${form.service} was sent.`, "info");
    const willAccept = worker.available !== false && Math.random() < 0.8;
    const t = setTimeout(()=>{
      setMyRequests(prev=>{
        const next = prev.map(r=> r.id===req.id ? {...r, status: willAccept?"accepted":"rejected"} : r);
        persist({myRequests:next});
        return next;
      });
      pushNotif(
        willAccept ? "Worker Accepted Your Request" : "Request Declined",
        willAccept ? `${worker.name} has accepted your ${form.service} request.` : `${worker.name} is unable to take your ${form.service} request right now.`,
        willAccept ? "success" : "warn"
      );
    }, 3200);
    timers.current.push(t);
  };

  const advanceRequest = (reqId, newStatus) => {
    setMyRequests(prev=>{
      const next = prev.map(r=> r.id===reqId ? {...r, status:newStatus} : r);
      persist({myRequests:next});
      return next;
    });
  };

  const rateRequest = (reqId, stars, review) => {
    setRatingsGiven(prev=>{ const next={...prev, [reqId]:{stars,review}}; persist({ratingsGiven:next}); return next; });
    const req = myRequests.find(r=>r.id===reqId);
    if(req){
      setWorkers(prev=>{
        const next = prev.map(w=>{
          if(w.id!==req.workerId) return w;
          const totalPts = w.rating*w.reviews + stars;
          const reviews = w.reviews+1;
          return {...w, rating: Math.round((totalPts/reviews)*10)/10, reviews};
        });
        persist({workers:next});
        return next;
      });
    }
  };

  const postJob = (job) => {
    const newJob = {id:uid(), ...job, status:"open", applicants:[], createdAt:Date.now()};
    setMyJobs(prev=>{ const next=[newJob,...prev]; persist({myJobs:next}); return next; });
    pushNotif("Job Posted", `Your job "${job.title}" is now visible to nearby workers.`, "info");
    const pool = workers.filter(w=>w.primarySkill===job.skill || w.skills.includes(job.skill));
    const count = Math.min(pool.length, 1+Math.floor(Math.random()*2));
    const t = setTimeout(()=>{
      const applicants = pool.sort(()=>0.5-Math.random()).slice(0,count).map(w=>({workerId:w.id, name:w.name, rating:w.rating}));
      if(applicants.length){
        setMyJobs(prev=>{
          const next = prev.map(j=> j.id===newJob.id ? {...j, applicants} : j);
          persist({myJobs:next});
          return next;
        });
        pushNotif("New Applications", `${applicants.length} worker(s) applied to "${job.title}".`, "success");
      }
    }, 3000);
    timers.current.push(t);
  };

  const acceptApplicant = (jobId, workerId) => {
    setMyJobs(prev=>{
      const next = prev.map(j=> j.id===jobId ? {...j, status:"accepted", acceptedWorker:workerId} : j);
      persist({myJobs:next});
      return next;
    });
  };
  const advanceJob = (jobId, newStatus) => {
    setMyJobs(prev=>{ const next = prev.map(j=> j.id===jobId ? {...j, status:newStatus} : j); persist({myJobs:next}); return next; });
  };
  const rateJob = (jobId, stars, review) => {
    setMyJobs(prev=>{ const next = prev.map(j=> j.id===jobId ? {...j, rating:{stars,review}} : j); persist({myJobs:next}); return next; });
    const job = myJobs.find(j=>j.id===jobId);
    if(job?.acceptedWorker){
      setWorkers(prev=>{
        const next = prev.map(w=>{
          if(w.id!==job.acceptedWorker) return w;
          const totalPts = w.rating*w.reviews + stars;
          const reviews = w.reviews+1;
          return {...w, rating: Math.round((totalPts/reviews)*10)/10, reviews};
        });
        persist({workers:next});
        return next;
      });
    }
  };

  /* ---------- worker actions ---------- */
  const toggleAvailable = () => {
    setWorkerProfile(prev=>{ const next = {...prev, availableNow: !prev.availableNow}; persist({workerProfile:next}); return next; });
  };
  const saveWorkerProfile = (wp) => { setWorkerProfile(wp); persist({workerProfile:wp}); };

  const applyToJob = (job) => {
    const app = {id:uid(), jobId:job.id, title:job.title, skill:job.skill, budget:job.budget, city:job.city,
      status:"applied", createdAt:Date.now()};
    setApplications(prev=>{ const next=[app,...prev]; persist({applications:next}); return next; });
    pushNotif("Application Sent", `You applied to "${job.title}".`, "info");
    const t = setTimeout(()=>{
      setApplications(prev=>{
        const next = prev.map(a=> a.id===app.id ? {...a, status:"active"} : a);
        persist({applications:next});
        return next;
      });
      pushNotif("Application Accepted", `You were accepted for "${job.title}". It's now in your Active Jobs.`, "success");
    }, 3000);
    timers.current.push(t);
  };

  const completeApplication = (appId) => {
    setApplications(prev=>{
      const next = prev.map(a=> a.id===appId ? {...a, status:"completed"} : a);
      persist({applications:next});
      return next;
    });
    const wp = {...workerProfile, availableNow:true};
    setWorkerProfile(wp); persist({workerProfile:wp});
    pushNotif("Work Completed", "Great work! You're marked Available Now again.", "success");
  };

  /* ---------- derived ---------- */
  const unreadCount = notifications.filter(n=>!n.read).length;
  const markAllRead = () => {
    setNotifications(prev=>{ const next = prev.map(n=>({...n,read:true})); persist({notifications:next}); return next; });
  };

  if(!loaded) return <div className="llc flex items-center justify-center" style={{minHeight:"100vh"}}><Theme/><div className="fmono text-sm" style={{color:"var(--slate)"}}>Loading Local Labour Connect…</div></div>;

  /* ============================== RENDER ROOT ============================== */
  return (
    <div className="llc">
      <Theme/>
      {view==="landing" && (
        <LandingFlow page={landingPage} setPage={setLandingPage}
          onLogin={()=>{setAuthMode("login"); setView("auth");}}
          onGetStarted={()=>{setAuthMode("register"); setView("auth");}} />
      )}
      {view==="auth" && (
        <AuthView mode={authMode} setMode={setAuthMode}
          onBack={()=>setView("landing")}
          onRegister={handleRegister}
          onGoogle={handleGoogleAuth}
          onLogin={handleLogin}
          hasAccount={!!account} />
      )}
      {view==="roleselect" && (
        <RoleSelect account={account} onChoose={chooseRole} />
      )}
      {view==="dashboard" && dashRole==="customer" && (
        <CustomerDashboard
          account={account} tab={tab} setTab={setTab}
          sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
          workers={workers} savedWorkers={savedWorkers} toggleSave={toggleSave}
          myRequests={myRequests} sendRequest={sendRequest} advanceRequest={advanceRequest}
          rateRequest={rateRequest} ratingsGiven={ratingsGiven}
          myJobs={myJobs} postJob={postJob} acceptApplicant={acceptApplicant} advanceJob={advanceJob} rateJob={rateJob}
          notifications={notifications} unreadCount={unreadCount} markAllRead={markAllRead}
          onSwitchRole={switchRole} onLogout={logout} setAccount={(a)=>{setAccount(a); persist({account:a});}}
        />
      )}
      {view==="dashboard" && dashRole==="worker" && (
        <WorkerDashboard
          account={account} workerProfile={workerProfile} saveWorkerProfile={saveWorkerProfile}
          tab={tab} setTab={setTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
          otherJobs={otherJobs.filter(j=> !myJobs.find(mj=>mj.title===j.title))}
          applications={applications} applyToJob={applyToJob} completeApplication={completeApplication}
          toggleAvailable={toggleAvailable}
          notifications={notifications} unreadCount={unreadCount} markAllRead={markAllRead}
          onSwitchRole={switchRole} onLogout={logout} setAccount={(a)=>{setAccount(a); persist({account:a});}}
          selfRating={{stars: (workerProfile?._rating)||4.8, reviews:(applications.filter(a=>a.status==="completed").length)}}
        />
      )}
    </div>
  );
}

/* ============================== LANDING FLOW ============================== */
function LandingFlow({page, setPage, onLogin, onGetStarted}){
  const nav = (p) => {
    if(p==="findworkers"||p==="findjobs") { setPage("home"); setTimeout(()=>{ document.getElementById(p)?.scrollIntoView({behavior:"smooth"}); },50); return; }
    setPage(p);
    window.scrollTo({top:0,behavior:"smooth"});
  };
  return (
    <div>
      <NavBar onNav={nav} onLogin={onLogin} onGetStarted={onGetStarted} page={page} />
      {page==="home" && <HomePage onGetStarted={onGetStarted} onNav={nav} />}
      {page==="about" && <AboutPage/>}
      {page==="contact" && <ContactPage/>}
      <Footer onNav={nav}/>
    </div>
  );
}

function HomePage({onGetStarted, onNav}){
  const featuredSkills = ["Electrician","Plumber","Carpenter","Painter","Cleaner","Mason","Gardener","Mechanic"];
  const workers = seedWorkers().slice(0,4);
  const jobs = seedOtherJobs().slice(0,4);
  return (
    <div>
      {/* HERO */}
      <div style={{background:"var(--navy)", color:"var(--white)"}}>
        <div className="max-w-6xl mx-auto px-4 py-16 grid gap-10" style={{gridTemplateColumns:"1.1fr .9fr"}}>
          <div>
            <span className="fmono" style={{color:"var(--amber)", letterSpacing:".14em", fontSize:".72rem"}}>LOCAL &nbsp;·&nbsp; TRUSTED &nbsp;·&nbsp; NEARBY</span>
            <h1 className="fdisp font-bold mt-3" style={{fontSize:"2.6rem", lineHeight:1.08}}>
              Find Trusted Local Workers Near You
            </h1>
            <p className="mt-2 fdisp" style={{fontSize:"1.3rem", color:"var(--amber)"}}>or Find Local Jobs Near You.</p>
            <p className="mt-4" style={{color:"#c9d2df", maxWidth:"32rem"}}>
              Local Labour Connect matches people who need work done with nearby skilled workers —
              electricians, plumbers, painters, cleaners and more — ranked by distance, skill and rating.
            </p>
            <div className="flex gap-3 mt-6 flex-wrap">
              <button className="btn-p" onClick={onGetStarted}>Get Started <ArrowRight size={16}/></button>
              <button className="btn-o light" onClick={()=>onNav("about")}>How it works</button>
            </div>
            <div className="flex gap-6 mt-8 fmono text-xs" style={{color:"#8fa0bc"}}>
              <div><div className="fdisp text-xl font-bold" style={{color:"var(--white)"}}>1,200+</div>WORKERS LISTED</div>
              <div><div className="fdisp text-xl font-bold" style={{color:"var(--white)"}}>4.7★</div>AVG. RATING</div>
              <div><div className="fdisp text-xl font-bold" style={{color:"var(--white)"}}>9,400+</div>JOBS DONE</div>
            </div>
          </div>
          <div className="ticket" style={{background:"var(--white)"}}>
            <div className="stub"><span>WORK ORDER</span></div>
            <div className="punch" style={{top:"1.2rem"}}/><div className="punch" style={{top:"50%"}}/><div className="punch" style={{bottom:"1.2rem"}}/>
            <div className="p-5">
              <div className="flex justify-between items-center">
                <span className="fdisp font-semibold">Fan & Wiring Repair</span>
                <StampBadge status="pending"/>
              </div>
              <div className="text-sm mt-1" style={{color:"var(--slate)"}}>Anna Nagar · 0.9 km away</div>
              <div className="dashed my-3"/>
              <div className="flex items-center gap-2">
                <div className="avatar" style={{width:34,height:34,fontSize:".8rem"}}>MS</div>
                <div>
                  <div className="font-semibold text-sm">Murugan S. — Electrician</div>
                  <div className="text-xs flex items-center gap-1"><Stars value={4.8} size={12}/> <span style={{color:"var(--slate)"}}>4.8 (132)</span></div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="btn-p" style={{flex:1, justifyContent:"center"}}>Request Worker</button>
                <button className="btn-o" style={{flex:1, justifyContent:"center"}}>View Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS STRIP */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="fdisp font-bold text-xl">Popular local services</h2>
        </div>
        <div className="grid gap-3" style={{gridTemplateColumns:"repeat(4,minmax(0,1fr))"}}>
          {featuredSkills.map(s=>{
            const Icon = SKILL_ICON[s];
            return (
              <div key={s} className="card p-4 flex flex-col items-center gap-2 text-center" style={{cursor:"pointer"}} onClick={onGetStarted}>
                <Icon size={22} color="var(--navy)"/>
                <span className="font-semibold text-sm">{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FIND WORKERS PREVIEW */}
      <div id="findworkers" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="fdisp font-bold text-xl">Workers near Chennai</h2>
          <button className="btn-g" onClick={onGetStarted}>See all <ChevronRight size={16}/></button>
        </div>
        <div className="grid gap-4" style={{gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>
          {workers.map(w=>(
            <div key={w.id} className="ticket">
              <div className="stub"><span>WORKER</span></div>
              <div className="punch" style={{top:"1.2rem"}}/><div className="punch" style={{bottom:"1.2rem"}}/>
              <div className="p-4 flex gap-3">
                <div className="avatar" style={{width:44,height:44}}>{initials(w.name)}</div>
                <div style={{flex:1}}>
                  <div className="flex justify-between">
                    <span className="font-semibold">{w.name}</span>
                    <span className="fmono text-xs" style={{color:"var(--slate)"}}>{w.distanceKm} km</span>
                  </div>
                  <div className="text-xs" style={{color:"var(--slate)"}}>{w.primarySkill} · {w.experience} yrs exp</div>
                  <div className="text-xs mt-1"><Stars value={w.rating} size={12}/> <span style={{color:"var(--slate)"}}>{w.rating} ({w.reviews})</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FIND JOBS PREVIEW */}
      <div id="findjobs" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="fdisp font-bold text-xl">Jobs posted nearby</h2>
          <button className="btn-g" onClick={onGetStarted}>See all <ChevronRight size={16}/></button>
        </div>
        <div className="grid gap-4" style={{gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>
          {jobs.map(j=>(
            <div key={j.id} className="ticket">
              <div className="stub"><span>JOB</span></div>
              <div className="punch" style={{top:"1.2rem"}}/><div className="punch" style={{bottom:"1.2rem"}}/>
              <div className="p-4">
                <div className="flex justify-between">
                  <span className="font-semibold">{j.title}</span>
                  <span className="fmono text-xs font-semibold" style={{color:"var(--teal)"}}>{j.budget}</span>
                </div>
                <div className="text-xs mt-1" style={{color:"var(--slate)"}}>{j.skill} · {j.city} · {j.distanceKm} km</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="card p-10 text-center" style={{background:"var(--amber)"}}>
          <h2 className="fdisp font-bold text-2xl" style={{color:"var(--navy)"}}>Ready to get started?</h2>
          <p className="mt-2" style={{color:"var(--navy)"}}>Create your free account and post a job or list your skills in minutes.</p>
          <button className="btn-o mt-5" style={{background:"var(--navy)", color:"var(--white)", borderColor:"var(--navy)"}} onClick={onGetStarted}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

function AboutPage(){
  const items = [
    ["What we are","Local Labour Connect is a platform that connects people who need work done with skilled workers in their own neighbourhood."],
    ["Why we built this","Finding a reliable local worker is often word-of-mouth and slow. We wanted a faster, transparent way to do it."],
    ["The problem it solves","Customers struggle to find available, trustworthy workers nearby; workers struggle to find steady nearby work."],
    ["How matching works","We prioritize workers and jobs by distance, then by skill match, rating and availability."],
    ["How ratings help","Every completed job can be rated, so reliable workers rise to the top and customers can choose with confidence."],
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <span className="fmono text-xs" style={{color:"var(--amber-dark)", letterSpacing:".12em"}}>ABOUT US</span>
      <h1 className="fdisp font-bold text-3xl mt-2">Built to connect local skills with local opportunities</h1>
      <div className="grid gap-4 mt-8">
        {items.map(([t,d])=>(
          <div key={t} className="ticket">
            <div className="stub"><span>NOTE</span></div>
            <div className="p-4">
              <div className="font-semibold fdisp">{t}</div>
              <div className="text-sm mt-1" style={{color:"var(--slate)"}}>{d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 mt-8" style={{gridTemplateColumns:"1fr 1fr"}}>
        <div className="card p-6">
          <div className="font-semibold fdisp mb-1 flex items-center gap-2"><Award size={18}/> Our Vision</div>
          <p className="text-sm" style={{color:"var(--slate)"}}>A neighbourhood where every skilled worker is one search away.</p>
        </div>
        <div className="card p-6">
          <div className="font-semibold fdisp mb-1 flex items-center gap-2"><TrendingUp size={18}/> Our Mission</div>
          <p className="text-sm" style={{color:"var(--slate)"}}>Make hiring and finding local work as simple as a few taps, for everyone.</p>
        </div>
      </div>
    </div>
  );
}

function ContactPage(){
  const [form,setForm] = useState({name:"",email:"",phone:"",message:""});
  const [sent,setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div className="max-w-4xl mx-auto px-4 py-14 grid gap-10" style={{gridTemplateColumns:"1fr 1fr"}}>
      <div>
        <span className="fmono text-xs" style={{color:"var(--amber-dark)", letterSpacing:".12em"}}>CONTACT US</span>
        <h1 className="fdisp font-bold text-3xl mt-2">Get in touch</h1>
        <p className="text-sm mt-2" style={{color:"var(--slate)"}}>Questions, feedback, or partnership ideas — we'd love to hear from you.</p>
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm"><Mail size={16}/> support@laboureconnect.in</div>
          <div className="flex items-center gap-2 text-sm"><PhoneCall size={16}/> +91 44 2345 6789</div>
          <div className="flex gap-3 mt-2"><Facebook size={18}/><Instagram size={18}/><Twitter size={18}/><Linkedin size={18}/></div>
        </div>
      </div>
      <form className="card p-6 flex flex-col gap-3" onSubmit={submit}>
        {sent ? (
          <div className="flex flex-col items-center text-center gap-2 py-8">
            <CheckCircle size={30} color="var(--teal)"/>
            <div className="fdisp font-semibold">Message sent</div>
            <div className="text-sm" style={{color:"var(--slate)"}}>We'll get back to you shortly.</div>
          </div>
        ):(
          <>
            <div><label className="lbl">Name</label><input className="input" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
            <div><label className="lbl">Email</label><input className="input" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
            <div><label className="lbl">Phone Number</label><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
            <div><label className="lbl">Message</label><textarea className="input" rows={4} required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></div>
            <button className="btn-p mt-2" style={{justifyContent:"center"}}>Submit</button>
          </>
        )}
      </form>
    </div>
  );
}

/* ============================== AUTH ============================== */
function AuthView({mode, setMode, onBack, onRegister, onGoogle, onLogin, hasAccount}){
  const [form,setForm] = useState({name:"",mobile:"",email:"",password:"",confirm:"",address:"",city:"",pincode:""});
  const [err,setErr] = useState("");
  const set = (k,v) => setForm(prev=>({...prev,[k]:v}));

  const submitRegister = (e) => {
    e.preventDefault();
    if(form.password.length<6){ setErr("Password must be at least 6 characters."); return; }
    if(form.password!==form.confirm){ setErr("Passwords do not match."); return; }
    setErr("");
    onRegister({...form, photoInitial: initials(form.name)});
  };

  return (
    <div style={{minHeight:"100vh"}} className="flex items-center justify-center px-4 py-10">
      <div className="card p-7" style={{maxWidth:"30rem", width:"100%"}}>
        <button className="btn-g mb-3" onClick={onBack}><ChevronLeft size={16}/> Back to home</button>
        <div className="flex gap-2 mb-5">
          <button className={`btn-o`} style={{flex:1, justifyContent:"center", ...(mode==="register"?{background:"var(--navy)",color:"var(--white)"}:{})}} onClick={()=>setMode("register")}>Get Started</button>
          <button className={`btn-o`} style={{flex:1, justifyContent:"center", ...(mode==="login"?{background:"var(--navy)",color:"var(--white)"}:{})}} onClick={()=>setMode("login")}>Login</button>
        </div>

        {mode==="register" ? (
          <form onSubmit={submitRegister} className="flex flex-col gap-3">
            <h2 className="fdisp font-bold text-xl mb-1">Create your account</h2>
            <div className="flex items-center gap-3 mb-1">
              <div className="avatar" style={{width:50,height:50}}>{initials(form.name)||<Camera size={18}/>}</div>
              <button type="button" className="btn-o" style={{padding:".4rem .9rem"}}>Upload Profile Photo</button>
            </div>
            <div><label className="lbl">Full Name</label><input className="input" required value={form.name} onChange={e=>set("name",e.target.value)}/></div>
            <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}>
              <div><label className="lbl">Mobile Number</label><input className="input" required value={form.mobile} onChange={e=>set("mobile",e.target.value)}/></div>
              <div><label className="lbl">Email Address</label><input className="input" type="email" required value={form.email} onChange={e=>set("email",e.target.value)}/></div>
            </div>
            <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}>
              <div><label className="lbl">Password</label><input className="input" type="password" required value={form.password} onChange={e=>set("password",e.target.value)}/></div>
              <div><label className="lbl">Confirm Password</label><input className="input" type="password" required value={form.confirm} onChange={e=>set("confirm",e.target.value)}/></div>
            </div>
            <div><label className="lbl">Address</label><input className="input" value={form.address} onChange={e=>set("address",e.target.value)}/></div>
            <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}>
              <div><label className="lbl">City / Town</label><input className="input" value={form.city} onChange={e=>set("city",e.target.value)}/></div>
              <div><label className="lbl">Pincode</label><input className="input" value={form.pincode} onChange={e=>set("pincode",e.target.value)}/></div>
            </div>
            {err && <div className="text-sm flex items-center gap-1" style={{color:"var(--rust)"}}><AlertCircle size={14}/>{err}</div>}
            <button className="btn-p mt-1" style={{justifyContent:"center"}}>Create Account</button>
            <div className="text-center text-xs my-1" style={{color:"var(--slate)"}}>— or —</div>
            <button type="button" className="btn-o" style={{justifyContent:"center"}} onClick={onGoogle}>Continue with Google</button>
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <h2 className="fdisp font-bold text-xl mb-1">Welcome back</h2>
            <div><label className="lbl">Email Address</label><input className="input" type="email" defaultValue={hasAccount?"":""}/></div>
            <div><label className="lbl">Password</label><input className="input" type="password"/></div>
            <button className="btn-p mt-1" style={{justifyContent:"center"}} onClick={onLogin}>Login</button>
            {!hasAccount && <div className="text-xs" style={{color:"var(--slate)"}}>No account yet on this device — Login will take you to create one.</div>}
            <div className="text-center text-xs my-1" style={{color:"var(--slate)"}}>— or —</div>
            <button type="button" className="btn-o" style={{justifyContent:"center"}} onClick={onGoogle}>Continue with Google</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================== ROLE SELECT ============================== */
function RoleSelect({account, onChoose}){
  return (
    <div style={{minHeight:"100vh"}} className="flex flex-col items-center justify-center px-4 py-14">
      <span className="fmono text-xs" style={{color:"var(--amber-dark)", letterSpacing:".12em"}}>ONE LAST STEP{account?.name?`, ${account.name.split(" ")[0].toUpperCase()}`:""}</span>
      <h1 className="fdisp font-bold text-3xl mt-2 text-center">What do you want to do?</h1>
      <p className="text-sm mt-1" style={{color:"var(--slate)"}}>You can switch roles anytime from your dashboard.</p>
      <div className="grid gap-5 mt-8 w-full" style={{maxWidth:"40rem", gridTemplateColumns:"1fr 1fr"}}>
        <div className="card p-8 flex flex-col items-center text-center gap-3" style={{cursor:"pointer"}} onClick={()=>onChoose("customer")}>
          <div className="avatar" style={{width:56,height:56}}><Search size={26}/></div>
          <div className="fdisp font-bold text-lg">I Need a Worker</div>
          <p className="text-sm" style={{color:"var(--slate)"}}>Find and hire nearby skilled workers, or post a job.</p>
          <button className="btn-p mt-2">Continue <ArrowRight size={16}/></button>
        </div>
        <div className="card p-8 flex flex-col items-center text-center gap-3" style={{cursor:"pointer"}} onClick={()=>onChoose("worker")}>
          <div className="avatar" style={{width:56,height:56}}><HardHat size={26}/></div>
          <div className="fdisp font-bold text-lg">I Am a Worker</div>
          <p className="text-sm" style={{color:"var(--slate)"}}>List your skills and get matched to nearby jobs.</p>
          <button className="btn-p mt-2">Continue <ArrowRight size={16}/></button>
        </div>
      </div>
    </div>
  );
}

/* ============================== DASHBOARD SHELL ============================== */
function DashShell({role, account, tab, setTab, tabs, sidebarOpen, setSidebarOpen, unreadCount, onSwitchRole, onLogout, children}){
  return (
    <div className="flex" style={{minHeight:"100vh"}}>
      {/* Sidebar desktop */}
      <div className="hide-mobile" style={{width:"15.5rem", borderRight:"2px solid var(--ink)", background:"var(--white)", position:"sticky", top:0, height:"100vh", overflowY:"auto"}}>
        <SidebarContent role={role} account={account} tab={tab} setTab={setTab} tabs={tabs} onSwitchRole={onSwitchRole} onLogout={onLogout} />
      </div>
      {/* Sidebar mobile drawer */}
      {sidebarOpen && (
        <div className="hide-desktop modal-backdrop" onClick={()=>setSidebarOpen(false)} style={{justifyContent:"flex-start", padding:0}}>
          <div style={{width:"16rem", background:"var(--white)", height:"100vh", overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <SidebarContent role={role} account={account} tab={tab} setTab={(t)=>{setTab(t); setSidebarOpen(false);}} tabs={tabs} onSwitchRole={onSwitchRole} onLogout={onLogout} />
          </div>
        </div>
      )}
      <div style={{flex:1, minWidth:0}}>
        <div className="flex items-center justify-between px-4 py-3" style={{borderBottom:"2px solid var(--ink)", background:"var(--white)", position:"sticky", top:0, zIndex:20}}>
          <button className="hide-desktop btn-g" onClick={()=>setSidebarOpen(true)}><Menu size={22}/></button>
          <span className="fdisp font-bold hide-mobile">{tabs.find(t=>t.key===tab)?.label}</span>
          <div className="flex items-center gap-3 ml-auto">
            <div style={{position:"relative"}}>
              <Bell size={20} onClick={()=>setTab("notifications")} style={{cursor:"pointer"}}/>
              {unreadCount>0 && <span className="unread-dot" style={{position:"absolute", top:-2, right:-2}}/>}
            </div>
            <div className="avatar hide-mobile" style={{width:32,height:32,fontSize:".75rem"}}>{account?.photoInitial||initials(account?.name)}</div>
          </div>
        </div>
        <div className="p-4" style={{maxWidth:"64rem"}}>{children}</div>
      </div>
    </div>
  );
}

function SidebarContent({role, account, tab, setTab, tabs, onSwitchRole, onLogout}){
  return (
    <div className="p-4 flex flex-col" style={{height:"100%"}}>
      <div className="flex items-center gap-2 mb-5 px-1">
        <div className="avatar" style={{width:32,height:32}}><HardHat size={16}/></div>
        <span className="fdisp font-bold text-sm">Local Labour Connect</span>
      </div>
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="avatar" style={{width:38,height:38,fontSize:".8rem"}}>{account?.photoInitial||initials(account?.name)}</div>
        <div style={{minWidth:0}}>
          <div className="font-semibold text-sm truncate">{account?.name||"Demo User"}</div>
          <div className="fmono text-xs" style={{color:"var(--slate)"}}>{role==="customer"?"CUSTOMER":"WORKER"}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1" style={{flex:1}}>
        {tabs.map(t=>(
          <div key={t.key} className={`sidebtn ${tab===t.key?"active":""}`} onClick={()=>setTab(t.key)}>
            <t.icon size={17}/> {t.label}
          </div>
        ))}
      </div>
      <div className="dashed my-3"/>
      <div className="sidebtn" onClick={onSwitchRole}><Repeat size={17}/> Switch to {role==="customer"?"Worker":"Customer"} view</div>
      <div className="sidebtn" onClick={onLogout}><LogOut size={17}/> Logout</div>
    </div>
  );
}

/* ============================== CUSTOMER DASHBOARD ============================== */
const CUSTOMER_TABS = [
  {key:"search", label:"Search Workers", icon:Search},
  {key:"nearby", label:"Nearby Workers", icon:MapPin},
  {key:"request", label:"Request Labour", icon:Send},
  {key:"postjob", label:"Post a Job", icon:PlusSquare},
  {key:"myrequests", label:"My Requests", icon:Send},
  {key:"myjobs", label:"My Posted Jobs", icon:Briefcase},
  {key:"completed", label:"Completed Jobs", icon:CheckCircle},
  {key:"ratings", label:"Ratings", icon:Star},
  {key:"saved", label:"Saved Workers", icon:Bookmark},
  {key:"notifications", label:"Notifications", icon:Bell},
  {key:"profile", label:"Profile", icon:User},
];

function CustomerDashboard(props){
  const {account, tab, setTab, sidebarOpen, setSidebarOpen, workers, savedWorkers, toggleSave,
    myRequests, sendRequest, advanceRequest, rateRequest, ratingsGiven,
    myJobs, postJob, acceptApplicant, advanceJob, rateJob,
    notifications, unreadCount, markAllRead, onSwitchRole, onLogout, setAccount} = props;

  const [requestModal, setRequestModal] = useState(null); // worker
  const [profileModal, setProfileModal] = useState(null); // worker
  const [rateModal, setRateModal] = useState(null); // {kind:'req'|'job', id}
  const [postModal, setPostModal] = useState(false);
  const [sort, setSort] = useState("distance");
  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");

  useEffect(()=>{ if(tab==="notifications") markAllRead(); },[tab]);

  const filtered = workers
    .filter(w=> skillFilter==="All" || w.primarySkill===skillFilter || w.skills.includes(skillFilter))
    .filter(w=> !query || w.name.toLowerCase().includes(query.toLowerCase()) || w.primarySkill.toLowerCase().includes(query.toLowerCase()) || w.skills.some(s=>s.toLowerCase().includes(query.toLowerCase())))
    .sort((a,b)=>{
      if(sort==="distance") return a.distanceKm-b.distanceKm;
      if(sort==="rating") return b.rating-a.rating;
      if(sort==="experience") return b.experience-a.experience;
      if(sort==="availability") return (b.available?1:0)-(a.available?1:0);
      return 0;
    });

  const WorkerBrowser = ({emphasizeRequest}) => (
    <div>
      <div className="flex gap-2 flex-wrap items-center mb-3">
        <div style={{position:"relative", flex:1, minWidth:"12rem"}}>
          <Search size={16} style={{position:"absolute", left:10, top:11, color:"var(--slate)"}}/>
          <input className="input" style={{paddingLeft:"2rem"}} placeholder="Search by name or skill…" value={query} onChange={e=>setQuery(e.target.value)}/>
        </div>
        <select className="input" style={{width:"auto"}} value={skillFilter} onChange={e=>setSkillFilter(e.target.value)}>
          <option>All</option>
          {SKILLS.map(s=><option key={s}>{s}</option>)}
        </select>
        <select className="input" style={{width:"auto"}} value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="distance">Sort: Distance</option>
          <option value="rating">Sort: Rating</option>
          <option value="experience">Sort: Experience</option>
          <option value="availability">Sort: Availability</option>
        </select>
      </div>
      <div className="grid gap-4" style={{gridTemplateColumns:"repeat(auto-fill,minmax(15.5rem,1fr))"}}>
        {filtered.map(w=>(
          <div key={w.id} className="ticket">
            <div className="stub"><span>WORKER</span></div>
            <div className="punch" style={{top:"1.1rem"}}/><div className="punch" style={{bottom:"1.1rem"}}/>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="avatar" style={{width:42,height:42,fontSize:".8rem"}}>{initials(w.name)}</div>
                <span className="stamp" style={{color: w.available?"var(--teal)":"var(--rust)"}}>{w.available?"Available":"Unavailable"}</span>
              </div>
              <div className="font-semibold mt-2">{w.name}</div>
              <div className="text-xs" style={{color:"var(--slate)"}}>{w.primarySkill} · {w.experience} yrs exp</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {w.skills.slice(0,3).map(s=><span key={s} className="skill-chip">{s}</span>)}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs"><Stars value={w.rating} size={12}/> <span style={{color:"var(--slate)"}}>{w.rating} ({w.reviews})</span></span>
                <span className="fmono text-xs" style={{color:"var(--slate)"}}>{w.distanceKm} km</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn-p" style={{flex:1, justifyContent:"center", padding:".45rem"}} onClick={()=>setRequestModal(w)}>Request</button>
                <button className="btn-o" style={{padding:".45rem"}} onClick={()=>setProfileModal(w)}>View</button>
                <button className="btn-o" style={{padding:".45rem"}} onClick={()=>toggleSave(w.id)}>
                  <Bookmark size={15} fill={savedWorkers.includes(w.id)?"var(--navy)":"none"}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length===0 && <EmptyState icon={Search} title="No workers match" sub="Try a different skill or search term."/>}
    </div>
  );

  return (
    <DashShell role="customer" account={account} tab={tab} setTab={setTab} tabs={CUSTOMER_TABS}
      sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} unreadCount={unreadCount}
      onSwitchRole={onSwitchRole} onLogout={onLogout}>

      {(tab==="search"||tab==="nearby"||tab==="request") && <WorkerBrowser/>}

      {tab==="postjob" && (
        <PostJobPanel onPost={(job)=>{postJob(job); setTab("myjobs");}} />
      )}

      {tab==="myrequests" && (
        <div className="flex flex-col gap-3">
          {myRequests.length===0 && <EmptyState icon={Send} title="No requests yet" sub="Request a nearby worker to see it here."/>}
          {myRequests.map(r=>(
            <div key={r.id} className="ticket">
              <div className="stub"><span>REQUEST</span></div>
              <div className="punch" style={{top:"1.2rem"}}/><div className="punch" style={{bottom:"1.2rem"}}/>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{r.service} — {r.workerName}</div>
                    <div className="text-xs" style={{color:"var(--slate)"}}>{r.date} · {r.time} · {r.duration}</div>
                  </div>
                  <StampBadge status={r.status}/>
                </div>
                <div className="text-sm mt-2">{r.description}</div>
                <div className="text-xs mt-1 flex items-center gap-1" style={{color:"var(--slate)"}}><MapPinned size={13}/>{r.address}</div>
                {r.status==="accepted" && (
                  <div className="flex gap-2 mt-3">
                    <button className="btn-o" onClick={()=>advanceRequest(r.id,"inprogress")}>Mark In Progress</button>
                  </div>
                )}
                {r.status==="inprogress" && (
                  <div className="flex gap-2 mt-3">
                    <button className="btn-o" onClick={()=>advanceRequest(r.id,"completed")}>Confirm Work Completed</button>
                  </div>
                )}
                {r.status==="completed" && !ratingsGiven[r.id] && (
                  <div className="flex gap-2 mt-3">
                    <button className="btn-p" onClick={()=>setRateModal({kind:"req", id:r.id, worker:r.workerName})}>Rate Worker</button>
                  </div>
                )}
                {r.status==="completed" && ratingsGiven[r.id] && (
                  <div className="text-xs mt-2" style={{color:"var(--teal)"}}>You rated this job <Stars value={ratingsGiven[r.id].stars} size={12}/></div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="myjobs" && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-end"><button className="btn-p" onClick={()=>setTab("postjob")}><PlusSquare size={16}/> Post a Job</button></div>
          {myJobs.length===0 && <EmptyState icon={Briefcase} title="No jobs posted yet" sub="Post a job to get applications from nearby workers."/>}
          {myJobs.map(j=>(
            <div key={j.id} className="ticket">
              <div className="stub"><span>JOB</span></div>
              <div className="punch" style={{top:"1.2rem"}}/><div className="punch" style={{bottom:"1.2rem"}}/>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{j.title}</div>
                    <div className="text-xs" style={{color:"var(--slate)"}}>{j.skill} · {j.date} · {j.time} · {j.numWorkers} worker(s)</div>
                  </div>
                  <StampBadge status={j.status==="open"?"pending":j.status}/>
                </div>
                <div className="text-sm mt-2">{j.description}</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="fmono text-xs font-semibold" style={{color:"var(--teal)"}}>{j.budget}</span>
                  <span className="text-xs flex items-center gap-1" style={{color:"var(--slate)"}}><MapPinned size={13}/>{j.city}</span>
                </div>
                {j.applicants?.length>0 && j.status==="open" && (
                  <div className="dashed mt-3 pt-3">
                    <div className="text-xs font-semibold mb-2" style={{color:"var(--slate)"}}>APPLICANTS</div>
                    {j.applicants.map(a=>(
                      <div key={a.workerId} className="flex justify-between items-center py-1">
                        <span className="text-sm">{a.name} <Stars value={a.rating} size={11}/></span>
                        <button className="btn-o" style={{padding:".3rem .8rem"}} onClick={()=>acceptApplicant(j.id,a.workerId)}>Accept</button>
                      </div>
                    ))}
                  </div>
                )}
                {j.status==="accepted" && (
                  <div className="flex gap-2 mt-3">
                    <button className="btn-o" onClick={()=>advanceJob(j.id,"inprogress")}>Mark In Progress</button>
                  </div>
                )}
                {j.status==="inprogress" && (
                  <div className="flex gap-2 mt-3">
                    <button className="btn-o" onClick={()=>advanceJob(j.id,"completed")}>Confirm Work Completed</button>
                  </div>
                )}
                {j.status==="completed" && !j.rating && (
                  <div className="flex gap-2 mt-3">
                    <button className="btn-p" onClick={()=>setRateModal({kind:"job", id:j.id, worker:j.acceptedWorker})}>Rate Worker</button>
                  </div>
                )}
                {j.status==="completed" && j.rating && (
                  <div className="text-xs mt-2" style={{color:"var(--teal)"}}>You rated this job <Stars value={j.rating.stars} size={12}/></div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="completed" && (
        <div className="flex flex-col gap-3">
          {[...myRequests.filter(r=>r.status==="completed"), ...myJobs.filter(j=>j.status==="completed")].length===0 &&
            <EmptyState icon={CheckCircle} title="No completed jobs yet"/>}
          {myRequests.filter(r=>r.status==="completed").map(r=>(
            <div key={r.id} className="card p-4 flex justify-between items-center">
              <div><div className="font-semibold">{r.service} — {r.workerName}</div><div className="text-xs" style={{color:"var(--slate)"}}>{r.date}</div></div>
              {ratingsGiven[r.id] && <Stars value={ratingsGiven[r.id].stars}/>}
            </div>
          ))}
          {myJobs.filter(j=>j.status==="completed").map(j=>(
            <div key={j.id} className="card p-4 flex justify-between items-center">
              <div><div className="font-semibold">{j.title}</div><div className="text-xs" style={{color:"var(--slate)"}}>{j.date}</div></div>
              {j.rating && <Stars value={j.rating.stars}/>}
            </div>
          ))}
        </div>
      )}

      {tab==="ratings" && (
        <div className="flex flex-col gap-3">
          <div className="card p-5">
            <div className="fdisp font-semibold mb-1">Ratings you've given</div>
            <div className="text-sm" style={{color:"var(--slate)"}}>{Object.keys(ratingsGiven).length + myJobs.filter(j=>j.rating).length} rating(s) submitted</div>
          </div>
          {Object.entries(ratingsGiven).map(([id,r])=>{
            const req = myRequests.find(x=>x.id===id);
            return (
              <div key={id} className="card p-4">
                <div className="flex justify-between"><span className="font-semibold">{req?.workerName}</span><Stars value={r.stars}/></div>
                {r.review && <div className="text-sm mt-1" style={{color:"var(--slate)"}}>"{r.review}"</div>}
              </div>
            );
          })}
        </div>
      )}

      {tab==="saved" && (
        <div className="grid gap-4" style={{gridTemplateColumns:"repeat(auto-fill,minmax(15.5rem,1fr))"}}>
          {workers.filter(w=>savedWorkers.includes(w.id)).map(w=>(
            <div key={w.id} className="ticket">
              <div className="stub"><span>SAVED</span></div>
              <div className="p-4">
                <div className="font-semibold">{w.name}</div>
                <div className="text-xs" style={{color:"var(--slate)"}}>{w.primarySkill}</div>
                <div className="flex gap-2 mt-3">
                  <button className="btn-p" style={{flex:1, justifyContent:"center"}} onClick={()=>setRequestModal(w)}>Request</button>
                  <button className="btn-o" onClick={()=>toggleSave(w.id)}><Trash2 size={15}/></button>
                </div>
              </div>
            </div>
          ))}
          {savedWorkers.length===0 && <EmptyState icon={Bookmark} title="No saved workers" sub="Tap the bookmark icon on a worker to save them here."/>}
        </div>
      )}

      {tab==="notifications" && <NotificationsList notifications={notifications}/>}

      {tab==="profile" && <ProfilePanel account={account} setAccount={setAccount}/>}

      {requestModal && (
        <RequestModal worker={requestModal} onClose={()=>setRequestModal(null)}
          onSend={(form)=>{ sendRequest(requestModal, form); setRequestModal(null); setTab("myrequests"); }} />
      )}
      {profileModal && (
        <WorkerProfileModal worker={profileModal} onClose={()=>setProfileModal(null)}
          onRequest={()=>{ setProfileModal(null); setRequestModal(profileModal); }} />
      )}
      {rateModal && (
        <RateModal name={rateModal.worker} onClose={()=>setRateModal(null)}
          onSubmit={(stars,review)=>{
            if(rateModal.kind==="req") rateRequest(rateModal.id, stars, review);
            else rateJob(rateModal.id, stars, review);
            setRateModal(null);
          }} />
      )}
    </DashShell>
  );
}

/* ---- customer sub-panels ---- */
function RequestModal({worker, onClose, onSend}){
  const [form,setForm] = useState({service:worker.primarySkill, description:"", date:"", time:"", duration:"", address:"", contact:""});
  const set = (k,v)=>setForm(prev=>({...prev,[k]:v}));
  const submit = (e)=>{ e.preventDefault(); onSend(form); };
  return (
    <Modal title={`Request ${worker.name}`} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <div><label className="lbl">Required Service</label>
          <select className="input" value={form.service} onChange={e=>set("service",e.target.value)}>
            {[worker.primarySkill, ...worker.skills].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div><label className="lbl">Job Description</label><textarea className="input" rows={3} required value={form.description} onChange={e=>set("description",e.target.value)}/></div>
        <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}>
          <div><label className="lbl">Date</label><input className="input" type="date" required value={form.date} onChange={e=>set("date",e.target.value)}/></div>
          <div><label className="lbl">Preferred Time</label><input className="input" type="time" required value={form.time} onChange={e=>set("time",e.target.value)}/></div>
        </div>
        <div><label className="lbl">Estimated Duration</label><input className="input" placeholder="e.g. 2 hours" value={form.duration} onChange={e=>set("duration",e.target.value)}/></div>
        <div><label className="lbl">Job Location / Address</label><input className="input" required value={form.address} onChange={e=>set("address",e.target.value)}/></div>
        <div><label className="lbl">Contact Information</label><input className="input" required value={form.contact} onChange={e=>set("contact",e.target.value)}/></div>
        <button className="btn-p mt-1" style={{justifyContent:"center"}}>Send Request</button>
      </form>
    </Modal>
  );
}

function WorkerProfileModal({worker, onClose, onRequest}){
  return (
    <Modal title="Worker Profile" onClose={onClose}>
      <div className="flex gap-3 items-center">
        <div className="avatar" style={{width:56,height:56}}>{initials(worker.name)}</div>
        <div>
          <div className="fdisp font-bold text-lg">{worker.name}</div>
          <div className="text-sm" style={{color:"var(--slate)"}}>{worker.primarySkill} · {worker.city}</div>
          <div className="text-sm mt-1"><Stars value={worker.rating}/> <span style={{color:"var(--slate)"}}>{worker.rating} ({worker.reviews} reviews)</span></div>
        </div>
      </div>
      <p className="text-sm mt-4" style={{color:"var(--slate)"}}>{worker.bio}</p>
      <div className="flex flex-wrap gap-1 mt-3">{worker.skills.map(s=><span key={s} className="skill-chip on">{s}</span>)}</div>
      <div className="grid gap-3 mt-4" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
        <div className="card p-3 text-center"><div className="fdisp font-bold">{worker.experience}</div><div className="fmono text-xs" style={{color:"var(--slate)"}}>YEARS EXP.</div></div>
        <div className="card p-3 text-center"><div className="fdisp font-bold">{worker.distanceKm} km</div><div className="fmono text-xs" style={{color:"var(--slate)"}}>DISTANCE</div></div>
        <div className="card p-3 text-center"><div className="fdisp font-bold">{worker.available?"Yes":"No"}</div><div className="fmono text-xs" style={{color:"var(--slate)"}}>AVAILABLE</div></div>
      </div>
      <button className="btn-p mt-5" style={{justifyContent:"center", width:"100%"}} onClick={onRequest}>Request Worker</button>
    </Modal>
  );
}

function RateModal({name, onClose, onSubmit}){
  const [stars,setStars] = useState(5);
  const [review,setReview] = useState("");
  return (
    <Modal title={`Rate ${name||"worker"}`} onClose={onClose}>
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i=>(
            <Star key={i} size={30} style={{cursor:"pointer"}} fill={i<=stars?"#f2a93b":"none"} color={i<=stars?"#f2a93b":"#c9c2ac"} onClick={()=>setStars(i)}/>
          ))}
        </div>
        <textarea className="input mt-2" rows={3} placeholder="Share a quick review (optional)" value={review} onChange={e=>setReview(e.target.value)}/>
        <button className="btn-p mt-2" style={{width:"100%", justifyContent:"center"}} onClick={()=>onSubmit(stars,review)}>Submit Rating</button>
      </div>
    </Modal>
  );
}

function AddressSelector({value, onChange}){
  const [editing, setEditing] = useState(!value?.confirmed);
  const [addr, setAddr] = useState(value||{line:"", landmark:"", pincode:"", city:"", confirmed:false});
  const useCurrent = () => setAddr({line:"14, Lake View Street, Anna Nagar", landmark:"Near Anna Nagar Tower Park", pincode:"600040", city:"Chennai", confirmed:false});
  const confirm = () => { const next = {...addr, confirmed:true}; setAddr(next); onChange(next); setEditing(false); };
  return (
    <div className="card p-4">
      {!editing && addr.confirmed ? (
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs font-semibold" style={{color:"var(--slate)"}}>DELIVERY / JOB ADDRESS</div>
            <div className="text-sm mt-1">{addr.line}</div>
            <div className="text-xs" style={{color:"var(--slate)"}}>{addr.landmark} · {addr.city} - {addr.pincode}</div>
          </div>
          <button className="btn-g" onClick={()=>setEditing(true)}><Edit3 size={14}/> Edit Address</button>
        </div>
      ):(
        <div className="flex flex-col gap-3">
          <button type="button" className="btn-o" onClick={useCurrent}><MapPin size={15}/> Use Current Location</button>
          <div><label className="lbl">Address</label><input className="input" value={addr.line} onChange={e=>setAddr({...addr,line:e.target.value})}/></div>
          <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}>
            <div><label className="lbl">Landmark</label><input className="input" value={addr.landmark} onChange={e=>setAddr({...addr,landmark:e.target.value})}/></div>
            <div><label className="lbl">Pincode</label><input className="input" value={addr.pincode} onChange={e=>setAddr({...addr,pincode:e.target.value})}/></div>
          </div>
          <div><label className="lbl">City / Town</label><input className="input" value={addr.city} onChange={e=>setAddr({...addr,city:e.target.value})}/></div>
          <button type="button" className="btn-p" style={{justifyContent:"center"}} onClick={confirm} disabled={!addr.line}>Confirm Location</button>
        </div>
      )}
    </div>
  );
}

function PostJobPanel({onPost}){
  const [form,setForm] = useState({title:"", skill:SKILLS[0], description:"", numWorkers:1, date:"", time:"", duration:"", budget:"", instructions:""});
  const [address,setAddress] = useState(null);
  const set=(k,v)=>setForm(prev=>({...prev,[k]:v}));
  const submit=(e)=>{
    e.preventDefault();
    if(!address?.confirmed){ alert("Please confirm a job address."); return; }
    onPost({...form, city:address.city, distanceKm:(Math.random()*4+0.5).toFixed(1)*1, address:address.line});
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-3" style={{maxWidth:"36rem"}}>
      <div><label className="lbl">Job Title</label><input className="input" required value={form.title} onChange={e=>set("title",e.target.value)}/></div>
      <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}>
        <div><label className="lbl">Required Skill</label>
          <select className="input" value={form.skill} onChange={e=>set("skill",e.target.value)}>{SKILLS.map(s=><option key={s}>{s}</option>)}</select>
        </div>
        <div><label className="lbl">Number of Workers</label><input className="input" type="number" min={1} value={form.numWorkers} onChange={e=>set("numWorkers",e.target.value)}/></div>
      </div>
      <div><label className="lbl">Job Description</label><textarea className="input" rows={3} required value={form.description} onChange={e=>set("description",e.target.value)}/></div>
      <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
        <div><label className="lbl">Date</label><input className="input" type="date" required value={form.date} onChange={e=>set("date",e.target.value)}/></div>
        <div><label className="lbl">Start Time</label><input className="input" type="time" required value={form.time} onChange={e=>set("time",e.target.value)}/></div>
        <div><label className="lbl">Duration</label><input className="input" placeholder="e.g. 3 hrs" value={form.duration} onChange={e=>set("duration",e.target.value)}/></div>
      </div>
      <div><label className="lbl">Payment / Budget</label><input className="input" placeholder="₹" required value={form.budget} onChange={e=>set("budget",e.target.value)}/></div>
      <div><label className="lbl">Additional Instructions</label><textarea className="input" rows={2} value={form.instructions} onChange={e=>set("instructions",e.target.value)}/></div>
      <label className="lbl mt-1">Job Address</label>
      <AddressSelector value={address} onChange={setAddress}/>
      <button className="btn-p mt-2" style={{justifyContent:"center"}}>Post Job</button>
    </form>
  );
}

function ProfilePanel({account, setAccount}){
  const [form,setForm] = useState(account||{});
  const [editing,setEditing] = useState(false);
  const set=(k,v)=>setForm(prev=>({...prev,[k]:v}));
  const save=()=>{ setAccount(form); setEditing(false); };
  return (
    <div className="card p-6" style={{maxWidth:"32rem"}}>
      <div className="flex items-center gap-3">
        <div className="avatar" style={{width:56,height:56}}>{initials(form.name)}</div>
        <div>
          <div className="fdisp font-bold text-lg">{form.name}</div>
          <div className="text-sm" style={{color:"var(--slate)"}}>{form.email}</div>
        </div>
      </div>
      <div className="dashed my-4"/>
      {editing ? (
        <div className="flex flex-col gap-3">
          <div><label className="lbl">Full Name</label><input className="input" value={form.name||""} onChange={e=>set("name",e.target.value)}/></div>
          <div><label className="lbl">Mobile Number</label><input className="input" value={form.mobile||""} onChange={e=>set("mobile",e.target.value)}/></div>
          <div><label className="lbl">Address</label><input className="input" value={form.address||""} onChange={e=>set("address",e.target.value)}/></div>
          <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}>
            <div><label className="lbl">City / Town</label><input className="input" value={form.city||""} onChange={e=>set("city",e.target.value)}/></div>
            <div><label className="lbl">Pincode</label><input className="input" value={form.pincode||""} onChange={e=>set("pincode",e.target.value)}/></div>
          </div>
          <div className="flex gap-2 mt-1">
            <button className="btn-p" onClick={save}>Save Changes</button>
            <button className="btn-o" onClick={()=>{setForm(account); setEditing(false);}}>Cancel</button>
          </div>
        </div>
      ):(
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2"><Phone size={14}/> {form.mobile||"—"}</div>
          <div className="flex items-center gap-2"><Mail size={14}/> {form.email||"—"}</div>
          <div className="flex items-center gap-2"><MapPinned size={14}/> {form.address||"—"}, {form.city||"—"} {form.pincode||""}</div>
          <button className="btn-o mt-3" style={{alignSelf:"flex-start"}} onClick={()=>setEditing(true)}><Edit3 size={14}/> Edit Personal Information</button>
        </div>
      )}
    </div>
  );
}

function NotificationsList({notifications}){
  if(notifications.length===0) return <EmptyState icon={Bell} title="No notifications yet" sub="You'll see updates about requests, jobs and ratings here."/>;
  return (
    <div className="flex flex-col gap-2">
      {notifications.map(n=>(
        <div key={n.id} className="card p-3 flex gap-3 items-start">
          <div className="avatar" style={{width:32,height:32, flexShrink:0,
            background: n.type==="success"?"var(--teal)": n.type==="warn"?"var(--rust)":"var(--navy)"}}>
            <Bell size={14}/>
          </div>
          <div style={{flex:1}}>
            <div className="font-semibold text-sm">{n.title}</div>
            <div className="text-sm" style={{color:"var(--slate)"}}>{n.message}</div>
            <div className="fmono text-xs mt-1" style={{color:"var(--slate)"}}>{timeAgo(n.ts)}</div>
          </div>
          {!n.read && <span className="unread-dot" style={{marginTop:4}}/>}
        </div>
      ))}
    </div>
  );
}

/* ============================== WORKER DASHBOARD ============================== */
const WORKER_TABS = [
  {key:"nearbyjobs", label:"Nearby Jobs", icon:MapPin},
  {key:"skills", label:"My Skills", icon:BadgeCheck},
  {key:"applications", label:"My Applications", icon:Send},
  {key:"active", label:"Active Jobs", icon:Briefcase},
  {key:"completed", label:"Completed Jobs", icon:CheckCircle},
  {key:"earnings", label:"Earnings", icon:TrendingUp},
  {key:"ratings", label:"Ratings", icon:Star},
  {key:"availability", label:"Availability", icon:ToggleRight},
  {key:"notifications", label:"Notifications", icon:Bell},
  {key:"profile", label:"Profile", icon:User},
];

function WorkerDashboard(props){
  const {account, workerProfile, saveWorkerProfile, tab, setTab, sidebarOpen, setSidebarOpen,
    otherJobs, applications, applyToJob, completeApplication, toggleAvailable,
    notifications, unreadCount, markAllRead, onSwitchRole, onLogout, setAccount, selfRating} = props;

  const [skillFilter, setSkillFilter] = useState("My Skills");
  const [sort, setSort] = useState("distance");

  useEffect(()=>{ if(tab==="notifications") markAllRead(); },[tab]);

  const mySkillSet = new Set([workerProfile?.primarySkill, ...(workerProfile?.otherSkills||[])]);
  const jobsFeed = otherJobs
    .filter(j=> skillFilter==="All" || (skillFilter==="My Skills" ? mySkillSet.has(j.skill) : j.skill===skillFilter))
    .sort((a,b)=>{
      if(sort==="distance") return a.distanceKm-b.distanceKm;
      if(sort==="budget") return parseInt(b.budget.replace(/\D/g,""))-parseInt(a.budget.replace(/\D/g,""));
      if(sort==="date") return new Date(a.date)-new Date(b.date);
      return 0;
    })
    // matching-skill jobs first
    .sort((a,b)=> (mySkillSet.has(b.skill)?1:0)-(mySkillSet.has(a.skill)?1:0));

  const applied = new Set(applications.map(a=>a.title));
  const completedCount = applications.filter(a=>a.status==="completed").length;
  const earningsEst = applications.filter(a=>a.status==="completed").reduce((sum,a)=> sum+(parseInt((a.budget||"0").replace(/\D/g,""))||0),0);

  return (
    <DashShell role="worker" account={account} tab={tab} setTab={setTab} tabs={WORKER_TABS}
      sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} unreadCount={unreadCount}
      onSwitchRole={onSwitchRole} onLogout={onLogout}>

      {tab==="nearbyjobs" && (
        <div>
          <div className="card p-3 flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`switch ${workerProfile?.availableNow?"on":"off"}`} onClick={toggleAvailable}><div className="knob"/></div>
              <span className="text-sm font-semibold">{workerProfile?.availableNow?"Available Now":"Currently Unavailable"}</span>
            </div>
            <span className="fmono text-xs" style={{color:"var(--slate)"}}>{jobsFeed.length} jobs nearby</span>
          </div>
          <div className="flex gap-2 flex-wrap mb-3">
            <select className="input" style={{width:"auto"}} value={skillFilter} onChange={e=>setSkillFilter(e.target.value)}>
              <option>My Skills</option><option>All</option>
              {SKILLS.map(s=><option key={s}>{s}</option>)}
            </select>
            <select className="input" style={{width:"auto"}} value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="distance">Sort: Distance</option>
              <option value="date">Sort: Date</option>
              <option value="budget">Sort: Payment</option>
            </select>
          </div>
          <div className="grid gap-4" style={{gridTemplateColumns:"repeat(auto-fill,minmax(16rem,1fr))"}}>
            {jobsFeed.map(j=>{
              const Icon = SKILL_ICON[j.skill]||MoreHorizontal;
              const isApplied = applied.has(j.title);
              return (
                <div key={j.id} className="ticket">
                  <div className="stub"><span>JOB</span></div>
                  <div className="punch" style={{top:"1.1rem"}}/><div className="punch" style={{bottom:"1.1rem"}}/>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1"><Icon size={15}/><span className="font-semibold">{j.title}</span></div>
                      {mySkillSet.has(j.skill) && <span className="skill-chip on">Match</span>}
                    </div>
                    <div className="text-xs mt-1" style={{color:"var(--slate)"}}>{j.skill} · {j.city} · {j.distanceKm} km</div>
                    <div className="text-sm mt-2">{j.description}</div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="fmono text-xs font-semibold" style={{color:"var(--teal)"}}>{j.budget}</span>
                      <span className="text-xs flex items-center gap-1" style={{color:"var(--slate)"}}><Calendar size={12}/>{j.date}</span>
                    </div>
                    <button className="btn-p mt-3" style={{width:"100%", justifyContent:"center"}} disabled={isApplied}
                      onClick={()=>applyToJob(j)}>{isApplied?"Applied":"Apply"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab==="skills" && <SkillsPanel workerProfile={workerProfile} onSave={saveWorkerProfile}/>}

      {tab==="applications" && (
        <div className="flex flex-col gap-3">
          {applications.filter(a=>a.status==="applied").length===0 && <EmptyState icon={Send} title="No pending applications"/>}
          {applications.filter(a=>a.status==="applied").map(a=>(
            <div key={a.id} className="card p-4 flex justify-between items-center">
              <div><div className="font-semibold">{a.title}</div><div className="text-xs" style={{color:"var(--slate)"}}>{a.skill} · {a.city}</div></div>
              <StampBadge status="applied"/>
            </div>
          ))}
        </div>
      )}

      {tab==="active" && (
        <div className="flex flex-col gap-3">
          {applications.filter(a=>a.status==="active").length===0 && <EmptyState icon={Briefcase} title="No active jobs" sub="Apply to nearby jobs to see them here once accepted."/>}
          {applications.filter(a=>a.status==="active").map(a=>(
            <div key={a.id} className="ticket">
              <div className="stub"><span>ACTIVE</span></div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div><div className="font-semibold">{a.title}</div><div className="text-xs" style={{color:"var(--slate)"}}>{a.skill} · {a.city}</div></div>
                  <StampBadge status="active"/>
                </div>
                <div className="fmono text-xs mt-2 font-semibold" style={{color:"var(--teal)"}}>{a.budget}</div>
                <button className="btn-p mt-3" onClick={()=>completeApplication(a.id)}>Work Completed</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="completed" && (
        <div className="flex flex-col gap-3">
          {applications.filter(a=>a.status==="completed").length===0 && <EmptyState icon={CheckCircle} title="No completed jobs yet"/>}
          {applications.filter(a=>a.status==="completed").map(a=>(
            <div key={a.id} className="card p-4 flex justify-between items-center">
              <div><div className="font-semibold">{a.title}</div><div className="text-xs" style={{color:"var(--slate)"}}>{a.skill}</div></div>
              <span className="fmono text-xs font-semibold" style={{color:"var(--teal)"}}>{a.budget}</span>
            </div>
          ))}
        </div>
      )}

      {tab==="earnings" && (
        <div className="grid gap-4" style={{gridTemplateColumns:"1fr 1fr"}}>
          <div className="card p-6 text-center">
            <div className="fdisp font-bold text-2xl">₹{earningsEst.toLocaleString("en-IN")}</div>
            <div className="fmono text-xs mt-1" style={{color:"var(--slate)"}}>ESTIMATED EARNINGS</div>
          </div>
          <div className="card p-6 text-center">
            <div className="fdisp font-bold text-2xl">{completedCount}</div>
            <div className="fmono text-xs mt-1" style={{color:"var(--slate)"}}>JOBS COMPLETED</div>
          </div>
        </div>
      )}

      {tab==="ratings" && (
        <div className="card p-6 text-center" style={{maxWidth:"20rem"}}>
          <div className="fdisp font-bold text-3xl">{selfRating.stars}<span style={{color:"var(--amber)"}}> ★</span></div>
          <Stars value={selfRating.stars}/>
          <div className="fmono text-xs mt-2" style={{color:"var(--slate)"}}>{selfRating.reviews} REVIEW(S) FROM COMPLETED JOBS</div>
        </div>
      )}

      {tab==="availability" && (
        <div className="card p-6" style={{maxWidth:"24rem"}}>
          <div className="flex items-center justify-between">
            <div>
              <div className="fdisp font-semibold">{workerProfile?.availableNow?"Available Now":"Currently Unavailable"}</div>
              <div className="text-sm mt-1" style={{color:"var(--slate)"}}>Toggle this off when you're busy so new requests pause.</div>
            </div>
            <div className={`switch ${workerProfile?.availableNow?"on":"off"}`} onClick={toggleAvailable}><div className="knob"/></div>
          </div>
        </div>
      )}

      {tab==="notifications" && <NotificationsList notifications={notifications}/>}

      {tab==="profile" && (
        <WorkerProfilePanel account={account} setAccount={setAccount} workerProfile={workerProfile} saveWorkerProfile={saveWorkerProfile} selfRating={selfRating}/>
      )}
    </DashShell>
  );
}

function SkillsPanel({workerProfile, onSave}){
  const [primary,setPrimary] = useState(workerProfile?.primarySkill||SKILLS[0]);
  const [others,setOthers] = useState(workerProfile?.otherSkills||[]);
  const toggle = (s) => setOthers(prev=> prev.includes(s) ? prev.filter(x=>x!==s) : [...prev,s]);
  const save = () => onSave({...workerProfile, primarySkill:primary, otherSkills:others});
  return (
    <div className="card p-6" style={{maxWidth:"32rem"}}>
      <label className="lbl">Primary Skill</label>
      <select className="input mb-4" value={primary} onChange={e=>setPrimary(e.target.value)}>
        {SKILLS.map(s=><option key={s}>{s}</option>)}
      </select>
      <label className="lbl">Other Skills</label>
      <div className="flex flex-wrap gap-2 mt-1 mb-4">
        {SKILLS.filter(s=>s!==primary).map(s=>(
          <span key={s} className={`skill-chip ${others.includes(s)?"on":""}`} style={{cursor:"pointer"}} onClick={()=>toggle(s)}>{s}</span>
        ))}
      </div>
      <button className="btn-p" onClick={save}>Save Skills</button>
    </div>
  );
}

function WorkerProfilePanel({account, setAccount, workerProfile, saveWorkerProfile, selfRating}){
  const [editing,setEditing] = useState(false);
  const [form,setForm] = useState({...account, ...workerProfile});
  const set=(k,v)=>setForm(prev=>({...prev,[k]:v}));
  const save = () => {
    setAccount({...account, name:form.name, mobile:form.mobile, address:form.address, city:form.city, pincode:form.pincode});
    saveWorkerProfile({...workerProfile, bio:form.bio, experience:form.experience, workingAreas:form.workingAreas});
    setEditing(false);
  };
  return (
    <div className="card p-6" style={{maxWidth:"32rem"}}>
      <div className="flex items-center gap-3">
        <div className="avatar" style={{width:56,height:56}}>{initials(account?.name)}</div>
        <div>
          <div className="fdisp font-bold text-lg">{account?.name}</div>
          <div className="text-sm" style={{color:"var(--slate)"}}>{workerProfile?.primarySkill}</div>
          <div className="text-xs mt-1"><Stars value={selfRating.stars} size={12}/> <span style={{color:"var(--slate)"}}>{selfRating.stars} ({selfRating.reviews})</span></div>
        </div>
      </div>
      <div className="dashed my-4"/>
      {editing ? (
        <div className="flex flex-col gap-3">
          <div><label className="lbl">Name</label><input className="input" value={form.name||""} onChange={e=>set("name",e.target.value)}/></div>
          <div><label className="lbl">Experience (years)</label><input className="input" value={form.experience||""} onChange={e=>set("experience",e.target.value)}/></div>
          <div><label className="lbl">Description</label><textarea className="input" rows={3} value={form.bio||""} onChange={e=>set("bio",e.target.value)}/></div>
          <div><label className="lbl">Working Areas</label><input className="input" value={form.workingAreas||""} onChange={e=>set("workingAreas",e.target.value)}/></div>
          <div className="flex gap-2 mt-1"><button className="btn-p" onClick={save}>Save Changes</button><button className="btn-o" onClick={()=>setEditing(false)}>Cancel</button></div>
        </div>
      ):(
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2"><Clock size={14}/> {workerProfile?.experience||"—"} yrs experience</div>
          <div className="flex items-center gap-2"><MapPinned size={14}/> {workerProfile?.workingAreas||"—"}</div>
          <div className="text-sm mt-1" style={{color:"var(--slate)"}}>{workerProfile?.bio||"No description added yet."}</div>
          <button className="btn-o mt-3" style={{alignSelf:"flex-start"}} onClick={()=>setEditing(true)}><Edit3 size={14}/> Edit Profile</button>
        </div>
      )}
    </div>
  );
}
