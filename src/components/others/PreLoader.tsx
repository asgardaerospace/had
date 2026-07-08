const PreLoader = () => {
    return (
        <>
            {/* Preloader Start !*/}
            <div id="preloader">
                <div id="preloader-status">
                    <div className="preloader-image">
                        <img
                            src="../../images/icon/preloader.gif" alt="preeloader"
                            width={64}
                            height={64}
                        />
                    </div>
                </div>
            </div>
            {/* Preloader End !*/}
        </>

    );
};

export default PreLoader;