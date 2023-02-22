import React from 'react'

export default function ReactPageLayout({children}) {
    return (
        <main className="1">
            <section className="2">
                {children}
            </section>
        </main>
    )
}