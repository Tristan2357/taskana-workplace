let script: HTMLScriptElement;

export function importCustomComponents(): void {
  if (script) { return; }
  script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://unpkg.com/taskana-workplace-lib';
  document.body.append(script);
}
