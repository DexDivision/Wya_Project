<!DOCTYPE html>
<html lang="en">
<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DQF0GRW2WG"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DQF0GRW2WG', { 'debug_mode': true });
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>WYA V3.3.2 - THE OBSERVER</title>
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
        
        #versionTag { position: fixed; top: 15px; right: 20px; font-size: 0.6rem; color: var(--neon-pink); font-weight: 900; z-index: 1000; letter-spacing: 2px; opacity: 0.8; }

        .screen { 
            display: none; 
            height: 100vh; width: 100vw; 
            flex-direction: column; align-items: center; justify-content: center; 
            padding: 40px 20px; 
            position: absolute; top: 0; left: 0; 
            background: var(--bg); 
            z-index: 10; 
            overflow-y: auto;
        }
        .active { display: flex; z-index: 20; } 
        
        .logo { font-size: 4rem; color: var(--neon-pink); text-shadow: var(--glow-pink); letter-spacing: 12px; font-weight: 900; margin: 0; }
        .slogan { font-size: 0.8rem; color: var(--neon-pink); letter-spacing: 4px; text-transform: uppercase; margin-top: 10px; font-weight: 800; }

        .btn-primary { 
            height: 60px; border-radius: 16px; 
            font-size: 1rem; font-weight: 900; 
            cursor: pointer; text-transform: uppercase; 
            border: 2px solid var(--neon-pink); 
            background: transparent; color: var(--neon-pink); 
            width: 100%; max-width: 320px; 
            box-shadow: var(--btn-glow-pink); 
            margin-top: 20px; 
        }
        .btn-auth { 
            width: 100%; max-width: 320px; height: 50px; 
            margin-bottom: 10px; border-radius: 12px; 
            border: 1px solid #333; background: #080808; 
            color: #FFF; font-weight: 800; cursor: pointer; 
            text-transform: uppercase; font-size: 0.75rem;
        }
        .btn-ghost { background: transparent; border: 1px solid #333; color: #555; font-size: 0.7rem; padding: 10px 20px; border-radius: 20px; text-transform: uppercase; cursor: pointer; margin-top: 20px; }

        .tag-grid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 20px 0; width: 100%; max-width: 400px; }
        .tag-selectable { padding: 8px 14px; border: 1px solid #333; border-radius: 20px; font-size: 0.65rem; color: #666; text-transform: uppercase; font-weight: 800; cursor: pointer; }
        .tag-selectable.selected { border-color: var(--neon-pink); color: #FFF; background: rgba(255,0,255,0.1); }

        .radar-container { position: relative; width: 320px; height: 320px; display: flex; justify-content: center; align-items: center; border: 1px solid rgba(255,0,255,0.1); border-radius: 50%; }
        .radar-center { width: 12px; height: 12px; background: #FFF; border-radius: 50%; box-shadow: 0 0 15px #FFF; }
        .user-node { position: absolute; width: 20px; height: 20px; background: var(--neon-pink); border-radius: 50%; box-shadow: var(--glow-pink); cursor: pointer; }
    </style>
</head>
<body onload="initSystem()">
    <div id="versionTag">FAITH_OS_V3.3.2</div>

    <div id="screen_splash" class="screen active">
        <h1 class="logo">WYA</h1>
        <p class="slogan">WHERE'S THE MOVE?</p>
        <button class="btn-primary" onclick="navTo('screen_auth')">Initialize OS</button>
    </div>

    <div id="screen_auth" class="screen">
        <h2 style="color: var(--neon-pink); letter-spacing: 5px;">IDENTITY BRIDGE</h2>
        <button class="btn-auth" onclick="doAuth('APPLE')">Continue with Apple</button>
        <button class="btn-auth" onclick="doAuth('INSTAGRAM')">Continue with Instagram</button>
        <button class="btn-auth" onclick="doAuth('X')">Continue with X</button>
        <button class="btn-auth" onclick="doAuth('SNAP')">Continue with Snapchat</button>
    </div>

    <div id="screen_tos" class="screen">
        <h2 style="color: var(--neon-pink); font-size: 1rem;">NEURAL PROTOCOL</h2>
        <div style="font-size: 0.7rem; color: #888; text-align: left; padding: 20px; border: 1px solid #222; border-radius: 12px; margin: 20px 0;">
            <p>● I accept Omnichannel Bridging.</p>
            <p>● I consent to Real-Time Truth Auditing.</p>
        </div>
        <button class="btn-primary" onclick="doTOS()">Accept Protocol</button>
    </div>

    <div id="screen_profile" class="screen" style="justify-content: flex-start; padding-top: 60px;">
        <h2 style="color: var(--neon-pink);">DEFINE TRUTH</h2>
        <div class="tag-grid" id="tagGrid"></div>
        <button class="btn-primary" onclick="doProfile()">Activate OS</button>
    </div>

    <div id="screen_radar" class="screen">
        <div class="radar-container" id="radarField"><div class="radar-center"></div></div>
        <button class="btn-primary" onclick="alert('Tactical Feed Active')">Tactical Scan</button>
        <button class="btn-ghost" onclick="hardReset()">Deactivate OS</button>
    </div>

    <script>
        const tags = ["Founder", "First Principles", "Engineer", "Gamer", "Anime", "Horny", "Social", "Tech", "Music"];
        
        function initSystem() {
            // Memory check - uses versioned keys to avoid ghosting
            const auth = localStorage.getItem('V332_AUTH');
            const tos = localStorage.getItem('V332_TOS');
            const prof = localStorage.getItem('V332_PROF');

            if(auth && tos && prof) {
                navTo('screen_radar');
            } else {
                navTo('screen_splash');
            }
            renderTags();
        }

        function navTo(id) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            if(id === 'screen_radar') renderNodes();
            
            // Intelligence Ping: Tracks exactly which screen users are on
            if(typeof gtag === 'function') {
                gtag('event', 'page_view', { 'page_title': id });
            }
        }

        function doAuth(p) { 
            localStorage.setItem('V332_AUTH', p); 
            if(typeof gtag === 'function') gtag('event', 'login', { 'method': p });
            navTo('screen_tos'); 
        }

        function doTOS() { 
            localStorage.setItem('V332_TOS', 'true'); 
            if(typeof gtag === 'function') gtag('event', 'accept_tos');
            navTo('screen_profile'); 
        }

        function doProfile() { 
            localStorage.setItem('V332_PROF', 'true'); 
            if(typeof gtag === 'function') gtag('event', 'complete_profile');
            navTo('screen_radar'); 
        }

        function hardReset() {
            localStorage.clear();
            window.location.reload();
        }

        function renderTags() {
            const grid = document.getElementById('tagGrid');
            grid.innerHTML = '';
            tags.forEach(t => {
                const el = document.createElement('div');
                el.className = 'tag-selectable';
                el.innerText = t;
                el.onclick = () => {
                    el.classList.toggle('selected');
                    if(typeof gtag === 'function') gtag('event', 'select_tag', { 'tag_name': t });
                };
                grid.appendChild(el);
            });
        }

        function renderNodes() {
            const field = document.getElementById('radarField');
            document.querySelectorAll('.user-node').forEach(n => n.remove());
            for(let i=0; i<3; i++) {
                const n = document.createElement('div'); n.className = 'user-node';
                n.style.left = (150 + (Math.random() * 100 - 50)) + 'px';
                n.style.top = (150 + (Math.random() * 100 - 50)) + 'px';
                field.appendChild(n);
            }
        }
    </script>
</body>
</html>