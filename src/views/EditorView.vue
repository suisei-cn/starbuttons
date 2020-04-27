<template>
  <div id="page">
    <div id="header">
      <h1>Suisei Remix Editor <sup>experimental</sup></h1>
      <p>You can remix the sounds at this page!</p>
      <div id="operations">
        <div class="normalBtn" @click="playRemix">Play</div>
      </div>
    </div>
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
    <div id="editor">
      <div id="tracks">
        <div ref="track1" class="track"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sound } from "../types";
import BaseButton from "../components/BaseButton.vue";
import interact from "interactjs";

const editorElements: {
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
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

@Component({
  components: {
    BaseButton
  }
})
export default class App extends Vue {
  private sounds: Sound[] = [];

  private async loadVoice() {
    this.sounds = (await fetch("/sounds.json")
      .then(x => x.json())
      .catch(() => {
        // tslint:disable-next-line:no-console
        console.error("Sound data fetch error. Exiting.");
      })) as Sound[];
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

  private async mounted() {
    await this.loadVoice();
    this.loadLang();
    this.initDrag();
  }

  private initDrag() {
    const buttonsOffsetLeft = (this.$refs.clips as HTMLElement).offsetLeft;
    const buttonsOffsetTop = (this.$refs.clips as HTMLElement).offsetTop;
    interact(".item").draggable({
      inertia: false,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: document.getElementById("page") as HTMLElement,
          endOnly: true
        })
      ],
      listeners: {
        move: function (event: any) {
          const target: HTMLElement = event.target;

          // Move
          updateElementPos(target, event.dx, event.dy);

          // Update value
          const seq = Number(target.getAttribute("data-seq-id"));
          if (!editorElements[seq]) return;
          const location = getXLocation(target);
          editorElements[seq].location = location;
        },
        end: function (event: any) {
          const target: HTMLElement = event.target;
          if (!target.getAttribute("data-seq-id")) {
            // Revert button location
            if (target.getAttribute("data-in-track")) {
              document.getElementById("buttons").removeChild(target);
            } else {
              target.style.webkitTransform = target.style.transform = "";
              target.removeAttribute("data-x");
              target.removeAttribute("data-y");
            }
          } else {
            // Append the same button
            if (!target.getAttribute("data-in-track")) {
              const newNode = target.cloneNode(true);
              newNode.style.webkitTransform = newNode.style.transform = "";
              newNode.removeAttribute("data-x");
              newNode.removeAttribute("data-y");
              newNode.removeAttribute("data-seq-id");
              newNode.removeAttribute("data-in-track");
              document.getElementById("buttons").appendChild(newNode);
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
      ondragenter: function (event) {
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
      ondragleave: function (event) {
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
    const ratio = Number((track as HTMLElement).offsetWidth) / 3;
    const preparedSounds: { [key: string]: HTMLAudioElement } = {};
    for (const [key, i] of Object.entries(editorElements)) {
      if (i.id < 0) continue;
      const id = i.id;
      const sound = preparedSounds[key];
      if (sound) continue;
      const audioFilename = this.sounds[id].file;
      preparedSounds[key] = new Audio(`assets/${audioFilename}`);
    }
    for (const [key, i] of Object.entries(editorElements)) {
      if (i.id < 0 || i.location < 0) continue;
      setTimeout(() => {
        preparedSounds[key].play();
      }, (i.location / ratio) * 1000);
    }
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

#buttons {
  display: flex;
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
