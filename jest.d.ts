import "@testing-library/jest-dom";

// Ini akan memperluas matchers Jest untuk mengenali 'toBeInTheDocument' dan lainnya
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}
