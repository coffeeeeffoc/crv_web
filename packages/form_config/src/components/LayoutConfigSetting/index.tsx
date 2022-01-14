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
          布局控制
        </Button>
        <Button type='primary' onClick={() => setPreviewVisible(true)}>
          预览
        </Button>
        {/* <Button
          type='primary'
          onClick={() => {
            exportFile({
              data: [[1], [1]]
            });
          }}
        >
          导出布局
          <ExportOutlined title='导出布局' />
        </Button>
        <Button
          type='primary'
          onClick={() => {
            importFile((data: any) => {
              console.log('所导入的数据为：', data);
              confirm({
                title: <div>确认</div>,
                content: '导入数据会清空当前现有数据，是否继续？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                  console.log('确认');
                },
                onCancel: () => {
                  console.log('取消');
                },
              });
            });
          }}
        >
          导入布局
          <ImportOutlined title='导入布局' />
        </Button>
        <Button
          type='primary'
          onClick={() => {
            exportFile({
              data: [[1], [1]]
            });
          }}
        >
          导出布局字段
          <ExportOutlined title='导出布局字段' />
        </Button>
        <Button
          type='primary'
          onClick={() => {
            importFile((data: any) => {
              console.log('所导入的数据为：', data);
              confirm({
                title: <div>确认</div>,
                content: '导入数据会清空当前现有数据，是否继续？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                  console.log('确认');
                },
                onCancel: () => {
                  console.log('取消');
                },
              });
            });
          }}
        >
          导入布局字段
          <ImportOutlined title='导入布局字段' />
        </Button> */}
      </div>
      <Drawer
        title='布局控制属性'
        placement='left'
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form form={form} initialValues={formDefaultValue} >
          <Form.Item label='显示语言' name='language' >
            <Radio.Group defaultValue='all' >
              <Space direction='vertical'>
                <Radio value='all' >英文 || 中文</Radio>
                <Radio value='zh' >中文</Radio>
                <Radio value='en' >英文</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='布局类型' name='layoutType' >
            <Radio.Group defaultValue='grid' >
              <Space direction='vertical'>
                <Radio value='grid'>grid</Radio>
                <Radio value='flex' disabled >flex</Radio>
                <Radio value='free' disabled >free</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='左侧控制面板显示' name='leftPanelVisible' >
            <SwitchInForm
              checkedChildren='显示'
              unCheckedChildren='隐藏'
            />
          </Form.Item>
          <Form.Item label='右侧属性面板显示' name='rightPanelVisible' >
            <SwitchInForm
              checkedChildren='显示'
              unCheckedChildren='隐藏'
            />
          </Form.Item>
          <Form.Item label='轨道大小显示' name='gridTrackSizeVisible' >
            <SwitchInForm
              checkedChildren='显示'
              unCheckedChildren='隐藏'
            />
          </Form.Item>
          <Form.Item label='轨道大小可编辑' name='gridTrackSizeEditable' >
            <SwitchInForm
              checkedChildren='可编辑'
              unCheckedChildren='不可编辑'
            />
          </Form.Item>
          <Form.Item
            label='字段控件布局'
            labelAlign='left'
            name='fieldWidgetAlign'
            style={{
              flexDirection: 'column',
            }}
          >
            {/* 此处的value和onChange不生效，纯粹是为了应付ts；实际应该是Form.Item传入 */}
            <FieldWidgetAlign value={{ type: SpaceAlignType.vertical }} onChange={console.log} />
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title='预览'
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
