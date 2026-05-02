/* ── App State ── */
let currentExam = null;
let currentQuestionIndex = 0;
let answers = {}; // { questionId: { partId: value } | string | {} }
let timerMode = 'none';
let timerInterval = null;
let timeRemaining = 120 * 60;
let allQuestions = [];

/* ── Analytics Tracker ── */
const SESSION_ID = Math.random().toString(36).substring(2) + Date.now().toString(36);
const TRACKER_URL = 'TU_URL_AQUI'; // ← Reemplazar con la URL del Apps Script desplegado
let examStartTime = null;

function trackEvent(data) {
  if (!TRACKER_URL || TRACKER_URL === 'TU_URL_AQUI') return;
  fetch(TRACKER_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({ sessionId: SESSION_ID, ...data })
  }).catch(() => {}); // Nunca rompe la app aunque el tracker falle
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderExamCards();
  trackEvent({ evento: 'visita', timestamp: new Date().toISOString() });
});

/* ── Home Screen ── */
function renderExamCards() {
  const container = document.getElementById('examCards');
  const icons = ['🥗', '🏋️', '🐾'];
  container.innerHTML = PRACTICE_EXAMS.map((exam, i) => `
    <div class="exam-card" onclick="selectExam(${exam.id})">
      <div class="card-icon">${icons[i]}</div>
      <h3>Práctica ${exam.id}</h3>
      <p class="card-subtitle">${exam.caseName} — ${exam.caseSubtitle}</p>
      <p>${exam.caseShort}</p>
    </div>
  `).join('');
}

function selectExam(examId) {
  currentExam = PRACTICE_EXAMS.find(e => e.id === examId);
  showConfig();
}

document.getElementById('btnRandom').addEventListener('click', () => {
  currentExam = PRACTICE_EXAMS[Math.floor(Math.random() * PRACTICE_EXAMS.length)];
  showConfig();
});

/* ── Config Screen ── */
function showConfig() {
  document.getElementById('configCaseName').textContent = `${currentExam.caseName} — ${currentExam.caseSubtitle}`;
  switchScreen('screenConfig');
}

function selectTimer(mode) {
  timerMode = mode;
  document.getElementById('optFree').classList.toggle('selected', mode === 'none');
  document.getElementById('optTimed').classList.toggle('selected', mode === 'exam');
}

function goHome() {
  stopTimer();
  currentExam = null; answers = {}; currentQuestionIndex = 0; allQuestions = [];
  document.getElementById('progressBar').style.display = 'none';
  switchScreen('screenHome');
}

/* ── Start Exam ── */
function startExam() {
  allQuestions = [];
  currentExam.sections.forEach(section => {
    section.questions.forEach(q => {
      allQuestions.push({ ...q, sectionId: section.id, sectionTitle: section.title, sectionPoints: section.points });
    });
  });

  answers = {};
  currentQuestionIndex = 0;
  document.getElementById('progressBar').style.display = '';

  if (timerMode === 'exam') {
    timeRemaining = 120 * 60;
    document.getElementById('timerDisplay').style.display = '';
    updateTimerDisplay();
    startTimer();
  } else {
    document.getElementById('timerDisplay').style.display = 'none';
  }

  renderCaseContext();
  renderQuestionNav();
  renderQuestion();
  updateProgress();
  switchScreen('screenExam');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  examStartTime = Date.now();
  trackEvent({
    evento: 'inicio_practica',
    timestamp: new Date().toISOString(),
    casoId: currentExam.id,
    casoNombre: currentExam.caseName,
    modo: timerMode
  });
}

/* ── Timer ── */
function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining <= 0) { stopTimer(); alert('⏱️ ¡Se acabó el tiempo!'); submitExam(); }
  }, 1000);
}
function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } }
function updateTimerDisplay() {
  const min = Math.floor(timeRemaining / 60), sec = timeRemaining % 60;
  const el = document.getElementById('timerDisplay');
  el.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  el.classList.remove('warning','danger');
  if (timeRemaining <= 300) el.classList.add('danger');
  else if (timeRemaining <= 900) el.classList.add('warning');
}

/* ── Render Case Context ── */
function renderCaseContext() {
  const ctx = document.getElementById('caseContext');
  let dataHtml = currentExam.caseData?.length
    ? `<ul class="data-list">${currentExam.caseData.map(d => `<li>${d}</li>`).join('')}</ul>` : '';
  ctx.innerHTML = `<h3>📋 Caso: ${currentExam.caseName}</h3><p>${currentExam.caseDescription}</p>${dataHtml}`;
}

/* ── Question Nav ── */
function renderQuestionNav() {
  const nav = document.getElementById('questionNav');
  nav.innerHTML = allQuestions.map((_, i) =>
    `<button class="q-dot" id="qDot${i}" onclick="goToQuestion(${i})">${i + 1}</button>`
  ).join('');
}

function isQuestionAnswered(qId) {
  const ans = answers[qId];
  if (ans === undefined || ans === null) return false;
  const q = allQuestions.find(qq => qq.id === qId);
  if (!q) return false;
  if (q.type === 'drag_drop') return Object.keys(ans).length > 0;
  if (q.type === 'multi_part' || q.type === 'image_analysis') {
    return q.parts && q.parts.some(p => {
      const v = ans[p.id];
      return v && (typeof v === 'string' ? v.trim().length > 0 : true);
    });
  }
  return true;
}

function updateQuestionNav() {
  allQuestions.forEach((q, i) => {
    const dot = document.getElementById(`qDot${i}`);
    if (!dot) return;
    dot.classList.remove('current','answered');
    if (i === currentQuestionIndex) dot.classList.add('current');
    else if (isQuestionAnswered(q.id)) dot.classList.add('answered');
  });
}

/* ── Render Question ── */
function renderQuestion() {
  const q = allQuestions[currentQuestionIndex];
  const container = document.getElementById('questionContainer');
  const prevQ = currentQuestionIndex > 0 ? allQuestions[currentQuestionIndex - 1] : null;
  const showSection = !prevQ || prevQ.sectionId !== q.sectionId;

  let sectionHtml = showSection
    ? `<div class="exam-section-label">📌 ${q.sectionId} · ${q.sectionTitle} (${q.sectionPoints} pts)</div>`
    : '';

  let bodyHtml = '';
  if (q.type === 'drag_drop') bodyHtml = renderDragDrop(q);
  else if (q.type === 'multi_part') bodyHtml = renderMultiPart(q);
  else if (q.type === 'image_analysis') bodyHtml = renderImageAnalysis(q);
  else bodyHtml = `<p class="text-muted">Tipo de pregunta desconocido: ${q.type}</p>`;

  container.innerHTML = `
    ${sectionHtml}
    <div class="question-card">
      <div class="question-number">Pregunta ${currentQuestionIndex + 1} de ${allQuestions.length} · ${q.sectionPoints} pts</div>
      <div class="question-text">${q.situation}</div>
      ${bodyHtml}
    </div>
  `;

  document.getElementById('btnPrev').style.visibility = currentQuestionIndex > 0 ? 'visible' : 'hidden';
  const isLast = currentQuestionIndex === allQuestions.length - 1;
  document.getElementById('btnNext').style.display = isLast ? 'none' : '';
  document.getElementById('btnSubmit').style.display = isLast ? '' : 'none';
  updateQuestionNav();
  updateProgress();
}

/* ── Drag & Drop Renderer ── */
function renderDragDrop(q) {
  const dropState = answers[q.id] || {};
  const placedIds = Object.values(dropState);
  const unplaced = q.draggableItems.filter(item => !placedIds.includes(item.id));
  return `
    <div class="drag-drop-container">
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem;">🔵 Arrastra los conceptos del banco hacia la situación correspondiente. Puedes devolver un concepto al banco arrastrándolo de vuelta.</p>
      <div class="draggable-items" ondragover="handleDragOver(event)" ondrop="handleDrop(event,'${q.id}','pool')">
        ${unplaced.map(item => `
          <div class="draggable-item" draggable="true" id="drag-${item.id}" ondragstart="handleDragStart(event,'${item.id}')">${item.text}</div>
        `).join('')}
      </div>
      <div class="drop-zones">
        ${q.dropZones.map(zone => {
          const pid = dropState[zone.id];
          const placed = pid ? q.draggableItems.find(i => i.id === pid) : null;
          return `
            <div class="drop-zone-container">
              <div class="drop-zone-label">${zone.label}</div>
              <div class="drop-zone ${placed ? 'has-item' : ''}" ondragover="handleDragOver(event)" ondrop="handleDrop(event,'${q.id}','${zone.id}')">
                ${placed ? `<div class="draggable-item" draggable="true" id="drag-${placed.id}" ondragstart="handleDragStart(event,'${placed.id}')">${placed.text}</div>` : '<span class="drop-placeholder">Suelta aquí</span>'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/* ── Multi-Part Renderer ── */
function renderMultiPart(q) {
  const ans = answers[q.id] || {};
  return q.parts.map(part => {
    if (part.type === 'free_text') {
      return `
        <div class="multi-part-block">
          <div class="part-label">${part.label}</div>
          <p class="part-prompt">${part.prompt.replace(/\n/g, '<br>')}</p>
          <div class="free-text-container">
            <textarea class="free-text-input" placeholder="Escribe tu respuesta aquí..."
              oninput="handlePartInput('${q.id}','${part.id}',this.value)">${ans[part.id] || ''}</textarea>
          </div>
        </div>
      `;
    } else if (part.type === 'choice') {
      const sel = ans[part.id];
      return `
        <div class="multi-part-block">
          <div class="part-label">${part.label}</div>
          <p class="part-prompt">${part.prompt}</p>
          <div class="options-list">
            ${part.options.map(opt => `
              <button class="option-btn ${sel === opt.id ? 'selected' : ''}"
                onclick="handlePartChoice('${q.id}','${part.id}','${opt.id}')">
                <span>${opt.text}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
    return '';
  }).join('');
}

/* ── Image Analysis Renderer ── */
function renderImageAnalysis(q) {
  return `
    <div class="image-analysis-container">
      <img src="${q.imageSrc}" alt="${q.imageCaption}" class="checkout-mockup">
      <p class="image-caption">${q.imageCaption}</p>
    </div>
    ${renderMultiPart(q)}
  `;
}

/* ── Input Handlers ── */
function handlePartInput(qId, partId, value) {
  if (!answers[qId]) answers[qId] = {};
  answers[qId][partId] = value;
  updateQuestionNav();
  updateProgress();
}

function handlePartChoice(qId, partId, optId) {
  if (!answers[qId]) answers[qId] = {};
  answers[qId][partId] = optId;
  renderQuestion();
}

function handleDragStart(ev, itemId) {
  ev.dataTransfer.setData('text/plain', itemId);
  ev.target.classList.add('dragging');
}
function handleDragOver(ev) { ev.preventDefault(); }
function handleDrop(ev, questionId, zoneId) {
  ev.preventDefault();
  const itemId = ev.dataTransfer.getData('text/plain');
  if (!itemId) return;
  if (!answers[questionId]) answers[questionId] = {};
  Object.keys(answers[questionId]).forEach(zId => {
    if (answers[questionId][zId] === itemId) delete answers[questionId][zId];
  });
  if (zoneId !== 'pool') answers[questionId][zoneId] = itemId;
  renderQuestion();
}

/* ── Navigation ── */
function selectAnswer(qId, optId) { answers[qId] = optId; renderQuestion(); }
function goToQuestion(idx) {
  currentQuestionIndex = idx; renderQuestion();
  window.scrollTo({ top: document.getElementById('questionContainer').offsetTop - 120, behavior: 'smooth' });
}
function nextQuestion() { if (currentQuestionIndex < allQuestions.length - 1) { currentQuestionIndex++; renderQuestion(); window.scrollTo({ top: document.getElementById('questionContainer').offsetTop - 120, behavior: 'smooth' }); } }
function prevQuestion() { if (currentQuestionIndex > 0) { currentQuestionIndex--; renderQuestion(); window.scrollTo({ top: document.getElementById('questionContainer').offsetTop - 120, behavior: 'smooth' }); } }

function updateProgress() {
  const answered = allQuestions.filter(q => isQuestionAnswered(q.id)).length;
  const total = allQuestions.length;
  const pct = total > 0 ? (answered / total) * 100 : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${answered} / ${total} respondidas`;
}

/* ── Submit ── */
function submitExam() {
  const unanswered = allQuestions.filter(q => !isQuestionAnswered(q.id)).length;
  if (unanswered > 0) {
    if (!confirm(`Tienes ${unanswered} pregunta(s) sin responder. ¿Deseas enviar de todas formas?`)) return;
  }
  stopTimer();
  calculateResults();
  document.getElementById('progressBar').style.display = 'none';
  switchScreen('screenResults');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Calculate Results ── */
function calculateResults() {
  let totalScore = 0;
  const sectionResults = {};
  currentExam.sections.forEach(s => {
    sectionResults[s.id] = { title: s.title, points: s.points, earned: 0 };
  });

  const questionResults = allQuestions.map(q => {
    const userAnswer = answers[q.id];
    const pointsPerQ = q.sectionPoints;
    let pointsEarned = 0;
    let isCorrect = false, isPartial = false;

    if (q.type === 'drag_drop') {
      if (userAnswer && Object.keys(userAnswer).length > 0) {
        const totalZones = Object.keys(q.correct).length;
        let correct = 0;
        Object.keys(q.correct).forEach(zId => { if (userAnswer[zId] === q.correct[zId]) correct++; });
        pointsEarned = (correct / totalZones) * pointsPerQ;
        isCorrect = correct === totalZones;
        isPartial = correct > 0 && correct < totalZones;
      }
    } else if (q.type === 'multi_part' || q.type === 'image_analysis') {
      // Auto-score choice parts; free_text gets full credit if answered (self-eval)
      if (userAnswer) {
        let autoPoints = 0, autoTotal = 0, freeTextAnswered = 0, freeTextTotal = 0;
        q.parts.forEach(part => {
          if (part.type === 'choice') {
            autoTotal++;
            if (userAnswer[part.id] === part.correct) autoPoints++;
          } else if (part.type === 'free_text') {
            freeTextTotal++;
            if (userAnswer[part.id] && userAnswer[part.id].trim().length > 20) freeTextAnswered++;
          }
        });
        const total = autoTotal + freeTextTotal;
        const partialDone = autoPoints + freeTextAnswered;
        pointsEarned = total > 0 ? (partialDone / total) * pointsPerQ : 0;
        isCorrect = partialDone === total;
        isPartial = partialDone > 0 && partialDone < total;
      }
    }

    totalScore += pointsEarned;
    sectionResults[q.sectionId].earned += pointsEarned;
    return { ...q, userAnswer, isCorrect, isPartial, pointsEarned, isUnanswered: !isQuestionAnswered(q.id) };
  });

  // Score circle
  const pct = (totalScore / 20) * 100;
  document.getElementById('scoreCircle').style.setProperty('--score-pct', pct + '%');
  document.getElementById('scoreValue').innerHTML = `${totalScore.toFixed(1)}<span>/20</span>`;

  let msg, color;
  if (totalScore >= 17) { msg = '¡Excelente! Dominas los conceptos.'; color = 'var(--success)'; }
  else if (totalScore >= 14) { msg = '¡Muy bien! Algunos temas por reforzar.'; color = 'var(--utec-blue-light)'; }
  else if (totalScore >= 11) { msg = 'Buen intento. Revisa las secciones más débiles.'; color = 'var(--warning)'; }
  else { msg = 'Necesitas repasar. Revisa el feedback detallado.'; color = 'var(--error)'; }
  document.getElementById('scoreMessage').textContent = msg;
  document.getElementById('scoreMessage').style.color = color;
  document.getElementById('resultsCase').textContent = `${currentExam.caseName} — ${currentExam.caseSubtitle}`;
  document.getElementById('scoreDetail').textContent = `Puntaje basado en puntaje parcial y autoevaluación`;

  // Section bars
  const sectionsHtml = Object.entries(sectionResults).map(([id, s]) => {
    const secPct = s.points > 0 ? (s.earned / s.points) * 100 : 0;
    const barColor = secPct >= 70 ? 'var(--success)' : secPct >= 40 ? 'var(--warning)' : 'var(--error)';
    return `
      <div class="section-score-card">
        <h4>${id} · ${s.title}</h4>
        <div class="score-bar"><div class="score-bar-fill" style="width:${secPct}%;background:${barColor}"></div></div>
        <span class="score-label">${s.earned.toFixed(1)} / ${s.points} pts</span>
      </div>
    `;
  }).join('');
  document.getElementById('sectionScores').innerHTML = sectionsHtml;

  // Feedback cards
  document.getElementById('feedbackCards').innerHTML = questionResults.map((q, i) => renderFeedbackCard(q, i)).join('');

  // ── Enviar resultados al tracker (análisis pedagógico por respuesta) ──
  const tiempoMinutos = examStartTime
    ? Math.round((Date.now() - examStartTime) / 6000) / 10
    : null;
  const preguntasRespondidas = allQuestions.filter(q => isQuestionAnswered(q.id)).length;

  // Construir detalle legible: una entrada por pregunta, con sub-partes expandidas
  const respuestasDetalle = questionResults.map(q => {
    const entry = {
      seccion: q.sectionId,
      titulo_seccion: q.sectionTitle,
      pregunta_id: q.id,
      tipo: q.type,
      puntos_obtenidos: parseFloat(q.pointsEarned.toFixed(2)),
      puntos_max: q.sectionPoints,
      es_correcto: q.isCorrect,
      es_parcial: q.isPartial,
      sin_respuesta: q.isUnanswered,
      partes: []
    };
    const userAnswer = q.userAnswer || {};
    if (q.type === 'drag_drop') {
      q.dropZones.forEach(zone => {
        const placedId = userAnswer[zone.id];
        const placedItem = placedId ? q.draggableItems.find(i => i.id === placedId) : null;
        const correctId = q.correct[zone.id];
        const correctItem = q.draggableItems.find(i => i.id === correctId);
        entry.partes.push({
          tipo: 'drag_drop',
          zona: zone.label,
          respuesta_alumno: placedItem ? placedItem.text : '(vacío)',
          respuesta_correcta: correctItem ? correctItem.text : '',
          ok: placedId === correctId
        });
      });
    } else if (q.type === 'multi_part' || q.type === 'image_analysis') {
      q.parts.forEach(part => {
        const v = userAnswer[part.id];
        if (part.type === 'free_text') {
          entry.partes.push({
            tipo: 'texto_libre',
            parte: part.label,
            respuesta_alumno: v || '(sin respuesta)'
          });
        } else if (part.type === 'choice') {
          const chosen  = part.options.find(o => o.id === v);
          const correct = part.options.find(o => o.id === part.correct);
          entry.partes.push({
            tipo: 'opcion',
            parte: part.label,
            respuesta_alumno:  chosen  ? chosen.text  : '(sin respuesta)',
            respuesta_correcta: correct ? correct.text : '',
            ok: v === part.correct
          });
        }
      });
    }
    return entry;
  });

  trackEvent({
    evento: 'resultado_final',
    timestamp: new Date().toISOString(),
    casoId: currentExam.id,
    casoNombre: currentExam.caseName,
    modo: timerMode,
    puntaje: parseFloat(totalScore.toFixed(2)),
    tiempoMinutos: tiempoMinutos,
    preguntasRespondidas: preguntasRespondidas,
    totalPreguntas: allQuestions.length,
    respuestasDetalle: respuestasDetalle   // array estructurado → se expande en hoja "Respuestas"
  });
}

function renderFeedbackCard(q, i) {
  const status = q.isUnanswered ? 'unanswered' : (q.isCorrect ? 'correct' : (q.isPartial ? 'partial' : 'incorrect'));
  const labels = { correct: '✅ Completa', partial: '⚠️ Parcial', incorrect: '❌ Incompleta', unanswered: '⚠️ Sin responder' };
  const badges = { correct: 'correct', partial: 'unanswered', incorrect: 'incorrect', unanswered: 'unanswered' };
  const cardClass = badges[status] + '-card';

  let answerHtml = '';
  if (q.type === 'drag_drop') {
    const dropState = q.userAnswer || {};
    answerHtml = `<div class="fb-drag-drop-result">`;
    q.dropZones.forEach(zone => {
      const uid = dropState[zone.id];
      const cid = q.correct[zone.id];
      const userItem = q.draggableItems.find(it => it.id === uid);
      const correctItem = q.draggableItems.find(it => it.id === cid);
      const ok = uid === cid;
      answerHtml += `
        <div class="fb-dd-row ${ok ? 'correct' : 'incorrect'}">
          <span class="fb-dd-label">${zone.label}</span>
          <span class="fb-dd-user">${userItem ? userItem.text : '(Vacío)'}</span>
          ${!ok ? `<span class="fb-dd-expected">✓ ${correctItem ? correctItem.text : ''}</span>` : ''}
        </div>
      `;
    });
    answerHtml += `</div>`;
  } else if (q.type === 'multi_part' || q.type === 'image_analysis') {
    const ans = q.userAnswer || {};
    answerHtml = q.parts.map(part => {
      if (part.type === 'free_text') {
        const userText = ans[part.id] || '<em>Sin respuesta.</em>';
        return `
          <div class="fb-part-block">
            <div class="fb-part-label">${part.label}</div>
            <div class="fb-your-answer"><strong>Tu respuesta:</strong><br>${userText.replace(/\n/g, '<br>')}</div>
            <div class="fb-free-text-rubric">
              <div class="fb-rubric-title">📋 Rúbrica / Respuesta Esperada:</div>
              <div>${part.rubric}</div>
            </div>
          </div>
        `;
      } else if (part.type === 'choice') {
        const userOptId = ans[part.id];
        const userOpt = part.options.find(o => o.id === userOptId);
        const correctOpt = part.options.find(o => o.id === part.correct);
        const ok = userOptId === part.correct;
        return `
          <div class="fb-part-block">
            <div class="fb-part-label">${part.label} ${ok ? '✅' : '❌'}</div>
            ${userOpt ? `<p class="fb-your-answer"><strong>Tu elección:</strong> ${userOpt.text}</p>` : ''}
            ${!ok && correctOpt ? `<p class="fb-correct-answer"><strong>Correcta:</strong> ${correctOpt.text}</p>` : ''}
            <div class="fb-free-text-rubric">
              <div class="fb-rubric-title">📋 Justificación esperada:</div>
              <div>${part.rubric}</div>
            </div>
          </div>
        `;
      }
      return '';
    }).join('');
  }

  return `
    <div class="feedback-card ${cardClass}">
      <div class="fb-header">
        <span class="fb-badge ${badges[status]}">${labels[status]}</span>
        <span class="fb-question-num">${q.sectionId} — Pregunta ${i + 1}</span>
        <span style="margin-left:auto;font-size:0.8rem;font-weight:600;color:var(--text-muted)">+${q.pointsEarned.toFixed(2)} / ${q.sectionPoints} pts</span>
      </div>
      <div class="fb-question-text">${q.situation}</div>
      ${answerHtml}
      <div class="fb-explanation">
        <strong>💡 Concepto clave:</strong> ${q.explanation}<br>
        <span class="fb-session">📚 ${q.session}</span>
      </div>
    </div>
  `;
}

function retryExam() { answers = {}; currentQuestionIndex = 0; startExam(); }

/* ── Screen Management ── */
function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}
