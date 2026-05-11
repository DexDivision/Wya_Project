<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>WYA V3.2.1 - THE FLOW</title>
    <style>
        :root { 
            --bg: #000; 
            --neon-pink: #ff00ff; 
            --glow-pink: 0 0 15px var(--neon-pink); 
            --btn-glow-pink: 0 0 25px var(--neon-pink); 
            --connected: #00ff41;
            --connected-glow: 0 0 15px #00ff41;
        }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; outline: none; }
        body { margin: 0; background: var(--bg); color: #FFF; font-family: -apple-system, sans-serif; overflow: hidden; height: 100vh; width: 100vw; }
        
        #versionTag { position: fixed; top: 15px; right: 20px; font-size: 0.6rem; color: var(--neon-pink); font-weight: 900; z-index: 1000; letter-spacing: 2px; opacity: 0.6; }

        /* Mobile "Window" Transitions */
        .screen { 
            height: 100vh; width: 100vw; 
            display: flex; flex-direction: column; align-items: center; justify-content: center; 
            padding: 40px 20px; 
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s; 
            position: absolute; top: 0; left: 0; 
            background: var(--bg); 
            z-index: 10; 
            overflow-y: auto;
        }
        /* Hidden screens are pushed to the right */
        .hidden { transform: translateX(100%); opacity: 0; pointer-events: none; }
        /* Active screen is center */
        .active { transform: translateX(0); opacity: 1; pointer-events: all; }
        /* Past screens are pushed to the left */
        .past { transform: translateX(-100%); opacity: 0; pointer-events: none; }
        
        /* Tactical Elements */
        .logo { font-size: 4.5rem; color: var(--neon-pink); text-shadow: var(--glow-pink); letter-spacing: 15px; font-weight: 900; margin: 0; }
        .slogan { font-size: 0.85rem; color: var(--neon-pink); letter-spacing: 5px; text-transform: uppercase; margin-top: 10px; font-weight: 800; }

        .btn-primary { 
            height: 65px; border-radius: 18px; 
            font-size: 1.1rem; font-weight: 900; 
            cursor: pointer; text-transform: uppercase; 
            border: 2px solid var(--neon-pink); 
            background: transparent; color: var(--neon-pink); 
            width: 100%; max-width: 340px; 
            box-shadow: var(--btn-glow-pink); 
            margin-top: 25px; 
            display: flex; align-items: center; justify-content: center;
        }
        .btn-ghost { background: transparent; border: 1px solid #333; color: #777; font-size: 0.75rem; padding: 12px 24px; border-radius: 25px; text-transform: uppercase; font-weight: 800; cursor: pointer; margin-top: 20px; }
        
        .auth-group { width: 100%; max-width: 340px; display: flex; flex-direction: column; gap: 12px; margin-top: 35px; }
        .btn-auth { height: 55px; border-radius: 14px; border: 1px solid #333; background: #080808; color: #FFF; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; cursor: pointer; }

        .tag-grid { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 25px 0; width: 100%; max-width: 450px; }
        .tag-selectable { padding: 10px 18px; border: 1px solid #333; border-radius: 25px; font-size: 0.7rem; color: #777; font-weight: 800; text-transform: uppercase; cursor: pointer; }
        .tag-selectable.selected { border-color: var(--neon-pink); color: #FFF; background: rgba(255,0,255,0.15); }

        /* Radar HUD */
        .radar-container { position: relative; width: 340px; height: 340px; display: flex; justify-content: center; align-items: center; }
        .radar-center { width: 14px; height: 14px; background: #FFF; border-radius: 50%; box-shadow: 0 0 15px #FFF; }
        .user-node { position: absolute; width: 22px; height: 22px; background: var(--neon-pink); border-radius: 50%; box-shadow: var(--glow-pink); cursor: pointer; }

        /* Tactical Feed Overlay */
        #tacticalFeed { background: #000; z-index: 300; padding-top: 80px; justify-content: flex-start; }
        .feed-item { width: 100%; max-width: 450px; padding: 22px; border-bottom: 1px solid #111; display: flex; justify-content: space-between; align-items: center; }
        .feed-score { color: var(--connected); font-weight: 900; font-size: 1.3rem; }

        /* Profile Modal */
        #profileModal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); width: 92%; max-width: 380px; background: #080808; border: 1px solid var(--neon-pink); border-radius: 32px; padding: 35px; z-index: 500; opacity: 0; pointer-events: none; transition: 0.3s; box-shadow: var(--glow-pink); }
        #profileModal.show { opacity: 1; pointer-events: all; transform: translate(-50%, -50%) scale(1); }
    </style>
</head>
<body onload="checkAuth()">
    <div id="versionTag">FAITH_OS_V3.2.1</div>

    <div id="splashScreen" class="screen active">
        <h1 class="logo">WYA</h1>
        <p class="slogan">WHERE'S THE MOVE?</p>
        <button class="btn-primary" onclick="navigateTo('authScreen')">Initialize OS</button>
    </div>

    <div id="authScreen" class="screen hidden">
        <h2 style="color: var(--neon-pink); letter-spacing: 5px; font-size: 1.4rem;">IDENTITY BRIDGE</h2>
        <div class="auth-group">
            <button class="btn-auth" onclick="saveAuth('APPLE')">Continue with Apple</button>
            <button class="btn-auth" onclick="saveAuth('INSTAGRAM')">Continue with Instagram</button>
            <button class="btn-auth" onclick="saveAuth('X')">Continue with X</button>
            <button class="btn-auth" onclick="saveAuth('SNAP')">Continue with Snapchat</button>
        </div>
    </div>

    <div id="tosScreen" class="screen hidden">
        <h2 style="color: var(--neon-pink); font-size: 1.2rem; letter-spacing: 3px;">NEURAL PROTOCOL</h2>
        <div style="font-size: 0.8rem; color: #AAA; text-align: left; padding: 30px; background: #050505; border: 1px solid #222; border-radius: 20px; line-height: 1.8; margin-top: 20px;">
            <p>● Accept Omnichannel Identity Bridging.</p>
            <p>● Real-Time Truth Score auditing enabled.</p>
            <p>● Locally processed proximity signals.</p>
        </div>
        <button class="btn-primary" onclick="saveTOS()">Accept Protocol</button>
    </div>

    <div id="profileScreen" class="screen hidden" style="justify-content: flex-start; padding-top: 70px;">
        <h2 style="color: var(--neon-pink);">DEFINE TRUTH</h2>
        <input type="text" id="customTag" placeholder="DEFINE YOUR OWN TRUTH..." style="width: 100%; max-width: 340px; background: #0a0a0a; border: 1px solid #333; padding: 18px; border-radius: 14px; color: #FFF; text-align: center; font-size: 1rem;" onkeydown="if(event.key==='Enter') addCustomTag()">
        <div class="tag-grid" id="tagGrid"></div>
        <button class="btn-primary" onclick="saveProfile()">Finalize OS Boot</button>
    </div>

    <div id="radarScreen" class="screen hidden">
        <div class="radar-container" id="radarField">
            <div class="radar-center"></div>
        </div>
        <button class="btn-primary" onclick="openFeed()">Tactical Scan Mode</button>
        <button class="btn-ghost" onclick="logout()">Deactivate OS</button>
    </div>

    <div id="tacticalFeed" class="screen hidden">
        <div style="width: 100%; max-width: 450px; padding: 0 20px;">
            <h2 style="color: var(--neon-pink); font-size: 1.8rem;">TACTICAL SCAN</h2>
        </div>
        <div id="feedList" style="width: 100%; flex-grow: 1;"></div>
        <button class="btn-ghost" style="margin-bottom: 40px;" onclick="navigateTo('radarScreen')">Return to Radar</button>
    </div>

    <div id="profileModal">
        <span onclick="closeProfile()" style="position:absolute; top:20px; right:25px; cursor:pointer; color: #666; font-size: 1.5rem;">✕</span>
        <div id="modalContent" style="text-align: center;"></div>
    </div>

    <script>
        const mockUsers = [
            { name: "Alpha_01", score: 98, dist: 45, tags: ["Logic", "Founder"] },
            { name: "Neon_Rider", score: 72, dist: 120, tags: ["Gamer", "Horny"] },
            { name: "Faith_Lead", score: 100, dist: 12, tags: ["AI", "First Principles"] }
        ];

        const defaultTags = ["Founder", "First Principles", "Engineer", "Gamer", "Anime", "Horny", "Social", "Tech", "Music"];
        let selectedTags = [];

        // NAVIGATION LOGIC
        function navigateTo(id) {
            const screens = document.querySelectorAll('.screen');
            screens.forEach(s => {
                s.classList.remove('active', 'past');
                s.classList.add('hidden');
            });
            const target = document.getElementById(id);
            target.classList.remove('hidden', 'past');
            target.classList.add('active');
            if(id === 'radarScreen') renderRadar();
        }

        // PERSISTENCE LOGIC
        function checkAuth() {
            initTags();
            const a = localStorage.getItem('WYA_STEP_AUTH');
            const b = localStorage.getItem('WYA_STEP_TOS');
            const c = localStorage.getItem('WYA_STEP_PROFILE');

            if(a && b && c) {
                navigateTo('radarScreen');
            } else {
                navigateTo('splashScreen');
            }
        }

        function saveAuth(p) { localStorage.setItem('WYA_STEP_AUTH', p); navigateTo('tosScreen'); }
        function saveTOS() { localStorage.setItem('WYA_STEP_TOS', 'true'); navigateTo('profileScreen'); }
        function saveProfile() { 
            localStorage.setItem('WYA_STEP_PROFILE', 'true'); 
            navigateTo('radarScreen'); 
        }

        function logout() { 
            localStorage.clear(); 
            location.reload(); 
        }

        // UI HELPERS
        function initTags() {
            const grid = document.getElementById('tagGrid'); grid.innerHTML = '';
            defaultTags.forEach(tag => {
                const el = document.createElement('div'); el.className = 'tag-selectable'; el.innerText = tag;
                el.onclick = () => { el.classList.toggle('selected'); selectedTags.push(tag); };
                grid.appendChild(el);
            });
        }

        function addCustomTag() {
            const val = document.getElementById('customTag').value.trim();
            if(val) { defaultTags.unshift(val); initTags(); document.getElementById('customTag').value = ''; }
        }

        function renderRadar() {
            const field = document.getElementById('radarField');
            document.querySelectorAll('.user-node').forEach(n => n.remove());
            mockUsers.forEach(u => {
                const n = document.createElement('div'); n.className = 'user-node';
                n.style.left = (170 + (Math.random() * 120 - 60)) + 'px';
                n.style.top = (170 + (Math.random() * 120 - 60)) + 'px';
                n.onclick = () => showProfile(u);
                field.appendChild(n);
            });
        }

        function openFeed() {
            const list = document.getElementById('feedList'); list.innerHTML = '';
            mockUsers.forEach(u => {
                const div = document.createElement('div'); div.className = 'feed-item';
                div.innerHTML = `<div class="feed-name">${u.name}</div><div class="feed-score">${u.score}%</div>`;
                div.onclick = () => showProfile(u);
                list.appendChild(div);
            });
            navigateTo('tacticalFeed');
        }

        function showProfile(u) {
            document.getElementById('modalContent').innerHTML = `<h3>${u.name}</h3><h1>${u.score}%</h1><button class="btn-primary" onclick="closeProfile()">Handshake</button>`;
            document.getElementById('profileModal').classList.add('show');
        }
        function closeProfile() { document.getElementById('profileModal').classList.remove('show'); }
    </script>
</body>
</html>