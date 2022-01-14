import keycode from 'keycode';

interface keyMapType {
  [key: string]: Function;
}

const specialKeys = 'ctrl shift alt'.split(' ');

const matchSpecialKeys = (e: Event, keys: string[]) =>
  keys.filter(k => specialKeys.includes(k)).every(k => (e as any)[`${k}Key`]);

let lastClickElement: HTMLElement | null = null;
document.addEventListener('click', (e) => {
  lastClickElement = e.target as HTMLElement;
});
// 传入需要监听的按键以及对应的callback，当按键满足条件时，执行相应的callback
export const listenKeydown = (keyMap: keyMapType, target: () => HTMLElement | null = () => document.body) => {
  const listener = (e: Event) => {
    if (!target()?.contains(lastClickElement)) {
      // 若上次聚焦点不在目标区域，则不执行监听事件
      return;
    }
    const keyName = keycode(e);
    console.log('keycode', keyName, e);
    typeof (keyMap) === 'object' && Object.keys(keyMap).forEach(key => {
      const listenKeys = key.toLowerCase().split(/\s*\+\s*/).filter(Boolean);
      const listenKeyCode = listenKeys.filter(k => !specialKeys.includes(k));

      if (listenKeyCode[0] === keyName && matchSpecialKeys(e, listenKeys)) {
        keyMap[key]?.(e);
      }
    });
  };
  document.addEventListener('keydown', listener);
  return () => document.removeEventListener('keydown', listener);
};
