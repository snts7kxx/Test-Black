let loadedPlugins = [];

/* Element(s?) */
const splashScreen = document.createElement('div');

/* Misc Styles */
document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #ffffff; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"}));

/* Splash Screen Styles - VERSÃO MELHORADA */
document.head.appendChild(Object.assign(document.createElement('style'), {
innerHTML: `
.kd-splash-screen{
    position:fixed;
    inset:0;
    background:#ffffff;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:9999;
    font-family:MuseoSans,sans-serif;
    opacity:0;
    transition:opacity .8s ease;
}

.kd-particle{
    background:#000;
    opacity:.08;
}

.kd-logo-text{
    font-size:72px;
    font-weight:900;
    letter-spacing:4px;
}

/* KHAN branco com glow preto */
.kd-logo-khan{
    color:#fff;
    text-shadow:
        0 0 10px #000,
        0 0 25px rgba(0,0,0,.8),
        0 0 45px rgba(0,0,0,.6);
}

/* DARK preto com glow branco */
.kd-logo-dark{
    color:#000;
    text-shadow:
        0 0 10px #fff,
        0 0 25px rgba(255,255,255,.9),
        0 0 45px rgba(255,255,255,.7);
}

/* Divider */
.kd-divider{
    width:280px;
    height:2px;
    margin:30px auto;
    background:linear-gradient(90deg,transparent,#000,transparent);
}

/* Loader */
.kd-hexagon{
    border-top-color:#000;
    border-bottom-color:#000;
}

.kd-hexagon:nth-child(2){
    border-top-color:#666;
    border-bottom-color:#666;
}

.kd-hexagon-core{
    background:#000;
    box-shadow:0 0 20px rgba(0,0,0,.7);
}

/* Texto */
.kd-loading-text{
    color:#000;
}

.kd-plugin-status{
    color:rgba(0,0,0,.6);
}

/* Progress */
.kd-progress-bar{
    background:rgba(0,0,0,.1);
}

.kd-progress-fill{
    background:linear-gradient(90deg,#000,#444,#000);
    box-shadow:0 0 15px rgba(0,0,0,.6);
}

.kd-progress-percent{
    color:#000;
}

.kd-version{
    color:rgba(0,0,0,.4);
}
`
}));


/* Emmiter */
class EventEmitter{constructor(){this.events={}}on(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}once(t,e){"string"==typeof t&&(t=[t]);let s=(...i)=>{e(...i),this.off(t,s)};this.on(t,s)}};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Misc Functions */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); } };

function sendToast(text, duration=5000, gravity='bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); };

async function showSplashScreen() { 
    splashScreen.className = 'kd-splash-screen';

    // Criar partículas
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'kd-particles';
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'kd-particle';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        particlesContainer.appendChild(particle);
    }

    splashScreen.innerHTML = `
        <div class="kd-splash-content">
            <div class="kd-logo-container">
                <div class="kd-logo-text">
                    <span class="kd-logo-khan">KHAN</span><span class="kd-logo-dark">DARK</span>
                </div>
            </div>

            <div class="kd-divider"></div>

            <div class="kd-loader-container">
                <div class="kd-hexagon-loader">
                    <div class="kd-hexagon"></div>
                    <div class="kd-hexagon"></div>
                    <div class="kd-hexagon-core"></div>
                </div>
            </div>

            <div class="kd-loading-text" id="loadingText">INICIALIZANDO</div>

            <div class="kd-progress-container">
                <div class="kd-progress-bar">
                    <div class="kd-progress-fill" id="progressFill"></div>
                </div>
                <div class="kd-progress-percent" id="progressPercent">0%</div>
            </div>

            <div class="kd-plugin-status" id="pluginStatus">Preparando módulos...</div>
        </div>

        <div class="kd-version">v2.0 • SNTS7KXX</div>
    `; 

    splashScreen.insertBefore(particlesContainer, splashScreen.firstChild);
    document.body.appendChild(splashScreen); 
    setTimeout(() => splashScreen.style.opacity = '1', 10);
}

function updateLoadingProgress(percent, status) {
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const pluginStatus = document.getElementById('pluginStatus');

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressPercent) progressPercent.textContent = `${Math.floor(percent)}%`;
    if (pluginStatus) pluginStatus.textContent = status;
}

async function hideSplashScreen() { 
    document.getElementById('loadingText').textContent = 'CONCLUÍDO';
    await delay(500);
    splashScreen.style.opacity = '0'; 
    setTimeout(() => splashScreen.remove(), 1000); 
}

async function loadScript(url, label) { 
    return fetch(url).then(response => response.text()).then(script => { 
        loadedPlugins.push(label); 
        eval(script);
        updateLoadingProgress((loadedPlugins.length / 3) * 100, `Carregado: ${label}`);
    }); 
}

async function loadCss(url) { 
    return new Promise((resolve) => { 
        const link = document.createElement('link'); 
        link.rel = 'stylesheet'; 
        link.type = 'text/css'; 
        link.href = url; 
        link.onload = () => resolve(); 
        document.head.appendChild(link); 
    }); 
}

/* Main Functions */ 
function setupMain(){
    /* QuestionSpoof */
    (function () {
        const originalFetch = window.fetch;
        const correctAnswers = new Map();

        const toFraction = (d) => { if (d === 0 || d === 1) return String(d); const decimals = (String(d).split('.')[1] || '').length; let num = Math.round(d * Math.pow(10, decimals)), den = Math.pow(10, decimals); const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a; }; const div = gcd(Math.abs(num), Math.abs(den)); return den / div === 1 ? String(num / div) : `${num / div}/${den / div}`; };

        window.fetch = async function(input, init) {
            const url = input instanceof Request ? input.url : input;
            let body = input instanceof Request ? await input.clone().text() : init?.body;

            if (url.includes('getAssessmentItem') && body) {
                const res = await originalFetch.apply(this, arguments);
                const clone = res.clone();

                try {
                    const data = await clone.json();

                    let item = null;
                    if (data?.data) {
                        for (const key in data.data) {
                            if (data.data[key]?.item) {
                                item = data.data[key].item;
                                break;
                            }
                        }
                    }

                    if (!item?.itemData) return res;

                    let itemData = JSON.parse(item.itemData);
                    const answers = [];

                    for (const [key, w] of Object.entries(itemData.question.widgets)) {
                        if (w.type === 'radio' && w.options?.choices) {
                            const choices = w.options.choices.map((c, i) => ({ ...c, id: c.id || `radio-choice-${i}` }));
                            const correct = choices.find(c => c.correct);
                            if (correct) answers.push({ type: 'radio', choiceId: correct.id, widgetKey: key });
                        }
                        else if (w.type === 'numeric-input' && w.options?.answers) {
                            const correct = w.options.answers.find(a => a.status === 'correct');
                            if (correct) {
                                const val = correct.answerForms?.some(f => f === 'proper' || f === 'improper') 
                                    ? toFraction(correct.value) : String(correct.value);
                                answers.push({ type: 'numeric', value: val, widgetKey: key });
                            }
                        }
                        else if (w.type === 'expression' && w.options?.answerForms) {
                            const correct = w.options.answerForms.find(f => f.considered === 'correct' || f.form === true);
                            if (correct) answers.push({ type: 'expression', value: correct.value, widgetKey: key });
                        }
                        else if (w.type === 'grapher' && w.options?.correct) {
                            const c = w.options.correct;
                            if (c.type && c.coords) answers.push({ 
                                type: 'grapher', graphType: c.type, coords: c.coords, 
                                asymptote: c.asymptote || null, widgetKey: key 
                            });
                        }
                    }

                    if (answers.length > 0) {
                        correctAnswers.set(item.id, answers);
                        sendToast(`🔎 | ${answers.length} respostas encontradas!`, 750);
                    }

                    if (itemData.question.content?.[0] === itemData.question.content[0].toUpperCase()) {
                        itemData.answerArea = { calculator: false, chi2Table: false, periodicTable: false, tTable: false, zTable: false };
                        itemData.question.content = "\n\nModificado por snts7kxx" + `[[☃ radio 1]]`;
                        itemData.question.widgets = {
                            "radio 1": {
                                type: "radio", alignment: "default", static: false, graded: true,
                                options: {
                                    choices: [
                                        { content: "🖤", correct: true, id: "correct-choice" }
                                    ],
                                    randomize: false, multipleSelect: false, displayCount: null, deselectEnabled: false
                                },
                                version: { major: 1, minor: 0 }
                            }
                        };

                        const modified = { ...data };

                        if (modified.data) {
                            for (const key in modified.data) {
                                if (modified.data[key]?.item?.itemData) {
                                    modified.data[key].item.itemData = JSON.stringify(itemData);
                                    break;
                                }
                            }
                        }

                        sendToast("🎉 | Questão concluída!", 1500);
                        return new Response(JSON.stringify(modified), { 
                            status: res.status, statusText: res.statusText, headers: res.headers 
                        });
                    }
                } catch (e) { console.error(`🚨 Error @ questionSpoof.js\n${e}`); }
                return res;
            }

            if (body?.includes('"operationName":"attemptProblem"')) {
                try {
                    let bodyObj = JSON.parse(body);
                    const itemId = bodyObj.variables?.input?.assessmentItemId;
                    const answers = correctAnswers.get(itemId);

                    if (answers?.length > 0) {
                        const content = [], userInput = {};
                        let state = bodyObj.variables.input.attemptState ? JSON.parse(bodyObj.variables.input.attemptState) : null;

                        answers.forEach(a => {
                            if (a.type === 'radio') {
                                content.push({ selectedChoiceIds: [a.choiceId] });
                                userInput[a.widgetKey] = { selectedChoiceIds: [a.choiceId] };
                            }
                            else if (a.type === 'numeric') {
                                content.push({ currentValue: a.value });
                                userInput[a.widgetKey] = { currentValue: a.value };
                                if (state?.[a.widgetKey]) state[a.widgetKey].currentValue = a.value;
                            }
                            else if (a.type === 'expression') {
                                content.push(a.value);
                                userInput[a.widgetKey] = a.value;
                                if (state?.[a.widgetKey]) state[a.widgetKey].value = a.value;
                            }
                            else if (a.type === 'grapher') {
                                const graph = { type: a.graphType, coords: a.coords, asymptote: a.asymptote };
                                content.push(graph);
                                userInput[a.widgetKey] = graph;
                                if (state?.[a.widgetKey]) state[a.widgetKey].plot = graph;
                            }
                        });

                        bodyObj.variables.input.attemptContent = JSON.stringify([content, []]);
                        bodyObj.variables.input.userInput = JSON.stringify(userInput);
                        if (state) bodyObj.variables.input.attemptState = JSON.stringify(state);

                        body = JSON.stringify(bodyObj);
                        if (input instanceof Request) input = new Request(input, { body });
                        else init.body = body;
                        sendToast(`✏️ | ${answers.length} respostas marcadas!`, 2000);
                    }
                } catch (e) { console.error(`🚨 Error @ questionSpoof.js\n${e}`); }
            }

            return originalFetch.apply(this, arguments);
        };
    })();

    /* VideoSpoof */
    (function () {
        const originalFetch = window.fetch;

        window.fetch = async function (input, init) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init && init.body) body = init.body;
            if (body && body.includes('"operationName":"updateUserVideoProgress"')) {
                try {
                    let bodyObj = JSON.parse(body);
                    if (bodyObj.variables && bodyObj.variables.input) {
                        const durationSeconds = bodyObj.variables.input.durationSeconds;
                        bodyObj.variables.input.secondsWatched = durationSeconds;
                        bodyObj.variables.input.lastSecondWatched = durationSeconds;
                        body = JSON.stringify(bodyObj);
                        if (input instanceof Request) { input = new Request(input, { body: body }); } 
                        else init.body = body; 
                        sendToast("🔄 | Vídeo concluído!", 1000)
                    }
                } catch (e) { console.error(`🚨 Error @ videoSpoof.js\n${e}`); }
            }
            return originalFetch.apply(this, arguments);
        };
    })();

    /* MinuteFarm */
    (function () {
        const originalFetch = window.fetch;

        window.fetch = async function (input, init = {}) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init.body) body = init.body;
            if (body && input.url.includes("mark_conversions")) {
                try {
                    if (body.includes("termination_event")) { sendToast("🚫 | Limite de Tempo Bloqueado!", 1200); return; }
                } catch (e) { console.error(`🚨 Error @ minuteFarm.js\n${e}`); }
            }
            return originalFetch.apply(this, arguments);
        };
    })();

    /* AutoAnswer */
    (function () {
        const baseSelectors = [
            `.perseus_hm3uu-sq`,
            `[data-testid="exercise-check-answer"]`, 
            `[data-testid="exercise-next-question"]`, 
            `._1wi2tma4`
        ];

        khanDarkDominates = true;

        (async () => { 
            while (khanDarkDominates) {                    
                const selectorsToCheck = [...baseSelectors];

                for (const q of selectorsToCheck) {
                    findAndClickBySelector(q);
                    if (document.querySelector(q+"> div") && document.querySelector(q+"> div").innerText === "Mostrar resumo") {
                        sendToast("🎉 | Questão concluída!", 1500);
                    }
                }
                await delay(1900);
            }
        })();
    })();
}

/* Inject */
if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { 
    alert("❌ | KhanDark não iniciou!\n\nVocê precisa executar o Script na Plataforma Khan Academy! (https://pt.khanacademy.org/)"); 
    window.location.href = "https://pt.khanacademy.org/"; 
}

showSplashScreen();
updateLoadingProgress(0, 'Inicializando...');

const startTime = Date.now();

loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'DarkReader')
.then(()=>{ 
    DarkReader.setFetchMethod(window.fetch); 
    DarkReader.enable(); 
    updateLoadingProgress(33, 'DarkReader carregado');
})
.then(() => loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css'))
.then(() => {
    updateLoadingProgress(66, 'Estilos carregados');
    return loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'Toastify');
})
.then(async () => {    
    updateLoadingProgress(100, 'Finalizado!');

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 3000 - elapsedTime);
    await delay(remainingTime);

    sendToast("🖤 | KhanDark iniciou!");

    await delay(2000);

    hideSplashScreen();
    setupMain();

    console.clear();
});