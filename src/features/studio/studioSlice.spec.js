import studioReducer, {
    StudioState,
    changeScreen
  } from './studioSlice';
  
  describe('counter reducer', () => {
    const initialState = {
      screen: 'welcome',
      frame: 'welcome',
      layout: 'feed',
      experience: 'photo',
      status: 'idle',
    };
    it('should handle initial state', () => {
      expect(studioReducer(undefined, { type: 'unknown' })).toEqual({
        screen: 'welcome',
        layout: 'feed',
        experience: 'photo',
        status: 'idle',
      });
    });
  
    it('should handle next screen', () => {
      const actual = studioReducer(initialState, changeScreen('layout'));
      expect(actual.screen).toEqual('welcome');
    });
  
    it('should handle previous screen', () => {
      const actual = studioReducer(initialState, changeScreen('welcome'));
      expect(actual.screen).toEqual('layout');
    });

  });
  