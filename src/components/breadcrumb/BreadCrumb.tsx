import { Link } from "react-router-dom";

type BreadCrumbProps = {
    pageTitle?: string;
    breadcrumb?: string;
};

const BreadCrumb = ({ pageTitle, breadcrumb }: BreadCrumbProps) => {
    return (
        <>
            {/* Page Header Start !*/}
            <div className="page-breadcrumb-area had-breadcrumb">
                <div className="page-bg">
                    <div className="page-overlay" style={{ backgroundColor: "transparent" }} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumb-wrapper">
                                <div className="page-heading">
                                    <h3 className="te-page-title">{pageTitle ? pageTitle : "404 Page not Found"}</h3>
                                </div>
                                <div className="breadcrumb-list">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li className="active">{breadcrumb ? breadcrumb : "Error-Page"}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End !*/}
        </>
    );
};

export default BreadCrumb;