console.log("Welcome to Spotify");
let songIndex=0;
let audioElement=new Audio('Songs/letmeloveyou.mp3');
let masterplay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongname=document.getElementById('masterSongname');
let songitems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Let Me Love You",filePath: "Songs/letmeloveyou.mp3",coverPath:"Songimages/Letmeloveyou.jpg",lang:"English",mode:"relax"},
    {songName: "Memories",filePath: "Songs/memories.mp3",coverPath:"Songimages/memories.jpg",lang:"English",mode:"relax"},
    {songName: "Shape of You",filePath: "Songs/shapeofyou.mp3",coverPath:"Songimages/shapeofyou.jpg",lang:"English"},
    {songName: "Perfect",filePath: "Songs/perfect.mp3",coverPath:"Songimages/perfect.jpg",lang:"English",mode:"relax"},
    {songName: "Believer",filePath: "Songs/believer.mp3",coverPath:"Songimages/believer.jpg",lang:"English",mode:"workout"},
    {songName: "Night Changes",filePath: "Songs/nightchanges.mp3",coverPath:"Songimages/nightchanges.jpg",lang:"English",mode:"relax"},
    {songName: "Closer",filePath: "Songs/closer.mp3",coverPath:"Songimages/closer.jpg",lang:"English",mode:"relax"},
    {songName: "A Thousand Years",filePath: "Songs/thousandyears.mp3",coverPath:"Songimages/thousandyears.jpg",lang:"English"},
    {songName: "End of Begining",filePath: "Songs/endofbegin.mp3",coverPath:"Songimages/endofbegining.jpg",lang:"English"},
    {songName: "Lutt Le Gaya",filePath: "Songs/lutlegaya.mp3",coverPath:"Songimages/luttlegaya.jpg",lang:"Hindi",mode:"workout"},
    {songName: "Run down the city - (Monica)",filePath: "Songs/rundownthecity.mp3",coverPath:"Songimages/rundownthecity.jpg",lang:"Hindi",mode:"workout"},
    {songName: "Beedi Jalaile",filePath: "Songs/Beedi.mp3",coverPath:"Songimages/beedi.jpg",lang:"Hindi",mode:"workout"},
    {songName: "Bairan",filePath: "Songs/Bairan.mp3",coverPath:"Songimages/bairan.jpg",lang:"Hindi",mode:"relax"},
    {songName: "Mainu Ishq Tera Lae Dooba",filePath: "Songs/LaeDooba.mp3",coverPath:"Songimages/LaeDooba.jpg",lang:"Hindi",mode:"relax"},
    {songName: "Zalima",filePath: "Songs/Zalima.mp3",coverPath:"Songimages/Zalima.jpg",lang:"Hindi",mode:"relax"},
    {songName: "Ae Ajnabee",filePath: "Songs/Ae Ajnabee.mp3",coverPath:"Songimages/Ae Ajnabee.jpg",lang:"Hindi",mode:"relax"},
    {songName: "Har Har Gange",filePath: "Songs/Har Har Gange.mp3",coverPath:"Songimages/Har Har Gange.jpg",lang:"Hindi"},
    {songName: "Arz Kiya Hai",filePath: "Songs/Arz Kiya Hai.mp3",coverPath:"Songimages/Arz Kiya Hai.jpg",lang:"Hindi",mode:"relax"},
    {songName: "Deva Deva",filePath: "Songs/Deva Deva.mp3",coverPath:"Songimages/Deva Deva.jpg",lang:"Hindi"},
    {songName: "Aaoge Tum Kabhi",filePath: "Songs/Aaoge Tum Kabhi.mp3",coverPath:"Songimages/Aaoge Tum Kabhi.jpg",lang:"Hindi",mode:"relax"},
    {songName: "Hum Tere Pyar Mein",filePath: "Songs/Hum Tere Pyar Mein.mp3",coverPath:"Songimages/Hum Tere Pyar Mein.jpg",lang:"Hindi",mode:"relax"},
    {songName: "Mila To Marega",filePath: "Songs/Mila To Marega.mp3",coverPath:"Songimages/milatomarega.jpg",lang:"Hindi",mode:"workout"},
    {songName: "Zinda",filePath: "Songs/Zinda.mp3",coverPath:"Songimages/Zinda.jpg",lang:"Hindi",mode:"workout"},
    {songName: "Chak De India",filePath: "Songs/Chakde.mp3",coverPath:"Songimages/Chakde.jpg",lang:"Hindi",mode:"workout"},
    {songName: "Dangal",filePath: "Songs/Dangal.mp3",coverPath:"Songimages/Dangal.jpg",lang:"Hindi",mode:"workout"},
    {songName: "Sultan",filePath: "Songs/Sultan.mp3",coverPath:"Songimages/Sultan.jpg",lang:"Hindi",mode:"workout"},
    {songName: "Aasman Ko Chukar",filePath: "Songs/Aasman Ko Chukar.mp3",coverPath:"Songimages/Aasman Ko Chukar.jpg",lang:"Hindi",mode:"workout"},
]
let activeFilter = null; // can be 'Hindi', 'English', or 'workout'

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
// Helper to get next valid index based on active filter
function getNextIndex(from) {
    let next = (from + 1) % songs.length;
    if (activeFilter === "All" || activeFilter === null) {
        return next; // no filtering, just go to next song
    } else if (activeFilter === "Workout") {
        while (!songs[next].mode || songs[next].mode !== "workout") {
            next = (next + 1) % songs.length;
        }
    }else if (activeFilter === "Relax") {
        while (!songs[next].mode || songs[next].mode !== "relax") {
            next = (next + 1) % songs.length;
        }
    }
     else if (activeFilter === "Hindi" || activeFilter === "English") {
        const lang = songs[from].lang;
        while (songs[next].lang !== lang) {
            next = (next + 1) % songs.length;
        }
    }
    return next;
}

function getPrevIndex(from) {
    let prev = from <= 0 ? songs.length - 1 : from - 1;
    if (activeFilter === "All" || activeFilter === null) {
        return prev; // no filtering, just go to previous song
    } else if (activeFilter === "Workout") {
        while (!songs[prev].mode || songs[prev].mode !== "workout") {
            prev = prev <= 0 ? songs.length - 1 : prev - 1;
        }
    } else if (activeFilter === "Hindi" || activeFilter === "English") {
        const lang = songs[from].lang;
        while (songs[prev].lang !== lang) {
            prev = prev <= 0 ? songs.length - 1 : prev - 1;
        }
    }
    return prev;
}

document.querySelector('.next').addEventListener('click', () => {
    songIndex = getNextIndex(songIndex);
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.src = "pause-solid.png";
    gif.style.opacity = 1;
    makeAllPlays();
    const btn = document.getElementById(songIndex.toString());
    if (btn) btn.src = "pause-solid.png";
});

document.querySelector('.previous').addEventListener('click', () => {
    songIndex = getPrevIndex(songIndex);
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.src = "pause-solid.png";
    gif.style.opacity = 1;
    makeAllPlays();
    const btn = document.getElementById(songIndex.toString());
    if (btn) btn.src = "pause-solid.png";
});
audioElement.addEventListener('ended', () => {
    songIndex = getNextIndex(songIndex);
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.src = "pause-solid.png";
    gif.style.opacity = 1;
    makeAllPlays();
    const btn = document.getElementById(songIndex.toString());
    if (btn) btn.src = "pause-solid.png";
});

// ================= SEARCH FUNCTIONALITY =================
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    songitems.forEach((el, i) => {
        const song = songs[i];
        const songName = el.querySelector('.songName').innerText.toLowerCase();

        // Check if song matches the active filter
        let filterMatch;
        if (activeFilter === null || activeFilter === "All") filterMatch = true;
        else if (activeFilter === "Workout") filterMatch = song.mode === "workout";
        else if (activeFilter === "Relax") filterMatch = song.mode === "relax";
        else filterMatch = song.lang === activeFilter;

        // Check if song matches the search query
        const searchMatch = songName.includes(query);

        // Show only if BOTH conditions are true
        el.style.display = (filterMatch && searchMatch) ? "flex" : "none";
    });
});


document.querySelectorAll('.btn-glass').forEach(button => {
    button.addEventListener('click', function () {
        const label = this.textContent.trim();

        // Toggle off if already active (except All — All doesn't toggle off)
        if (activeFilter === label && label !== "All") {
            activeFilter = null;
            document.querySelectorAll('.btn-glass').forEach(b => b.classList.remove('active'));
            songitems.forEach(el => el.style.display = "flex");
            return;
        }

        activeFilter = label;
        document.querySelectorAll('.btn-glass').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filter visible songs
        songitems.forEach((el, i) => {
            const song = songs[i];
            let matches;
            if (label === "All")         matches = true;
            else if (label === "Workout") matches = song.mode === "workout";
            else if (label === "Relax")   matches = song.mode === "relax";
            else                          matches = song.lang === label;
            el.style.display = matches ? "flex" : "none";
        });

        // Auto-play first song in this filter
        const firstIndex = songs.findIndex(s => {
            if (label === "All")         return true;
            if (label === "Workout")     return s.mode === "workout";
            if (label === "Relax")       return s.mode === "relax";
            return s.lang === label;
        });
        if (firstIndex !== -1) {
            songIndex = firstIndex;
            masterSongname.innerText = songs[songIndex].songName;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterplay.src = "pause-solid.png";
            gif.style.opacity = 1;
            makeAllPlays();
            const btn = document.getElementById(songIndex.toString());
            if (btn) btn.src = "pause-solid.png";
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


    const singers = [
      { name: "Shreya Ghoshal",   src: "Singers/Shreya Ghosal.jpg", bg: "#2a1a3a" },
      { name: "Jonita Gandhi",    src: "Singers/Jonita Gandhi.jpg", bg: "#12283a" },
      { name: "Arijit Singh",     src: "Singers/Arijit SIngh.jpg", bg: "#2a1610" },
      { name: "Diljit Dosanjh",      src: "Singers/Diljit Dosanjh.jpg", bg: "#3a1028" },
      { name: "Ed Sherran",       src: "Singers/Edsherran.jpg", bg: "#102a18" },
      { name: "Karan Aujla",  src: "Singers/Karan aujla.jpg",bg: "#2a2010" },
      { name: "Kumar Sanu",       src: "Singers/Kumar Sanu.jpg", bg: "#101e2a" },
      { name: "Sunidhi Chauhan",  src: "Singers/Sunidhi Chauhan.jpg",bg: "#2a103a" },
      { name: "A.R. Rahman",      src: "Singers/A.R. Rahman.jpg",bg: "#0a2028" },
      { name: "Udit Narayan",     src: "Singers/udit narayan.jpg",bg: "#281a0a" },
    ];

    const track = document.getElementById('track');

    function getInitials(name) {
      return name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
    }

    function makeCard(s, idx) {
      const wrap  = document.createElement('div');
      wrap.className = 'card-wrap';

      const inner = document.createElement('div');
      inner.className = 'card-inner';
      inner.style.animationDelay = `${-(idx * 0.42 % 4).toFixed(2)}s`;

      /* Image */
      const img = document.createElement('img');
      img.alt = s.name;
      img.loading = 'lazy';
      img.src = s.src;
      img.onerror = function () {
        this.remove();
        const ph = document.createElement('div');
        ph.className = 'card-placeholder';
        ph.style.background = s.bg;
        const init = document.createElement('div');
        init.className = 'ph-initials';
        init.textContent = getInitials(s.name);
        ph.appendChild(init);
        inner.insertBefore(ph, inner.firstChild);
      };

      /* Shine */
      const shine = document.createElement('div');
      shine.className = 'card-shine';

      /* Label */
      const label = document.createElement('div');
      label.className = 'card-label';
      const nameEl = document.createElement('span');
      nameEl.className = 'card-name';
      nameEl.textContent = s.name;
      const genreEl = document.createElement('span');
      genreEl.className = 'card-genre';
      genreEl.textContent = s.genre;
      label.append(nameEl, genreEl);

      /* Edge */
      const edge = document.createElement('div');
      edge.className = 'card-edge';

      inner.append(img, shine, label, edge);
      wrap.appendChild(inner);
      return wrap;
    }

    /* Duplicate list for seamless infinite loop */
    singers.forEach((s, i) => track.appendChild(makeCard(s, i)));
    singers.forEach((s, i) => track.appendChild(makeCard(s, i + singers.length)));
