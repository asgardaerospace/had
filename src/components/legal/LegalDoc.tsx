export type LegalBlock =
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] };

export type LegalSection = {
    heading: string;
    blocks: LegalBlock[];
};

type LegalDocProps = {
    /** Human-readable revision date, e.g. "July 10, 2026". */
    updated: string;
    /** Lead paragraphs shown above the numbered sections. */
    intro: string[];
    sections: LegalSection[];
};

/**
 * Shared renderer for the plain-language legal pages (Privacy Policy, Terms of
 * Use). Content is passed in as data so both pages stay visually consistent.
 * The copy is standard corporate boilerplate and should be reviewed by counsel
 * before launch.
 */
const LegalDoc = ({ updated, intro, sections }: LegalDocProps) => {
    return (
        <section className="had-legal te-pt-120 te-pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9">
                        <p className="had-legal-updated">Last updated: {updated}</p>
                        {intro.map((text, i) => (
                            <p className="had-legal-lead" key={i}>{text}</p>
                        ))}
                        {sections.map((section, i) => (
                            <div className="had-legal-section" key={i}>
                                <h2 className="had-legal-heading">
                                    <span className="had-legal-num">{i + 1}.</span> {section.heading}
                                </h2>
                                {section.blocks.map((block, j) =>
                                    block.type === "p" ? (
                                        <p key={j}>{block.text}</p>
                                    ) : (
                                        <ul className="had-legal-list" key={j}>
                                            {block.items.map((item, k) => (
                                                <li key={k}>{item}</li>
                                            ))}
                                        </ul>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LegalDoc;
