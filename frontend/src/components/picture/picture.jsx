import './picture.css';

const Picture = props => {
    if (!props.account) {
        return <div>No account ???</div>
    }
    const picture = props.account.picture;
    if (!picture) {
        return <div>No Image.</div>
    }
    const url = picture.startsWith('data:') ? picture : (
        `http://localhost:8000/uploads/uploads/${picture.match(/([^\/])+$/)[0]}`
    )
    return <img
        src={url}
        className="profile-image"
        style={{
            maxHeight: `${props.size}px`,
            maxWidth: `${props.size}px`
        }}
    />;
};

Picture.defaultProps = {
    size: 200
};

export default Picture;
