export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');

  if (!token) {
    return navigateTo('/login');
  }
});
