import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';
import { request } from 'graphql-request';
import { useEffect, useState } from 'react';

//Components
import ImageList from '../components/ImageList'

const query = `
{
    launchesPast {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
      }
      ships {
        name
        home_port
        image
      }
    }
  }  
`;

function Post() {
    const router = useRouter();
    const count: number = +router.query.id

    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        request("http://localhost:4000/", query).then((data) => {
            setLaunches(data.launchesPast);
        });
    }, []);

    return (
        <>
            <div className={styles.card}>
                <h2>{launches[count]?.mission_name}</h2>
                <hr />
                <small>{launches[count]?.launch_date_local}</small>
                <h3>{launches[count]?.launch_site.site_name_long}</h3>
                <p>
                    <a href={launches[count]?.links.article_link} className={styles.link}>
                        Read Article
            </a>
            &nbsp;|&nbsp;
            <a href={launches[count]?.links.video_link} className={styles.link}>
                        Watch Footage
            </a>
                </p>

                <p>
                    <span className={styles.bold}>Rocket:</span> {launches[count]?.rocket.rocket_name}
                    <br />
                    <span className={styles.bold}>Flights:</span> {launches[count]?.rocket.first_stage.cores[0].flight}
                    <br />
                    <span className={styles.bold}>Reuse count:</span> {launches[count]?.rocket.first_stage.cores[0].core.reuse_count}
                    <br />
                    <span className={styles.bold}>Status:</span> {launches[count]?.rocket.first_stage.cores[0].core.status}
                </p>

                <ImageList ships={launches[count]?.ships}></ImageList>

                <Link
                    href={{
                        pathname: "/",
                    }}
                >
                    <a>Go Back</a>
                </Link>
            </div>
        </>
    );
}

export default Post
