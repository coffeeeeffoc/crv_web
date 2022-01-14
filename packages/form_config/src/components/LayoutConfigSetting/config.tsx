export enum layoutType {
  free,
  flex,
  grid,
};

export interface LayoutConfigSettingType {
  language: string;
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
  };
};

export const config = {
  language: 'zh',
  panel: { // 面板
    leftPanel: { // 操作面板
      collapsible: true, // 是否可折叠
    },
    rightPanel: { // 属性面板
      collapsible: true, // 是否可折叠
    },
  },
};
