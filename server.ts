<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>WYA V2.9.1 - FAITH OS</title>
    <style>
        :root { 
            --bg: #000; 
            --neon-pink: #ff00ff; 
            --glow-pink: 0 0 15px var(--neon-pink); 
            --btn-glow-pink: 0 0 25px var(--neon-pink); 
            --sidebar-bg: rgba(5, 5, 5, 0.98);
            --connected: #00ff41;
        }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; outline: none; }
        body { margin: 0; background: var(--bg); color: #FFF; font-family: -apple-system, sans-serif; overflow: hidden; height: 100vh; width: 100vw; }
        
        #versionTag { position: fixed; top: 15px; right: 20px; font-size: 0.6rem; color: var(--neon-pink); font-weight: 900; z-index: 1000; letter-spacing: 2px; opacity: 0.6; }

        /* Screen Transitions */
        .screen { height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); position: absolute; top: 0; left: 0; background: var(--bg); z-index: 10; overflow-y: auto; }
        .hidden { transform: translateX(100%); opacity: 0; pointer-events: none; }
        .active { transform: translateX(0); opacity: 1; pointer-events: all; }
        
        /* Typography */
        .logo { font-size: 4rem; color: var(--neon-pink); text-shadow: var(--glow-pink); letter-spacing: 15px; font-weight: 900; margin: 0; }
        .slogan { font-size: 0.8rem; color: var(--neon-pink); letter-spacing: 4px; text-transform: uppercase; margin-top: 10px; font-weight: 800; opacity: 0.9; }

        /* Auth UI */
        .auth-group { width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 12px; margin-top: 30px; }
        .btn-auth { height: 55px; border-radius: 12px; border: 1px solid #333; background: transparent; color: #FFF; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; text-transform: uppercase; letter-spacing: 1px; }
        .btn-auth:active { border-color: var(--neon-pink); background: rgba(255, 0, 255, 0.05); transform: scale(0.98); }

        /* Identity Synthesizer / Tag Grid */
        .tag-grid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; width: 100%; max-width: 450px; margin: 25px 0; }
        .tag-selectable { padding: 10px 16px; border: 1px solid #333; border-radius: 25px; font-size: 0.7rem; font-weight: 800; color: #666; text-transform: uppercase; cursor: pointer; transition: 0.2s; }
        .tag-selectable.selected { border-color: var(--neon-pink); color: #FFF; background: rgba(255, 0, 255, 0.1); box-shadow: var(--glow-pink); }
        
        input[type="text"] { width: 100%; max-width: 320px; background: rgba(255,255,255,0.05); border: 1px solid #333; padding: 18px; border-radius: 14px; color: #FFF; font-size: 1rem; text-align: center; }
        input:focus { border-color: var(--neon-pink); outline: none; }

        /* Radar Elements */
        .radar-container { position: relative; width: 340px; height: 340px; display: flex; justify-content: center; align-items: center; }
        .radar-center { width: 12px; height: 12px; background: #FFF; border-radius: 50%; box-shadow: 0 0 15px #FFF; z-index: 60; }
        .user-node { position: absolute; width: 20px; height: 20px; background: var(--neon-pink); border-radius: 50%; box-shadow: var(--glow-pink); cursor: pointer; z-index: 55; }

        .btn-primary { height: 65px; border-radius: 18px; font-size: 1.1rem; font-weight: 900; cursor: pointer; text-transform: uppercase; border: 2px solid var(--neon-pink); background: transparent; color: var(--neon-pink); width: 100%; max-width: 320px; box-shadow: var(--btn-glow-pink); margin-top: 20px; transition: 0.2s; }
        .btn-primary:active { transform: scale(0.96); }

        #sidebarOverlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); backdrop-filter: blur(12px); z-index: 90; display: none; }
    </style>
</head>
<body onload="checkAuth()">
    <div id="versionTag">FAITH_OS_V2.9.1</div>
    <div id="sidebarOverlay"></div>

    <div id="splashScreen" class="screen active">
        <h1 class="logo">WYA</h1>
        <p class="slogan">WHERE'S THE MOVE?</p>
        <button class="btn-primary" onclick="goTo('authScreen')">Initialize OS</button>
    </div>

    <div id="authScreen" class="screen hidden">
        <h2 style="color: var(--neon-pink); letter-spacing: 5px; font-size: 1.2rem;">IDENTITY ENTRANCE</h2>
        <div class="auth-group">
            <button class="btn-auth" onclick="simulateLogin('APPLE')">Continue with Apple</button>
            <button class="btn-auth" onclick="simulateLogin('INSTAGRAM')">Continue with Instagram</button>
            <button class="btn-auth" onclick="simulateLogin('X')">Continue with X</button>
            <button class="btn-auth" onclick="simulateLogin('SNAPCHAT')">Continue with Snapchat</button>
        </div>
        <p style="font-size: 0.6rem; color: #444; margin-top: 25px; letter-spacing: 1px;">NEURAL HANDSHAKE REQUIRED</p>
    </div>

    <div id="tosScreen" class="screen hidden">
        <h2 style="color: var(--neon-pink); font-size: 1rem; letter-spacing: 2px;">NEURAL DATA PROTOCOL</h2>
        <div style="font-size: 0.75rem; color: #888; text-align: left; padding: 25px; background: #050505; border-radius: 16px; margin: 20px 0; border: 1px solid #222; line-height: 1.8;">
            <p>● I consent to Omnichannel Identity Bridging.</p>
            <p>● I accept AI synthesis of my digital footprint.</p>
            <p>● I understand Truth Scores are calculated in real-time.</p>
        </div>
        <button class="btn-primary" onclick="acceptTOS()">Accept Protocol</button>
    </div>

    <div id="profileScreen" class="screen hidden" style="justify-content: flex-start; padding-top: 60px;">
        <h2 style="color: var(--neon-pink); font-size: 1.2rem; margin-bottom: 5px;">SYNTHESIZE IDENTITY</h2>
        <p style="font-size: 0.7rem; color: #555; margin-bottom: 25px;">Build your Truth Layer</p>
        <input type="text" id="customTag" placeholder="DEFINE YOUR OWN TRUTH..." onkeydown="if(event.key==='Enter') addCustomTag()">
        <div class="tag-grid" id="tagGrid"></div>
        <button class="btn-primary" onclick="completeProfile()" style="margin-bottom: 60px;">Activate Radar</button>
    </div>

    <div id="radarScreen" class="screen hidden">
        <div class="radar-container" id="radarField">
            <div class="radar-center"></div>
        </div>
        <button class="btn-primary" style="border-color: #333; color: #666; box-shadow: none;" onclick="logout()">Deactivate OS</button>
    </div>

    <script>
        const tags = ["Founder", "First Principles", "Engineer", "Gamer", "Anime", "Movies", "Horny", "Social", "Casual", "Tech", "Coding", "Fitness", "Music", "Hiking", "Travel", "Coffee", "Crypto", "Web3", "Chess", "Creative", "Artist", "Open to Chat", "Networking", "First Dates"];
        let selectedTags = [];

        function checkAuth() {
            initTags();
            // Checking if the entire funnel is finished
            const isAuth = localStorage.getItem('WYA_AUTH');
            const isTOS = localStorage.getItem('WYA_TOS');
            const isProfile = localStorage.getItem('WYA_PROFILE');

            if (isAuth && isTOS && isProfile) {
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

        function simulateLogin(provider) {
            localStorage.setItem('WYA_AUTH', provider);
            goTo('tosScreen');
        }

        function acceptTOS() {
            localStorage.setItem('WYA_TOS', 'true');
            goTo('profileScreen');
        }

        function initTags() {
            const grid = document.getElementById('tagGrid');
            grid.innerHTML = '';
            tags.forEach(tag => {
                const el = document.createElement('div');
                el.className = 'tag-selectable';
                el.innerText = tag;
                el.onclick = () => {
                    el.classList.toggle('selected');
                    if (selectedTags.includes(tag)) {
                        selectedTags = selectedTags.filter(t => t !== tag);
                    } else {
                        selectedTags.push(tag);
                    }
                };
                grid.appendChild(el);
            });
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

        function completeProfile() {
            localStorage.setItem('WYA_PROFILE', 'true');
            localStorage.setItem('WYA_USER_TAGS', JSON.stringify(selectedTags));
            goTo('radarScreen');
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
                node.style.left = (170 + (Math.random() * 120 - 60)) + 'px';
                node.style.top = (170 + (Math.random() * 120 - 60)) + 'px';
                field.appendChild(node);
            }
        }
    </script>
</body>
</html>