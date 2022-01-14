
import { FC, useEffect, useState } from 'react';
import DraggableTransfer from '@rc/DraggableTransfer'

interface propsUniqueRule {
  modelId: string

}

const UniqueRule: FC<propsUniqueRule> = (props) => {
  const [replaceString, setReplaceString] = useState('last_update_user+avg(max(last_update_time,create_user,id+id))*last_update_time*id)');
  const valueString = [
    { id: 'id', name: '昵称' },
    { id: 'last_update_user', name: '更新人' },
    { id: 'create_user', name: '创建人' },
    { id: 'last_update_time', name: '更新时间' }
    // {id:'id', name:'昵称'},
    // {id:'id', name:'昵称'},
  ]

  useEffect(() => {
    const regex = /[a-z_]*/g;
    // 检索到
    const matchString = replaceString.match(regex);
    matchString?.forEach(
      list => {
        const index = valueString.findIndex(item => item.id === list);
        const regexString = new RegExp(`${list}`)
        if (index !== -1) {
          setReplaceString(replaceString.replace(regexString, valueString[index].name))
        }
      }
    )
    if (matchString !== null) {
      // valueString.findIndex(item => item.id === matchString)
    }
  }, [replaceString])

  const dateSource: any[] = [
    { name: '1', key: 1, statement: '2565' },
    { name: '2', key: 2 },
    { name: '3', key: 3 },
    { name: '4', key: 4 }
  ];

  return (
    <>
      <DraggableTransfer
        value={[1, 4]}
        dataSource={dateSource}
        dataIndex='key'
        titles={['sde', 'dfrr']}
        onChange={(a: any) => console.log('a', a)}
        transferOnClick={(b: any, c: any) => console.log('b', b, c)}
      />
      {replaceString}
    </>

  )
};

export default UniqueRule;
