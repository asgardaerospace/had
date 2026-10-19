import { Link } from "react-router-dom";

export type ArticleBlock =
    | { type: "lead"; text: string }
    | { type: "p"; text: string }
    | { type: "note"; text: string }
    | { type: "ul"; items: string[] };

export type ArticleSection = { heading?: string; blocks: ArticleBlock[] };

export type Article = {
    slug: string;
    title: string;
    seoTitle: string;
    description: string;
    eyebrow: string;
    summary: string;
    published: string;
    updated: string;
    image: string;
    imageAlt: string;
    readMinutes: number;
    sections: ArticleSection[];
    cta: { text: string; label: string; to: string };
    related: { label: string; to: string }[];
};

const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });

/**
 * Renders an insights article from structured content.
 *
 * Articles are stored as data rather than JSX so that the visible prose, the
 * meta description, and the Article structured data are all generated from one
 * source and cannot drift apart. Same reasoning as entityAnswers.ts.
 *
 * Published and updated dates are shown. Search and AI retrieval systems both
 * weight currency, and a technical piece with no date is harder to trust.
 */
const ArticleDoc = ({ article }: { article: Article }) => {
    return (
        <article className="had-article">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="had-article-meta">
                            <span>{formatDate(article.published)}</span>
                            <span className="had-article-meta-sep" aria-hidden="true">/</span>
                            <span>{article.readMinutes} min read</span>
                            {article.updated !== article.published && (
                                <>
                                    <span className="had-article-meta-sep" aria-hidden="true">/</span>
                                    <span>Updated {formatDate(article.updated)}</span>
                                </>
                            )}
                        </div>

                        {article.sections.map((section, si) => (
                            <section key={si} className="had-article-section">
                                {section.heading && (
                                    <h2 className="had-article-heading">{section.heading}</h2>
                                )}
                                {section.blocks.map((block, bi) => {
                                    if (block.type === "lead")
                                        return <p key={bi} className="had-article-lead">{block.text}</p>;
                                    if (block.type === "note")
                                        return <div key={bi} className="had-authority-note">{block.text}</div>;
                                    if (block.type === "ul")
                                        return (
                                            <ul key={bi} className="had-article-list">
                                                {block.items.map((item, ii) => <li key={ii}>{item}</li>)}
                                            </ul>
                                        );
                                    return <p key={bi} className="had-article-p">{block.text}</p>;
                                })}
                            </section>
                        ))}

                        <div className="had-article-cta">
                            <p>{article.cta.text}</p>
                            <Link to={article.cta.to} className="te-theme-btn">
                                {article.cta.label}
                                <i className="fa fa-solid fa-arrow-right" />
                            </Link>
                        </div>

                        <div className="had-article-related">
                            <h2 className="had-article-related-title">Related</h2>
                            <ul>
                                {article.related.map((r) => (
                                    <li key={r.to}>
                                        <Link to={r.to} className="had-inline-link">{r.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleDoc;
