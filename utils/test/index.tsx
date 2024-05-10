import { Store } from '@reduxjs/toolkit';
import { createStore } from '@store/create-store';
import { RenderOptions, render as rtlRender } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';

let store: Store;

function render(
    ui: ReactElement,
    {
        initialState = {},
        ...renderOptions
    }: RenderOptions & { initialState?: any } = {}
) {
    store = createStore({ preloadedState: initialState });

    function Wrapper({ children }: { children: React.ReactNode }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, {
        wrapper: Wrapper,
        ...renderOptions,
    });
}

export * from '@testing-library/react';
export { render, store };
