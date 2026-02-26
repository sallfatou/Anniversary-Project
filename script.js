// ===== DONNÉES ET VARIABLES GLOBALES =====
const photos = [
	{src:"assets/mom1.jpg", msg:"Tu es notre lumière 💖"},
	{src:"assets/mom2.jpg", msg:"Merci pour ta douceur 🌸"},
	{src:"assets/mom3.jpg", msg:"On t'aime fort 🎂"},
	{src:"assets/mom4.jpg", msg:"Tu es la plus merveilleuse 💕"},
	{src:"assets/mom5.jpg", msg:"Toujours dans nos cœurs 💖"},
	{src:"assets/dad1.jpg", msg:"Merci pour ta force 💪"},
	{src:"assets/dad2.jpg", msg:"Toujours protecteur 🌟"},
	{src:"assets/you1.jpg", msg:"Je suis fière de ce que je crée 🎨"},
	{src:"assets/you2.jpg", msg:"Un projet pour vous 💖"},
	{src:"assets/you3.jpg", msg:"Avec amour et passion 🌸"},
	{src:"assets/bro1.jpg", msg:"Tu es mon inspiration 🌟"},
	{src:"assets/bro2.jpg", msg:"Merci pour ton soutien 🤝"},
	{src:"assets/sister1.jpg", msg:"Je t'admire 💖"},
	{src:"assets/sister.jpg", msg:"Toujours à mes côtés 💕"},
	{src:"assets/bro3.jpg", msg:"Joyeux anniversaire 🎉"}
];

const quizParticipants = [
	{ name: 'Papa', image: 'assets/dad1.jpg' },
	{ name: 'Papa (Photo 2)', image: 'assets/dad2.jpg' },
	{ name: 'Grande Sœur', image: 'assets/sister1.jpg' },
	{ name: 'Grande Sœur (Photo 2)', image: 'assets/sister.jpg' },
	{ name: 'Grand Frère', image: 'assets/bro1.jpg' },
	{ name: 'Grand Frère (Photo 2)', image: 'assets/bro2.jpg' },
	{ name: 'Grand Frère (Photo 3)', image: 'assets/bro3.jpg' },
	{ name: 'Toi (Fatou)', image: 'assets/you1.jpg' },
	{ name: 'Toi (Photo 2)', image: 'assets/you2.jpg' },
	{ name: 'Toi (Photo 3)', image: 'assets/you3.jpg' }
];

const quizQuestions = [
	"Qui fait les blagues les plus drôles ?",
	"Qui est le plus courageux ?",
	"Qui danse le mieux en secret ?",
	"Qui est le plus protecteur ?",
	"Qui fait les câlins les plus chaleureux ?",
	"Qui est le plus créatif ?",
	"Qui cuisine le mieux ?",
	"Qui raconte les meilleures histoires ?",
	"Qui est toujours là pour conseiller ?",
	"Qui apporte le plus de joie ?"
];

let currentPhotoIndex = 0;
let currentQuestionIndex = 0;
let quizScores = {};

// ===== FONCTIONS PRINCIPALES =====

// Fonctions de confettis et animations
function launchConfetti() {
	const canvas = document.getElementById('confetti');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');
	
	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resize();
	window.addEventListener('resize', resize);
	
	const colors = ['#FFD166','#EF476F','#06D6A0','#118AB2','#FFB703'];
	const particles = [];
	const count = 160;
	
	for (let i = 0; i < count; i++) {
		particles.push({
			x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
			y: window.innerHeight / 2 + (Math.random() - 0.5) * 80,
			vx: (Math.random() - 0.5) * 8,
			vy: -Math.random() * 8 - 2,
			r: Math.random() * 6 + 3,
			color: colors[Math.floor(Math.random() * colors.length)],
		});
	}
	
	let raf;
	function frame() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let p of particles) {
			p.vy += 0.18;
			p.x += p.vx;
			p.y += p.vy;
			ctx.fillStyle = p.color;
			ctx.beginPath();
			ctx.ellipse(p.x, p.y, p.r, p.r / 1.05, 0, 0, Math.PI * 2);
			ctx.fill();
		}
		raf = requestAnimationFrame(frame);
	}
	frame();
	setTimeout(() => { 
		cancelAnimationFrame(raf); 
		ctx.clearRect(0, 0, canvas.width, canvas.height); 
	}, 6000);
}

function createStarsBurst() {
	const count = 26;
	for (let i = 0; i < count; i++) {
		const s = document.createElement('div');
		s.className = 'star';
		s.textContent = '✨';
		s.style.cssText = `
			position: fixed;
			top: ${Math.random() * 100}vh;
			left: ${Math.random() * 100}vw;
			font-size: 2em;
			z-index: 999;
			pointer-events: none;
		`;
		document.body.appendChild(s);
		
		const dur = 1000 + Math.random() * 1600;
		s.style.transition = `transform ${dur}ms ease-out, opacity ${dur}ms ease-out`;
		requestAnimationFrame(() => { 
			s.style.transform = `translateY(-${20 + Math.random() * 80}px) scale(${0.8 + Math.random() * 1.5})`; 
			s.style.opacity = 0; 
		});
		setTimeout(() => s.remove(), dur + 50);
	}
}

// Navigation entre pages
function showPage(pageId) {
	const pages = document.querySelectorAll('.page');
	pages.forEach(page => page.classList.remove('show'));
	
	const targetPage = document.getElementById(pageId);
	if (targetPage) {
		targetPage.classList.add('show');
		
		if (pageId === 'gallery-page') {
			showPhoto(0);
		} else if (pageId === 'letter-page') {
			setTimeout(() => {
				const envelope = document.getElementById('envelope');
				if (envelope) envelope.classList.add('open');
				createStarsBurst();
			}, 500);
		} else if (pageId === 'quiz-page') {
			startQuiz();
		}
	}
}

// ===== GALERIE =====

function showPhoto(index) {
	if (index < 0) index = photos.length - 1;
	if (index >= photos.length) index = 0;
	
	currentPhotoIndex = index;
	const photo = photos[index];
	
	document.getElementById('gallery-photo').src = photo.src;
	document.getElementById('gallery-message').textContent = photo.msg;
	document.getElementById('photo-counter').textContent = `${index + 1} / ${photos.length}`;
}

// ===== TYPING EFFECT =====

function typeText(element, text, speed = 50) {
	element.textContent = '';
	let index = 0;
	
	function type() {
		if (index < text.length) {
			element.textContent += text.charAt(index);
			index++;
			setTimeout(type, speed);
		}
	}
	type();
}

// ===== QUIZ =====

function startQuiz() {
	currentQuestionIndex = 0;
	quizScores = {};
	quizParticipants.forEach(p => quizScores[p.name] = 0);
	
	document.getElementById('quiz-content').style.display = 'block';
	document.getElementById('quiz-result').classList.add('hidden');
	
	showQuestion();
}

function showQuestion() {
	if (currentQuestionIndex >= quizQuestions.length) {
		showQuizResult();
		return;
	}
	
	const questionText = document.getElementById('question-text');
	const photosContainer = document.getElementById('quiz-photos');
	
	questionText.textContent = quizQuestions[currentQuestionIndex];
	photosContainer.innerHTML = '';
	
	quizParticipants.forEach((participant) => {
		const item = document.createElement('div');
		item.className = 'quiz-photo-item';
		
		const img = document.createElement('img');
		img.src = participant.image;
		img.alt = participant.name;
		
		const label = document.createElement('div');
		label.className = 'photo-label';
		label.textContent = participant.name;
		
		item.appendChild(img);
		item.appendChild(label);
		
		item.addEventListener('click', () => {
			selectAnswer(participant.name, item);
		});
		
		photosContainer.appendChild(item);
	});
}

function selectAnswer(participantName, element) {
	element.classList.add('selected');
	quizScores[participantName]++;
	
	createSparkleEffect(event);
	
	setTimeout(() => {
		currentQuestionIndex++;
		showQuestion();
	}, 800);
}

function createSparkleEffect(e) {
	for (let i = 0; i < 8; i++) {
		const star = document.createElement('div');
		star.textContent = '✨';
		star.className = 'star-particle';
		star.style.cssText = `
			left: ${e.clientX}px;
			top: ${e.clientY}px;
			font-size: 20px;
			--tx: ${(Math.random() - 0.5) * 100}px;
			--ty: ${(Math.random() - 0.5) * 100}px;
		`;
		document.body.appendChild(star);
		setTimeout(() => star.remove(), 1000);
	}
}

function showQuizResult() {
	document.getElementById('quiz-content').style.display = 'none';
	const resultDiv = document.getElementById('quiz-result');
	resultDiv.classList.remove('hidden');
	
	let maxScore = 0;
	let winner = null;
	
	for (let name in quizScores) {
		if (quizScores[name] > maxScore) {
			maxScore = quizScores[name];
			winner = quizParticipants.find(p => p.name === name);
		}
	}
	
	if (winner) {
		document.getElementById('winner-display').innerHTML = `<img src="${winner.image}" alt="${winner.name}">`;
		
		setTimeout(() => {
			launchConfetti();
			createStarsBurst();
		}, 500);
		
		const audio = document.getElementById('bg-audio');
		if (audio && audio.paused) {
			audio.play().catch(()=>{});
		}
	}
}

// ===== ANIMATION INTRO =====

function startIntroAnimation() {
	const introEl = document.getElementById('intro-text');
	const birthdayEl = document.getElementById('birthday-text');
	const dateEl = document.getElementById('date-text');
	
	// Animation du texte intro
	setTimeout(() => {
		typeText(birthdayEl, "🎉 Happy Birthday ✨", 120);
	}, 2000);
	
	// Animation de la date
	setTimeout(() => {
		dateEl.textContent = "27 February 2026";
		dateEl.style.animation = 'pulse 2s infinite';
	}, 4500);
	
	// Confetti initial
	setTimeout(() => {
		launchConfetti();
		createStarsBurst();
	}, 5000);
}

// ===== TYPEWRITER POUR LA LETTRE =====

function animateLetter() {
	const letterTitle = document.getElementById('letter-title');
	const letterText = document.getElementById('letter-text');
	const letterSignature = document.getElementById('letter-signature');
	
	letterTitle.textContent = "Pour toi, Maman 💖";
	letterText.textContent = "Ce site est mon cadeau pour toi, créé avec tout mon amour et ma fierté.\nChaque photo, chaque animation, chaque détail a été pensé pour te montrer à quel point tu es spéciale.\nTu es notre lumière, notre force, notre inspiration.\nJoyeux anniversaire, Maman ! 🌟✨";
	letterSignature.textContent = "Avec tout mon amour, Fatou 💕";
}

// ===== EVENT LISTENERS =====

document.addEventListener('DOMContentLoaded', () => {
	// Audio control
	const audio = document.getElementById('bg-audio');
	const audioBtn = document.getElementById('audio-toggle');
	let playing = false;
	
	function updateAudioButton() {
		audioBtn.textContent = playing ? '⏸' : '▶';
	}
	
	audioBtn.addEventListener('click', async () => {
		if (!audio) return;
		try {
			if (audio.paused) {
				await audio.play();
				playing = true;
			} else {
				audio.pause();
				playing = false;
			}
		} catch (e) {
			playing = !audio.paused;
		}
		updateAudioButton();
	});
	
	// Essayer autoplay
	audio.play().then(() => {
		playing = true;
		updateAudioButton();
	}).catch(() => {});
	
	// Navigation buttons
	document.getElementById('btn-gallery').addEventListener('click', () => {
		showPage('gallery-page');
		launchConfetti();
	});
	
	document.getElementById('btn-letter').addEventListener('click', () => {
		showPage('letter-page');
		animateLetter();
		launchConfetti();
	});
	
	document.getElementById('btn-quiz').addEventListener('click', () => {
		showPage('quiz-page');
		launchConfetti();
	});
	
	// Gallery navigation
	document.getElementById('prev-photo').addEventListener('click', () => {
		showPhoto(currentPhotoIndex - 1);
	});
	
	document.getElementById('next-photo').addEventListener('click', () => {
		showPhoto(currentPhotoIndex + 1);
	});
	
	// Back buttons
	document.getElementById('gallery-back').addEventListener('click', () => {
		showPage('home-page');
	});
	
	document.getElementById('letter-back').addEventListener('click', () => {
		showPage('home-page');
		document.getElementById('envelope').classList.remove('open');
	});
	
	document.getElementById('quiz-back').addEventListener('click', () => {
		showPage('home-page');
	});
	
	// Clic sur l'enveloppe pour l'ouvrir
	document.getElementById('envelope').addEventListener('click', (e) => {
		if (!document.getElementById('envelope').classList.contains('open')) {
			document.getElementById('envelope').classList.add('open');
			createStarsBurst();
		}
	});
	
	// Start animations
	startIntroAnimation();
	
	// Interaction utilisateur pour autoplay audio
	document.addEventListener('click', () => {
		if (audio && audio.paused) {
			audio.play().then(() => {
				playing = true;
				updateAudioButton();
			}).catch(() => {});
		}
	}, { once: true });
});

// Event listener pour retourner la carte galerie au clic
document.addEventListener('DOMContentLoaded', () => {
	const flipCard = document.getElementById('flip-card');
	if (flipCard) {
		flipCard.addEventListener('click', () => {
			flipCard.style.perspective = '1200px';
		});
	}
});
