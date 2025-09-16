export function Wait(duration = 0): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, duration));
}
