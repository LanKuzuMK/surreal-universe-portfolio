// High-Performance Motion Store
// Bypasses React VDOM reconciliation to achieve pure, locked 120 FPS render performance.

export interface MotionStore {
  scrollProgress: number;
  scrollVelocity: number;
  mouseX: number;
  mouseY: number;
}

export const motionStore: MotionStore = {
  scrollProgress: 0,
  scrollVelocity: 0,
  mouseX: 0.5,
  mouseY: 0.5,
};
