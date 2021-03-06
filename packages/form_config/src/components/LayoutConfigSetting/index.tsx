import {
  Drawer, Button, Form, Radio, Space, Modal,
} from 'antd';
// import {
//   ExportOutlined, ImportOutlined,
// } from '@ant-design/icons';
// import { importFile, exportFile } from '@utils/browser/importExportExcel';
// import { confirm } from '@utils/browser/message';
import { useState } from 'react';
import styles from './index.less';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { layoutConfigSettingActions } from '@/redux/actions';
import FormPreview from '@@/Preview';
import FieldWidgetAlign from './FieldWidgetAlign';
import { SpaceAlignType } from '@/types/layout';
import SwitchInForm from '@rc/SwitchInForm';

const { useForm } = Form;
export default () => {
  const [visible, setVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const dispatch = useAppDispatch();
  const showDrawer = () => {
    setVisible(true);
  };
  const layoutConfigSetting = useAppSelector(state => state.layoutConfigSetting);
  const formDefaultValue = {
    language: layoutConfigSetting.language,
    layoutType: layoutConfigSetting.layoutType,
    leftPanelVisible: layoutConfigSetting.panel.leftPanel.layout.open,
    rightPanelVisible: layoutConfigSetting.panel.rightPanel.layout.open,
    gridTrackSizeVisible: layoutConfigSetting.canvas.gridTrackSize.visible,
    gridTrackSizeEditable: layoutConfigSetting.canvas.gridTrackSize.editable,
    fieldWidgetAlign: layoutConfigSetting.additions.fieldWidgetAlign,
  };
  const [form] = useForm();
  const onClose = () => {
    setVisible(false);
    const formData = form.getFieldsValue();
    dispatch(layoutConfigSettingActions.setState((state: any) => {
      state.language = formData.language;
      state.panel.leftPanel.layout.open = formData.leftPanelVisible;
      state.panel.rightPanel.layout.open = formData.rightPanelVisible;
      state.canvas.gridTrackSize.visible = formData.gridTrackSizeVisible;
      state.canvas.gridTrackSize.editable = formData.gridTrackSizeEditable;
      state.additions.fieldWidgetAlign = formData.fieldWidgetAlign;
      return state;
    }));
  };
  return (
    <>
      <div className={styles.layoutSetting}>
        <Button type='primary' onClick={showDrawer}>
          ????????????
        </Button>
        <Button type='primary' onClick={() => setPreviewVisible(true)}>
          ??????
        </Button>
        {/* <Button
          type='primary'
          onClick={() => {
            exportFile({
              data: [[1], [1]]
            });
          }}
        >
          ????????????
          <ExportOutlined title='????????????' />
        </Button>
        <Button
          type='primary'
          onClick={() => {
            importFile((data: any) => {
              console.log('????????????????????????', data);
              confirm({
                title: <div>??????</div>,
                content: '?????????????????????????????????????????????????????????',
                okText: '??????',
                cancelText: '??????',
                onOk: () => {
                  console.log('??????');
                },
                onCancel: () => {
                  console.log('??????');
                },
              });
            });
          }}
        >
          ????????????
          <ImportOutlined title='????????????' />
        </Button>
        <Button
          type='primary'
          onClick={() => {
            exportFile({
              data: [[1], [1]]
            });
          }}
        >
          ??????????????????
          <ExportOutlined title='??????????????????' />
        </Button>
        <Button
          type='primary'
          onClick={() => {
            importFile((data: any) => {
              console.log('????????????????????????', data);
              confirm({
                title: <div>??????</div>,
                content: '?????????????????????????????????????????????????????????',
                okText: '??????',
                cancelText: '??????',
                onOk: () => {
                  console.log('??????');
                },
                onCancel: () => {
                  console.log('??????');
                },
              });
            });
          }}
        >
          ??????????????????
          <ImportOutlined title='??????????????????' />
        </Button> */}
      </div>
      <Drawer
        title='??????????????????'
        placement='left'
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form form={form} initialValues={formDefaultValue} >
          <Form.Item label='????????????' name='language' >
            <Radio.Group defaultValue='all' >
              <Space direction='vertical'>
                <Radio value='all' >?????? || ??????</Radio>
                <Radio value='zh' >??????</Radio>
                <Radio value='en' >??????</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='????????????' name='layoutType' >
            <Radio.Group defaultValue='grid' >
              <Space direction='vertical'>
                <Radio value='grid'>grid</Radio>
                <Radio value='flex' disabled >flex</Radio>
                <Radio value='free' disabled >free</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='????????????????????????' name='leftPanelVisible' >
            <SwitchInForm
              checkedChildren='??????'
              unCheckedChildren='??????'
            />
          </Form.Item>
          <Form.Item label='????????????????????????' name='rightPanelVisible' >
            <SwitchInForm
              checkedChildren='??????'
              unCheckedChildren='??????'
            />
          </Form.Item>
          <Form.Item label='??????????????????' name='gridTrackSizeVisible' >
            <SwitchInForm
              checkedChildren='??????'
              unCheckedChildren='??????'
            />
          </Form.Item>
          <Form.Item label='?????????????????????' name='gridTrackSizeEditable' >
            <SwitchInForm
              checkedChildren='?????????'
              unCheckedChildren='????????????'
            />
          </Form.Item>
          <Form.Item
            label='??????????????????'
            labelAlign='left'
            name='fieldWidgetAlign'
            style={{
              flexDirection: 'column',
            }}
          >
            {/* ?????????value???onChange?????????????????????????????????ts??????????????????Form.Item?????? */}
            <FieldWidgetAlign value={{ type: SpaceAlignType.vertical }} onChange={console.log} />
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title='??????'
        visible={previewVisible}
        afterClose={() => setPreviewVisible(false)}
        onCancel={() => setPreviewVisible(false)}
        className={styles.formPreview}
        destroyOnClose={true}
        // maskClosable={true}
        // closeIcon={null}
        footer={null}
        bodyStyle={{
          padding: 0,
        }}
      >
        <FormPreview />
      </Modal>
    </>
  );
};
