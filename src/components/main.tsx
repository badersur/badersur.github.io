import React from 'react';

import { MainProps } from '../types';

const Main = ({ children }: MainProps) => (
    <main className="Main">
        <div className="Content-wrapper">{children}</div>
    </main>
);

export default Main;
