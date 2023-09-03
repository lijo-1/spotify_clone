let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let recent_volume = document.querySelector('#volume');
let slider = document.querySelector('#duration_slider');
let title = document.querySelector("#song-name a");
let artist = document.querySelector("#artist a");
let track_image = document.querySelector(".pro-img");


let timer;
let index_no=0;
let songplaying = "false";

const track = document.createElement('audio');

let songlist = [{
        name: "Kodiyile Malliyapoo",
        artist: "P. Jayachandran,S. Janaki",
        path: "songs/Kodiyile-Malliyapoo-MassTamilan.com.mp3",
        img: "icons and images/kodiyile.jpg"
    },
    {
        name: "Unnanenachu",
        artist: "Illayaraja,Sid Sriram",
        path: "songs/Unna-Nenachu-MassTamilan.io (1).mp3",
        img: "icons and images/unnanenachu.jpg"
    },
    {
        name: "Raja Raja Chozhan",
        artist: "K. J. Yesudas",
        path: "songs/Raja-Raja-Chozan-Naan-MassTamilan.com.mp3",
        img: "icons and images/rajaraja.jpg"
    },
    {
        name: "Poove Sem Poove - Male",
        artist: "K. J. Yesudas",
        path: "songs/Poove Sempoove.mp3",
        img: "icons and images/poove.jpg"
    },
    {
        name: "Valaiyosai",
        artist: "Illayaraja,S. P. Balasubrahmanyam,Lata Mangeshka",
        path: "songs/Valai-Osai-MassTamilan.com.mp3",
        img: "icons and images/valaiyosai.jpg"
    },
    {
        name: "Nenjukkule",
        artist: "A.R.Rahman,Shakthishree Gopalan",
        path: "songs/Nenjukkule.mp3",
        img: "icons and images/nenjukule.jpg"
    },
    {
        name: "Mazhai Kuruvi",
        artist: "A.R.Rahman",
        path: "songs/Mazhai-Kuruvi-MassTamilan.com.mp3",
        img: "icons and images/mazhai kuruvi.jpg"
    },
    {
        name: "Enna Solla Pogirai",
        artist: "A.R.Rahman,Shankar Mahadevan",
        path: "songs/Enna-Solla-Pogirai.mp3",
        img: "icons and images/enna solla.jpg"
    },
    {
        name: "Kurukku Siruthvalea",
        artist: "Hariharan,Mahalakshmi Iyer",
        path: "songs/Kurukku-Siruthavale.mp3",
        img: "icons and images/kurukku.jpg"
    },
    {
        name: "Kaattrae En Vaasal - Wind",
        artist: "Unnikrishnan,Kavita Krishnamurthy",
        path: "songs/Kaattrae-En-Vaasal.mp3",
        img: "icons and images/kaatre.jpg"
    }
];


function loadtrack(ind_no) {
    index_no=ind_no;  //update global index_no
    clearInterval(timer);
    reset_slider();
    track.src = songlist[ind_no].path;
    track_image.src = songlist[ind_no].img;
    title.innerHTML = songlist[ind_no].name;
    artist.innerHTML = songlist[ind_no].artist;
    track.load();

    timer = setInterval(range_slider, 1000);
}


let clicktochange = document.querySelectorAll(".sng-name");
// clicktochange.forEach(change => {
//     change.addEventListener('click', e => {
//         e.target.classList.toggle('sng-click-name');
//     });
// });

let initialsong = document.querySelector('#initial');

function initial() {
    initialsong.classList.add('sng-click-name');
}

function playing() {
    track.play();
    console.log(index_no);
    songplaying = "true";
    document.querySelector("#play").src = "icons and images/Pause.png";

    clicktochange.forEach(change => {
        change.classList.remove('sng-click-name');
    });

    clicktochange.forEach(change => {
        console.log(change.innerHTML);

        if(change.innerHTML==songlist[index_no].name){
            change.classList.add('sng-click-name');
        }
    });
}

function pause() {
    track.pause();
    songplaying = "false";
    document.querySelector("#play").src = "icons and images/Group 1.png";

}

function justplay() {
    if (songplaying == "false") {
        playing();
    } else {
        pause();
    }

}

function previous_song() {
    if(index_no>=0 && index_no<=4){
        if (index_no > 0) {
            index_no -= 1;
            loadtrack(index_no);
            playing();
        } else {
            index_no = 4;
            loadtrack(index_no);
            playing();
        }
    }

    if(index_no>=5 && index_no<=9){
        if (index_no > 5) {
            index_no -= 1;
            loadtrack(index_no);
            playing();
        } else {
            index_no = 9;
            loadtrack(index_no);
            playing();
        }
    }
    

}

function next_song() {
    if(index_no>=0 && index_no<=4){
        if (index_no < 4) {
            index_no += 1;
            loadtrack(index_no);
            playing();
        } else {
            index_no = 0;
            loadtrack(index_no);
            playing();
        }
    }

    if(index_no>=5 && index_no<=9){
        if (index_no < 9) {
            index_no += 1;
            loadtrack(index_no);
            playing();
        } else {
            index_no = 5;
            loadtrack(index_no);
            playing();
        }
    }
    

}

function range_slider() {
    let pos = 0;
    let updatetimer;
    let duration;


    if (!isNaN(track.duration)) {
        pos = track.currentTime * (100 / track.duration);
        slider.value = pos;

        // lhs timer 
        updatetimer = (track.currentTime / 100).toFixed(2);
        updatetimer = updatetimer.replace(".", ":");
        document.querySelector(".start").innerText = updatetimer;

        // rhs timer
        duration = (track.duration / 100).toFixed(2);
        duration = duration.replace(".", ":");
        document.querySelector(".end").innerText = duration;
    }

    if (track.ended) {
        document.querySelector("#play").src = "icons and images/Group 1.png";
    }
}

function volume_change() {
    track.volume = recent_volume.value / 100;
}

function mute_sound() {
    track.volume = 0;
    volume.value = 0;
}

function change_duration() {
    track.currentTime = track.duration * (slider.value / 100);
}

function reset_slider() {
    slider.value = 0;
}


// function changeicon(){
//     document.querySelector(".img").src="icons and images/Next.png";
// }

// function changeicon1(){
//     document.querySelector(".img").src="icons and images/Song credits.png";
// }


// forward and backward icons 

function nextpage() {
    console.log(index_no);
    history.forward();
   
}

function backpage() {
    history.back();
}