import React from 'react';
import ReactDOM from 'react-dom/client';

import ReactPageLayout from './ReactPageLayout';
import Header from './Header';



const root = ReactDOM.createRoot(document.body);
root.render(
    <ReactPageLayout>
        <Header />
    </ReactPageLayout>
)