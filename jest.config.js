module.exports = {
    moduleNameMapper: {
        "\\.(scss|css|sass)$": "identity-obj-proxy",
    },
    testEnvironment: 'jsdom',
    "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"],
};

