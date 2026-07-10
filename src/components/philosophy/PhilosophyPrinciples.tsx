import PrinciplesData from '../../jsonData/philosophy/PrinciplesData.json';
import { motion } from "framer-motion";

type Principle = {
    id: number;
    icon: string;
    title: string;
    text: string;
};

interface PhilosophyPrinciplesProps {
    style?: string;
    showHeader?: boolean;
    id?: string;
}

/**
 * Operating Philosophy — the five principles that govern how HAD develops and
 * runs programs (See First · Signal Fast · Sustain the Watch · Preserve
 * Authority · Scale Through Evidence). Reused on the home page (with header)
 * and the Approach page (header suppressed).
 */
const PhilosophyPrinciples = ({ style = "", showHeader = true, id }: PhilosophyPrinciplesProps) => {
    return (
        <>
            <div className={`why-choose-area style-1 background-gray-700 te-py-120 had-philosophy ${style}`} id={id}>
                <div className="container">
                    {showHeader && (
                        <div className="row">
                            <div className="col-12">
                                <div className="te-section-title justify-content-center text-center">
                                    <div className="te-section-content">
                                        <div className="short-title-wrapper">
                                            <span className="short-title text-white">Operating Philosophy</span>
                                        </div>
                                        <h2 className="title text-white">
                                            See first. Signal fast. <br /> Sustain the watch.
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="row gy-4">
                        {(PrinciplesData as Principle[]).map((item, index) => {
                            const delay = index * 0.12;
                            return (
                                <motion.div
                                    key={item.id}
                                    className="col-md-6 col-lg-4"
                                    initial={{ opacity: 0, y: 36 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ delay, duration: 0.55, ease: "easeOut" }}
                                >
                                    <div className="had-principle-card">
                                        <div className="had-principle-top">
                                            <span className="had-principle-icon">
                                                <i className={item.icon} aria-hidden="true" />
                                            </span>
                                            <span className="had-principle-index">
                                                {String(item.id).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <h3 className="had-principle-title">{item.title}</h3>
                                        <p className="had-principle-text">{item.text}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhilosophyPrinciples;
