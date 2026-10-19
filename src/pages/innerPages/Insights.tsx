import { Link } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";
import Seo from "../../components/seo/Seo";
import { breadcrumbSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";
import InsightsData from "../../jsonData/insights/InsightsData.json";
import type { Article } from "../../components/insights/ArticleDoc";

/**
 * Insights index.
 *
 * Technical writing is the only realistic route to topical authority for a
 * company with one program in development: the primes do not publish against
 * these questions, so the long-tail is genuinely open. Each piece answers a
 * real procurement, engineering, or program question rather than existing to
 * fill a posting schedule.
 */
const Insights = () => {
    const meta = metaForPath("/insights");
    const articles = InsightsData as Article[];

    return (
        <>
            <Seo
                path="/insights"
                schema={[
                    webPageSchema({ path: "/insights", name: meta.title, description: meta.description }),
                    breadcrumbSchema([{ name: "Insights", path: "/insights" }]),
                ]}
            />
            <HeaderV1 />
            <BreadCrumb
                image="statement-dawn.jpg"
                objectPosition="center 45%"
                eyebrow="Insights"
                pageTitle="Insights"
                subtitle="Technical and program writing on persistent awareness, autonomy, and authority."
                breadcrumb="Insights"
            />

            <section className="had-context-section te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="short-title-wrapper">
                                <span className="short-title">Insights</span>
                            </div>
                            <h2 className="had-section-heading">
                                Questions worth answering properly
                            </h2>
                            <p className="had-context-lead">
                                Notes on the problems Hemisphere Aerospace Defense builds programs against:
                                what persistent coverage actually costs, how autonomous systems are supported
                                rather than relied upon, and where authority sits when infrastructure is
                                contractor operated. Written for program offices, engineers, and mission
                                owners.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="had-context-section te-pb-120">
                <div className="container">
                    <div className="row gy-4">
                        {articles.map((a) => (
                            <div className="col-lg-6" key={a.slug}>
                                <article className="had-insight-card">
                                    <Link to={`/insights/${a.slug}`} className="had-insight-media">
                                        <img
                                            src={`/images/had/${a.image}`}
                                            alt={a.imageAlt}
                                            loading="lazy"
                                        />
                                    </Link>
                                    <div className="had-insight-body">
                                        <span className="had-insight-eyebrow">{a.eyebrow}</span>
                                        <h3 className="had-insight-title">
                                            <Link to={`/insights/${a.slug}`}>{a.title}</Link>
                                        </h3>
                                        <p className="had-insight-summary">{a.summary}</p>
                                        <Link to={`/insights/${a.slug}`} className="had-inline-link">
                                            Read the piece
                                            <i className="fa fa-solid fa-arrow-right ms-2" aria-hidden="true" />
                                        </Link>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default Insights;
