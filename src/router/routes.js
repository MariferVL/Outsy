import { viewHome } from '../views/home.js';
import { viewAbout } from '../views/about.js';
import { viewSignIn } from '../views/sign-in.js';
import { viewSignUp } from '../views/sign-up.js';
import { viewFeed } from '../views/feed.js';
import { viewPost } from '../views/post-edit.js';
import { viewPostDetail } from '../views/post-detail.js';
import { viewProfile } from '../views/profile.js';

const paths = {
  home: {
    path: '/',
    template: viewHome,
    title: 'Outsy - Home',
  },
  about: {
    path: '/about',
    template: viewAbout,
    title: 'Outsy - Conócenos',

  },
  signIn: {
    path: '/sign-in',
    template: viewSignIn,
    title: 'Outsy - Ingresa',

  },
  signUp: {
    path: '/sign-up',
    template: viewSignUp,
    title: 'Outsy - Regístrate',

  },
  feed: {
    path: '/feed',
    template: viewFeed,
    title: 'Outsy - Muro',
  },
  createPost: {
    path: '/post/create',
    template: viewPost,
    title: 'Outsy - Crear Post',
  },
  editPost: {
    path: '/post/edit',
    template: viewPost,
    title: 'Outsy - Editar Post',
  },
  postDetail: {
    path: '/post/detail',
    template: viewPostDetail,
    title: 'Outsy - Post',
  },
  profile: {
    path: '/profile',
    template: viewProfile,
    title: 'Outsy - Perfil',
  },
};

export { paths };
