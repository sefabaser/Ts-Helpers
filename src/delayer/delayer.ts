export function Wait(duration: number = 0): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, duration));
}
