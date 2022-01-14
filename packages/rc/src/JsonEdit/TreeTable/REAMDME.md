### 触发联动
##### 支持联动类型
- valueChange
值变化时

- keyChange
键变化

- valueTypeChange
值类型变化

- deleteKey
删除键


- addKey
新增键

##### 联动回调函数的格式
```
({data, getStepByKey, wholePath, stepData, value}) => {

  /**
  * 自定义代码区，修改data
  */

  return stepData[0].data;
}
```
##### example
```
trigger: [
  {
    type: 'valueChange',
    callback: ({data, getStepByKey, wholePath, stepData, key, value}) => {
      const allKeys = {
        refresh: ['action', 'filter', 'selected'],
        calculate: ['action', 'fields', 'result'],
      }
      if(stepData && !Object.keys(stepData[stepData.length - 2].data).every(key => allKeys[value].includes(key))) {
        const newData = {
          refresh: {
            action: 'refresh',
            filter: {},
            selected: false,
          },
          calculate: {
            action: 'calculate',
            fields: [],
            result: [],
          }
        }
        stepData[stepData.length - 3].data[stepData[stepData.length - 2].key] = newData[value];
        return stepData[0].data;
      }
    },
  }
]
```

##### 提示：
- 暂时只支持对象类型的触发联动,(数组类型的触发联动可能无效)。
- 当添加批量属性时，如果一次性添加多个属性，则每个新增的属性都会触发一次联动.所以在定义回调函数的时候一定要尽可能利用好key和value的传参。