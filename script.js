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
    {songName: "End of Begining",filePath: "Songs/endofbegin.mp3",coverPath:"Songimages/endofbegining.jpg"},
    {songName: "Lutt Le Gaya",filePath: "Songs/lutlegaya.mp3",coverPath:"Songimages/luttlegaya.jpg"},
    {songName: "Run down the city - (Monica)",filePath: "Songs/rundownthecity.mp3",coverPath:"Songimages/rundownthecity.jpg"},
    {songName: "Beedi Jalaile",filePath: "Songs/Beedi.mp3",coverPath:"Songimages/beedi.jpg"},
    {songName: "Bairan",filePath: "Songs/Bairan.mp3",coverPath:"Songimages/bairan.jpg"},
    {songName: "Zalima",filePath: "Songs/Zalima.mp3",coverPath:"Songimages/Zalima.jpg"},
    {songName: "Ure Geche-Lyrical",filePath: "Songs/Uregeche.mp3",coverPath:"Songimages/Uregeche.jpg"},
    {songName: "Ore Manwa Re",filePath: "Songs/oremanware.mp3",coverPath:"Songimages/oremanware.jpg"},
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
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;

    masterSongname.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterplay.src = "pause-solid.png";
    gif.style.opacity = 1;

    makeAllPlays();
    const currentBtn = document.getElementById(songIndex.toString());
    if (currentBtn) currentBtn.src = "pause-solid.png";
});

// ================= SEARCH FUNCTIONALITY =================
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    songitems.forEach((element) => {
        const songName = element.querySelector('.songName').innerText.toLowerCase();
        
        if (songName.includes(query)) {
            element.style.display = "flex"; // Show matching songs
        } else {
            element.style.display = "none"; // Hide non-matching songs
        }
    });
});


document.querySelectorAll('.btn-glass').forEach(button => {
    button.addEventListener('click', function () {
        const lang = this.textContent.trim(); // "Hindi", "English", or "Bengali"

        // Find the first song item whose songName has a class matching the language
        const firstMatch = document.querySelector(`.songName.${lang}`);

        if (firstMatch) {
            firstMatch.closest('.songItem').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

// ================= BACKGROUND PLAY / MEDIA SESSION =================
if ('mediaSession' in navigator) {
    const updateMediaSession = () => {
        const song = songs[songIndex];
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.songName,
            artist: 'Sound-Cloud',
            artwork: [{ src: song.coverPath, sizes: '512x512', type: 'image/jpg' }]
        });

        navigator.mediaSession.setActionHandler('play', () => {
            audioElement.play();
            masterplay.src = "pause-solid.png";
            gif.style.opacity = 1;
        });

        navigator.mediaSession.setActionHandler('pause', () => {
            audioElement.pause();
            masterplay.src = "play-solid.png";
            gif.style.opacity = 0;
        });

        navigator.mediaSession.setActionHandler('nexttrack', () => {
            document.querySelector('.next').click();
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            document.querySelector('.previous').click();
        });
    };

    audioElement.addEventListener('play', updateMediaSession);
}

// ================= WAKE LOCK (keep audio alive on mobile) =================
let wakeLock = null;

const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.log('Wake Lock not available:', err);
        }
    }
};

const releaseWakeLock = () => {
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
    }
};

audioElement.addEventListener('play', () => {
    requestWakeLock();
});

audioElement.addEventListener('pause', () => {
    releaseWakeLock();
});

// Re-acquire wake lock if page becomes visible again while playing
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && !audioElement.paused) {
        await requestWakeLock();
    }
});
