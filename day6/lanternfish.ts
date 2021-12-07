const MAX_INTERNAL_CYCLE = 8;
const RESET_INTERNAL_CYCLE = 6;
const MIN_INTERNAL_CYCLE = 0;
const STEP_VALUE = 1;

export class LanternFish {
  private internalCycle: number;

  constructor(internalCycle?: number) {
    this.internalCycle = internalCycle ?? MAX_INTERNAL_CYCLE;
  }

  // Step internal cycle, return true if cycle was reset
  stepCycle(): boolean {
    let tempInternalCycle = this.internalCycle - STEP_VALUE;
    if (tempInternalCycle < MIN_INTERNAL_CYCLE) {
      this.resetCycle();
      return true;
    }
    this.internalCycle = tempInternalCycle;
    return false;
  }

  private resetCycle() {
    this.internalCycle = RESET_INTERNAL_CYCLE;
  }
}
