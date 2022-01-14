import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';

export default function RolePermissions (props: any) {
  const { modelId } = props;

  const [selected, setSelected] = useState({ selectedRowKeys: [], selectedRows: [] })

  const actions = [
    <Button type="primary">新增</Button>
  ]

  const columns = [
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (val: any, record: any, index: any) => (
        <Space>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      )
    },
    {
      dataIndex: 'id',
      title: 'ID'
    },
    {
      dataIndex: 'role',
      title: '角色'
    },
    {
      dataIndex: 'description',
      title: '说明'
    }
  ]

  return (
    <div>
      1
    </div>
  )
}
