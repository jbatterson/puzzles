import React from 'react'
import SharedModalShell from './SharedModalShell.jsx'

function isNowSchoolTime() {
    const date = new Date()
    const hour = date.getHours()
    const day = date.getDay()
    return hour >= 7 && hour < 16 && day !== 0 && day !== 6
}

export default function AllTenLinksModal({ show, onClose }) {
    const schoolTime = isNowSchoolTime()
    const href = schoolTime ? 'https://beastacademy.com/educators' : 'https://beastacademy.com/online'

    return (
        <SharedModalShell show={show} onClose={onClose} closeAriaLabel="Close links">
            <div className="allten-links-wrap">
                <h1 className="title allten-links-title">Beast Academy</h1>
                <div className="allten-links-card">
                    <p className="allten-links-copy">
                        {schoolTime
                            ? 'Looking for more fun and challenging math activities for your classroom?'
                            : 'Looking for more fun and challenging math activities for your student?'}
                    </p>
                    <a className="btn-primary allten-links-btn" href={href} target="_blank" rel="noreferrer">
                        Learn More
                    </a>
                    <img
                        className="allten-links-image"
                        src="https://beastacademy.com/assets/wf/images/laptop-2.png"
                        alt="Beast Academy books with laptop"
                    />
                </div>
            </div>
        </SharedModalShell>
    )
}

