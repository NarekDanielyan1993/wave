import { all } from 'redux-saga/effects';
import { watchError as errorSaga } from './error/saga';
export default function* rootSaga() {
    yield all([errorSaga]);
}
