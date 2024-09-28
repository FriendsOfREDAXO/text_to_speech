let synth = window.speechSynthesis;
let utterance = null;
let currentSentenceIndex = 0;
let sentences = [];
let textElements = document.querySelectorAll('#text-container > div');
let voiceSelect = document.getElementById('voiceSelect');
let rateSelect = document.getElementById('rateSelect');
let togglePlayPauseButton = document.getElementById('togglePlayPause');
let selectedVoice = null;
let isPlaying = false;

function populateVoiceList() {
    let voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.filter(voice => voice.lang === 'de-DE' || voice.name.includes('Siri')).forEach((voice, index) => {
        let option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

function vorlesen() {
    if (synth.speaking) {
        synth.cancel();
    }
    sentences = Array.from(textElements).map(el => el.textContent);
    currentSentenceIndex = 0;
    let voices = synth.getVoices().filter(voice => voice.lang === 'de-DE' || voice.name.includes('Siri'));
    selectedVoice = voices[voiceSelect.value];
    sprechen();
}

function sprechen() {
    if (currentSentenceIndex < sentences.length) {
        if (utterance) {
            synth.cancel();
        }
        let sentence = sentences[currentSentenceIndex];
        utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = 'de-DE';
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.rate = parseFloat(rateSelect.value);

        highlightSentence(currentSentenceIndex);

        utterance.onend = function() {
            currentSentenceIndex++;
            sprechen();
        };
        synth.speak(utterance);
    } else {
        removeHighlight();
        togglePlayPauseIcon();
    }
}

function highlightSentence(index) {
    textElements.forEach((el, i) => {
        if (i === index) {
            el.classList.add('highlight-glow');
        } else {
            el.classList.remove('highlight-glow');
        }
    });
}

function removeHighlight() {
    textElements.forEach(el => el.classList.remove('highlight-glow'));
}

function togglePlayPause() {
    if (isPlaying) {
        pause();
    } else {
        vorlesen();
    }
    togglePlayPauseIcon();
}

function togglePlayPauseIcon() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        togglePlayPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        togglePlayPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function pause() {
    if (synth.speaking && !synth.paused) {
        synth.pause();
    } else if (synth.paused) {
        synth.resume();
    }
}

function stop() {
    synth.cancel();
    removeHighlight();
    isPlaying = false;
    togglePlayPauseIcon();
}

function vorspulen() {
    if (currentSentenceIndex < sentences.length - 1) {
        currentSentenceIndex++;
        sprechen();
    }
}

function zurückspulen() {
    if (currentSentenceIndex > 0) {
        currentSentenceIndex--;
        sprechen();
    }
}

togglePlayPauseButton.addEventListener('click', togglePlayPause);
