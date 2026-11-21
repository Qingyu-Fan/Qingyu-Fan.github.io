for (const video of document.querySelectorAll(".demo video")) {
  const play = document.createElement("button");
  play.type = "button";
  play.className = "play";
  play.setAttribute("aria-label", "Play video: " + video.getAttribute("aria-label"));
  video.after(play);
  video.controls = false;

  play.addEventListener("click", async () => {
    play.hidden = true;
    video.controls = true;
    try {
      await video.play();
      video.focus();
    } catch {
      // Leave the native controls available for retries and media errors.
      video.focus();
    }
  });

  video.addEventListener("play", () => {
    for (const other of document.querySelectorAll(".demo video")) {
      if (other !== video && !other.paused) other.pause();
    }
  });

  video.addEventListener("ended", () => {
    const restoreFocus = document.activeElement === video;
    video.controls = false;
    video.load();
    play.hidden = false;
    if (restoreFocus) play.focus();
  });
}
