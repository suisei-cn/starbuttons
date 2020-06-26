export default class CentralPlayer {
  // private audios: HTMLAudioElement[] = [];
  private audios: Map<string, HTMLAudioElement> = new Map;
  public multiPlay = true;
  public playCount = 0;
  addAudio(url: string, playNow = true): HTMLAudioElement {
    if (this.audios.has(url)) {
      return this.audios.get(url)!
    }

    const audio = new Audio();
    audio.preload = "auto";
    this.audios.set(url, audio);
    audio.addEventListener("play", () => {
      this.playCount += 1;
    });
    audio.addEventListener("pause", () => {
      this.playCount -= 1;
    });
    // if (playNow) {
    //   audio.addEventListener("loadeddata", () => {
    //     this.stopAllWhenNonMultiPlay();
    //     audio.play();
    //   });
    // }
    audio.src = url;
    return audio;
  }

  stopAllWhenNonMultiPlay() {
    if (!this.multiPlay) {
      this.stopAll();
    }
  }

  preload(url: string) {
    this.addAudio(url, false);
  }
  stopAll() {
    for (const i of this.audios.values()) {
      i.pause();
    }
  }
}
