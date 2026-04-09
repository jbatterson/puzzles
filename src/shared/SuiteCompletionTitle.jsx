import React from 'react'

/** Centers headline under the floating modal close button (equal side tracks). */
export default function SuiteCompletionTitle({ children }) {
    return (
        <div className="suite-completion-title-wrap">
            <h2 className="suite-completion-title">{children}</h2>
        </div>
    )
}
