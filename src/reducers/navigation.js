import { router } from '../navigations/AuthenticatedStack';

export default (state, action) => {
  const newState = router.getStateForAction(action, state);
  return newState || state;
};
