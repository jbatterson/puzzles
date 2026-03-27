import React from 'react'

const base = import.meta.env.BASE_URL

export default function TopBar({ title, onHelp }) {
    return (
        <div className="titlebar">
            <div className="titlebar-content">
                <div className="titlebar-side titlebar-side-left">
                    <a href={base} className="titlebar-iconbtn" aria-label="Home">
                        <i className="fa-solid fa-house fa-sm" aria-hidden="true" />
                    </a>
                </div>

                <div className="titlebar-title" aria-label={title}>
                    <div className="titlebar-logoContainer" aria-hidden="true">
                        <img
                            className="titlebar-logo"
                            src="https://beastacademy.com/u/AllTen/beastacademy-logo.svg"
                            alt=""
                            loading="eager"
                        />
                    </div>
                    <h1 className="titlebar-text">{title}</h1>
                </div>

                <div className="titlebar-side titlebar-side-right">
                    <button type="button" className="titlebar-iconbtn" onClick={onHelp} aria-label="Help">
                        <i className="fas fa-question" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    )
}
