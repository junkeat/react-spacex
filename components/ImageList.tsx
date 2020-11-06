import styles from '../styles/Home.module.css'

function ImageList(props) {
    const { ships } = props;

    return <div className={styles.image_container}>{
        ships && ships.map((i, index) => {
            return <img src={i.image} className={styles.ship_image} key={index}></img>
        })
    }</div>
}

export default ImageList;