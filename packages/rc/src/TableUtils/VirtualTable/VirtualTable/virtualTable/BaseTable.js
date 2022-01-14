import React, { PureComponent } from 'react';
import  { findDOMNode } from 'react-dom';
import Table from 'antd/es/table';


class BaseTable extends PureComponent {
  constructor(props) {
    super(props);
    const { rowSelection } = props;
    const newRowSelection = rowSelection ? { ...rowSelection } : null;
    if (rowSelection) {
      newRowSelection.onSelectAll = this.reOnSelectAll;
      newRowSelection.onChange = this.reOnChange;
    }
    this.state = {
      selectedRowKeys: [],
      newRowSelection,
    };
  }

  state = {
    selectedRowKeys: [],
  };

  reOnSelectAll = (selected  ) => {
    // 处理全选函数
    const {
      dataSource,
      rowKey,
      rowSelection: {  onSelectAll, onChange } = {},
    } = this.props;
    const selectedRowKeys = selected ? dataSource.map(item => item[rowKey]) : [];
    const selectedRows = selected ? dataSource : [];
    const changeRows = dataSource;
    this.setState(
      {
        selectedRowKeys,
      },
      () => {
        onChange?.(selectedRowKeys, selectedRows);
        onSelectAll?.(selected, selectedRows, changeRows);
      }
    );
  };

  reOnChange = (selectedRowKeys ) => {
    // 处理onChange函数
    const {
      rowSelection: { onChange },
      dataSource,
      rowKey,
    } = this.props;
    if (selectedRowKeys) {
      this.setState(
        {
          selectedRowKeys,
        },
        () => {
          onChange?.(
            selectedRowKeys,
            selectedRowKeys
              .map(key => dataSource?.find?.(item => item[rowKey] === key))
              .filter(Boolean)
          );
        }
      );
    }
  };

  updateCheckboxStatus = () => {
    const {  dataSource, rowSelection: { selectedRowKeys } = {} } = this.props;
    const checkboxNode = findDOMNode(this).querySelector(
      '.ant-table-fixed-left>.ant-table-header>.ant-table-fixed thead>tr>th .ant-checkbox-wrapper>span.ant-checkbox'
    );
    const checkboxClassList = checkboxNode?.classList;
    const newSelectedRowKeys = selectedRowKeys;
    // 整体有选中，渲染部分都没选中
    if (checkboxClassList && newSelectedRowKeys.length) {
      if (newSelectedRowKeys.length === dataSource.length) {
        checkboxClassList.remove('ant-checkbox-indeterminate');
        checkboxClassList.add('ant-checkbox-checked');
      } else {
        checkboxClassList.remove('ant-checkbox-checked');
        checkboxClassList.add('ant-checkbox-indeterminate');
      }
    } else {
      checkboxClassList?.remove?.('ant-checkbox-checked');
      checkboxClassList?.remove?.('ant-checkbox-indeterminate');
    }
  };

  componentDidMount() {
    this.updateCheckboxStatus();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateCheckboxStatus();
    console.timeEnd('BaseTable_DidUpdate');
    console.log('_DidUpdate', this.props, this.state, prevProps, prevState);
  }

  componentWillReceiveProps(prevProps, prevState) {
    console.log('componentWillReceiveProps', prevProps, prevState, this.props, this.state);
  }

  render() {
    console.time('BaseTable_DidUpdate');
    console.log('BaseTable_DidUpdate_render', Date.now());
    const {
      renderSource,
      renderColumns,
      
      rowSelection,
      
      ...rest
    } = this.props;
    const { selectedRowKeys, newRowSelection } = this.state;

    if (newRowSelection) {
      /** 需要兼容用户传递进来的selectedRowKeys，
       * 用户selectedRowKeys优先级高于内部selectedRowKeys */
      newRowSelection.selectedRowKeys = rowSelection.selectedRowKeys || selectedRowKeys;
    }
    const obj = {
      ...rest,
      rowSelection: newRowSelection,
      dataSource: renderSource,
      columns: renderColumns,
    };
    // ：主要原因是当传递给Table组件的属性
    /**
     * 此处采用deepUpdate的方式，起因：勾选一条数据时，传递给Table的属性只有selectedRowKeys发生了变化，而render -> didupdate更新时间间隔在776~906ms左右，而不传递selectedRowKeys时只需374~481ms。
     * 经大量测试发现，若传递给rowSelection的引用不变而只变selectedRowKeys的值，则更新时间间隔也只有400ms左右。于是采用尽量不修改引用的方式更新属性的值，可有效减少更新时间间隔
     */
    // this.prevTableProps = deepUpdate(this.prevTableProps, obj);
    this.prevTableProps = obj;

    return <Table {...this.prevTableProps} />;
  }
}

export default BaseTable;
