let songIndex = 0;
let audioElement = new Audio('3.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersong = document.getElementById('mastersong');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {song: "Maan Meri Jaan", filePath: "1.mp3", coverPath: "cover1.jpg"},
    {song: "Daku", filePath: "2.mp3", coverPath: "cover2.jpg"},
    {song: "Jaadugar", filePath: "3.mp3", coverPath: "cover3.jpg"},
    {song: "Alag Aasman", filePath: "4.mp3", coverPath: "cover4.jpg"},
    {song: "Jalebi Baby", filePath: "5.mp3", coverPath: "cover5.jpg"},
    {song: "Love Nwantiti", filePath: "6.mp3", coverPath: "cover6.jpg"},
    {song: "A Thousand Years", filePath: "7.mp3", coverPath: "cover7.jpg"},
    {song: "Excuses", filePath: "8.mp3", coverPath: "cover8.jpg"},
    {song: "3:59 AM", filePath: "9.mp3", coverPath: "cover9.jpg"},
    {song: "Machaayenge", filePath: "10.mp3", coverPath: "cover10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("song")[0].innerText = songs[i].song; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songIndex+1}.mp3`;
        mastersong.innerText = songs[songIndex].song;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    mastersong.innerText = songs[songIndex].song;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    mastersong.innerText = songs[songIndex].song;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})