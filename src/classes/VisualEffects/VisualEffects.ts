import effects from "./effects/*.ts";

export class VisualEffectsController {
  constructor() {
  }

  static showEffect(effectType, delay: number = 0) {
    setTimeout(() => {
      console.log(effectType, delay)
    }, delay);
  }
}