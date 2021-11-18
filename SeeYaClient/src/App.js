import { Fragment, lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FullScreenLoader from 'Components/FullScreenLoader';
import Header from 'Components/Header';
import Menu from 'Components/Menu';
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
    <Fragment>
      {
        authed &&
        <Fragment>
          <Header />
          <Menu />
        </Fragment>
      }
      <Suspense fallback={<FullScreenLoader />}>
        <Switch>
          <RestrictedRoute
            path='/'
            exact
            authenticated={authed}
            component={lazy(() => import('Pages/Home'))} />
          <RestrictedRoute
            path='/profile'
            authenticated={authed}
            component={lazy(() => import('Pages/Profile'))} />
        </Switch>
      </Suspense>
    </Fragment>
  );
}
