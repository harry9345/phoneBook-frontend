import noteReducer from './noteReducer';
import deepFreeze from 'deep-freeze';

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = [];
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
      },
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });

  describe('return new stet with action TOGGLE_IMPORTANCE', () => {
    const state = [
      { content: 'the app state in redux store', important: false, id: 1 },
      { content: 't with action store', important: true, id: 2 },
    ];
    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id: 2,
      },
    };
    deepFreeze(state);
    const newState = noteReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(state[0]);
    expect(newState).toContainEqual({
      content: 'stete changes ate made with action',
      important: true,
      id: 2,
    });
  });
});
