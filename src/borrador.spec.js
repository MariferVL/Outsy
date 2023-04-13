import { signIn } from '../src/lib/signIn.js'
import { signUp } from '../src/lib/signUp.js'
import * as barrel from '../src/firebaseConfig.js'

jest.mock('../src/firebaseConfig.js', () => ({
  getAuth: jest.fn(),
  getDatabase: jest.fn(),
  update: jest.fn(),
  ref: jest.fn(),
  set: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  initializeApp: jest.fn(),
}));

global.alert = jest.fn()

beforeEach(() => {
  jest.clearAllMocks();
});

describe('signIn', () => {
  it('debería ser una función', () => {
    expect(typeof signIn).toBe('function')
  })
  it('usuario logueado', async () => {
    barrel.signInWithEmailAndPassword.mockImplementation(jest.fn(() => Promise.resolve({ user: { uid: '3zs*MOCK*sT2' } })))
    // expect(signIn()).toEqual(Promise.resolve(false))
    await expect(signIn()).resolves.toStrictEqual(true);
  })
  it('error', async () => {
    barrel.signInWithEmailAndPassword.mockImplementation(jest.fn(() => Promise.resolve({ errorMessage: { message: 'MOCKerror' } })))
    // expect(signIn()).toEqual(Promise.resolve())
    await expect(signIn()).resolves.toStrictEqual(false);
  })
})

describe('signUp', () => {
  it('debería ser una función', () => {
    expect(typeof signUp).toBe('function')
  })
  it('usuario registrado', async () => {
    barrel.createUserWithEmailAndPassword.mockImplementation(jest.fn(() => Promise.resolve({ user: { uid: '3zs*MOCK*sT2' } })))
    // expect(signUp()).toEqual(Promise.resolve())
    // await expect(signUp()).resolves.toStrictEqual(true);
    await expect(signUp()).resolves.toStrictEqual({ resultado: true, code: "" });
  })
  it('error', async () => {
    // para el caso de error segun el error mostramos el mensaje
    barrel.createUserWithEmailAndPassword.mockImplementation(jest.fn(() => Promise.resolve({ errorMessage: { message: 'MOCKerror' } })))
    // expect(signUp()).toEqual(Promise.resolve())
    // await expect(signUp()).resolves.toStrictEqual(false);
    await expect(signUp()).resolves.toStrictEqual({ resultado: false, code: undefined });
  })
}) 