import './style.css'

document.querySelector('#app').innerHTML = `
  <header>
    <a href="https://x.com/vz_warhead" target="_blank" rel="noopener noreferrer" class="twitter-link">My X/Twitter: vz_warhead</a>
  </header>

  <main>
    <p class="tagline">The cool webpage is still being built, for now just download Backbone Hierarchy</p>
    
    <div class="download-area">
      <div class="download-buttons">
        <div class="download-btn-wrapper">
          <a href="https://github.com/vbulgariangymratt-afk/Backbone-s-minimal-webpage/releases/latest/download/Backbone-Setup.exe" id="btn-windows" class="download-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM11.25 1.899L24 0v11.55H11.25V1.899zM11.25 12.45H24v11.55l-12.75-1.9v-9.65z"/>
            </svg>
            Download for Windows
          </a>
          <span id="badge-windows" class="recommended-badge">Recommended</span>
        </div>

        <div class="download-btn-wrapper">
          <a href="https://github.com/vbulgariangymratt-afk/Backbone-s-minimal-webpage/releases/latest/download/Backbone.zip" id="btn-mac" class="download-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94 1.07.08 2.15-.52 2.81-1.33z"/>
            </svg>
            Download for macOS
          </a>
          <span id="badge-mac" class="recommended-badge">Recommended</span>
        </div>
      </div>
    </div>
  </main>
`

// Detect User Operating System
const btnWin = document.getElementById("btn-windows");
const btnMac = document.getElementById("btn-mac");
const badgeWin = document.getElementById("badge-windows");
const badgeMac = document.getElementById("badge-mac");

let isMac = false;
let isWindows = false;

if (navigator.userAgentData && navigator.userAgentData.platform) {
  const platform = navigator.userAgentData.platform.toLowerCase();
  isMac = platform.includes("mac");
  isWindows = platform.includes("win");
} else {
  const platform = (navigator.platform || "").toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  isMac = platform.includes("mac") || userAgent.includes("macintosh") || userAgent.includes("mac os x");
  isWindows = platform.includes("win") || userAgent.includes("windows");
}

if (isMac) {
  btnMac.classList.remove("secondary");
  btnMac.classList.add("primary");
  badgeMac.classList.add("show");
  
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    tagline.innerHTML = 'For Mac you\'ll get "can’t be opened" cuz its not notarized by Apple, not a problem, just open Terminal on your Mac, paste this exact command and press enter:<br><br><code style="background: rgba(128,128,128,0.15); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; word-break: break-all;">xattr -cr /Applications/Backbone\\ Hierarchy.app</code><br><br>Drag Backbone Hierarchy into your applications folder first';
  }
} else if (isWindows) {
  btnWin.classList.remove("secondary");
  btnWin.classList.add("primary");
  badgeWin.classList.add("show");
  
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    tagline.innerHTML = "Windows will show a security warning when <br>downloading cuz I haven’t payed to verify the app with<br>Microsoft (its like 600usd) just install it anyways ;)";
  }
} else {
  // Fallback: show both as primary style if undetermined
  btnWin.classList.remove("secondary");
  btnWin.classList.add("primary");
  btnMac.classList.remove("secondary");
  btnMac.classList.add("primary");
}
