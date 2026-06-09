export function useSocket() {
  return {
    connected: false,
    emit: (_event: string, _payload?: unknown) => undefined
  };
}
