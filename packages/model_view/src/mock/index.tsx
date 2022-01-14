import Mock from 'mockjs';

import listMock from './listMock';

const mocks = [
  ...listMock
]

for (const i of mocks) {
  Mock.setup({
    timeout: '200-600'
  })
  Mock.mock(new RegExp(i.url), i.type, i.response)
}
