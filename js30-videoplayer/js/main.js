console.log("70/60\nсделал так, как нравится самому(что разрешено), потому вижу видеоплеер по другому и с большим функционалом, чем в демо, поэтому наши мнения могу расходиться \nне могу судить свое оформление, но сверх задания добавлены, fullscreen, tooltip для просмотра времени в выбранной точке на прогрессе, скорость воспроизведения, отображение процента громкости, отображение всей длительности видео и текущее время видео, смена иконок звука в 4 разных уровнях громкости, смена иконок фулскрин поэтому здесь +10")

const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.player__progress')
const progressBar = player.querySelector('.player__progress-bar')
const controls = player.querySelector('.player__controls')
const playPauseButton = player.querySelector('.player__controls-play-pause')
const stopButton = player.querySelector('.player__controls-stop')
const muteButton = player.querySelector('.player__controls-mute')
const volumeRange = player.querySelector('.player__controls-volume')
const playbackRateRange = player.querySelector('.player__controls-playback-rate')
const time = player.querySelector('.player__time')
const volumePercent = player.querySelector('.player__controls-volume-percent')
const speedRate = player.querySelector('.player__controls-playback-speed')
const fullTime = player.querySelector('.player__fulltime')
const progressTime = player.querySelector('.player__progress-time')
const vol1 = player.querySelector('.player__controls-sound-icon-low')
const vol2 = player.querySelector('.player__controls-sound-icon-mid')
const vol3 = player.querySelector('.player__controls-sound-icon-full')
const volMute = player.querySelector('.player__controls-sound-icon-mute')
const playbackProgress = player.querySelector('.player__playback-progres')
const volumeProgress =player.querySelector('.player__volume-progress')
const mainPlayButton = player.querySelector('.player__video-button')
const fullscreenButton = player.querySelector('.player__controls-fullscreen')
const videoWrapper = player.querySelector('.player__video-wrapper')
const fullscreenExit = player.querySelector('.player__controls-exit-fullscreen')

const toggleFullScreen = () => { 
    if (document.fullscreenElement) {
        document.exitFullscreen();
        fullscreenExit.classList.remove("isFull")
    } else {
        videoWrapper.requestFullscreen();
        fullscreenExit.classList.add("isFull")
    }
}

const mainPlay = () => { 
    video.play()
    mainPlayButton.classList.remove('is-play')
    playPauseButton.classList.toggle('switch')
}

const playPause = () =>{ 
    video.paused ? (video.play(), mainPlayButton.classList.remove('is-play') ): (video.pause(), mainPlayButton.classList.add('is-play'))
    playPauseButton.classList.toggle('switch')
    
}

const stopVideo = () => {
    video.currentTime = 0
    video.pause()
    mainPlayButton.classList.add('is-play')
    if (playPauseButton.classList.contains('switch') === true) { 
        playPauseButton.classList.toggle('switch')
    }
}

const progressUpdate  = () =>{ 
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.width = `${percent}%`
    let minutes = Math.floor(video.currentTime / 60)
    minutes < 10 ? minutes = '0' + minutes.toString() : minutes
    let seconds = Math.floor(video.currentTime % 60)
    seconds < 10 ? seconds = '0' + seconds.toString() : seconds 
    time.textContent = `${minutes}:${seconds} /`
}

const muteSound = () => {
    video.muted = !video.muted   
    if( video.muted === true){ 
        vol1.classList.remove('sound-active')
        vol2.classList.remove('sound-active')
        vol3.classList.remove('sound-active')
        volMute.classList.add('sound-active')
    }
    if ( video.muted === false){ 
        volMute.classList.remove('sound-active')
        setVolume()
    }
}

const setVolume = () => { 
    if(video.muted === true) video.muted = !video.muted 
    video.volume = volumeRange.value
    volumePercent.textContent = (parseInt(volumeRange.value * 100)).toString() + '%'
    volumeProgress.style.width =  (parseInt(volumeRange.value * 100)).toString() + '%'
    if(volumeRange.value > 0.65){
        vol3.classList.add('sound-active')
        vol2.classList.remove('sound-active')
        vol1.classList.remove('sound-active')
        volMute.classList.remove('sound-active')
    }
    if(volumeRange.value > 0.30 && volumeRange.value < 0.65){
        vol2.classList.add('sound-active')
        vol3.classList.remove('sound-active')
        vol1.classList.remove('sound-active')
        volMute.classList.remove('sound-active')
    }
    if(volumeRange.value >= 0.01 && volumeRange.value < 0.30){
        vol1.classList.add('sound-active')
        vol2.classList.remove('sound-active')
        vol3.classList.remove('sound-active')
        volMute.classList.remove('sound-active')
    }
    if(volumeRange.value == 0){
        vol1.classList.remove('sound-active')
        vol2.classList.remove('sound-active')
        vol3.classList.remove('sound-active')
        volMute.classList.add('sound-active')
    }
}



const setPlaybackRate = () => { 
    video.playbackRate = playbackRateRange.value
    speedRate.textContent = 'Speed: ' + playbackRateRange.value.toString()
    playbackProgress.style.width = (parseInt(playbackRateRange.value /0.25 * 8.8)).toString() + '%'
     
}
const timeOfVideo = () => { 
    let minutes = Math.floor(video.duration / 60)
    minutes < 10 ? minutes = '0' + minutes.toString() : minutes
    let seconds = Math.floor(video.duration % 60)
    seconds < 10 ? seconds = '0' + seconds.toString() : seconds 
    fullTime.textContent =` ${minutes}:${seconds}`
}

const skipAhead =(e) => { 
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

const skipTo = (e) => { 
    const timeOf = (e.offsetX / progress.offsetWidth) * video.duration
    let minutes = Math.floor(timeOf / 60).toString()
    minutes < 10 ? minutes = '0' + minutes : minutes
    let seconds = Math.floor(timeOf % 60).toString()
    seconds < 10 ? seconds = '0' + seconds : seconds 
    progressTime.textContent = `${minutes}:${seconds}`
    const x = e.offsetX
    progressTime.style.left = `${x}px`

}

const focusOut = () => { 
    progressTime.style.left = '-2000px'
}

video.addEventListener('loadedmetadata', timeOfVideo);
video.addEventListener('click', playPause)
video.addEventListener('timeupdate', progressUpdate)
playPauseButton.addEventListener('click', playPause)
stopButton.addEventListener('click', stopVideo)
muteButton.addEventListener('click', muteSound)
volumeRange.addEventListener('input' , setVolume)
playbackRateRange.addEventListener('input', setPlaybackRate)
progress.addEventListener('click' , skipAhead)
progress.addEventListener('mousemove', skipTo)
progress.addEventListener('mouseout', focusOut)
mainPlayButton.addEventListener('click', mainPlay)
fullscreenButton.addEventListener('click' , toggleFullScreen)
fullscreenExit.addEventListener('click', toggleFullScreen)