// import {
//   // take,
//   takeEvery,
//   put,
//   select,
// } from 'redux-saga/effects';

// const excludeActions = `
// snapshot/undo
// snapshot/redo
// snapshot/recordSnapshot

// layoutConfigSetting/setState
// canvas/setState
// gridProps/setState
// `.split(/\r?\n/).filter(Boolean);

// /**
//  * @description 判断store中snapshot以外的其他状态时否发生了变化
//  * @param store 当前store
//  * @returns true: 发生了变化;   false:未发生变化
//  */
// const checkChangeStatus = (store: any): boolean => {
//   const { snapshot: { snapshotData, snapshotIndex }, ...rest } = store;

//   if (snapshotData[snapshotIndex]) {
//     return JSON.stringify(snapshotData[snapshotIndex]) !== JSON.stringify(rest);
//   }
//   return true;
// };

export default function * saga (): any {
  // // 任何store发生变化(excludeActions以外)，都记录snapshot
  // yield takeEvery('*', function * ({ type }) {
  //   console.log('takeEvery--*', type);
  //   if (type) {
  //     if (!excludeActions.includes(type)) {
  //       const { ...store } = yield select(state => state);
  //       const { snapshot, ...rest } = store;
  //       if (checkChangeStatus(store)) {
  //         console.log('takeEvery--*--store', store);
  //         yield put({
  //           type: 'snapshot/recordSnapshot',
  //           payload: rest,
  //         });
  //       }
  //     }
  //   }
  // });
  // // 撤销
  // yield takeEvery(['snapshot/undo', 'snapshot/redo'], function * (...args) {
  //   console.log('undo---args', ...args);
  //   const { snapshotData, snapshotIndex } = yield select(state => state.snapshot);
  //   console.log('undo---11--snapshotData', snapshotData, snapshotIndex);
  //   const snapshot = snapshotData[snapshotIndex];
  //   console.log('saga:snapshot', snapshot);
  //   yield put({
  //     type: 'canvas/setState',
  //     payload: {
  //       init: !snapshot,
  //       data: snapshot?.canvas,
  //     },
  //   });
  //   yield put({
  //     type: 'layoutConfigSetting/setState',
  //     payload: {
  //       init: !snapshot,
  //       data: snapshot?.layoutConfigSetting,
  //     },
  //   });
  //   yield put({
  //     type: 'gridProps/setState',
  //     payload: {
  //       init: !snapshot,
  //       data: snapshot?.gridProps,
  //     },
  //   });
  // });
};
