/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useEffect, FC, useRef } from 'react';
import { render } from 'react-dom';

const AAA = ({
  Comp,
  didMount
}: any) => {
  const ref = useRef(null);
  useEffect(() => {
    didMount(ref.current);
  }, [didMount]);
  return (
    <div ref={ref}>
      <Comp/>
    </div>
  );
};

const dom2svg = (dom: any) => {
  // 复制DOM节点
  const cloneDom = dom.cloneNode(true);
  cloneDom.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  cloneDom.classList.remove('outline');

  let htmlSvg = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="' +
    dom.offsetWidth +
    '" height="' +
    dom.offsetHeight +
    '"><foreignObject x="0" y="0" width="100%" height="100%">' +
    new XMLSerializer().serializeToString(cloneDom) +
    '</foreignObject></svg>';

  htmlSvg = htmlSvg.replace(/\n/g, '').replace(/\t/g, '').replace(/#/g, '%23');

  return htmlSvg;
};

export const convertComp2Img = (Comp: FC): string => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let imgSrc: any;
  render(
    <AAA
      Comp={Comp}
      didMount={(dom: any) => {
        imgSrc = dom2svg(dom);
      }}
    />,
    div
  );
  return imgSrc;
};
