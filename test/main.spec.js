import Router from '../src/router/router';
import { toggleSignIn, handleSignUp, signInWithGoogle } from '../src/lib/emailAuth';

// const authApp = auth.getAuth(app);
const router = new Router();


/* describe('Login Tests', () => {

  beforeEach(() => {
    toggleSignIn = jest.fn();
    auth.signInWithPassword = jest.fn();
    router.navigateTo = jest.fn(() => console.log('mock de navigateTo usado'));
  });  

  it('Authentication with correct email and password, should redirect to /feed', () => {
    auth.signInWithPassword.mockResolvedValueOnce({ user: { email: 'lunajara_lennon@hotmail.com' } });

    router.navigateTo('/signin');
    
    document.querySelector('#formSignUp').dispatchEvent(new Event('submit'));

    document.querySelector('#email').value = 'lunajara_lennon@hotmail.com';
    document.querySelector('#password').value = 'Outsy@2023';  
    
    loginDiv.querySelector('#loginForm').dispatchEvent(new Event('submit'));

    return Promise.resolve().then(() => expect(router.navigateTo).toHaveBeenCalledWith('/feed'));
  });
}); */


describe('Login Tests', () => {

  beforeEach(() => {
    toggleSignIn = jest.fn();
    auth.signInWithPassword = jest.fn();
    router.navigateTo = jest.fn(() => console.log('mock de navigateTo usado'));
  });  

  it('Authentication with correct email and password, should redirect to /feed', async () => {
    auth.signInWithPassword.mockResolvedValueOnce({ user: { email: 'lunajara_lennon@hotmail.com' } });

    router.navigateTo('/signin');
    
    document.querySelector('#formSignUp').dispatchEvent(new Event('submit'));

    document.querySelector('#email').value = 'lunajara_lennon@hotmail.com';
    document.querySelector('#password').value = 'Outsy@2023';  
    
    loginDiv.querySelector('#loginForm').dispatchEvent(new Event('submit'));

    return Promise.resolve().then(() => expect(router.navigateTo).toHaveBeenCalledWith('/feed'));
  });
});