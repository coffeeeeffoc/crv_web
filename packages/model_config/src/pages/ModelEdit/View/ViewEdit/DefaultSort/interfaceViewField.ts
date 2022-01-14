import { FieldType } from '@/common/constant'
import React from 'react'
export interface DragTablePropsType {
  setTableValue: (value: any) => void
}

export interface fieldsType {
  id: string
  name: string
  fieldType: FieldType
  [propsName: string]: any
}

export enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

export interface TargetDataType {
  id: string
  displayName: string
  sort: SortType
}

export interface SourceDataType {
  id: string
  displayName: string
}

export type SelectedKeyType = string

export interface rowSelectionType {
  selectedRowKeys: React.Key[]
  onChange: (value: any) => void
}

export interface ComponentsType {
  body: any
}

// SourceTable 继承依赖
export interface SourceTablePropsType {
  components: ComponentsType
  rowSelection: rowSelectionType
  sourceData: SourceDataType[]
  defaultSort: any
  [propsName: string]: any
}

// TargetTable 继承依赖
export interface TargetTablePropsType {
  components: ComponentsType
  rowSelection: rowSelectionType
  targetData: TargetDataType[]
  defaultSort: any
  setTableValue: (value: any) => void
  [propsName: string]: any
}
