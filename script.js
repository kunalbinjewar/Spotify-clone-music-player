new Vue({
    el: "#app",
    data() {
      return {
        audio: null,
        circleLeft: null,
        barWidth: null,
        duration: null,
        currentTime: null,
        isTimerPlaying: false,
        tracks: [
                  {
            name: "Chale Jaise Hawaien",
            artist: "KK, Vasundhara Das",
            cover: "https://iili.io/JoRG1UX.png",
            source: "https://audio.jukehost.co.uk/9PclYB2iUrQHUqUJM59Qc9ISEg3oYPWA",
            url: "https://youtu.be/UJ-MT8ZnUxY?si=RloJ4TlXcX113V_A",
            favorited: false
          },
          {
            name: "Tune Jo Na Kaha",
            artist: " Mohit Chauhan, Pritam, Sandeep Shrivastava",
            cover: "https://iili.io/JoRRi8l.png",
            source: "https://audio.jukehost.co.uk/8UWvvbf7TQ7LFeXhGE8zBOeKGITylDFF",
            url: "https://youtu.be/dTu5dTEzVM4?si=sBUoQR5VObWPxy8W",
            favorited: false
          },
          {
            name: "Saudebazi (Encore)",
            artist: "Javed Ali",
            cover: "https://iili.io/JoRVAnR.png",
            source: "https://audio.jukehost.co.uk/ROTmOl1UsESjxC84YafcODn3CrPHdST1",
            url: "https://youtu.be/IYpJVYU4KE0?si=cykV_WuabqYO1AnS",
            favorited: true
          },
  
          {
            name: "Khalasi | Coke Studio Bharat",
            artist: "Coke Studio Bharat  by Aditya Gadhvi, Achint",
            cover: "https://iili.io/JoRhGta.png",
            source: "https://audio.jukehost.co.uk/eGw7euX8qkGpmbV99I2eEB082v1NrUYJ",
            url: "https://youtu.be/t7wSjy9Lv-o?si=DP9nQDpfLu7zWKMT",
            favorited: false
          },
  
          {
            name: "Main Parwaana",
            artist: "A.R. Rahman, Arijit Singh, Pooja Tiwari, Nisa Shetty,Rakshita Suresh",
            cover: "https://iili.io/Jo7N4lj.png",
            source: "https://audio.jukehost.co.uk/nsxOpBDsmtmuqmxQralE7W5LDMdmtSSs",
            url: "https://youtu.be/we_U_WNM4Zk?si=AuV7URZYdzD5iKEN",
            favorited: false
          },
          {
            name: "Arjan Vailly",
            artist: "Manan Bhardwaj, Bhupinder Babbal",
            cover: "https://iili.io/Jo7e5pp.png",
            source: "https://audio.jukehost.co.uk/llsgSCvlZivEZfEa95cuToywCVPwwQ1r",
            url: "https://youtu.be/zqGW6x_5N0k?si=GnsZVp_WLFaZwb3O",
            favorited: true
          },
          {
            name: "Raataan Lambiyan",
            artist: "Jubin NautiyaL, Asees Kaur",
            cover: "https://iili.io/Jo78YTQ.png",
            source: "https://audio.jukehost.co.uk/llcXhXm3sv2Q4V5ZKJN68paYqWPSIuec",
            url: "https://youtu.be/gvyUuxdRdR4?si=mB3cTt8tYFttxGSG",
            favorited: false
          },
          {
            name: "Deva Deva",
            artist: " Arijit Singh, Jonita Gandhi, Pritam Chakraborty, Amitabh Bhattacharya",
            cover: "https://iili.io/Jo7S7ln.png",
            source: "https://audio.jukehost.co.uk/RQaPGggz85hhgfghFWAdHZXQgCLSOlBG",
            url: "https://youtu.be/WjAPDofGg28?si=KRVHsXRvqLWvbc5s",
            favorited: false
          },
          {
            name: "Apna Bana Le",
            artist: "Sachin-Jigar, Arijit Singh",
            cover: "https://iili.io/Jo7gxCN.png",
            source: "https://audio.jukehost.co.uk/mEuQaECNj1yIOtldsMVCaX2etOk3DNwp",
            url: "https://youtu.be/ElZfdU54Cp8?si=hdELzILsEK6Na7Sh",
            favorited: false
          },
          {
            name: "Lets Rock Soniye",
            artist: "Tulsi Kumar, Shaan",
            cover: "https://iili.io/JolpdTx.png",
            source: "https://audio.jukehost.co.uk/tLLNxKSW9G9Zyf8780ssZsfBXqQNpegk",
            url: "https://youtu.be/Vj8LBk_7fsk?si=3Lii67TqxXEUA-zy",
            favorited: false
          },
        ],
        currentTrack: null,
        currentTrackIndex: 0,
        transitionName: null
      };
    },
    methods: {
      play() {
        if (this.audio.paused) {
          this.audio.play();
          this.isTimerPlaying = true;
        } else {
          this.audio.pause();
          this.isTimerPlaying = false;
        }
      },
      generateTime() {
        let width = (100 / this.audio.duration) * this.audio.currentTime;
        this.barWidth = width + "%";
        this.circleLeft = width + "%";
        let durmin = Math.floor(this.audio.duration / 60);
        let dursec = Math.floor(this.audio.duration - durmin * 60);
        let curmin = Math.floor(this.audio.currentTime / 60);
        let cursec = Math.floor(this.audio.currentTime - curmin * 60);
        if (durmin < 10) {
          durmin = "0" + durmin;
        }
        if (dursec < 10) {
          dursec = "0" + dursec;
        }
        if (curmin < 10) {
          curmin = "0" + curmin;
        }
        if (cursec < 10) {
          cursec = "0" + cursec;
        }
        this.duration = durmin + ":" + dursec;
        this.currentTime = curmin + ":" + cursec;
      },
      updateBar(x) {
        let progress = this.$refs.progress;
        let maxduration = this.audio.duration;
        let position = x - progress.offsetLeft;
        let percentage = (100 * position) / progress.offsetWidth;
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        this.barWidth = percentage + "%";
        this.circleLeft = percentage + "%";
        this.audio.currentTime = (maxduration * percentage) / 100;
        this.audio.play();
      },
      clickProgress(e) {
        this.isTimerPlaying = true;
        this.audio.pause();
        this.updateBar(e.pageX);
      },
      prevTrack() {
        this.transitionName = "scale-in";
        this.isShowCover = false;
        if (this.currentTrackIndex > 0) {
          this.currentTrackIndex--;
        } else {
          this.currentTrackIndex = this.tracks.length - 1;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      nextTrack() {
        this.transitionName = "scale-out";
        this.isShowCover = false;
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.currentTrackIndex++;
        } else {
          this.currentTrackIndex = 0;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      resetPlayer() {
        this.barWidth = 0;
        this.circleLeft = 0;
        this.audio.currentTime = 0;
        this.audio.src = this.currentTrack.source;
        setTimeout(() => {
          if(this.isTimerPlaying) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        }, 300);
      },
      favorite() {
        this.tracks[this.currentTrackIndex].favorited = !this.tracks[
          this.currentTrackIndex
        ].favorited;
      }
    },
    created() {
      let vm = this;
      this.currentTrack = this.tracks[0];
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;
      this.audio.ontimeupdate = function() {
        vm.generateTime();
      };
      this.audio.onloadedmetadata = function() {
        vm.generateTime();
      };
      this.audio.onended = function() {
        vm.nextTrack();
        this.isTimerPlaying = true;
      };
  
      // this is optional (for preload covers)
      for (let index = 0; index < this.tracks.length; index++) {
        const element = this.tracks[index];
        let link = document.createElement('link');
        link.rel = "prefetch";
        link.href = element.cover;
        link.as = "image"
        document.head.appendChild(link)
      }
    }
  });
  