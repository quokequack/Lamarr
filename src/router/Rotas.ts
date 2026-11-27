const Rotas = {
  path: '/',
  component: () => import('../components/Layout.vue'),
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('../views/PaginaPrincipal.vue'),
    },
    {
      path: 'login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: 'cadastro',
      name: 'cadastro',
      component: () => import('../views/Cadastro.vue'),
    },
    {
      path: 'trilhas',
      name: 'trilhas',
      meta: { requiresAuth: true },
      component: () => import('../views/Trilhas.vue'),
    },
    {
      path: 'trilhas/nova',
      name: 'nova-trilha',
      meta: { requiresAuth: true },
      component: () => import('../views/NovaTrilha.vue'),
    },
  ],
}

export default Rotas
