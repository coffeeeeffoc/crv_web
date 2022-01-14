import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
// import { ANT_TABLE_CHECKBOX_COLUMN_WIDTH, MIN_TABLE_SCROLL_Y } from '@/utils/constant';
// import { measureUnit2Px } from '@/utils/utils';
import { Spin } from 'antd';
// import { connect } from 'dva';
import BaseTable from './BaseTable';

// 获取一个变量的类型
export const getType = obj => Object.prototype.toString.call(obj).match(/^\[object (.+)\]$/)[1];

// 获取一个度量单位的像素值
export const measureUnit2Px = (num, node) => {
  if (getType(num) === 'Number') {
    return num;
  } if (getType(num) === 'String') {
    const units = [
      {
        match: /^(\d+)%$/,
        convert: () => node?.parentNode?.clientWidth ?? 0,
      },
      {
        match: /^(\d+)px$/,
        convert: v => v,
      },
      {
        match: /^(\d+)vh$/,
        convert: v => (document.body.clientHeight * v) / 100,
      },
      // {
      //   match: /^(\d+)vw$/,
      //   convert: v => v,
      // },
      // {
      //   match: /^(\d+)rem$/,
      //   convert: v => v,
      // },
      // {
      //   match: /^(\d+)em$/,
      //   convert: v => v,
      // },
    ];
    for (let i = 0; i < units.length; i++) {
      const { match, convert } = units[i];
      const result = num.match(match);
      if (result) {
        return convert(Number(result[1]));
      }
    }
  }
  // 默认返回0
  return 0;
};

export const ANT_TABLE_CHECKBOX_COLUMN_WIDTH = 30;

// card组件的padding
// export const CARD_PADDING = 12 * 2;

// Table内容最小的高度
export const MIN_TABLE_SCROLL_Y = 100;


// loading距离table中可见视图的位置
const LOADING_OFFSET = 70;
// table的header的高度
const TABLE_HEADER_HEIGHT = 28;
// scroll的宽度

// scroll的宽度
const LOADING_WIDTH = 32;

// 虚拟表格的loading
const VirtualLoading = ({ node, ...restProps }) => !node
    ? null
    : ReactDOM.createPortal(
      <>
        {Object.keys(restProps).map(key => {
            const { show, ...style } = restProps[key];
            return (
              show && (
                <Spin
                  size="large"
                  role={key}
                  style={{ position: 'absolute', visibility: 'visible', ...style }}
                />
              )
            );
          })}
      </>,
        node
      );
// 虚拟表格
// @connect(({ size }) => ({ gridWidth: size.layout }))
class VirtualTable extends PureComponent {
  static FillNode({ width, height, node, marginTop, marginBottom }) {
    if (node) {
      marginTop = marginTop || 0;
      marginBottom = marginBottom || 0;
      height = height || 0;
      // 表格上下填充的空div需要占据宽度，才能使得当一次性滚动超过表格高度时事件的触发源target是ant-table-body，否则就会是ant-table-body-inner
      width = width || '100%';
      return ReactDOM.createPortal(
        <div
          style={{
            width,
            height: `${height}px`,
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
          }}
        />,
        node
      );
    }
    return null;
  }

  static FillNode2({ width: [width1 = 0, width2 = 0, width3 = 0] = [], node }) {
    if (node) {
      return ReactDOM.createPortal(
        <>
          <div style={{ width: `${width1}px`, height: '0.1px', display: 'inline-block' }} />
          <div style={{ width: `${width2}px`, height: '0.1px', display: 'inline-block' }} />
          <div style={{ width: `${width3}px`, height: '0.1px', display: 'inline-block' }} />
        </>,
        node
      );
    }
    return null;
  }

  constructor(props) {
    super(props);
    console.log('virtual', props);
    this.state = {
      hirizontalLeftWidth: 0,
      hirizontalContentWidth: measureUnit2Px(props.scroll?.x) || 0,
      hirizontalRightWidth: 0,
      startColumnIndex: 0,
      endColumnIndex: 0,
      startRowIndex: 0,
      endRowIndex: undefined, // undefined是为了第一次render时，slice的结果有值能渲染出来
      rowHeight: 0,
      topBlankHeight: 0,
      bottomBlankHeight: 0,
      maxTotalHeight: 15000000,
    };
    this.scrollToDirection = '';
    this.scrollTop = 0;
    this.scrollLeft = 0;
  }

  componentDidMount() {
    // header
    this.refTableHeader = ReactDOM.findDOMNode(this).querySelector(
      '.ant-table-scroll>.ant-table-header'
    );
    // 普通table布局
    this.refScroll = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-body')[0];
    // 固定列的布局
    const fixedEles = ReactDOM.findDOMNode(this).getElementsByClassName('ant-table-body-inner');

    this.refFixedLeftScroll = fixedEles && fixedEles.length ? fixedEles[0] : null;
    this.refFixedRightScroll = fixedEles && fixedEles.length > 1 ? fixedEles[1] : null;

    this.listenEvent = debounce(this.handleScrollEvent, 20);

    if (this.refScroll) {
      this.refScroll.addEventListener('scroll', this.listenEvent);
      this.refScroll.addEventListener('scroll', this.listenEvent11);
    }

    this.createTopFillNode();
    this.createBottomFillNode();
    this.createHorizontalScrollFillNode();
    this.createLoadingFillNode();
    // 初始化设置滚动条
    this.handleScrollEvent();
  }
  listenEvent11 = e => {
    // 为了追踪滚动问题
    console.log('VritualTable scroll', this.refScroll.scrollTop, this.refScroll.scrollHeight,
      this.refTopNode.childNodes?.[0] && getComputedStyle(this.refTopNode.childNodes[0]).height,
      this.refBottomNode.childNodes?.[0] && getComputedStyle(this.refBottomNode.childNodes[0]).height,
      this.refScroll.querySelector('table') && getComputedStyle(this.refScroll.querySelector('table')).height,
    );
  }

  createHorizontalScrollFillNode = () => {
    if (this.refScroll) {
      const ele = document.createElement('div');
      ele.style.fontSize = 0;
      ele.style.whiteSpace = 'nowrap';
      ele.style.zIndex = -1; // 为了不遮住table元素
      ele.style.position = 'absolute';
      ele.style.top = 0;
      ele.style.left = 0;
      ele.style.width = '100%';
      ele.style.height = '100%';
      this.refScroll.appendChild(ele);
      this.refHorizontalScrollNode = ele;
    }
  };

  createLoadingFillNode = () => {
    if (this.refScroll) {
      const ele = document.createElement('div');
      ele.style.position = 'absolute';
      ele.style.top = 0;
      ele.style.left = 0;
      ele.style.width = '100%';
      ele.style.height = '100%';
      ele.style.visibility = 'hidden';
      this.refScroll.appendChild(ele);
      this.refLoadingNode = ele;
    }
  };
  componentDidUpdate(prevProps) {
    const { dataSource  } = prevProps;
    const { dataSource: tdataSource  } = this.props;

    if (dataSource && dataSource.length !== tdataSource.length) {
      const callback = () => {
        this.refScroll.scrollTop = 0;
      };
      this.handleScrollVertical(tdataSource.length, callback);
    }
    // 当gridWidth变化时、或者列字段个数发生变化时，需要更新
    // 本来应该在componentWillReceiveProps时就应该做如下处理的，但是由于this.refScroll的宽度还没更新，clientWidth只有在didupdate之后才准确，所以在此执行
    // 此处还需优化
    if (prevProps.gridWidth !== this.props.gridWidth) {
      this.handleScrollHorizontal(this.refScroll?.scrollLeft ?? 0, this.props);
    }
    console.log('VritualTable scroll--3', this.refScroll.scrollTop, this.refScroll.scrollHeight)
    if(this.dataSourceLessStatus === 'pendding') {
      this.dataSourceLessStatus = undefined;
    }
  }

  componentWillUnmount() {
    console.log('VritualTable scroll--4','componentWillUnmount')
    if (this.refScroll) {
      this.refScroll.removeEventListener('scroll', this.listenEvent);
      this.refScroll.removeEventListener('scroll', this.listenEvent11);
    }
  }

  createTopFillNode() {
    if (this.refScroll) {
      const ele = document.createElement('div');
      this.refScroll.insertBefore(ele, this.refScroll.firstChild);
      this.refTopNode = ele;
    }
    if (this.refFixedLeftScroll) {
      const ele = document.createElement('div');
      this.refFixedLeftScroll.insertBefore(ele, this.refFixedLeftScroll.firstChild);
      this.refFixedLeftTopNode = ele;
    }
    if (this.refFixedRightScroll) {
      const ele = document.createElement('div');
      this.refFixedRightScroll.insertBefore(ele, this.refFixedRightScroll.firstChild);
      this.refFixedRightTopNode = ele;
    }
  }

  createBottomFillNode() {
    if (this.refScroll) {
      const ele = document.createElement('div');
      this.refScroll.appendChild(ele);
      this.refBottomNode = ele;
    }
    if (this.refFixedLeftScroll) {
      const ele = document.createElement('div');
      this.refFixedLeftScroll.appendChild(ele);
      this.refFixedLeftBottomNode = ele;
    }
    if (this.refFixedRightScroll) {
      const ele = document.createElement('div');
      this.refFixedRightScroll.appendChild(ele);
      this.refFixedRightBottomNode = ele;
    }
  }

  setRowHeight() {
    this.refTable = this.refScroll.getElementsByTagName('table')[0];
    if (this.refTable) {
      const tr = this.refTable.getElementsByTagName('tr')[0];
      const rowHeight = (tr && tr.clientHeight) || 0;
      this.state.rowHeight = rowHeight;
    }
  }

  handleScrollEvent = e => {
    const { dataSource  } = this.props;
    if (e) {
      console.log('VritualTable scroll--2', e.target.scrollTop, e.target.scrollHeight);
      if (e.target.scrollTop !== this.scrollTop) {
        this.scrollToDirection = e.target.scrollTop > this.scrollTop ? 'bottom' : 'top';
        this.scrollDistance = Math.abs(e.target.scrollTop - this.scrollTop);
        this.scrollTop = e.target.scrollTop;
        this.handleScrollVertical((dataSource || []).length);
      } else if (e.target.scrollLeft !== this.scrollLeft) {
        this.scrollToDirection = e.target.scrollLeft > this.scrollLeft ? 'right' : 'left';
        this.scrollDistance = Math.abs(e.target.scrollLeft - this.scrollLeft);
        this.scrollLeft = e.target.scrollLeft;
        this.handleScrollHorizontal(e.target.scrollLeft, this.props);
      }
    } else {
      this.scrollTop = 0;
      this.scrollLeft = 0;
      this.scrollDistance = 0;
      this.scrollToDirection = '';
      this.handleScrollVertical((dataSource || []).length);
      this.handleScrollHorizontal(0, this.props);
    }
  };

  getNotFixedColumns = () =>
    this.props.columns.filter(item => item.fixed !== 'left').filter(item => item.fixed !== 'right');

  findColumnIndex = (left, notFixedcolumns) => {
    // 左侧固定列的宽度
    let width = 0;
    let i = 0;
    for (; i < notFixedcolumns.length; i++) {
      width += notFixedcolumns[i].width || 0;
      if (width >= left) {
        break;
      }
    }
    return i;
  };

  findColumnStartIndex = (scrollLeft, notFixedcolumns) =>
    Math.max(0, this.findColumnIndex(scrollLeft, notFixedcolumns) - 1);

  // table的width采用外层容器的宽度、高度
  getTableBodyWidth = () => this.refScroll?.clientWidth || 0;

  getTableBodyHeight = () => {
    const {  y } = this.props.scroll || {};
    const height = y && y - TABLE_HEADER_HEIGHT;
    return height ?? this.refScroll?.clientHeight ?? 0;
  };

  findColumnEndIndex = (scrollLeft, notFixedcolumns) => {
    const rightFixedWidth = this.refFixedRightScroll?.clientWidth || 0;
    const tableBodyWidth = this.getTableBodyWidth();
    // 计算滚动距离时，不包含右侧固定列。
    const scrollRight = scrollLeft + tableBodyWidth - rightFixedWidth;
    return Math.min(this.findColumnIndex(scrollRight, notFixedcolumns) + 2, notFixedcolumns.length);
  };

  // 获取数组中所有字段的宽度之和
  getAllWidth = arr => arr.reduce((res, item) => res + item.width, 0);

  handleScrollHorizontal = (scrollLeft, props) => {
    const { columns = [], scroll: { x  } = {} } = props || this.props;
    const notFixedcolumns = columns
      .filter(item => item.fixed !== 'left')
      .filter(item => item.fixed !== 'right');
    if (x) {
      scrollLeft = this.getValidValue(scrollLeft, 0, measureUnit2Px(x));
      const startColumnIndex = this.findColumnStartIndex(scrollLeft, notFixedcolumns);
      const endColumnIndex = this.findColumnEndIndex(scrollLeft, notFixedcolumns);
      const hirizontalLeftWidth = this.getAllWidth(notFixedcolumns.slice(0, startColumnIndex));
      const hirizontalContentWidth = this.getAllWidth(
        notFixedcolumns.slice(startColumnIndex, endColumnIndex)
      );
      const hirizontalRightWidth = this.getAllWidth(
        notFixedcolumns.slice(endColumnIndex, notFixedcolumns.length)
      );
      const options = {
        width: hirizontalContentWidth,
        left: hirizontalLeftWidth,
      };
      const flag = !scrollLeft || true;
      if (flag) {
        if (options) {
          this.setTableStyle(this.refScroll, options);
          this.setTableStyle(this.refTableHeader, options);
          this.refTableHeader.scrollLeft = this.refScroll.scrollLeft;
        }
        this.setState({
          hirizontalLeftWidth,
          hirizontalContentWidth,
          hirizontalRightWidth,
          startColumnIndex,
          endColumnIndex,
        });
      }
    }
  };

  setTableStyle = (ref, { width, left }) => {
    ref.querySelector('table').style.position = 'relative';
    ref.querySelector('table').style.width = width;
    ref.querySelector('table').style.left = `${left  }px`;
  };

  handleScrollVertical = (length, callback) => {
    console.log('handleScrollVertical---');
    const { rowHeight, maxTotalHeight } = this.state;
    if (!rowHeight) {
      this.setRowHeight();
    }
    if (this.state.rowHeight && length) {
      const visibleHeight =
        this.props.visibleHeight ?? (() => {
          const y = this.props.scroll?.y;
          if(y) {
            if(typeof y === 'number') {
              return y;
            }
            if(typeof y === 'string') {
              const num = y.match(/^\d+(?=px)$/)?.[0];
              if (num) {
                return parseInt(num);
              }
            }
          }
        })() ?? this.refScroll.clientHeight; // 显示的高度
      const scrollTop = this.refScroll.scrollTop; // 滑动的距离
      this.handleBlankHeight(
        length,
        this.state.rowHeight,
        maxTotalHeight,
        visibleHeight,
        scrollTop,
        callback
      );
    } else if(!length) {
      // 没有数据的时候，填充的高度均为0
      this.setState({
        topBlankHeight: 0,
        bottomBlankHeight: 0,
      });
    }
  };

  handleBlankHeight(length, rowHeight, maxTotalHeight, visibleHeight, scrollTop, callback) {
    const allHeight = length * rowHeight;
    const renderRowCount = Math.ceil(visibleHeight / rowHeight) + 2; // 为了确保渲染的条数始终相同，放置不停滚动期间渲染条数不断变化导致滚动条自动滚动的现象
    const maxScrollTop = Math.max(0, allHeight - visibleHeight); 
    const _scrollTop = Math.min(maxScrollTop, Math.max(0, scrollTop));
    const startRowIndex = Math.floor(_scrollTop / rowHeight);
    const minEndRowIndex = Math.ceil((_scrollTop + visibleHeight) / rowHeight);
    const endRowIndex = this.getValidValue(startRowIndex + renderRowCount, minEndRowIndex, length);
    const topBlankHeight = startRowIndex * rowHeight;
    const bottomBlankHeight = Math.max(0, (length - endRowIndex) * rowHeight);
console.log('handleBlankHeight', startRowIndex, endRowIndex, renderRowCount, minEndRowIndex, length)
    this.setState({
      startRowIndex,
      endRowIndex,
      topBlankHeight,
      bottomBlankHeight,
    }, () => callback?.());
  }

  getValidValue(val, min = 0, max = 40) {
    if (val < min) {
      return min;
    } else if (val > max) {
      return max;
    }
    return val;
  }

  // 移除最后一个列的width，为了适应table整体宽度
  removeLastColumnWidth = arr =>
    arr.map(({ width, ...rest }, index, arr) =>
      index === arr.length - 1 ? rest : { width, ...rest }
    );

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.columns.length !== this.props.columns.length
    ) {
      this.handleScrollHorizontal(this.refScroll?.scrollLeft ?? 0, nextProps);
    }
    const pageSizeLess = (nextProps.pagination?.pageSize || 0) < (this.props.pagination?.pageSize || 0);
    const dataSourceLess = (nextProps.dataSource?.length || 0) < (this.props.dataSource?.length || 0);
    // 为应对切换pageSize减少时的页面可能显示空白的场景，由于Ant Table内部做的处理的时序问题（先用旧的dataSource更新记录条数、再滚动到顶部、再刷新真正的dataSource），所以需要特殊处理
    // 将this.dataSourceLessStatus有三个状态：start、pendding、undefined分别对应props中的分页减少、记录个数减少、正常状态
    if(pageSizeLess) {
      this.dataSourceLessStatus = 'start';
    } else if(dataSourceLess) {
      this.dataSourceLessStatus = 'pendding';
    }
  }

  render() {
    console.log('VritualTable scroll--render', this.refScroll?.scrollTop, this.refScroll?.scrollHeight);
    const { dataSource, columns, ...rest } = this.props;
    const {
      topBlankHeight: _topBlankHeight,
      bottomBlankHeight: _bottomBlankHeight,
      startRowIndex,
      endRowIndex,
      startColumnIndex,
      endColumnIndex,      
      hirizontalLeftWidth,
      hirizontalContentWidth,
      hirizontalRightWidth,
    } = this.state;
      // start时表示正在切换状态，此时为了不显示突然的空白，需要把填充的空白高度都设置为0；当为pendding或undefined时，正常处理
    const topBlankHeight = this.dataSourceLessStatus === 'start' ? 0 : _topBlankHeight;
    const bottomBlankHeight = this.dataSourceLessStatus === 'start' ? 0 : _bottomBlankHeight;
    const checkboxWidth = this.props.rowSelection ? ANT_TABLE_CHECKBOX_COLUMN_WIDTH : 0;
    const renderSource = dataSource.slice(startRowIndex, endRowIndex);
    const fixedColumns = columns.filter(item => ['left', 'right'].includes(item.fixed));
    const notFixedcolumns = this.getNotFixedColumns();
    const displayNotFixedColumns = notFixedcolumns.slice(startColumnIndex, endColumnIndex);
    const renderColumns = fixedColumns.concat(this.removeLastColumnWidth(displayNotFixedColumns));
    const renderHeight = this.state.rowHeight * renderSource.length;
    const scrollX = hirizontalContentWidth + this.getAllWidth(fixedColumns) + checkboxWidth;
    const allWidth = measureUnit2Px(rest.scroll?.x) ?? 0;
    const allHeight = this.state.rowHeight * dataSource.length;
    const scrollLeft = this.refScroll?.scrollLeft ?? 0;
    const scrollTop = this.refScroll?.scrollTop ?? 0;
    const tableBodyWidth = this.getTableBodyWidth();
    const tableBodyHeight = this.getTableBodyHeight();
    console.log('VritualTable scroll--render--1',
      topBlankHeight,
      bottomBlankHeight,
      (this.props.pagination?.pageSize || 0),
      (this.props.dataSource?.length || 0),
      this.dataSourceLessStatus,
    );
    return (
      <Fragment>
        <VirtualTable.FillNode height={topBlankHeight} node={this.refTopNode} />
        <BaseTable
          {...this.props}
          renderSource={renderSource}
          renderColumns={renderColumns}
          scroll={{
            ...rest?.scroll,
            x: scrollX,
          }}
          refFixedLeftScroll={this.refFixedLeftScroll}
        />
        <VirtualTable.FillNode height={bottomBlankHeight} node={this.refBottomNode} />
        {/* 下面是针对水平滚动的 */}
        {renderSource.length > 0 && (
          <VirtualTable.FillNode2
            width={[hirizontalLeftWidth, scrollX, hirizontalRightWidth]}
            node={this.refHorizontalScrollNode}
          />
        )}
        {(rest.scroll?.y ? rest.scroll?.y > MIN_TABLE_SCROLL_Y : true) && (
          <VirtualLoading
            top={{
              show: true,
              top: topBlankHeight - LOADING_OFFSET,
              left: scrollLeft + tableBodyWidth / 2,
            }}
            left={{
              show: true,
              top: scrollTop + tableBodyHeight / 2 - LOADING_WIDTH / 2,
              left: hirizontalLeftWidth - LOADING_OFFSET,
            }}
            right={{
              show:
                notFixedcolumns.length &&
                scrollLeft >= 0 &&
                scrollLeft + this.getTableBodyWidth() < allWidth &&
                endColumnIndex < notFixedcolumns.length,
              top: scrollTop + tableBodyHeight / 2 - LOADING_WIDTH / 2,
              left: hirizontalLeftWidth + scrollX + LOADING_OFFSET,
            }}
            bottom={{
              show: scrollTop >= 0 && scrollTop + renderHeight < allHeight,
              top: topBlankHeight + renderHeight + LOADING_OFFSET,
              left: scrollLeft + tableBodyWidth / 2,
            }}
            node={this.refLoadingNode}
          />
        )}
        {
          /** fixed 针对固定列的 */
          <Fragment>
            <VirtualTable.FillNode height={topBlankHeight} node={this.refFixedLeftTopNode} />
            <VirtualTable.FillNode height={bottomBlankHeight} node={this.refFixedLeftBottomNode} />
            <VirtualTable.FillNode height={topBlankHeight} node={this.refFixedRightTopNode} />
            <VirtualTable.FillNode height={bottomBlankHeight} node={this.refFixedRightBottomNode} />
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default VirtualTable;
