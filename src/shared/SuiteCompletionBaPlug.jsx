import React from 'react'

const BA_ONLINE_HREF = 'https://beastacademy.com/online'

/** Beast Academy promo under completion-modal actions (suite games + All Ten results). */
export default function SuiteCompletionBaPlug() {
  return (
    <div className="suite-completion-ba-plug">
      <p className="suite-completion-ba-plug-lead">Love puzzles?</p>
      <p className="suite-completion-ba-plug-copy">
        Find thousands more in our complete curriculum
        <br />
        for aspiring math beasts ages 6-13.
      </p>
      <a
        className="suite-completion-ba-plug-cta"
        id="suite-completion-ba-online-link"
        href={BA_ONLINE_HREF}
        target="_blank"
        rel="noreferrer"
      >
        BeastAcademy.com
      </a>
    </div>
  )
}
