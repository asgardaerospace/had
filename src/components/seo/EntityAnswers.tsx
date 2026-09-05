import type { EntityAnswer } from "../../config/entityAnswers";

type EntityAnswersProps = {
    heading: string;
    eyebrow?: string;
    intro?: string;
    items: EntityAnswer[];
    className?: string;
};

/**
 * Visible question-and-answer block.
 *
 * Paired with faqSchema() so the structured data always describes content a
 * visitor can actually read. Each answer is written to survive being lifted
 * out of the page on its own, which is what an AI retrieval system does with
 * it, and each question is a real heading rather than a collapsed accordion,
 * so the text is present in the served HTML without any interaction.
 */
const EntityAnswers = ({ heading, eyebrow, intro, items, className = "" }: EntityAnswersProps) => {
    return (
        <section className={`had-context-section ${className}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        {eyebrow && (
                            <div className="short-title-wrapper">
                                <span className="short-title">{eyebrow}</span>
                            </div>
                        )}
                        <h2 className="had-section-heading">{heading}</h2>
                        {intro && <p className="had-context-lead">{intro}</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9">
                        <dl className="had-entity-answers">
                            {items.map((item) => (
                                <div className="had-entity-answer" key={item.q}>
                                    <dt>
                                        <h3 className="had-entity-answer-q">{item.q}</h3>
                                    </dt>
                                    <dd>{item.a}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EntityAnswers;
