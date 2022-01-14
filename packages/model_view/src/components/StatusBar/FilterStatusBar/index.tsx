import { FC, useRef } from 'react';
import { Tag, Dropdown, Menu } from 'antd';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import styles from './style.less';
import { OperateTypeValue } from '@/constants/constant';

const FilterStatusBar: FC<any> = ({ filters = {}, onCancel }) => {
  const refDiv = useRef<any>(null);

  const list = Object.keys(filters).map((key: string) => filters[key]).sort((a: any, b: any) => b.t - a.t);

  const createTag = (item: any, more?: boolean) => {
    let valContent = item.value;
    if (item.operate === 'IN') {
      valContent = '';
      item.value.split(',').forEach((v: string) => {
        valContent = `${valContent},${item.enumConfig?.enumList?.find((e: any) => e.value === v)?.name ?? v}` // valContent + item.enumConfig?.enumList?.find((e: any) => e.value === v)?.value
      })
      valContent = valContent.substring(1);
    }
    return (
      <Tag key={`filter_tag_${item.field}`} color="green" style={{ display: 'inline-block', lineHeight: '30px', borderRadius: 15, fontSize: 14, color: '#9a9696' }}>
        <span>{item.title}：{OperateTypeValue[item.operate]}</span>[
        <span style={{ color: '#096dd9' }}>{valContent}</span>]
        <CloseOutlined onClick={() => onCancel(item.field)} />
        {more && <MoreOutlined />}
      </Tag>
    )
  }

  const tags: any[] = []
  if (list.length === 1) {
    tags.push(createTag(list[0], false))
  } else if (list.length > 0) {
    tags.push(<Tag key={`filter_tag_${list[0].field}`} color="green" style={{ display: 'inline-block', lineHeight: '30px', borderRadius: 15, fontSize: 14, color: '#9a9696' }}>
      <span>{list[0].title}：{OperateTypeValue[list[0].operate]}</span>[
      <span style={{ color: '#096dd9' }}>{list[0].value}</span>]
      <CloseOutlined onClick={() => onCancel(list[0].field)} />
      {list.length > 1 && (
        <Dropdown placement="bottomRight" overlay={<Menu>{list.map((item: any, index: number) => index < 1 ? null : <Menu.Item key="1">{createTag(item)}</Menu.Item>)}</Menu>}>
          <MoreOutlined />
        </Dropdown>
      )}
    </Tag>)
  }
  return (
    <span
      ref={refDiv}
      className={styles.gcpFilterStatusBar}
    >
      {tags.map((tag: any) => tag)}
    </span>
  )
}

export default FilterStatusBar;
