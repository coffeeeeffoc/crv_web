import { createSlice } from '@reduxjs/toolkit';
import { SpaceAlignType } from '@/types/layout';

export enum layoutType {
  free,
  flex,
  grid,
};

export interface LayoutConfigSettingType {
  language: string;
  layoutType: string;
  panel: { // 面板
    leftPanel: { // 操作面板
      collapsible: boolean; // 是否可折叠
      layout: {
        open: boolean;
        width: number;
      };
    };
    rightPanel: { // 属性面板
      collapsible: boolean; // 是否可折叠
      layout: {
        open: boolean;
        width: number;
      };
    };
  };
  canvas: {
    layout: {
      type: layoutType; // 画布自由拖拽 | 网格拖拽
    };
    autoGenerateName: boolean; // 是否自动生成区域名字
    gridTrackSize: {
      visible: boolean;
      editable: boolean;
    };
  };
};

const initialState = {
  language: 'all',
  layoutType: 'grid',
  panel: { // 面板
    leftPanel: { // 操作面板
      collapsible: true, // 是否可折叠
      layout: {
        open: true,
        // width: 350,
      },
    },
    rightPanel: { // 属性面板
      collapsible: true, // 是否可折叠
      layout: {
        open: true,
        // width: 350,
      },
    },
  },
  canvas: {
    layout: {
      type: 'grid',
    },
    autoGenerateName: true,
    gridTrackSize: {
      visible: false,
      editable: false,
    },
  },
  additions: {
    fieldWidgetAlign: {
      type: SpaceAlignType.vertical,
      value: ['vertical', 90, 10],
      // type: SpaceAlignType.horizontal,
      // value: ['fixedField', 90, 10],
    },
  },
};

export const {
  actions,
  reducer,
} = createSlice({
  name: 'layoutConfigSetting',
  initialState,
  reducers: {
    setState: (state: any, { payload }) => {
      if (typeof payload === 'function') {
        return payload(state);
      }
      const { init, data } = payload;
      return init ? initialState : data;
    },
    setLanguage: (state: any, { payload }) => {
      state.language = payload;
    },
    setLeftPanelLayout: (state: any, { payload }) => {
      state.panel.leftPanel.layout = {
        ...state.panel.leftPanel.layout,
        ...payload,
      };
    },
    setRightDetailPanelLayout: (state: any, { payload }) => {
      state.panel.rightPanel.layout = {
        ...state.panel.rightPanel.layout,
        ...payload,
      };
    },
    setMultiState: (state: any, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
  },
});

export default reducer;
