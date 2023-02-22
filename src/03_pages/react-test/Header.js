import React, { useState } from 'react';
import './header.scss';

export default function Header() {
    let [a, setA] = useState(0);
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__user"></div>
            </div>
        </header>
    )
}
