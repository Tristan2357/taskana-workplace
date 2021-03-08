let script: HTMLScriptElement;

export function importCustomComponents(): void {
  if (script) {
    return;
  }
  script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://unpkg.com/taskana-workplace-lib';
  // script.src = 'https://unpkg.com/taskana-workplace-lib@0.1.4-debug/dist/taskana-workplace/taskana-workplace.esm.js';
  document.body.append(script);
}
