export default class CentralPlayer {
  private audios: HTMLAudioElement[] = [];
  public multiPlay = true;
  public playCount = 0;
  addAudio(url: string, playNow = true): HTMLAudioElement {
    const audio = new Audio(url);
    this.audios.push(audio);
    audio.addEventListener("play", () => {
      this.playCount += 1;
    });
    audio.addEventListener("pause", () => {
      this.playCount -= 1;
    });
    if (playNow) {
      audio.addEventListener("loadeddata", () => {
        if (!this.multiPlay) {
          this.stopAll();
        }
        audio.play();
      });
    }
    return audio;
  }
  preload(url: string) {
    this.addAudio(url, false);
  }
  stopAll() {
    for (const i of this.audios) {
      i.pause();
    }
  }
}
