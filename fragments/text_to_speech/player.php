<div class="tts-player" data-tts="stop">
    <select id="tts-player-voice"></select>
    <select id="tts-player-rate">
        <option value="0.5">Langsamer</option>
        <option value="1" selected>Normal</option>
        <option value="1.2">Schneller</option>
    </select>
    <button id="tts-player-play"><i class="fas fa-play"></i></button>
    <button id="tts-player-stop" onclick="stop()"><i class="fas fa-stop"></i></button>
    <button id="tts-player-forward" onclick="forward()"><i class="fas fa-forward"></i></button>
    <button id="tts-player-backward" onclick="backward()"><i class="fas fa-backward"></i></button>
</div>
