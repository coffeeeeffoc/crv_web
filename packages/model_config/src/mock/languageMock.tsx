import Mock from 'mockjs'

const languageMock = [
  {
    url: '/language/single',
    type: 'post',
    response: (config: any) => {
      const { body } = config
      const json = JSON.parse(body)
      return Mock.mock({
        status: 200,
        message: '成功',
        result: {
          list: [
            {
              // 模型信息-基本信息
              id: 1,
              resource: json.resource,
              language: '中文',
              'translate|1-10': '✔',
            }, {
              // 模型信息-基本信息
              id: 2,
              resource: json.resource,
              language: '英文',
              'translate|1-10': '✔',
            }, {
              // 模型信息-基本信息
              id: 3,
              resource: json.resource,
              language: '日语',
              'translate|1-10': '✔',
            }
          ]
        }
      })
    }
  },
  {
    url: '/language/save',
    type: 'post',
    response: (config: any) => {
      // const { body } = config
      // const json = JSON.parse(body)
      return Mock.mock({
        status: 200,
        message: '成功',
      })
    }
  }
]

export default languageMock
