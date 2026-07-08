import CapabilityAreasData from '../../jsonData/programs/CapabilityAreas.json';
import { motion } from "framer-motion";

type CapabilityItem = {
    id: number;
    icon: string;
    title: string;
    text: string;
    image: string;
};

interface CapabilityAreasProps {
    style?: string;
}

/**
 * Capability Areas — the categories of national-security problem HAD builds
 * programs around. Static informational cards (no outbound links); the
 * program portfolio is reached from the nav and the featured-program band.
 */
const CapabilityAreas = ({ style = '' }: CapabilityAreasProps) => {
    return (
        <>
            <div className={`feature-area style-1 ${style}`}>
                <div className="container">
                    <div className="row">
                        <motion.div
                            className="col-12"
                            initial={{ y: -40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.1, duration: 1.2, ease: "easeOut" }}
                        >
                            <div className="te-section-title justify-content-center text-center">
                                <div className="te-section-content">
                                    <div className="short-title-wrapper">
                                        <span className="short-title">Capability Areas</span>
                                    </div>
                                    <h2 className="title">
                                        The mission requirements <br /> HAD builds programs around
                                    </h2>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="row gy-4">
                        {(CapabilityAreasData as CapabilityItem[]).map((item, index) => {
                            const delay = index * 0.15;
                            return (
                                <motion.div
                                    key={item.id}
                                    className="col-md-6 col-lg-4"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ delay, duration: 0.6, ease: "easeOut" }}
                                >
                                    <div className="had-capability-card">
                                        <div className="had-capability-media">
                                            <img
                                                src={`/images/had/${item.image}`}
                                                alt=""
                                                loading="lazy"
                                            />
                                            <div className="had-capability-icon">
                                                <i className={item.icon} />
                                            </div>
                                        </div>
                                        <div className="had-capability-body">
                                            <h3 className="had-capability-title">{item.title}</h3>
                                            <p className="had-capability-text">{item.text}</p>
                                        </div>
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

export default CapabilityAreas;
