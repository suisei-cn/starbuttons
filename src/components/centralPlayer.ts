export default class CentralPlayer {
  private audios: HTMLAudioElement[] = [];
  public multiPlay = true;
  public repeatThis = false;
  public playCount = 0;
  addAudio(url: string): HTMLAudioElement {
    const audio = new Audio();
    audio.preload = "auto";
    this.audios.push(audio);
    audio.addEventListener("play", () => {
      this.playCount += 1;
    });
    audio.addEventListener("pause", () => {
      this.playCount -= 1;
    });
    audio.addEventListener("ended", () => {
      if (this.repeatThis) {
        audio.play();
      }
    });
    audio.src = url;
    return audio;
  }

  stopAllWhenNonMultiPlay() {
    if (!this.multiPlay) {
      this.stopAll();
    }
  }

  preload(url: string) {
    this.addAudio(url);
  }
  stopAll() {
    for (const i of this.audios.values()) {
      try {
        i.pause();
      } catch (_) {
        // Pause before loaded would trigger an error
        // See https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
      }
    }
  }
}
