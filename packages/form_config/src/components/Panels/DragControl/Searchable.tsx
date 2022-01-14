import { useState } from 'react';
import { Input } from 'antd';
import styles from './index.less';

const defaultConvertFn = (content: any) => content;

export default ({
  filter,
  placeholder,
  convertSearchHeader = defaultConvertFn,
  convertContent = defaultConvertFn,
  contentInnerStyle,
}: any) => {
  const [searchVal, setSearchVal] = useState();
  return (
    <div className={styles.searchableContainer} >
      <div>
        {convertSearchHeader(<Input.Search
          placeholder={placeholder}
          enterButton
          onChange={(e: any) => setSearchVal(e.target.value)}
          onSearch={(val: any) => setSearchVal(val)}
        />)}
      </div>
      <div
        className={styles.searchableContent}
      >
        <div
          className={styles.searchableContentInner}
          style={{
            marginTop: 5,
            ...contentInnerStyle,
          }}
        >
          {
            convertContent(filter(searchVal))
          }
        </div>
      </div>
    </div>
  );
};
