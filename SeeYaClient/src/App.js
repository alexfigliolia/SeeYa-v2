import { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FullScreenLoader from 'Components/FullScreenLoader';
import RestrictedRoute from 'HOCs/RestrictedRoute';
import { useScreen } from 'Hooks/Screen';

export default function App() {
  useScreen();
  const checkedAuthState = useSelector(({ Authentication }) => Authentication.checkedAuthState);
  const authed = useSelector(({ Authentication }) => !!Authentication.token);
  if (!checkedAuthState) {
    return <FullScreenLoader />
  }

  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Switch>
        <RestrictedRoute
          path='/'
          authenticated={authed}
          component={lazy(() => import('Pages/Home'))} />
      </Switch>
    </Suspense>
  );
}
