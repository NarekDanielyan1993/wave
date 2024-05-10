import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './auth/sagas';
import { watchErrorSaga } from './error/saga';
import { watchFretsSaga } from './frets/sagas';
import { watchProductsSaga } from './products/sagas';
import { watchSiteSaga } from './site/sagas';
import { watchUserSaga } from './user/sagas';
import { watchUserPermissionSaga } from './userPermission/sagas';

export default function* rootSaga() {
    yield all([
        fork(watchErrorSaga),
        fork(watchFretsSaga),
        fork(watchProductsSaga),
        fork(watchAuthSaga),
        fork(watchUserSaga),
        fork(watchSiteSaga),
        fork(watchUserPermissionSaga),
    ]);
}
