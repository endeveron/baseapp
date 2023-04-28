import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';

import { NotFound, RequireAuth } from 'routes';
import { Main, Login, Signup } from 'views';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
