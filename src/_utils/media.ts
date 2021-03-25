export async function getResolvedAudio(src: string) {
  const audio = new Audio(src);

  return new Promise((resolve, reject) => {
    audio.onerror = e => {
      reject(e);
    };

    audio.onloadedmetadata = () => {
      resolve(audio);
    };
  });
}

export async function getResolvedImage(src: string) {
  const image = new Image();

  return new Promise((resovle, reject) => {
    image.src = src;
    image.onerror = e => reject(e);
    image.onload = () => {
      resovle(image);
    };
  });
}

export function formatMediaName(name: string, maxLength = 10) {
  const infos = name.split('.');
  if (infos.length < 2) {
    return name;
  }

  let truncName = '';
  const ext = infos[infos.length - 1];
  const partName = infos.slice(0, infos.length - 1) || [];
  const filename = partName.join('.');
  truncName = filename.slice(0, maxLength);
  if (truncName.length !== partName.join('.').length) {
    truncName = `${truncName}...${filename.slice(-3)}`;
  }

  return `${truncName}.${ext}`;
}

function _twobit(b: number) {
  if (`${b}`.length === 1) {
    return `0${b}`;
  }
  return `${b}`;
}

export function formatPlaySecond(second: string) {
  const total = parseInt(second, 10);
  const s = total % 60;
  const m = ((total - s) / 60) % 60;
  const h = (total - s - m * 60) / 60 / 60;

  if (h === 0) {
    return `${_twobit(m)}:${_twobit(s)}`;
  }

  return `${_twobit(h)}:${_twobit(m)}:${_twobit(s)}`;
}
