import React from 'react'
import SharedModalShell from './SharedModalShell.jsx'
import { MODAL_INTENTS } from '../../shared-contracts/modalIntents.js'
import { ALLTEN_LINK_TARGETS, CHROME_ASSET_URLS } from '../../shared-contracts/chromeUi.js'

function isNowSchoolTime() {
    const date = new Date()
    const hour = date.getHours()
    const day = date.getDay()
    return hour >= 7 && hour < 16 && day !== 0 && day !== 6
}

export default function AllTenLinksModal({ show, onClose }) {
    const schoolTime = isNowSchoolTime()
    const href = schoolTime ? ALLTEN_LINK_TARGETS.SCHOOL : ALLTEN_LINK_TARGETS.HOME

    return (
        <SharedModalShell show={show} onClose={onClose} intent={MODAL_INTENTS.LINKS}>
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
                        src={CHROME_ASSET_URLS.LINKS_MODAL_IMAGE}
                        alt="Beast Academy books with laptop"
                    />
                </div>
            </div>
        </SharedModalShell>
    )
}

