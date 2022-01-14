import {
  // take,
  takeEvery,
  // put,
  // select,
} from 'redux-saga/effects';

export function * undo (): any {
  console.log('saga:undo--before');
  yield takeEvery('snapshot/undo', function * (...args) {
    // console.log('undo---args', ...args);
    // const { snapshotData, snapshotIndex } = yield select(state => state.snapshot);
    // console.log('undo---11--snapshotData', snapshotData, snapshotIndex);
    // const snapshot = snapshotData[snapshotIndex];
    // console.log('saga:snapshot', snapshot);
    // yield put({
    //   type: 'canvas/setState',
    //   payload: {
    //     init: !snapshot,
    //     data: snapshot?.canvas,
    //   },
    // });
  });
  yield takeEvery('snapshot/recordCurrentSnapshot', function * (...args) {
    // console.log('recordCurrentSnapshot---args', ...args);
    // const { ...canvas } = yield select(state => state.canvas);
    // console.log('recordCurrentSnapshot--canvas', canvas);
    // yield put({
    //   type: 'snapshot/recordSnapshot',
    //   payload: {
    //     canvas,
    //   },
    // });
  });
  console.log('saga:undo--after');
  // yield take('snapshot/undo');
  // const { snapshotData, snapshotIndex } = yield select(state => state.snapshot);
  // yield put({
  //   type: 'canvas/setState',
  //   ...snapshotData[snapshotIndex].canvas,
  // });
};
