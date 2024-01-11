import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './auth/sagas';
import { watchError as errorSaga } from './error/saga';
import { watchProductsSaga } from './products/sagas';
import { watchSiteSaga } from './site/sagas';
import { watchUserSaga } from './user/sagas';
import { watchUserPermissionSaga } from './userPermission/sagas';

export default function* rootSaga() {
    yield all([
        fork(errorSaga),
        fork(watchProductsSaga),
        fork(watchAuthSaga),
        fork(watchUserSaga),
        fork(watchSiteSaga),
        fork(watchUserPermissionSaga),
    ]);
}
