import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

// Aktifkan mock fetch secara global
fetchMock.enableMocks();

// Reset mocks sebelum setiap test
beforeEach(() => {
  fetchMock.resetMocks();
});
