import { useParams } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";
import NotFound from "./NotFound";
import Seo from "../../components/seo/Seo";
import ArticleDoc, { type Article } from "../../components/insights/ArticleDoc";
import { articleSchema, breadcrumbSchema } from "../../components/seo/schema";
import InsightsData from "../../jsonData/insights/InsightsData.json";

const InsightDetails = () => {
    const { slug } = useParams();
    const article = (InsightsData as Article[]).find((a) => a.slug === slug);

    if (!article) return <NotFound />;

    const path = `/insights/${article.slug}`;

    return (
        <>
            <Seo
                path={path}
                schema={[
                    articleSchema({
                        headline: article.title,
                        description: article.description,
                        path,
                        image: `/images/had/${article.image}`,
                        published: article.published,
                        updated: article.updated,
                    }),
                    breadcrumbSchema([
                        { name: "Insights", path: "/insights" },
                        { name: article.title, path },
                    ]),
                ]}
            />
            <HeaderV1 />
            <BreadCrumb
                image={article.image}
                objectPosition="center 45%"
                eyebrow={article.eyebrow}
                pageTitle={article.title}
                subtitle={article.summary}
                breadcrumb="Insights"
            />
            <div className="te-pt-120 te-pb-120">
                <ArticleDoc article={article} />
            </div>
            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default InsightDetails;
