import AceEditor from 'react-ace';
// import ace from 'ace-builds';
// // /* eslint import/no-webpack-loader-syntax: off */
// // import jsonWorkerUrl from 'file-loader?esModule=false!ace-builds/src-noconflict/worker-javascript';
// import javascriptWorkerUrl from 'ace-builds/src-noconflict/worker-javascript';
// import jsonWorkerUrl from 'ace-builds/src-noconflict/worker-json';
// import cssWorkerUrl from 'ace-builds/src-noconflict/worker-css';
// import htmlWorkerUrl from 'ace-builds/src-noconflict/worker-html';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/theme-monokai';

// ace.config.setModuleUrl('ace/mode/javascript_worker', javascriptWorkerUrl);
// ace.config.setModuleUrl('ace/mode/json_worker', jsonWorkerUrl);
// ace.config.setModuleUrl('ace/mode/css_worker', cssWorkerUrl);
// ace.config.setModuleUrl('ace/mode/html_worker', htmlWorkerUrl);

export default ({
  mode = 'json',
  value,
  onChange,
  style,
  className,
}: any) => (
  <AceEditor
    style={style}
    className={className}
    mode={mode}
    theme='monokai'
    editorProps={{ $blockScrolling: true }}
    fontSize='18px'
    highlightActiveLine = {true}
    showPrintMargin = {false}
    setOptions = {{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: false,
    }}
    name='react-ace'
    focus={true}
    value={value}
    onChange={onChange}
  />
);
