import { ChangeEvent, ReactNode, useId, useRef, useState } from "react"

type IconName = "alert" | "attach" | "chevron" | "document" | "download" | "plus" | "send" | "shield" | "thumb" | "user"

function Icon({ name, className = "" }: { name: IconName className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    alert: (
      <>
        <path d="M12 3 2.7 19h18.6L12 3Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
    attach: (
      <path d="m20.5 11.5-8.8 8.8a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 1 1 5.7 5.7l-9.2 9.2a2 2 0 1 1-2.8-2.8l8.5-8.5" />
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    document: (
      <>
        <path d="M6 2.8h8l4 4V21H6V2.8Z" />
        <path d="M14 3v4h4M9 12h6M9 16h6" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    send: <path d="m21 3-8.5 18-2.2-7.3L3 11.5 21 3Zm-10.7 10.7L21 3" />,
    shield: (
      <path d="M12 2.8 20 6v5.5c0 4.9-3.4 8.5-8 10.2-4.6-1.7-8-5.3-8-10.2V6l8-3.2Z" />
    ),
    thumb: (
      <path d="M7 10v11H3V10h4Zm0 9h9.4a2 2 0 0 0 2-1.6l1.4-7a2 2 0 0 0-2-2.4H14l.6-3.1A2.4 2.4 0 0 0 12.2 2L7 10v9Z" />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

const question =
  "Will the Minister of Communications be pleased to state: (a) whether the implementation framework of the revised BharatNet project has been implemented across the country and if so, the details of State-wise progress achieved under it up to June 2026; (b) the details of optical fibre infrastructure developed under the BharatNet project, including the number of connected Gram Panchayats and the expansion of optical fibre network, so far; and (c)the measures taken for rapid expansion of indigenous 4G and 5G networks, including the progress achieved therein?"

const answerParts = [
  {
    label: "Part (a)",
    text: "The Amended BharatNet Programme is implemented in the following two models across the country: BSNL-led model, which covers 1,67,727 Gram Panchayats in 21 States and 5 Union territories; and State-led model, which covers 97,336 Gram Panchayats in 7 States. As of 30.6.2026, a total 43,908 km of optical fibre cable have been laid and a total of 13,494 Gram Panchayats have been upgraded under the programme. Details are at Annex.",
  },
  {
    label: "Part (b)",
    text: "In BharatNet Phases I and II, 6.95 lakh km of optical fibre cable were laid and 2.15 lakh Gram Panchayats were connected across the country.",
  },
  {
    label: "Part (c)",
    text: "Under the Atmanirbhar Bharat initiative, BSNL provides 4G mobile services across the country by using indigenous 4G Base Transceiver Stations (BTSs). The equipment is upgradable to 5G from the technology perspective. As of 30.6.2026, BSNL has installed 97,013 indigenous-technology-based 4G BTSs across the country. Annex referred to in the reply to part",
  },
]

function Badge({
  children,
  tone,
}: {
  children: ReactNode
  tone: "success" | "warning" | "neutral"
}) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

function NestedSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <section className="nested-section">
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="nested-section__trigger"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span>{title}</span>
        <Icon
          className={`chevron ${open ? "chevron--open" : ""}`}
          name="chevron"
        />
      </button>
      {open && (
        <div className="nested-section__body" id={panelId}>
          {children}
        </div>
      )}
    </section>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand">
        <span className="brand__mark">
          <Icon name="shield" />
        </span>
        <div>
          <strong>Assurance Detection</strong>
          <span>Parliamentary review</span>
        </div>
      </div>
      <button className="new-review" type="button">
        <Icon name="plus" /> New Parliamentary Review
      </button>
      <div className="sidebar__section">
        <p className="sidebar__label">Previous chats</p>
        <button className="chat-item" type="button">
          <Icon name="document" />
          <span>RSSQ No. 128.docx</span>
        </button>
      </div>
      <div className="sidebar__bottom">
        <button className="instructions" type="button">
          <Icon name="document" /> View Parliamentary Instructions
        </button>
        <div className="account">
          <Icon name="user" /> <strong>dharmendra singh</strong>
        </div>
        <button className="sign-out" type="button">
          Sign out
        </button>
      </div>
    </aside>
  )
}

function QuestionCard() {
  const [open, setOpen] = useState(true)
  const panelId = useId()

  return (
    <article className="question-card">
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="question-card__header"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <div className="question-card__number">
          <span>Question</span>
          <strong>Q. 128</strong>
        </div>
        <div className="question-card__summary">
          <p>{question}</p>
          <div className="question-card__meta">
            <span>
              <Icon name="document" /> RSSQ No. 128.docx
            </span>
            <Badge tone="warning">
              <Icon name="alert" /> Review Required
            </Badge>
          </div>
        </div>
        <div className="question-card__state">
          <Badge tone="success">Completed</Badge>
          <span className="view-details">
            {open ? "Hide details" : "View details"}
          </span>
        </div>
        <Icon
          className={`chevron ${open ? "chevron--open" : ""}`}
          name="chevron"
        />
      </button>

      {open && (
        <div className="question-card__content" id={panelId}>
          <section className="question-section">
            <p className="eyebrow">Question</p>
            <p>{question}</p>
          </section>

          <NestedSection defaultOpen title="Draft Answer Sent to Model">
            <div className="answer-parts">
              {answerParts.map((part) => (
                <div className="answer-part" key={part.label}>
                  <span>{part.label}</span>
                  <p>{part.text}</p>
                </div>
              ))}
            </div>
          </NestedSection>

          <NestedSection defaultOpen title="Assessment / Review Report">
            <div className="review-content">
              <div className="review-status">
                <span className="review-label">Review status</span>
                <Badge tone="warning">
                  <Icon name="alert" /> Review Required
                </Badge>
              </div>
              <div className="highlighted-answer">
                <div className="content-heading">
                  <Icon name="document" /> Highlighted Answer
                </div>
                <p>
                  (a): The Amended BharatNet Programme is implemented in the
                  following two models across the country:{" "}
                  <mark>
                    BSNL-led model, which covers 1,67,727 Gram Panchayats in 21
                    States and 5 Union territories; and State-led model, which
                    covers 97,336 Gram Panchayats in 7 States.
                  </mark>{" "}
                  As of 30.6.2026, a total 43,908 km of optical fibre cable have
                  been laid and a total of 13,494 Gram Panchayats have been
                  upgraded under the programme. Details are at Annex.
                </p>
              </div>
              <div className="feedback">
                <span className="review-label">Feedback</span>
                <div className="feedback__actions">
                  <button disabled type="button">
                    <Icon name="thumb" /> Helpful
                  </button>
                  <button disabled type="button">
                    <Icon name="alert" /> Incorrect Analysis
                  </button>
                  <Badge tone="success">Helpful feedback submitted</Badge>
                </div>
              </div>
            </div>
          </NestedSection>

          <section className="compact-section">
            <p className="eyebrow">Status</p>
            <div className="status-row">
              <div>
                <span>Processing status</span>
                <Badge tone="success">Completed</Badge>
              </div>
              <div>
                <span>Assurance</span>
                <Badge tone="warning">
                  <Icon name="alert" /> Review Required
                </Badge>
              </div>
            </div>
          </section>

          <section className="compact-section action-items">
            <p className="eyebrow">Action Items</p>
            <p>No action items available.</p>
          </section>
        </div>
      )}
    </article>
  )
}

function Composer() {
  const [parliamentQuestion, setParliamentQuestion] = useState("")
  const [draftReply, setDraftReply] = useState("")
  const [fileName, setFileName] = useState("")
  const [fileError, setFileError] = useState("")
  const fileInput = useRef<HTMLInputElement>(null)
  const canSubmit =
    parliamentQuestion.trim().length > 0 && draftReply.trim().length > 0

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const extension = file.name.split(".").pop()?.toLowerCase()
    const allowed = ["pdf", "xls", "xlsx", "doc", "docx"]
    if (!extension || !allowed.includes(extension)) {
      setFileName("")
      setFileError("Please select a PDF, Excel, or Word file.")
      event.target.value = ""
      return
    }
    setFileError("")
    setFileName(file.name)
  }

  return (
    <section className="composer" aria-labelledby="composer-title">
      <div className="composer__heading">
        <div>
          <h2 id="composer-title">Add Question &amp; Draft Answer</h2>
        </div>
      </div>
      <div className="composer__fields">
        <label className="field">
          <span>Parliamentary Question</span>
          <textarea
            onChange={(event) => setParliamentQuestion(event.target.value)}
            placeholder="Parliament Question"
            rows={4}
            value={parliamentQuestion}
          />
        </label>
        <label className="field">
          <span>Draft Reply</span>
          <textarea
            maxLength={30000}
            onChange={(event) => setDraftReply(event.target.value)}
            placeholder="Please paste draft reply."
            rows={7}
            value={draftReply}
          />
          <span className="field__help">
            <span>Maximum 30,000 characters</span>
            <span>{draftReply.length.toLocaleString()} / 30,000</span>
          </span>
        </label>
      </div>
      <div className="composer__actions">
        <div className="attachment">
          <input
            accept=".pdf,.xls,.xlsx,.doc,.docx"
            aria-label="Add PDF, Excel, or Word files"
            onChange={selectFile}
            ref={fileInput}
            type="file"
          />
          <button onClick={() => fileInput.current?.click()} type="button">
            <Icon name="attach" />
            <span>{fileName || "Add PDF, Excel, or Word files"}</span>
          </button>
          {fileError && (
            <span className="attachment__error" role="alert">
              {fileError}
            </span>
          )}
        </div>
        <div className="composer__buttons">
          <button
            className="button button--secondary"
            disabled={!canSubmit}
            type="button"
          >
            View Similar
          </button>
          <button
            className="button button--primary"
            disabled={!canSubmit}
            type="button"
          >
            Analyze <Icon name="send" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-area">
        <header className="topbar">
          <h1>Parliament Assurance Assistant</h1>
          <div className="topbar__actions">
            <button className="button button--secondary" type="button">
              <Icon name="download" /> Export User Feedback
            </button>
            <button className="button button--primary" type="button">
              User Management
            </button>
          </div>
        </header>
        <main>
          <div className="document-pill">
            <Icon name="document" /> RSSQ No. 128.docx
          </div>
          <section className="review-heading">
            <div>
              <p className="eyebrow">Parliamentary review</p>
              <h2>Document Q&amp;A Review</h2>
              <p>1 Q&amp;A pair extracted from RSSQ No. 128.docx</p>
            </div>
            <Badge tone="success">Completed</Badge>
          </section>
          <section className="progress-card" aria-label="Processing progress">
            <div>
              <span>Completed 1 / 1</span>
              <span>Failed 0</span>
            </div>
            <div className="progress-track">
              <span />
            </div>
          </section>
          <section className="question-list" aria-label="Questions">
            <QuestionCard />
          </section>
          <Composer />
        </main>
      </div>
    </div>
  )
}
