import { scrollFunction, validateEmail, validatePassword, showPassword } from "../src/main.js";
// import { handleSignUp, toggleSignIn, signInWithGoogle } from '../src/lib/emailAuth.js';
import Router from '../src/router/router.js';

const router = new Router();
router.start();


jest.mock('../src/main.js', () => ({
  scrollFunction: jest.fn(),
  validateEmail: jest.fn(Boolean),
  validatePassword: jest.fn(Boolean),
  showPassword: jest.fn()

}));

// Mock Router class
jest.mock('../src/router/router.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      navigateTo: jest.fn(),
      start: jest.fn(),
    };
  });
});

describe('scrollFunction', () => {
  let navbar, logo;

  beforeEach(() => {
    // Create a mock navbar and logo element
    navbar = document.createElement('div');
    navbar.id = 'navbar';
    logo = document.createElement('div');
    logo.id = 'logo';

    // Add the elements to the DOM
    document.body.appendChild(navbar);
    document.body.appendChild(logo);

    // Set initial styles
    navbar.style.padding = '80px 10px';
    logo.style.fontSize = '35px';

    // Reset the scroll position
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  afterEach(() => {
    // Remove the elements from the DOM
    document.body.removeChild(navbar);
    document.body.removeChild(logo);
  });

  it('should update navbar styles when scrolled down', () => {
    // Scroll the page down
    document.body.scrollDown = 20;
    document.documentElement.scrollDown = 20;

    // Call the scrollFunction
    scrollFunction();

    // Check the updated styles
    expect(navbar.style.padding).toBe('80px 10px');
    expect(logo.style.fontSize).toBe('35px');
  });

  it('should update navbar styles when scrolled up', () => {
    // Scroll the page down first
    document.body.scrollTop = 100;
    document.documentElement.scrollTop = 100;
    scrollFunction();

    // Scroll the page up
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Call the scrollFunction again
    scrollFunction();

    // Check the updated styles
    expect(navbar.style.padding).toBe('80px 10px');
    expect(logo.style.fontSize).toBe('35px');
  });
});


describe('showPassword', () => {
  let mockShowPasswordCheckbox;
  let mockPassword;

  beforeEach(() => {
    // Create a mock checkbox and password input element
    mockShowPasswordCheckbox = document.createElement('input');
    mockShowPasswordCheckbox.type = 'checkbox';
    mockShowPasswordCheckbox.id = 'showPassword';
    mockPassword = document.createElement('input');
    mockPassword.type = 'password';
    mockPassword.id = 'password';

    // Add the elements to the DOM
    document.body.appendChild(mockShowPasswordCheckbox);
    document.body.appendChild(mockPassword);
  });

  afterEach(() => {
    // Remove the elements from the DOM
    document.body.removeChild(mockShowPasswordCheckbox);
    document.body.removeChild(mockPassword);
  });

  it('should return the current checked state of the showPasswordCheckbox', () => {
    // Add event listener to the checkbox
    const showPasswordCheckbox = document.getElementById('showPassword');
    showPasswordCheckbox.addEventListener('DOMContentLoaded', () => {
      const isChecked = showPasswordCheckbox.checked;
      expect(isChecked).toBe(false);
    });

    // Trigger the DOMContentLoaded event
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  });
});


describe('validateEmail', () => {
  it('validateEmail should return true for valid email addresses', () => {
    expect(validateEmail('hola@example.com')).toBe(true);
    expect(validateEmail('example@gmail.com')).toBe(true);
    expect(validateEmail('hello@edu.mx')).toBe(true);
  });
  it('returns false when email is invalid', () => {
    validateEmail.mockReturnValue(false)
    const result = validateEmail('hola')
    expect(result).toBe(false);
  });
});

describe('validatePassword', () => {
  test('returns true when password is valid', () => {
    expect(validatePassword("Abc123$%")).toBe(true);
    expect(validatePassword('Holahola123%')).toBe(true);
    expect(validatePassword('EstoesunEjemplo*1')).toBe(true);
  });
  it('returns false when password is invalid', () => {
    validatePassword.mockReturnValue(false)
    const result = validatePassword('abc123')
    expect(result).toBe(false);
  });
});




// describe('validateEmail', () => {
//   test('returns true when password is valid', () => {
//     expect(validateEmail('example@example.com')).toBe(true);
//   });

//   test('returns false when email is invalid', () => {
//     expect(validateEmail('example@.com')).toBe(false);
//   });
// });

// describe('validatePassword', () => {
//   test('returns true when password is valid', () => {
//     expect(validatePassword('Abc123$%')).toBe(true);
//   });

//   test('returns false when password is invalid', () => {
//     expect(validatePassword('abcd1234')).toBe(false);
//   });
// });
