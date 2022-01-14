import { Button, Space } from "antd";
import { FC } from "react";
import DeleteModule from "../DeleteModule";

interface propsType {
  editClick: any;
  deleteClick: any;
  editElementname: string;
  deleteElementname: string;
}

const EditText: FC<propsType> = ({
  editClick,
  deleteClick,
  editElementname,
  deleteElementname
}) => {
  return (
    <Space style={{ margin: '-4px'}}>
      <Button
        style={{ padding:0 }}
        type='link'
        onClick={editClick}
        id={editElementname}>编辑</Button>
        <DeleteModule onConfirm={deleteClick}>
          <Button
            style={{ padding:0 }}
            type='link'
            id={deleteElementname}>删除</Button>
        </DeleteModule>
    </Space>
  )
};
export default EditText;