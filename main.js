import boom from "./sounds/boom.wav";
import clap from "./sounds/clap.wav";
import hi_hat from "./sounds/hi_hat.wav";
import kick from "./sounds/kick.wav";
import open_hat from "./sounds/open_hat.wav";
import ride from "./sounds/ride.wav";
import snare from "./sounds/snare.wav";
import tink from "./sounds/tink.wav";
import tom from "./sounds/tom.wav";

let app_mode = "";
let start_time = 0;

function calculateInterval(timePress) {
  return timePress - start_time;
}

const start_game_btn = document.getElementById("start_game");
const record_btn = document.getElementById("record");
const playback_btn = document.getElementById("playback");
const settings_btn = document.getElementById("settings");

start_game_btn.addEventListener("click", () => {
  if (app_mode === "game") {
    start_game_btn.textContent = "Start Game";
    app_mode = "";
  } else {
    start_game_btn.textContent = "End Game";
    record_btn.textContent = "Record";
    playback_btn.textContent = "Playback";
    app_mode = "game";
  }
});

let record_array = [];
let playback_array = [];

record_btn.addEventListener("click", () => {
  if (app_mode === "record") {
    record_btn.textContent = "Record";
    app_mode = "";
    playback_array = [...record_array];
    record_array = [];
    console.log("end of recording");
    console.log("playback array: ", playback_array);
  } else {
    record_btn.textContent = "End Record";
    start_game_btn.textContent = "Start Game";
    app_mode = "record";

    start_time = new Date().getTime();
  }
});

playback_btn.addEventListener("click", () => {
  if (app_mode === "playback") {
    record_btn.textContent = "Record";
    playback_btn.textContent = "Playback";
    start_game_btn.textContent = "Start Game";
    app_mode = "";
  } else {
    playback_btn.textContent = "End Playback";
    record_btn.textContent = "Record";
    start_game_btn.textContent = "Start Game";
    app_mode = "playback";

    key_config.forEach((l) => {
      // If playback exists
      if (playback_array.length != 0) {
        for (let i = 0; i < playback_array.length; i++) {
          setTimeout(function () {
            if (playback_array[i].key === l.key) {
              document.getElementById(l.id).click();
            }
          }, playback_array[i].interval);
        }
      }
    });
  }
});

settings_btn.addEventListener("click", () => {
  if (app_mode === "settings") {
    app_mode = "";
    // Enable all buttons except settings
    start_game_btn.disabled = false;
    record_btn.disabled = false;
    playback_btn.disabled = false;

    settings_btn.textContent = "Settings";
    document.getElementById("setting-text").style.display = "none";

    // Unhide all elements inside class main-container
    var divsToHide = document.getElementsByClassName("main-container");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "block";
    }

    // Remove all elements inside class main-container
    var elements = document.getElementsByClassName("set");

    while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  } else {
    app_mode = "settings";
    settings_btn.textContent = "Close Settings";

    // Disable all buttons except settings
    start_game_btn.disabled = true;
    record_btn.disabled = true;
    playback_btn.disabled = true;

    // Hide all elements inside class main-container
    var divsToHide = document.getElementsByClassName("main-container");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "none";
    }

    // Add text "Settings"
    const text = document.getElementById("setting-text");
    const parent = document.getElementById("settings-container");

    // <div class="settings-c" id="settings-container">
    //   <h2>Settings</h2>
    //   <div id="boom" class="card control">
    //     <div class="label container">Boom</div>
    //     <div class="key container">A</div>
    //   </div
    // </div>

    text.style.display = "block";

    key_config.forEach((k) => {
      const control_div = document.createElement("div");
      control_div.setAttribute("id", k.id);
      control_div.setAttribute("class", "card control");

      const control_label = document.createElement("div");
      control_label.setAttribute("class", "label container");
      control_label.textContent = k.key;

      const control_key = document.createElement("div");
      control_key.setAttribute("class", "key container");
      control_key.textContent = k.id;

      control_div.appendChild(control_label);
      control_div.appendChild(control_key);
      parent.appendChild(control_div);
    });

    // if key is click, allow editing
    // control_key.addEventListener("click", () => {});
  }
});

let key_config = [
  { id: "boom", key: "a", sound: boom },
  { id: "clap", key: "s", sound: clap },
  { id: "hi_hat", key: "d", sound: hi_hat },
  { id: "kick", key: "f", sound: kick },
  { id: "open_hat", key: "g", sound: open_hat },
  { id: "ride", key: "h", sound: ride },
  { id: "snare", key: "j", sound: snare },
  { id: "tim", key: "k", sound: tink },
  { id: "tom", key: "l", sound: tom },
];

const beats = ["f", "d", "f", "d", "f", "f", "d"];
const padding_count = 3;
const empty_array = Array(padding_count).fill("");

// <div class="card sequence-card">A</div>

const targets = document.getElementById("targets");
let new_array = [...empty_array, ...beats, ...empty_array];

// Game Mode
let current_index = 0;
let score = 0;

const getActualPosition = () => current_index + padding_count;

const score_element = document.getElementById("score");
const updateTargets = () => {
  targets.innerHTML = "";
  const computed_array = new_array.slice(
    current_index,
    current_index + padding_count + 4
  );
  computed_array.forEach((item, index) => {
    const target_div = document.createElement("div");
    target_div.setAttribute(
      "class",
      `card sequence-card ${index === 3 ? "active" : ""}`
    );
    target_div.textContent = item;
    targets.appendChild(target_div);
  });
  score_element.textContent = score;
};

updateTargets();

//     <div id="boom" class="card control">
//       <div class="label container">Boom</div>
//       <div class="key container">A</div>
//     </div
const parent = document.getElementById("controls");

key_config.forEach((k) => {
  const control_div = document.createElement("div");
  control_div.setAttribute("id", k.id);
  control_div.setAttribute("class", "card control");

  const control_label = document.createElement("div");
  control_label.setAttribute("class", "label container");
  control_label.textContent = k.key;

  const control_key = document.createElement("div");
  control_key.setAttribute("class", "key container");
  control_key.textContent = k.id;

  control_div.appendChild(control_label);
  control_div.appendChild(control_key);
  parent.appendChild(control_div);

  control_div.addEventListener("click", (e) => {
    const audio = new Audio(k.sound);
    audio.play();
    console.log(k.key);

    // If user key matches current target key, then we increment
    if (app_mode === "game" && new_array[getActualPosition()] === e.key) {
      current_index++;
      score++;
    }

    if (getActualPosition() >= new_array.length - padding_count - 1) {
      //   alert("You won the game");
    }

    control_div.style.transform = "scale(1.2)";
    setTimeout(() => {
      control_div.style.transform = "scale(1)";
    }, 200);

    updateTargets();

    if (app_mode === "record") {
      let currentTime = new Date().getTime();
      let time = calculateInterval(currentTime);

      let record_object = {
        time: currentTime,
        key: k.key,
        interval: time,
      };

      record_array.push(record_object);
      console.log(record_array);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === k.key) {
      const audio = new Audio(k.sound);
      audio.play();

      // If user key matches current target key, then we increment
      if (app_mode === "game" && new_array[getActualPosition()] === e.key) {
        current_index++;
        score++;
      }

      if (getActualPosition() >= new_array.length - padding_count - 1) {
        //   alert("You won the game");
      }

      control_div.style.transform = "scale(1.2)";
      setTimeout(() => {
        control_div.style.transform = "scale(1)";
      }, 200);

      updateTargets();

      if (app_mode === "record") {
        let currentTime = new Date().getTime();
        let time = calculateInterval(currentTime);
        let record_object = {
          time: currentTime,
          key: e.key.toLowerCase(),
          interval: time,
        };

        record_array.push(record_object);
        console.log(record_array);
      }
    }
  });
});
