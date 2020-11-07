import { useRouter } from 'next/router';
import Link from 'next/link'

//React
import React from 'react'
import { useEffect, useState } from 'react'

//Styles
import styles from '../styles/Home.module.css'

//Components
import ImageList from '../components/ImageList'

//GraphQL
import { request } from 'graphql-request'
import { getSearchQuery } from '../graphql/queries'

function Post() {
  const router = useRouter();

  var name = router.query.name.toString()
  //bad request if query have '()' in the string so using this to bypass
  if (name.indexOf("(") > 0) {
    name = name.substring(0, +name.indexOf("(") - 1);
  }

  const searchQuery = getSearchQuery(name);

  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    request("https://api.spacex.land/graphql/", searchQuery).then((data) => {
      setLaunches(data.launchesPast);
    });
  }, []);

  return (
    <>
      <div className={styles.card}>
        <h2>{launches[0]?.mission_name}</h2>
        <hr />
        <small>{launches[0]?.launch_date_local}</small>
        <h3>{launches[0]?.launch_site.site_name_long}</h3>
        <p>
          <a href={launches[0]?.links.article_link} className={styles.link}>
            Read Article
            </a>
            &nbsp;|&nbsp;
            <a href={launches[0]?.links.video_link} className={styles.link}>
            Watch Footage
            </a>
        </p>

        <p>
          <span className={styles.bold}>Rocket:</span> {launches[0]?.rocket.rocket_name}
          <br />
          <span className={styles.bold}>Flights:</span> {launches[0]?.rocket.first_stage.cores[0].flight}
          <br />
          <span className={styles.bold}>Reuse count:</span> {launches[0]?.rocket.first_stage.cores[0].core.reuse_count}
          <br />
          <span className={styles.bold}>Status:</span> {launches[0]?.rocket.first_stage.cores[0].core.status}
        </p>

        <ImageList ships={launches[0]?.ships}></ImageList>

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
