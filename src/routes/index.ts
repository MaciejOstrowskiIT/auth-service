import { Route } from './Route';
import { Controller } from '../controllers/Controller';
import { ProtectedRoute } from './ProtectedRoute';

/* @formatter:off */
export const createRoutes = (authController: Controller): Route[] => [
  // User routes
  new Route('post', '/login', (req, res) => authController.login(req, res)),
  new Route('post', '/register', (req, res) => authController.register(req, res)),
];
