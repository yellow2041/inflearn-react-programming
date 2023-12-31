import { actions, Types } from '.';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { callApi } from '../../common/util/api';
import { makeFetchSaga } from '../../common/util/fetch';

function* fetchAutoComplete({ keyword }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword },
  });
  if (isSuccess && data) {
    yield put(actions.setValue('autoCompletes', data));
  }
}

export default function* () {
  yield all([
    takeEvery(
      Types.FetchAutoComplete,
      makeFetchSaga({ fetchSaga: fetchAutoComplete, canCache: true })
    ),
  ]);
}
