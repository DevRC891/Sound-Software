console.log("Welcome to Spotify");
let songIndex=0;
let audioElement=new Audio('Songs/letmeloveyou.mp3');
let masterplay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongname=document.getElementById('masterSongname');
let songitems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Let Me Love You",filePath: "Songs/letmeloveyou.mp3",coverPath:"Songimages/Letmeloveyou.jpg"},
    {songName: "Memories",filePath: "Songs/memories.mp3",coverPath:"Songimages/memories.jpg"},
    {songName: "Shape of You",filePath: "Songs/shapeofyou.mp3",coverPath:"Songimages/shapeofyou.jpg"},
    {songName: "Perfect",filePath: "Songs/perfect.mp3",coverPath:"Songimages/perfect.jpg"},
    {songName: "Believer",filePath: "Songs/believer.mp3",coverPath:"Songimages/believer.jpg"},
    {songName: "Night Changes",filePath: "Songs/nightchanges.mp3",coverPath:"Songimages/nightchanges.jpg"},
    {songName: "Closer",filePath: "Songs/closer.mp3",coverPath:"Songimages/closer.jpg"},
    {songName: "A Thousand Years",filePath: "Songs/thousandyears.mp3",coverPath:"Songimages/thousandyears.jpg"},
]
songitems.forEach((element, i) => {
  const img = element.querySelector("img");
  if (img && songs[i]) {
    console.log(element,i);
    img.src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
  }
});

masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.src="pause-solid.png";
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterplay.src="play-solid.png";
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=((myProgressBar.value * audioElement.duration)/100);
})
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('play')).forEach((element) => {
    element.src = "play-solid.png";
  });
};

Array.from(document.getElementsByClassName('play')).forEach((element) => {
  element.addEventListener('click', (e) => {
    const btn = e.target;
    const index = parseInt(btn.id);

    
    if (songIndex === index && !audioElement.paused) {
      audioElement.pause();
      btn.src = "play-solid.png";
      masterplay.src = "play-solid.png";
      gif.style.opacity = 0;
      return;
    }

    
    makeAllPlays();
    songIndex = index;

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    btn.src = "pause-solid.png";
    masterplay.src = "pause-solid.png";
    gif.style.opacity = 1;

    
    if (typeof masterSongname !== "undefined") {
      masterSongname.innerText = songs[songIndex].songName;
    }
  });
});
document.querySelector('.next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;  
    masterSongname.innerText=songs[songIndex].songName;  
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterplay.src = "pause-solid.png";
    gif.style.opacity = 1;

    makeAllPlays();
    const currentBtn = document.getElementById(songIndex.toString());
    if (currentBtn) currentBtn.src = "pause-solid.png";
});
document.querySelector('.previous').addEventListener('click', () => {
    songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;  
    masterSongname.innerText=songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterplay.src = "pause-solid.png";
    gif.style.opacity = 1;
  

    makeAllPlays();
    const currentBtn = document.getElementById(songIndex.toString());
    if (currentBtn) currentBtn.src = "pause-solid.png";
});
