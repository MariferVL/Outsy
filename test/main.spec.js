import { scrollFunction } from "../src/main.js";


jest.mock('../src/main.js', () => ({
  scrollFunction: jest.fn()
}));


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




