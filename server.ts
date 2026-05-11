<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>WYA V3.1.0 - FAITH OS</title>
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

        .screen { height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); position: absolute; top: 0; left: 0; background: var(--bg); z-index: 10; overflow-y: auto; }
        .hidden { transform: translateY(100%); opacity: 0; pointer-events: none; }
        .active { transform: translateY(0); opacity: 1; pointer-events: all; }
        
        #tacticalFeed { background: rgba(0,0,0,0.98); z-index: 300; padding-top: 80px; justify-content: flex-start; }
        .feed-item { width: 100%; max-width: 400px; padding: 20px; border-bottom: 1px solid #111; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
        .feed-item:active { background: rgba(255,0,255,0.05); }
        .feed-data { text-align: left; }
        .feed-name { font-weight: 900; color: #FFF; letter-spacing: 1px; font-size: 1.1rem; }
        .feed-meta { font-size: 0.6rem; color: #666; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
        .feed-score { color: var(--connected); font-weight: 900; font-size: 1.2rem; text-shadow: var(--connected-glow); }

        .bible-text { font-size: 0.85rem; color: #AAA; line-height: 1.8; text-align: left; max-width: 340px; }
        .bible-hl { color: var(--neon-pink); font-weight: 900; text-transform: uppercase; }

        .logo { font-size: 4rem; color: var(--neon-pink); text-shadow: var(--glow-pink); letter-spacing: 15px; font-weight: 900; margin: 0; }
        .slogan { font-size: 0.8rem; color: var(--neon-pink); letter-spacing: 4px; text-transform: uppercase; margin-top: 10px; font-weight: 800; }

        .btn-primary { height: 60px; border-radius: 16px; font-size: 1rem; font-weight: 900; cursor: pointer; text-transform: uppercase; border: 2px solid var(--neon-pink); background: transparent; color: var(--neon-pink); width: 100%; max-width: 320px; box-shadow: var(--btn-glow-pink); margin-top: 20px; }
        .btn-ghost { background: transparent; border: 1px solid #333; color: #666; font-size: 0.7rem; padding: 10px 20px; border-radius: 20px; text-transform: uppercase; font-weight: 800; cursor: pointer; margin-top: 20px; }
        .tag-grid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 20px 0; }
        .tag-selectable { padding: 8px 14px; border: 1px solid #333; border-radius: 20px; font-size: 0.65rem; color: #666; font-weight: 800; text-transform: uppercase; cursor: pointer; }
        .tag-selectable.selected { border-color: var(--neon-pink); color: #FFF; background: rgba(255,0,255,0.1); }

        .radar-container { position: relative; width: 340px; height: 340px; display: flex; justify-content: center; align-items: center; }
        .radar-center { width: 12px; height: 12px; background: #FFF; border-radius: 50%; box-shadow: 0 0 15px #FFF; }
        .user-node { position: absolute; width: 20px; height: 20px; background: var(--neon-pink); border-radius: 50%; box-shadow: var(--glow-pink); cursor: pointer; }

        .auth-group { width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 10px; margin-top: 30px; }
        .btn-auth { height: 50px; border-radius: 12px; border: 1px solid #222; background: transparent; color: #FFF; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; cursor: pointer; }

        #profileModal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); width: 92%; max-width: 360px; background: #050505; border: 1px solid var(--neon-pink); border-radius: 28px; padding: 30px; z-index: 500; opacity: 0; pointer-events: none; transition: 0.3s; box-shadow: var(--glow-pink); }
        #profileModal.show { opacity: 1; pointer-events: all; transform: translate(-50%, -50%) scale(1); }
    </style>
</head>
<body onload="checkAuth()">
    <div id="versionTag">FAITH_OS_V3.1.0</div>

    <div id="splashScreen" class="screen active">
        <h1 class="logo">WYA</h1>
        <p class="slogan">WHERE'S THE MOVE?</p>
        <button class="btn-primary" onclick="goTo('authScreen')">Initialize OS</button>
    </div>

    <div id="authScreen" class="screen hidden">
        <h2 style="color: var(--neon-pink); letter-spacing: 5px;">IDENTITY BRIDGE</h2>
        <div class="auth-group">
            <button class="btn-auth" onclick="simulateLogin('APPLE')">Continue with Apple</button>
            <button class="btn-auth" onclick="simulateLogin('INSTAGRAM')">Continue with Instagram</button>
            <button class="btn-auth" onclick="simulateLogin('X')">Continue with X</button>
            <button class="btn-auth" onclick="simulateLogin('SNAP')">Continue with Snapchat</button>
        </div>
    </div>

    <div id="tosScreen" class="screen hidden">
        <h2 style="color: var(--neon-pink); font-size: 1rem;">NEURAL PRIVACY</h2>
        <div style="font-size: 0.7rem; color: #888; text-align: left; padding: 25px; background: #050505; border: 1px solid #222; border-radius: 16px; line-height: 1.8;">
            <p>● Accept Omnichannel Identity Bridging.</p>
            <p>● I understand Truth Scores are Real-Time metrics.</p>
            <p>● I consent to Proximity Data Processing.</p>
        </div>
        <button class="btn-primary" onclick="acceptTOS()">Accept Protocol</button>
    </div>

    <div id="profileScreen" class="screen hidden" style="justify-content: flex-start; padding-top: 60px;">
        <h2 style="color: var(--neon-pink);">DEFINE TRUTH</h2>
        <input type="text" id="customTag" placeholder="Type custom truth..." style="width: 100%; max-width: 320px; background: #111; border: 1px solid #333; padding: 15px; border-radius: 12px; color: #FFF; text-align: center;" onkeydown="if(event.key==='Enter') addCustomTag()">
        <div class="tag-grid" id="tagGrid"></div>
        <button class="btn-primary" onclick="completeProfile()">Activate OS</button>
        <button class="btn-ghost" onclick="goTo('mechanicsScreen')">How Truth Scores Work</button>
    </div>

    <div id="radarScreen" class="screen hidden">
        <div class="radar-container" id="radarField">
            <div class="radar-center"></div>
        </div>
        <button class="btn-primary" onclick="openFeed()">Tactical Scan Mode</button>
        <button class="btn-ghost" onclick="logout()">Deactivate OS</button>
    </div>

    <div id="tacticalFeed" class="screen hidden">
        <div style="width: 100%; max-width: 400px; padding: 0 20px;">
            <h2 style="color: var(--neon-pink); text-align: left; margin: 0;">TACTICAL SCAN</h2>
            <p style="color: #444; font-size: 0.6rem; text-align: left; margin-bottom: 20px; letter-spacing: 2px;">AUDITING LOCAL SIGNALS...</p>
        </div>
        <div id="feedList" style="width: 100%;"></div>
        <button class="btn-ghost" onclick="goTo('radarScreen')">Return to Radar</button>
    </div>

    <div id="mechanicsScreen" class="screen hidden">
        <h2 style="color: var(--neon-pink); letter-spacing: 3px;">OS MECHANICS</h2>
        <div class="bible-text">
            <p><span class="bible-hl">The Efficiency Engine:</span> WYA is a high-fidelity matching OS. We don't use luck; we use <span class="bible-hl">Truth Data</span>.</p>
            <p><span class="bible-hl">The Honesty Rule:</span> Blank profiles are friction. The more neural feeds (Spotify/Steam) and custom tags you connect, the higher your <span class="bible-hl">Truth Score</span>.</p>
            <p><span class="bible-hl">AI Synthesis:</span> Our AI prioritizes users who are transparent. Honesty is the currency of speed.</p>
        </div>
        <button class="btn-primary" onclick="goTo('profileScreen')">Update My Profile</button>
    </div>

    <div id="profileModal">
        <span onclick="closeProfile()" style="position:absolute; top:15px; right:20px; cursor:pointer; color: #444;">✕</span>
        <div id="modalContent" style="text-align: center;"></div>
    </div>

    <script>
        const mockUsers = [
            { name: "Alpha_01", score: 98, dist: 45, tags: ["Logic", "Founder"] },
            { name: "Neon_Rider", score: 72, dist: 120, tags: ["Gamer", "Horny"] },
            { name: "Faith_Lead", score: 100, dist: 12, tags: ["AI Architect", "First Principles"] },
            { name: "Sync_Vibe", score: 85, dist: 205, tags: ["Music", "Casual"] }
        ];

        const tags = ["Founder", "First Principles", "Engineer", "Gamer", "Anime", "Horny", "Social", "Casual", "Tech", "Coding", "Music", "Travel"];
        let selectedTags = [];

        function checkAuth() {
            initTags();
            if(localStorage.getItem('WYA_AUTH') && localStorage.getItem('WYA_TOS') && localStorage.getItem('WYA_PROFILE')) {
                goTo('radarScreen');
            }
        }

        function goTo(id) {
            document.querySelectorAll('.screen').forEach(s => { s.classList.add('hidden'); s.classList.remove('active'); });
            const target = document.getElementById(id);
            target.classList.remove('hidden');
            target.classList.add('active');
            if(id === 'radarScreen') renderRadar();
        }

        function simulateLogin(p) { localStorage.setItem('WYA_AUTH', p); goTo('tosScreen'); }
        function acceptTOS() { localStorage.setItem('WYA_TOS', 'true'); goTo('profileScreen'); }
        function completeProfile() { 
            localStorage.setItem('WYA_PROFILE', 'true'); 
            localStorage.setItem('USER_TAGS', JSON.stringify(selectedTags));
            goTo('radarScreen'); 
        }

        function initTags() {
            const grid = document.getElementById('tagGrid'); grid.innerHTML = '';
            tags.forEach(tag => {
                const el = document.createElement('div'); el.className = 'tag-selectable'; el.innerText = tag;
                el.onclick = () => { el.classList.toggle('selected'); selectedTags.includes(tag) ? selectedTags = selectedTags.filter(t => t !== tag) : selectedTags.push(tag); };
                grid.appendChild(el);
            });
        }

        function addCustomTag() {
            const val = document.getElementById('customTag').value.trim();
            if(val && !tags.includes(val)) { tags.unshift(val); initTags(); document.getElementById('customTag').value = ''; }
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
            const sorted = [...mockUsers].sort((a,b) => a.dist - b.dist);
            sorted.forEach(u => {
                const div = document.createElement('div'); div.className = 'feed-item';
                div.innerHTML = `
                    <div class="feed-data">
                        <div class="feed-name">${u.name}</div>
                        <div class="feed-meta">${u.dist}m | ${u.tags[0]}</div>
                    </div>
                    <div class="feed-score">${u.score}%</div>
                `;
                div.onclick = () => showProfile(u);
                list.appendChild(div);
            });
            goTo('tacticalFeed');
        }

        function showProfile(u) {
            document.getElementById('modalContent').innerHTML = `
                <h3 style="color:var(--neon-pink); margin:0;">${u.name}</h3>
                <p style="font-size:0.7rem; color:#888;">${u.dist}m away | TRUTH ARCHIVE</p>
                <h2 style="color:var(--connected)">${u.score}% TRUTH</h2>
                <div style="font-size:0.8rem; margin:15px 0;">TAGS: ${u.tags.join(', ')}</div>
                <button class="btn-primary" style="height:45px; font-size:0.7rem;" onclick="closeProfile()">INITIATE HANDSHAKE</button>
            `;
            document.getElementById('profileModal').classList.add('show');
        }

        function closeProfile() { document.getElementById('profileModal').classList.remove('show'); }
        function logout() { localStorage.clear(); location.reload(); }
    </script>
</body>
</html>