<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>WYA V2.8.0 - FAITH OS</title>
    <style>
        :root { 
            --bg: #000; 
            --neon-pink: #ff00ff; 
            --glow-pink: 0 0 15px var(--neon-pink); 
            --btn-glow-pink: 0 0 25px var(--neon-pink); 
            --sidebar-bg: rgba(5, 5, 5, 0.98);
            --connected: #00ff41;
            --connected-glow: 0 0 15px #00ff41;
        }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; outline: none; }
        body { margin: 0; background: var(--bg); color: #FFF; font-family: -apple-system, sans-serif; overflow: hidden; height: 100vh; width: 100vw; }
        
        #versionTag { position: fixed; top: 15px; right: 20px; font-size: 0.6rem; color: var(--neon-pink); font-weight: 900; z-index: 1000; letter-spacing: 2px; opacity: 0.6; }

        .screen { height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; transition: 0.3s; position: absolute; top: 0; left: 0; background: var(--bg); z-index: 10; overflow-y: auto; }
        .hidden { transform: translateX(100%); opacity: 0; pointer-events: none; }
        .active { transform: translateX(0); opacity: 1; pointer-events: all; }
        
        /* Tactical Tag Grid */
        .tag-grid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; width: 100%; max-width: 450px; margin: 20px 0; }
        .tag-selectable { padding: 8px 14px; border: 1px solid #333; border-radius: 20px; font-size: 0.7rem; font-weight: 800; color: #666; text-transform: uppercase; cursor: pointer; transition: 0.2s; }
        .tag-selectable.selected { border-color: var(--neon-pink); color: #FFF; background: rgba(255, 0, 255, 0.1); box-shadow: var(--glow-pink); }
        
        /* Inputs */
        input[type="text"], input[type="password"] { width: 100%; max-width: 320px; background: transparent; border: 1px solid #333; padding: 15px; border-radius: 12px; color: #FFF; margin-bottom: 15px; font-size: 1rem; }
        input:focus { border-color: var(--neon-pink); outline: none; }

        /* Personnel Modal */
        #profileModal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); width: 92%; max-width: 360px; max-height: 80vh; background: rgba(5,5,5,0.98); border: 1px solid var(--neon-pink); border-radius: 28px; padding: 30px; z-index: 200; opacity: 0; pointer-events: none; transition: 0.3s; box-shadow: var(--glow-pink); overflow-y: auto; }
        #profileModal.show { opacity: 1; pointer-events: all; transform: translate(-50%, -50%) scale(1); }

        /* Radar UI */
        .radar-container { relative; width: 340px; height: 340px; display: flex; justify-content: center; align-items: center; }
        .radar-center { width: 10px; height: 10px; background: #FFF; border-radius: 50%; box-shadow: 0 0 15px #FFF; z-index: 60; }
        .user-node { position: absolute; width: 18px; height: 18px; background: var(--neon-pink); border-radius: 50%; box-shadow: var(--glow-pink); cursor: pointer; z-index: 55; }

        .btn { height: 60px; border-radius: 16px; font-size: 1rem; font-weight: 900; cursor: pointer; text-transform: uppercase; border: 2px solid var(--neon-pink); background: transparent; color: var(--neon-pink); width: 100%; max-width: 320px; box-shadow: var(--btn-glow-pink); margin-top: 10px; }
        .btn-small { height: 45px; font-size: 0.75rem; margin: 5px; }

        #sidebarOverlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); backdrop-filter: blur(12px); z-index: 90; display: none; }
        #sidebarOverlay.visible { display: block; }

        @keyframes proximityPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
    </style>
</head>
<body onload="checkAuth()">
    <div id="versionTag">FAITH_OS_V2.8.0</div>
    <div id="sidebarOverlay" onclick="closeAllOverlays()"></div>

    <div id="authScreen" class="screen active">
        <h1 style="color: var(--neon-pink); letter-spacing: 10px;">IDENTITY</h1>
        <input type="text" id="authEmail" placeholder="SIGNAL_ID (EMAIL)">
        <input type="password" id="authPass" placeholder="ACCESS_KEY (PASSWORD)">
        <button class="btn" onclick="goToScreen('tosScreen')">Initialize Handshake</button>
    </div>

    <div id="tosScreen" class="screen hidden">
        <h2 style="color: var(--neon-pink); font-size: 1rem; letter-spacing: 2px;">NEURAL PRIVACY PROTOCOL</h2>
        <div style="font-size: 0.7rem; color: #888; text-align: left; padding: 20px; background: #050505; border-radius: 12px; margin-bottom: 20px;">
            <p>1. User accepts the Omnichannel Identity Bridge connects Neural IDs (Spotify/Steam/X).</p>
            <p>2. Truth Scores are calculated via AI synthesis of digital footprints.</p>
            <p>3. All physical proximity data is processed locally on the FAITH OS.</p>
        </div>
        <button class="btn" onclick="goToScreen('profileScreen')">Accept Protocol</button>
    </div>

    <div id="profileScreen" class="screen hidden" style="justify-content: flex-start;">
        <h2 style="color: var(--neon-pink); font-size: 1.2rem; margin-top: 40px;">DEFINE YOUR TRUTH</h2>
        <input type="text" id="customTag" placeholder="DEFINE YOUR OWN TRUTH..." onkeydown="if(event.key==='Enter') addCustomTag()">
        <div class="tag-grid" id="tagGrid">
            </div>
        <button class="btn" style="margin-bottom: 40px;" onclick="completeProfile()">Finalize OS Boot</button>
    </div>

    <div id="radarScreen" class="screen hidden">
        <div class="radar-container" id="radarField">
            <div class="radar-center"></div>
        </div>
        <button class="btn" onclick="logout()">Deactivate OS</button>
    </div>

    <div id="profileModal">
        <span onclick="closeProfile()" style="position:absolute; top:15px; right:20px; cursor:pointer;">✕</span>
        <div id="modalContent" style="text-align: center;"></div>
    </div>

    <script>
        const tags = ["Founder", "First Principles", "Engineer", "Gamer", "Anime", "Anime", "Movies", "Horny", "Social", "Casual", "Tech", "Coding", "Fitness", "Music", "Hiking", "Travel", "Coffee", "Crypto", "Web3", "Chess", "Creative", "Artist", "Open to Chat", "Networking", "First Dates", "Long-term"];
        let selectedTags = [];

        function initTags() {
            const grid = document.getElementById('tagGrid');
            grid.innerHTML = '';
            tags.forEach(tag => {
                const el = document.createElement('div');
                el.className = 'tag-selectable';
                el.innerText = tag;
                el.onclick = () => toggleTag(tag, el);
                grid.appendChild(el);
            });
        }

        function toggleTag(tag, el) {
            if(selectedTags.includes(tag)) {
                selectedTags = selectedTags.filter(t => t !== tag);
                el.classList.remove('selected');
            } else {
                selectedTags.push(tag);
                el.classList.add('selected');
            }
        }

        function addCustomTag() {
            const input = document.getElementById('customTag');
            const val = input.value.trim();
            if(val && !tags.includes(val)) {
                tags.unshift(val);
                initTags();
                input.value = '';
            }
        }

        function checkAuth() {
            initTags();
            if(localStorage.getItem('FAITH_AUTH_TOKEN') && localStorage.getItem('FAITH_PROFILE_BUILT')) {
                goToScreen('radarScreen');
            }
        }

        function goToScreen(id) {
            document.querySelectorAll('.screen').forEach(s => { s.classList.add('hidden'); s.classList.remove('active'); });
            document.getElementById(id).classList.remove('hidden');
            document.getElementById(id).classList.add('active');
            if(id === 'radarScreen') renderRadar();
        }

        function completeProfile() {
            localStorage.setItem('FAITH_AUTH_TOKEN', 'true');
            localStorage.setItem('FAITH_PROFILE_BUILT', 'true');
            localStorage.setItem('USER_TAGS', JSON.stringify(selectedTags));
            goToScreen('radarScreen');
        }

        function logout() {
            localStorage.clear();
            location.reload();
        }

        function renderRadar() {
            const field = document.getElementById('radarField');
            document.querySelectorAll('.user-node').forEach(n => n.remove());
            for(let i=0; i<3; i++) {
                const node = document.createElement('div');
                node.className = 'user-node';
                node.style.left = (170 + (Math.random() * 80 - 40)) + 'px';
                node.style.top = (170 + (Math.random() * 80 - 40)) + 'px';
                node.onclick = () => showMockProfile();
                field.appendChild(node);
            }
        }

        function showMockProfile() {
            document.getElementById('modalContent').innerHTML = `
                <h3 style="color:var(--neon-pink)">NEON_RIDER</h3>
                <p style="font-size:0.7rem; color:#888;">TRUTH SCORE: 88%</p>
                <div class="tag-grid">
                    <span class="tag-selectable selected">GAMER</span>
                    <span class="tag-selectable selected">ANIME</span>
                    <span class="tag-selectable selected">HORNY</span>
                </div>
                <button class="btn btn-small" onclick="closeProfile()">INITIATE HANDSHAKE</button>
            `;
            document.getElementById('profileModal').classList.add('show');
            document.getElementById('sidebarOverlay').classList.add('visible');
        }

        function closeProfile() {
            document.getElementById('profileModal').classList.remove('show');
            document.getElementById('sidebarOverlay').classList.remove('visible');
        }

        function closeAllOverlays() {
            closeProfile();
        }
    </script>
</body>
</html>