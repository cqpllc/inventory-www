import fetch from 'cross-fetch';

// From https://stackoverflow.com/a/49211413/154044
export async function chunkedFetch<T>(url: string, onLine: (line: T) => void | Promise<void>) {
  const response = await fetch(url);
  const reader = response?.body?.getReader();
  function go() {
    if (!reader) return;
    reader.read().then(function(result) {
      console.log('read');
      if (!result.done) {
        onLine(JSON.parse(new TextDecoder("utf-8").decode(result.value)));
        go();
      }
    })
  }
  go();
}
