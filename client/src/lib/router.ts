import { createElement, lazy, Suspense } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import PageLoader from '../components/ui/PageLoader';

const Home = lazy(() => import('../pages/Home'));
const AdminLogin = lazy(() => import('../pages/admin/Login'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));

const lazyRoute = (Component: LazyExoticComponent<ComponentType>) => () =>
  createElement(
    Suspense,
    { fallback: createElement(PageLoader) },
    createElement(Component),
  );

// Root route — renders child routes via Outlet
const rootRoute = createRootRoute({
  component: Outlet,
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRoute(Home),
});

// Admin routes
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: lazyRoute(AdminLogin),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: lazyRoute(AdminDashboard),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  adminLoginRoute,
  adminDashboardRoute,
]);

export const router = createRouter({ routeTree });

// TypeScript registration
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
