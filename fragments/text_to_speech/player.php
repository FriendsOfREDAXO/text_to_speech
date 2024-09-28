<div class="widget">
    <select id="voiceSelect"></select>
    <select id="rateSelect">
        <option value="0.5">Langsamer</option>
        <option value="1" selected>Normal</option>
        <option value="1.2">Schneller</option>
    </select>
    <button id="togglePlayPause"><i class="fas fa-play"></i></button>
    <button onclick="stop()"><i class="fas fa-stop"></i></button>
    <button onclick="vorspulen()"><i class="fas fa-forward"></i></button>
    <button onclick="zurückspulen()"><i class="fas fa-backward"></i></button>
</div>
