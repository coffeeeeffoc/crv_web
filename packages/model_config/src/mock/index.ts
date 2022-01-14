import Mock from 'mockjs'

import modelMock from './modelMock'
import languageMock from './languageMock'

const mocks = [
  ...modelMock,
  ...languageMock
]

for (const i of mocks) {
  Mock.setup({
    timeout: '200-600'
  })
  Mock.mock(new RegExp(i.url), i.type, i.response)
}
