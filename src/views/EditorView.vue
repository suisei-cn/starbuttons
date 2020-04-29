<template>
  <div id="page">
    <div id="header">
      <h1>Suisei Remix Editor <sup>experimental</sup></h1>
      <p>You can remix the sounds at this page!</p>
      <div
        id="operations"
        :style="{
          display: smallScreen === 1 ? 'none' : 'block',
          opacity: smallScreen === 2 ? 0 : 1
        }"
      >
        <div class="normalBtn" @click="playRemix">Play</div>
        <div class="normalBtn" @click="exportRemix">Export</div>
        <div class="normalBtn" @click="clearRemix">Clear</div>
      </div>
    </div>
    <div
      id="smallScreen"
      :style="{ display: smallScreen === 0 ? 'none' : 'block' }"
    >
      <p>Your device screen is too small to run this editor. Sorry~</p>
    </div>
    <div
      :style="{
        display: smallScreen === 1 ? 'none' : 'block',
        opacity: smallScreen === 2 ? 0 : 1
      }"
    >
      <div id="buttons" ref="clips">
        <template v-for="(item, index) of sounds">
          <BaseButton
            :item="item"
            :key="index"
            :noclickplay="true"
            :data-sound-id="index"
            class="item normalBtn"
          ></BaseButton>
        </template>
      </div>
      <div id="editor" ref="editor">
        <div id="tracks">
          <div data-track-id="1" class="track"></div>
          <div data-track-id="2" class="track"></div>
          <div data-track-id="3" class="track"></div>
          <div data-track-id="4" class="track"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sound } from "../types";
import BaseButton from "../components/BaseButton.vue";
import interact from "interactjs";
import { mergeAudio, SynthItem } from "../components/HappySynthesizer";

let editorElements: {
  [key: string]: {
    id: number;
    location: number;
  };
} = {};

(window as any).editorElements = editorElements;

function getXLocation(target: HTMLElement) {
  return (
    target.offsetLeft +
    Number(target.getAttribute("data-x") || -1 * target.offsetLeft)
  );
}

function updateElementPos(target: HTMLElement, dx: number, dy: number) {
  const x = (parseFloat(target.getAttribute("data-x") || "") || 0) + dx;
  const y = (parseFloat(target.getAttribute("data-y") || "") || 0) + dy;
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";
  target.setAttribute("data-x", String(x));
  target.setAttribute("data-y", String(y));
}

@Component({
  components: {
    BaseButton
  }
})
export default class App extends Vue {
  private sounds: Sound[] = [];
  private smallScreen = 0;
  private timelineLength = 3;

  private async loadVoice() {
    const soundNotExpanded = (await fetch("/sounds.json")
      .then(x => x.json())
      .catch(() => {
        // tslint:disable-next-line:no-console
        console.error("Sound data fetch error. Exiting.");
      })) as Sound[];
    for (const i of soundNotExpanded) {
      if (typeof i.file === "string") {
        // Single voice, go on
        this.sounds.push(i);
      } else {
        // Array of voices
        for (let idx = 0; idx < i.file.length; idx++) {
          const name_l10n = { ...i.name_l10n };
          for (const lang in name_l10n) {
            name_l10n[lang] += ` (${idx + 1})`;
          }
          const singleSound = Object.assign({}, i, {
            name: `${i.name} (${idx + 1})`,
            name_l10n,
            file: i.file[idx]
          });
          this.sounds.push(singleSound);
        }
      }
    }
    console.log(this.sounds);
  }

  private loadLang() {
    const lang =
      (
        window.location.search.match(/lang=([a-zA-Z-]+)/)?.[1] ||
        (navigator as any).language ||
        (navigator as any).userLanguage
      ).split("-")[0] || "zh";
    this.$i18n.locale = lang;
  }

  private validateDisplay() {
    if (window.innerHeight > 600) {
      this.smallScreen = 0;
      return;
    }
    this.smallScreen = 2;
    const editorBottom =
      (this.$refs.editor as HTMLElement).offsetHeight +
      (this.$refs.editor as HTMLElement).offsetTop;
    if (window.innerHeight < editorBottom) {
      this.smallScreen = 1;
    } else {
      if (editorBottom !== 0) {
        this.smallScreen = 0;
      }
    }
  }

  private async mounted() {
    await this.loadVoice();
    this.loadLang();
    this.validateDisplay();
    window.addEventListener("resize", this.validateDisplay);
    this.initDrag();
  }

  private initDrag() {
    const buttonsOffsetLeft = (this.$refs.clips as HTMLElement).offsetLeft;
    const buttonsOffsetTop = (this.$refs.clips as HTMLElement).offsetTop;
    const that = this;
    interact(".item").draggable({
      inertia: false,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: document.getElementById("page") as HTMLElement,
          endOnly: true
        })
      ],
      listeners: {
        move: function(event: any) {
          const target: HTMLElement = event.target;

          // Move
          updateElementPos(target, event.dx, event.dy);

          // Update value
          const seq = Number(target.getAttribute("data-seq-id"));
          if (!editorElements[seq]) return;
          const location = getXLocation(target);
          editorElements[seq].location = location;
        },
        end: function(event: any) {
          const target: HTMLElement = event.target;
          if (!target.getAttribute("data-seq-id")) {
            // Revert button location
            if (target.getAttribute("data-in-track")) {
              (that.$refs.clips as HTMLElement).removeChild(target);
            } else {
              target.style.webkitTransform = target.style.transform = "";
              target.removeAttribute("data-x");
              target.removeAttribute("data-y");
            }
          } else {
            // Append the same button
            if (!target.getAttribute("data-in-track")) {
              const newNode = target.cloneNode(true);
              (newNode as HTMLElement).style.webkitTransform = (newNode as HTMLElement).style.transform =
                "";
              (newNode as HTMLElement).removeAttribute("data-x");
              (newNode as HTMLElement).removeAttribute("data-y");
              (newNode as HTMLElement).removeAttribute("data-seq-id");
              (newNode as HTMLElement).removeAttribute("data-in-track");
              (that.$refs.clips as HTMLElement).appendChild(newNode);
              target.setAttribute("data-in-track", "1");

              updateElementPos(
                target,
                target.offsetLeft - buttonsOffsetLeft - 12,
                target.offsetTop - buttonsOffsetTop - 12
              );
              target.style.position = "absolute";
            }
          }
        }
      }
    });
    interact(".track").dropzone({
      accept: ".item",
      ondragenter: function(event) {
        const target: HTMLElement = event.relatedTarget;
        let seqId = target.getAttribute("data-seq-id");
        if (seqId) return;
        seqId = String(Math.random());
        target.setAttribute("data-seq-id", seqId);
        editorElements[seqId] = {
          id: Number(target.getAttribute("data-sound-id")) || -1,
          location: -1
        };
      },
      ondragleave: function(event) {
        const target: HTMLElement = event.relatedTarget;
        const seqId = target.getAttribute("data-seq-id");
        if (seqId) {
          editorElements[seqId] && delete editorElements[seqId];
          target.removeAttribute("data-seq-id");
        }
      }
    });
  }

  private playRemix() {
    const tracks = document.getElementsByClassName("track");
    if (!tracks) return;
    const track = tracks[0];
    const ratio = Number((track as HTMLElement).offsetWidth) / this.timelineLength;
    const preparedSounds: { [key: string]: HTMLAudioElement } = {};
    for (const [key, i] of Object.entries(editorElements)) {
      if (i.id < 0) continue;
      const id = i.id;
      const sound = preparedSounds[key];
      if (sound) continue;
      const audioFilename = this.sounds[id].file;
      const audio = new Audio(`assets/${audioFilename}`);
      audio.preload = "auto";
      preparedSounds[key] = audio;
    }
    for (const [key, i] of Object.entries(editorElements)) {
      if (i.id < 0 || i.location < 0) continue;
      setTimeout(() => {
        preparedSounds[key].play();
      }, (i.location / ratio) * 1000);
    }
  }

  private clearRemix() {
    for (const item of document.querySelectorAll(".item[data-seq-id]")) {
      (this.$refs.clips as HTMLElement).removeChild(item);
    }
    editorElements = {};
  }

  private async exportRemix() {
    const tracks = document.getElementsByClassName("track");
    if (!tracks) return;
    const track = tracks[0];
    const clips: SynthItem[] = [];
    const ratio = Number((track as HTMLElement).offsetWidth) / this.timelineLength;
    for (const i of Object.values(editorElements)) {
      clips.push({
        musicurl: `assets/${this.sounds[i.id].file}`,
        delay: i.location / ratio
      });
    }
    const url = await mergeAudio(clips);
    const fileLink = document.createElement('a');
    fileLink.href = url;
    fileLink.download = "output.mp3";
    fileLink.click();
  }
}
</script>

<style lang="scss" scoped>
@import "../style/style";

#page {
  height: 100%;
  width: 100%;
}

#header {
  text-align: center;
}

#smallScreen {
  position: absolute;
  height: 80vh;
  width: 80vw;
  text-align: center;
  background-color: #eee8;
  top: 5vh;
  left: 10vw;
  line-height: 80vh;
  font-size: 1.4rem;
}

#buttons {
  display: flex;
  flex-wrap: wrap;
}

#tracks {
  position: static;
  left: 2vw;
  right: 2vw;
  bottom: 2vh;
  background-color: aquamarine;
}

.track {
  width: 100%;
  left: 2.5%;
  height: $btn-height * 1.4;
  background-color: aqua;

  &:not(:last-child) {
    border-bottom: grey 2px solid;
  }
}
</style>
