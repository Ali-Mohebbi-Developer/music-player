const allMusics = [
  {
    name: "Dreamy Vibes",
    des: "Chill beats for relaxing and dreaming",
    img: "img/1.jpeg",
    src: "audio/1.mp3",
    duration: "03:07",
  },
  {
    name: "Midnight Study",
    des: "Perfect tunes for late-night study sessions",
    img: "img/2.jpg",
    src: "audio/2.mp3",
    duration: "03:32",
  },
  {
    name: "Lazy Sunday",
    des: "Soft melodies to accompany a lazy Sunday afternoon",
    img: "img/3.jpg",
    src: "audio/3.mp3",
    duration: "03:17",
  },
  {
    name: "Morning Coffee",
    des: "Start your day with calming coffeehouse sounds",
    img: "img/4.jpg",
    src: "audio/4.mp3",
    duration: "02:49",
  },
  {
    name: "Rainy Day",
    des: "Cozy beats to enjoy with the sound of rain",
    img: "img/5.jpg",
    src: "audio/5.mp3",
    duration: "04:15",
  },
  {
    name: "City Lights",
    des: "Urban beats for a night out in the city",
    img: "img/6.jpg",
    src: "audio/6.mp3",
    duration: "07:21",
  },
  {
    name: "Quiet Moments",
    des: "Serene tracks for moments of peace and reflection",
    img: "img/7.jpeg",
    src: "audio/7.mp3",
    duration: "02:48",
  },
  {
    name: "Forest Walk",
    des: "Nature-inspired sounds for a walk in the woods",
    img: "img/8.jpeg",
    src: "audio/8.mp3",
    duration: "04:24",
  },
  {
    name: "Sunset Chill",
    des: "Relaxing tunes for watching the sun go down",
    img: "img/9.jpeg",
    src: "audio/9.mp3",
    duration: "03:02",
  },
  {
    name: "Ocean Breeze",
    des: "Calm and soothing sounds inspired by the sea",
    img: "img/10.jpg",
    src: "audio/10.mp3",
    duration: "03:49",
  },
  {
    name: "Moonlit Night",
    des: "Gentle beats for a serene night under the stars",
    img: "img/11.jpg",
    src: "audio/11.mp3",
    duration: "03:55",
  },
  {
    name: "Autumn Leaves",
    des: "Warm and cozy tunes for the autumn season",
    img: "img/12.jpg",
    src: "audio/12.mp3",
    duration: "02:27",
  },
  {
    name: "Zen Garden",
    des: "Peaceful sounds for meditation and relaxation",
    img: "img/13.jpg",
    src: "audio/13.mp3",
    duration: "02:27",
  },
  {
    name: "Cozy Cabin",
    des: "Intimate beats for a cozy cabin retreat",
    img: "img/14.jpg",
    src: "audio/14.mp3",
    duration: "04:22",
  },
  {
    name: "Starlight Dreams",
    des: "Dreamy melodies for starry nights",
    img: "img/15.jpg",
    src: "audio/15.mp3",
    duration: "05:06",
  },
  {
    name: "Whispering Pines",
    des: "Nature-inspired tunes for a calm evening",
    img: "img/16.jpeg",
    src: "audio/16.mp3",
    duration: "02:27",
  },
  {
    name: "Mellow Beats",
    des: "Smooth and mellow tracks for any time of the day",
    img: "img/17.jpeg",
    src: "audio/17.mp3",
    duration: "02:24",
  },
  {
    name: "Vintage Vibes",
    des: "Retro-inspired beats for a nostalgic feel",
    img: "img/18.jpeg",
    src: "audio/18.mp3",
    duration: "05:55",
  },
  {
    name: "Serenity Now",
    des: "Find your calm with these serene tracks",
    img: "img/19.jpeg",
    src: "audio/19.mp3",
    duration: "02:24",
  },
  {
    name: "Flow State",
    des: "Beats to help you get in the zone and stay productive",
    img: "img/20.jpeg",
    src: "audio/20.mp3",
    duration: "05:05",
  },
];

const playList = document.getElementById("playList");
const pic = document.getElementById("pic");
const nextPlay = document.getElementById("next");
const prevPlay = document.getElementById("prev");
const left = document.getElementById("left");
const right = document.getElementById("right");
const pause = document.getElementById("pause");

let audio = null;
let currentTrackIndex = 0;

const duration = document.getElementById("maxDuration");
const progressBar = document.getElementById("progress-bar");

allMusics.forEach((item, index) => {
  playList.innerHTML += `
    <li class="music group w-full flex justify-between items-center hover:bg-[#333] px-5 py-3 rounded-md hover:cursor-pointer duration-300 border-b border-[#242424] ">
      <div class="flex items-center pointer-events-none">
        <span class="text-white group-hover:text-[#fbcb07] mr-10 ">${
          index + 1
        }</span>
        <div class="titles flex flex-col">
          <p class="text-white group-hover:text-[#fbcb07] ">${item.name}</p>
          <p class="text-gray-500 ">${item.des}</p>
        </div>
      </div>
      <div class="pointer-events-none">
        <span class="text-white group-hover:text-[#fbcb07] ">${
          item.duration
        }</span>
        <span class="ml-5"><i class="bi bi-download text-white"></i></span>
      </div>
    </li>`;
});

function loadTrack(index) {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  const previousActive = playList.querySelector(".active");
  if (previousActive) {
    previousActive.classList.remove("active");
    previousActive.querySelector("span").classList.remove("text-[#fbcb07]");
    previousActive.querySelector("p").classList.remove("text-[#fbcb07]");
  }

  const currentActive = playList.children[index];
  currentActive.classList.add("active");
  currentActive.querySelector("span").classList.add("text-[#fbcb07]");
  currentActive.querySelector("p").classList.add("text-[#fbcb07]");

  audio = new Audio(allMusics[index].src);
  audio.play();
  pic.src = allMusics[index].img;
  pic.classList.add("rotate-infinite");

  document.querySelector("#title").children[0].textContent =
    allMusics[index].name;
  document.querySelector("#title").children[1].textContent =
    allMusics[index].des;

  audio.addEventListener("loadedmetadata", () => {
    const durationInSeconds = audio.duration;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    duration.innerHTML = formattedDuration;
  });

  audio.addEventListener("timeupdate", updateProgress);

  audio.addEventListener("ended", nextTrack);
}

function playPause() {
  if (audio.paused) {
    audio.play();
    pause.innerHTML = '<i class="bi bi-pause-fill"></i>';
  } else {
    audio.pause();
    pause.innerHTML = '<i class="bi bi-play-fill"></i>';
  }
}

function seek(seconds) {
  if (audio) {
    audio.currentTime = Math.max(
      0,
      Math.min(audio.duration, audio.currentTime + seconds)
    );
  }
}

function seekTo(event) {
  const progressArea = document.getElementById("progress-area");
  const offsetX = event.clientX - progressArea.getBoundingClientRect().left;
  const newProgressWidth = (offsetX / progressArea.offsetWidth) * 100;
  progressBar.style.width = `${newProgressWidth}%`;

  if (audio) {
    audio.currentTime = (newProgressWidth / 100) * audio.duration;
  }
}

function updateProgress() {
  if (audio) {
    const { duration, currentTime } = audio;
    const progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    document.getElementById("currentTime").textContent = `${currentMinutes}:${
      currentSeconds < 10 ? "0" : ""
    }${currentSeconds}`;
  }
}

function prevTrack() {
  currentTrackIndex =
    (currentTrackIndex - 1 + allMusics.length) % allMusics.length;
  loadTrack(currentTrackIndex);
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % allMusics.length;
  loadTrack(currentTrackIndex);
}

left.addEventListener("click", () => seek(-10));
right.addEventListener("click", () => seek(10));
prevPlay.addEventListener("click", prevTrack);
nextPlay.addEventListener("click", nextTrack);
pause.addEventListener("click", playPause);
document.getElementById("progress-area").addEventListener("click", seekTo);

playList.addEventListener("click", (e) => {
  const index = [...playList.children].indexOf(e.target.closest(".music"));
  if (index !== -1) {
    currentTrackIndex = index;
    loadTrack(index);
  }
});
