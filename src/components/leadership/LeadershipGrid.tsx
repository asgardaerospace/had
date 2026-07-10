import LeadershipData from '../../jsonData/leadership/LeadershipData.json';

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
 * Leadership & Team grid, organized by group. All member content is a
 * clearly-marked placeholder: no invented names, titles, biographies,
 * prior service, clearances, awards, or affiliations.
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
                                <div className="col-lg-3 col-md-6" key={m.id}>
                                    <div className="had-leader-card">
                                        {m.photo ? (
                                            <div
                                                className="had-leader-photo"
                                                style={{ backgroundImage: `url(${m.photo})`, backgroundSize: "cover" }}
                                            />
                                        ) : (
                                            <div className="had-leader-photo" aria-label="Photo to be provided">
                                                <i className="fa-solid fa-user" />
                                            </div>
                                        )}
                                        <div className="had-leader-body">
                                            <h3 className="had-leader-name had-placeholder">{m.name}</h3>
                                            <p className="had-leader-title">{m.title}</p>
                                            <p className="had-leader-bio had-placeholder">{m.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <p className="had-placeholder" style={{ marginTop: 8 }}>
                    Leadership profiles will be published as approved information is provided.
                </p>
            </div>
        </div>
    );
};

export default LeadershipGrid;
