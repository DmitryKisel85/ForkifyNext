const Bookmarks = () => {
    return (
        <div className="bookmarks">
            <ul className="bookmarks__list">
                <div className="message">
                    <div>
                        <svg>
                            <use href="src/img/icons.svg#icon-smile"></use>
                        </svg>
                    </div>
                    <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
                </div>
            </ul>
        </div>
    );
};

export default Bookmarks;
