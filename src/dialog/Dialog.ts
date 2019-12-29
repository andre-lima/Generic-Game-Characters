import { Story } from "inkjs";
import { DialogPhase } from "../components/interfaces/interfaces.js";

export class Dialog {
  public story;
  public currentPhase: DialogPhase;

  constructor(storyContent) {
    this.story = new Story(storyContent);
    this.continueStory();
  }

  public startStory() {}

  public continueStory(): DialogPhase {
    this.currentPhase = {
      sentence: "",
      choices: [],
      canContinue: false,
      isFinished: false
    };

    if (this.story.canContinue) {
      this.currentPhase.sentence = this.story.Continue();
    }

    this.currentPhase.choices = this.story.currentChoices;
    this.currentPhase.canContinue = this.story.canContinue;

    if (!this.story.canContinue && this.story.currentChoices.length === 0) {
      this.currentPhase.isFinished = true;
    }

    return this.currentPhase;
  }

  public makeChoice(index) {
    this.story.ChooseChoiceIndex(index);
  }
}
