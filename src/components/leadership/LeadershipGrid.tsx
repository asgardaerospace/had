import LeadershipData from '../../jsonData/leadership/LeadershipData.json';
import { isPlaceholder } from '../../config/site';

type Member = {
    id: string;
    name: string;
    title: string;
    bio: string;
    photo: string | null;
};

type Group = {
    group: string;
    members: Member[];
};

/**
 * Leadership & Team grid, organized by category. Names, titles, and bios are
 * approved content; a headshot is shown when one is provided, otherwise a
 * neutral placeholder icon. No content is invented here.
 */
const LeadershipGrid = () => {
    return (
        <div className="team-area style-2 background-gray-700 te-pt-120 te-pb-120">
            <div className="container">
                {(LeadershipData as Group[]).map((group) => (
                    <div className="had-leader-group" key={group.group}>
                        <h2 className="had-leader-group-title">{group.group}</h2>
                        <div className="row gy-4 mb-5">
                            {group.members.map((m) => (
                                <div className="col-lg-6 col-md-6" key={m.id}>
                                    <div className="had-leader-card">
                                        <div
                                            className="had-leader-photo"
                                            role="img"
                                            aria-label={m.photo ? m.name : "Portrait placeholder"}
                                            style={{ backgroundImage: `url(${m.photo || "/images/had/leader-placeholder.jpg"})` }}
                                        />
                                        <div className="had-leader-body">
                                            <h3 className={`had-leader-name ${isPlaceholder(m.name) ? "had-placeholder" : ""}`}>{m.name}</h3>
                                            <p className="had-leader-title">{m.title}</p>
                                            <p className={`had-leader-bio ${isPlaceholder(m.bio) ? "had-placeholder" : ""}`}>{m.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadershipGrid;
