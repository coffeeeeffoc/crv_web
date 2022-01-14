import { areaToCSS, areaToHTML } from '@/utils/generateCode';
import { useAppSelector } from '@/redux/hooks';
import { Collapse } from 'antd';
import Editor from '@/components/Editor';

const { Panel } = Collapse;

const cssOptions: any = {
  templateAreas: false,
  // templateAreas: true,
  oldSpec: false,
  repeat: false,
};
const htmlOptions = {
  indent: 2,
};

export default () => {
  const areas = useAppSelector(state => state.canvas.areas);
  const content = {
    css: areaToCSS(areas, cssOptions),
    html: areaToHTML(areas, htmlOptions.indent),
  };
  return (
    <Collapse
      defaultActiveKey={'css html'.split(' ')}
    >
      <Panel header='css' key='css' >
        <Editor
          mode='css'
          value={content.css}
          style={{
            width: '100%',
            // height: 250,
          }}
        />
      </Panel>
      <Panel header='html' key='html' >
        <Editor
          mode='html'
          value={content.html}
          style={{
            width: '100%',
            height: 50,
          }}
        />
      </Panel>
    </Collapse>
  );
};
