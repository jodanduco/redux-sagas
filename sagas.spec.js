import test from 'tape';
import { put, call, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import { incrementAsync, watchIncrementAsync } from './sagas';

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync();
  /*
    gen.next(); // => { done: false, value: <result of calling delay(1000)> }
    gen.next(); // => { done: false, value: <result of calling put({type: 'INCREMENT'})> }
    gen.next(); // => { done: true, value: undefined }
  */
    assert.deepEqual(
      gen.next().value,
      call(delay, 1000),
      'incrementAsync Saga must call delay(1000)'
    );

    assert.deepEqual(
      gen.next().value,
      put({ type: 'INCREMENT' }),
      'incrementAsync Saga must dispatch an INCREMENT action'
    );

    assert.deepEqual(
      gen.next(),
      { done: true, value: undefined },
      'incrementAsync Saga must be done'
    );

    assert.end()
});

test('watchIncrementAsync Saga test', (assert) => {
  const gen = watchIncrementAsync();
  assert.deepEqual(
    gen.next().value,
    takeEvery('INCREMENT_ASYNC', incrementAsync),
    'watchIncrementAsync Saga takes every INCREMENT_ASYNC call'
  );
  assert.end();
});