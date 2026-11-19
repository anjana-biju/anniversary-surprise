const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const SITE_CONFIG = {
  secretPassword: 'skyworld',
  firstMeetingDate: ''
};

const intro = $('#intro');
const story = $('#story');
const openSurprise = $('#openSurprise');

openSurprise.addEventListener('click', () => {
  intro.classList.add('closed');
  story.hidden = false;
  musicToggle.disabled = false;
  startMusic();
  setTimeout(() => {
    intro.remove();
    story.scrollIntoView({ behavior: 'smooth' });
  }, 1000);
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 20);
});

const typingText = $('#typingText');
const typingCopy = 'I never knew that one little message would become one of the most beautiful chapters of my life.';
let typingIndex = 0;
function typeStory() {
  if (typingIndex <= typingCopy.length) {
    typingText.textContent = typingCopy.slice(0, typingIndex++);
    setTimeout(typeStory, 32);
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'typingText') typeStory();
    }
  });
}, { threshold: 0.14 });

$$('.reveal').forEach(el => observer.observe(el));
observer.observe(typingText);

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $('#progressBar').style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
}, { passive:true });

// Lightweight rose-petal particles
const petals = $('#petals');
for (let i = 0; i < 18; i++) {
  const petal = document.createElement('i');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${8 + Math.random() * 10}s`;
  petal.style.animationDelay = `${Math.random() * -12}s`;
  petal.style.transform = `scale(${0.55 + Math.random() * 0.8})`;
  petals.appendChild(petal);
}

function burstHearts(x, y, count = 12) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.textContent = '♥';
    heart.style.cssText = `position:fixed;z-index:1500;left:${x}px;top:${y}px;color:${i % 2 ? '#eab7a2' : '#d6ad72'};font-size:${12 + Math.random()*14}px;pointer-events:none;transition:transform 1.8s ease-out,opacity 1.8s;`;
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      const angle = (Math.PI * 2 * i) / count;
      const distance = 80 + Math.random() * 160;
      heart.style.transform = `translate(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance - 80}px) rotate(${Math.random()*180}deg)`;
      heart.style.opacity = '0';
    });
    setTimeout(() => heart.remove(), 1900);
  }
}

$$('.timeline-item').forEach(item => {
  const toggle = () => item.classList.toggle('open');
  $('.timeline-card', item).addEventListener('click', toggle);
  item.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });
});

const letter = $('#letter');
$('#openLetter').addEventListener('click', () => {
  const paragraphs = [
    'I don\'t know how to explain how happy this one year has made me. When you first sent me that little “Hi” on November 28, 2025, I never imagined that you would become such an important part of my life.',
    'From an unexpected friendship to something so beautiful, everything happened so naturally. Even though we are far away, you have given me so many moments of happiness. There were so many stages in this journey, so many emotions, and so many dreams that slowly became ours.',
    'March 15 will always be a special day for me. It gave our relationship a beautiful meaning and made me dream even more about our future.',
    'Thank you, Ponnu, for being a part of my life. Thank you for every conversation, every smile, every moment of happiness, and every little thing that made this year special.',
    'This one year has given me some of the happiest days of my life.',
    'I may still be waiting to see you, to hold your hand, to look into your eyes, and to finally experience all the little things we dream about. But until that day comes, I will keep loving our story, our dreams, and the future waiting for us.',
    'You are my favourite unexpected beginning.',
    'And I hope you will be my forever.',
    'Happy One Year, My Love ❤️',
    'Thank you, Ponnu... for everything.'
  ];
  $('#letterText').innerHTML = '';
  letter.classList.add('open');
  letter.setAttribute('aria-hidden', 'false');
  let index = 0;
  const write = () => {
    if (index >= paragraphs.length) return;
    const p = document.createElement('p');
    p.textContent = paragraphs[index++];
    $('#letterText').appendChild(p);
    setTimeout(write, 180);
  };
  write();
  setTimeout(() => letter.scrollIntoView({ behavior:'smooth', block:'center' }), 250);
});

$$('.gallery-filter button').forEach(button => {
  button.addEventListener('click', () => {
    $$('.gallery-filter button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    $$('.memory-card').forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
  });
});

const modal = $('#modal');
const modalContent = $('.modal-content');
function openModal(html) {
  modalContent.innerHTML = html;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
$('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

$$('.memory-card').forEach(card => {
  card.addEventListener('click', () => openModal(`<h3>${card.dataset.caption}</h3><img src="${card.dataset.image}" alt="${card.dataset.caption}">`));
});

$('#ceremonyFrame').addEventListener('click', () => openModal('<h3>Our Urappikkal — March 15, 2026</h3><img src="assets/urappikkal.jpg" alt="Anjana and Vinu on their Urappikkal day">'));
$('#ceremonyFrame').addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') $('#ceremonyFrame').click();
});

$('#secretHeart').addEventListener('click', event => {
  burstHearts(event.clientX, event.clientY, 28);
  openModal('<h3>A Secret For You, Ponnu</h3><p>Even on the days filled with distance and waiting, I choose you. My heart has found a home in you, and I cannot wait to hold you close someday.</p>');
});

$('#futureButton').addEventListener('click', event => {
  burstHearts(event.clientX, event.clientY, 35);
  openModal('<h3>Our Forever ♾️</h3><p>One day, the distance will disappear. There will be no more waiting for a call, no more wishing to be beside you, no more counting days. Just you and me, living the beautiful life we once dreamed about. Until then, keep my heart safe. It belongs to you.</p>');
});

// AI-style fallback, with no API key or personal-data fabrication
const aiLaunch = $('#aiLaunch');
const chatWindow = $('#chatWindow');
const chatMessages = $('#chatMessages');
aiLaunch.addEventListener('click', () => {
  const open = chatWindow.classList.toggle('open');
  aiLaunch.setAttribute('aria-expanded', String(open));
  chatWindow.setAttribute('aria-hidden', String(!open));
  if (open) $('#chatInput').focus();
});
$('#closeChat').addEventListener('click', () => {
  chatWindow.classList.remove('open');
  aiLaunch.setAttribute('aria-expanded', 'false');
  chatWindow.setAttribute('aria-hidden', 'true');
});

function loveStoryReply(prompt) {
  const text = prompt.toLowerCase();
  if (text.includes('special') || text.includes('begin') || text.includes('hi')) {
    return 'Our story is special because one unexpected “Hi” on November 28, 2025 slowly became friendship, care, love, and a shared dream.';
  }
  if (text.includes('urappikkal') || text.includes('march')) {
    return 'March 15, 2026 was our Urappikkal—a beautiful day that made our relationship feel more real and brought our dreams about the future closer.';
  }
  if (text.includes('distance') || text.includes('apart') || text.includes('meet')) {
    return 'We are miles apart, and we are still waiting for our first meeting. But what we share is deeply close at heart, held together by distance, patience, and hope.';
  }
  if (text.includes('letter') || text.includes('anjana') || text.includes('message')) {
    return 'My love, this is Anjana’s message: Ponnu, you are my favourite unexpected beginning. Thank you for every conversation and every moment that made this year so special. Happy One Year, my love.';
  }
  if (text.includes('future') || text.includes('forever') || text.includes('dream')) {
    return 'Our future is one of countless more years, more memories, our first meeting, and the beautiful life we dream of building together.';
  }
  return 'What makes our story beautiful is how naturally it grew—from an unexpected “Hi” to a friendship that became love, with hope for a shared future.';
}

$('#chatForm').addEventListener('submit', event => {
  event.preventDefault();
  const input = $('#chatInput');
  const prompt = input.value.trim();
  if (!prompt) return;
  const user = document.createElement('div');
  user.className = 'user-message';
  user.textContent = prompt;
  chatMessages.appendChild(user);
  input.value = '';
  setTimeout(() => {
    const response = document.createElement('div');
    response.className = 'ai-message';
    response.textContent = loveStoryReply(prompt);
    chatMessages.appendChild(response);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);
});

// Synthesized, quiet ambient music is enabled by the opening-button interaction.
let audioContext = null;
let musicNodes = null;
let musicPlaying = false;
let musicMuted = false;
let musicVolume = 0.35;
const musicToggle = $('#musicToggle');
const musicPanel = $('#musicPanel');
musicToggle.disabled = true;

const musicChords = {
  opening: [174.61, 220, 261.63],
  story: [196, 246.94, 293.66],
  distance: [164.81, 196, 246.94],
  secret: [185, 233.08, 277.18],
  finale: [196, 261.63, 329.63]
};

function setMusicVolume() {
  if (!musicNodes) return;
  const target = musicPlaying && !musicMuted ? Math.max(0.0001, musicVolume * 0.045) : 0.0001;
  musicNodes.master.gain.cancelScheduledValues(audioContext.currentTime);
  musicNodes.master.gain.setTargetAtTime(target, audioContext.currentTime, 0.5);
}

function startMusic() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  if (!musicNodes) {
    const master = audioContext.createGain();
    master.gain.value = 0.0001;
    master.connect(audioContext.destination);
    const oscillators = [174.61, 220, 261.63].map((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const voice = audioContext.createGain();
      oscillator.type = index === 1 ? 'triangle' : 'sine';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index * 3 - 3;
      voice.gain.value = index === 0 ? 0.5 : 0.28;
      oscillator.connect(voice);
      voice.connect(master);
      oscillator.start();
      return oscillator;
    });
    musicNodes = { master, oscillators };
  }
  musicPlaying = true;
  setMusicVolume();
  musicToggle.classList.add('playing');
  musicToggle.setAttribute('aria-label', 'Pause music');
  $('.music-label', musicToggle).textContent = 'Pause';
}

function setMusicChord(name) {
  if (!musicNodes || !musicChords[name]) return;
  musicChords[name].forEach((frequency, index) => {
    musicNodes.oscillators[index].frequency.setTargetAtTime(frequency, audioContext.currentTime, 1.8);
  });
}

musicToggle.addEventListener('click', () => {
  musicPanel.classList.toggle('open');
  if (musicPlaying) {
    musicPlaying = false;
    setMusicVolume();
    musicToggle.classList.remove('playing');
    musicToggle.setAttribute('aria-label', 'Play music');
    $('.music-label', musicToggle).textContent = 'Music';
  } else {
    startMusic();
  }
});

$('#musicVolume').addEventListener('input', event => {
  musicVolume = Number(event.target.value) / 100;
  setMusicVolume();
});
$('#muteMusic').addEventListener('click', event => {
  musicMuted = !musicMuted;
  event.currentTarget.textContent = musicMuted ? 'Unmute' : 'Mute';
  event.currentTarget.setAttribute('aria-label', musicMuted ? 'Unmute music' : 'Mute music');
  setMusicVolume();
});

const musicSections = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const title = visible.target.dataset.title || '';
  if (/waiting|apart|meeting/i.test(title)) setMusicChord('distance');
  else if (/secret/i.test(title)) setMusicChord('secret');
  else if (/forever|anniversary|last message/i.test(title)) setMusicChord('finale');
  else if (/beginning|hi|story/i.test(title)) setMusicChord('opening');
  else setMusicChord('story');
}, { threshold: [0.2, 0.45, 0.7] });
$$('#story .section[data-title]').forEach(section => musicSections.observe(section));

function playUnlockSound() {
  if (!audioContext || audioContext.state !== 'running') return;
  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime + index * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + index * 0.09 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + index * 0.09 + 0.35);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(audioContext.currentTime + index * 0.09);
    oscillator.stop(audioContext.currentTime + index * 0.09 + 0.4);
  });
}

// Countdown stays undecided unless the visitor enters a date.
const meetingDateInput = $('#meetingDate');
const savedMeetingDate = localStorage.getItem('firstMeetingDate') || SITE_CONFIG.firstMeetingDate;
if (savedMeetingDate) meetingDateInput.value = savedMeetingDate;
function updateCountdown() {
  const date = meetingDateInput.value ? new Date(meetingDateInput.value).getTime() : NaN;
  const undecided = $('#countdownUndecided');
  const grid = $('#countdownGrid');
  if (!Number.isFinite(date)) {
    undecided.hidden = false;
    grid.hidden = true;
    return;
  }
  if (date <= Date.now()) {
    undecided.textContent = 'Our chosen day is here — every moment brings us closer.';
    undecided.hidden = false;
    grid.hidden = true;
    return;
  }
  undecided.hidden = true;
  grid.hidden = false;
  const remaining = date - Date.now();
  $('#countDays').textContent = Math.floor(remaining / 86400000);
  $('#countHours').textContent = String(Math.floor((remaining / 3600000) % 24)).padStart(2, '0');
  $('#countMinutes').textContent = String(Math.floor((remaining / 60000) % 60)).padStart(2, '0');
  $('#countSeconds').textContent = String(Math.floor((remaining / 1000) % 60)).padStart(2, '0');
}
meetingDateInput.addEventListener('input', () => {
  if (meetingDateInput.value) localStorage.setItem('firstMeetingDate', meetingDateInput.value);
  else localStorage.removeItem('firstMeetingDate');
  updateCountdown();
});
updateCountdown();
setInterval(updateCountdown, 1000);

// Eight connected illustrated chapters with editable character outfit colours.
const stages = [
  ['The First Hi 💬', 'Two strangers meet through one little message.', 'firsthi'],
  ['Unexpected Friendship 🌷', 'They start talking and slowly become close.', 'friendship'],
  ['Falling in Love ❤️', 'Their friendship turns into something special.', 'love'],
  ['Miles Apart 🌙', 'They live far away but share the same feelings.', 'distance'],
  ['March 15 💍', 'Their Urappikkal makes the relationship more meaningful.', 'promise'],
  ['Waiting for Our First Meeting 🥹', 'Two hearts wait for the day they finally meet.', 'meeting'],
  ['Our First Hug 🤍', 'A dreamy future scene for the day the waiting is over.', 'hug'],
  ['Our Forever ♾️', 'Their story continues together toward a beautiful sunset.', 'forever']
];
let activeStage = 0;
const cartoonStage = $('#cartoonStage');
function showStage(index) {
  activeStage = Math.max(0, Math.min(stages.length - 1, index));
  const [title, description, scene] = stages[activeStage];
  cartoonStage.dataset.scene = scene;
  $('#stageNumber').textContent = `Stage ${activeStage + 1} of ${stages.length}`;
  $('#stageTitle').textContent = title;
  $('#stageDescription').textContent = description;
  $$('#stageDots button').forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === activeStage);
    dot.setAttribute('aria-current', dotIndex === activeStage ? 'step' : 'false');
  });
  $('#previousStage').disabled = activeStage === 0;
  $('#nextStage').disabled = activeStage === stages.length - 1;
}
stages.forEach((stage, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show stage ${index + 1}: ${stage[0]}`);
  dot.addEventListener('click', () => showStage(index));
  $('#stageDots').appendChild(dot);
});
showStage(0);
$('#previousStage').addEventListener('click', () => showStage(activeStage - 1));
$('#nextStage').addEventListener('click', () => showStage(activeStage + 1));
$('#girlColor').addEventListener('input', event => cartoonStage.style.setProperty('--girl-outfit', event.target.value));
$('#boyColor').addEventListener('input', event => cartoonStage.style.setProperty('--boy-outfit', event.target.value));
$('#waveCharacters').addEventListener('click', () => {
  cartoonStage.classList.remove('waving');
  void cartoonStage.offsetWidth;
  cartoonStage.classList.add('waving');
});

// The password is deliberately kept in this configuration object, not rendered in the page.
$('#passwordForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const password = $('#secretPassword').value;
  if (password !== SITE_CONFIG.secretPassword) {
    form.classList.remove('shake');
    void form.offsetWidth;
    form.classList.add('shake');
    $('#passwordFeedback').textContent = 'That is not quite the secret. Try again, my love.';
    return;
  }
  $('#passwordFeedback').textContent = 'You found it, my love. ❤️';
  $('#unlockedSecret').hidden = false;
  $('#secretPassword').value = '';
  $('#secretPassword').disabled = true;
  $('button[type="submit"]', form).disabled = true;
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 36);
  playUnlockSound();
  $('#unlockedSecret').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Personal messages use only the details supplied in the story (no personal memories are invented).
const heartMessages = {
  love: 'I love how naturally you became such an important part of my life. From one little “Hi” to the happiness we share, you are my favourite unexpected beginning.',
  special: 'Our story began unexpectedly on November 28, 2025, grew from friendship into love, and keeps teaching my heart that distance cannot make us feel far apart.',
  meeting: 'When our first meeting finally comes, I hope I can look at you, smile, hold your hand, and feel every mile of waiting turn into one beautiful moment.',
  future: 'I dream of more years, more memories, our first meeting, and a lifetime of choosing each other. Our story is only beginning.',
  miss: 'If you miss me, look at the same moon I am looking at. Somewhere beneath this same sky, my heart is sending a little love your way.',
  sleep: 'Sleep with this thought close to your heart: you made this year one of the happiest chapters of my life. Goodnight, Ponnu. ❤️',
  surprise: 'Ponnu, thank you for every conversation, every smile, and every moment that made this year special. I am waiting for you and for our beautiful future.'
};
$$('.message-prompts button').forEach(button => {
  button.addEventListener('click', () => {
    const card = $('#generatedMessage');
    const text = heartMessages[button.dataset.prompt];
    card.innerHTML = '';
    const heart = document.createElement('span');
    heart.textContent = '♡';
    const message = document.createElement('p');
    card.append(heart, message);
    let index = 0;
    const typeMessage = () => {
      message.textContent = text.slice(0, index++);
      if (index <= text.length) setTimeout(typeMessage, 22);
    };
    typeMessage();
  });
});

// Small, optional discoveries in the waiting scene.
$$('[data-magic]').forEach(button => button.addEventListener('click', () => {
  openModal(`<h3>A Little Note for You</h3><p>${button.dataset.magic}</p>`);
}));
const magicMoon = $('#magicMoon');
const openMoonMessage = () => openModal('<h3>Under the Same Moon</h3><p>We may be far apart, but we can look at the same moon and keep dreaming of the day we meet.</p>');
magicMoon.addEventListener('click', openMoonMessage);
magicMoon.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') openMoonMessage();
});
$('#marchTouch').addEventListener('click', () => $('#ceremonyFrame').click());

// The dreamed reunion only appears after he reaches the original anniversary ending.
$('#revealMeeting').addEventListener('click', () => {
  const section = $('#futureMeeting');
  section.hidden = false;
  section.scrollIntoView({ behavior: 'smooth' });
});
$('#startReunion').addEventListener('click', event => {
  const section = $('#futureMeeting');
  const scene = $('#reunionScene');
  event.currentTarget.disabled = true;
  section.classList.add('started');
  $('#reunionMessage').textContent = 'One day, this will no longer be a dream...';
  setTimeout(() => {
    scene.classList.add('hugged');
    $('#reunionEnding').hidden = false;
    $('#showLastMessage').hidden = false;
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 30);
  }, 6000);
});

$('#showLastMessage').addEventListener('click', () => {
  const section = $('#lastMessage');
  section.hidden = false;
  section.scrollIntoView({ behavior: 'smooth' });
  const lines = [
    'If you are reading this till the end, I hope you understand how much happiness you have brought into my life.',
    'You were not a plan. You were an unexpected beginning that became one of my most beautiful dreams.',
    'I am still waiting for the day I can look at you, smile, hold your hand, and tell you all these things without a screen between us.',
    'Happy One Year, My Love.',
    'I am waiting for you... not just for our first meeting, but for all the beautiful days that I hope we will live together.',
    'You ❤️ Me',
    '2025 → 2026 → 2027 → Forever ♾️'
  ];
  const output = $('#lastTypedMessage');
  output.innerHTML = '';
  let lineIndex = 0;
  const typeLine = () => {
    if (lineIndex >= lines.length) return;
    const line = document.createElement('span');
    output.appendChild(line);
    let characterIndex = 0;
    const typeCharacter = () => {
      line.textContent = lines[lineIndex].slice(0, characterIndex++);
      if (characterIndex <= lines[lineIndex].length) setTimeout(typeCharacter, 22);
      else {
        lineIndex++;
        setTimeout(typeLine, 450);
      }
    };
    typeCharacter();
  };
  typeLine();
});

$('#keepHeart').addEventListener('click', () => {
  openModal('<div class="final-heart-animation">♥</div><h3>Distance is only between our places... never between our hearts.</h3>');
  modal.classList.add('heart-celebration');
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 48);
});
$('.modal-close').addEventListener('click', () => modal.classList.remove('heart-celebration'));
