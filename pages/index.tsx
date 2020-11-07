import Head from 'next/head'
import Link from 'next/link'

//React
import React from 'react'
import { useEffect, useState } from 'react'

//Styles
import styles from '../styles/Home.module.css'

//Mobx
import { observer } from 'mobx-react'
import launchesModel from '../models/launchesPasts'

import { Button } from 'react-bootstrap'

//Components
import ImageList from '../components/ImageList'

//GraphQL
import { request } from 'graphql-request'
import { query, getSearchQuery } from '../graphql/queries'

const Index = () => {

  const [count, setCount] = useState(0);
  const [launches, setLaunches] = useState([]);
  const [update, setUpdate] = useState(0);

  //const missions = launchesModel.create();

  useEffect(() => {
    request('https://api.spacex.land/graphql/', query).then((data) => {
      setLaunches(data.launchesPast);
      //missions.setData(data.launchesPast);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>SpaceX Launches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.search_container}>
        <label>
          Search
          <input type="text" placeholder="mission name" onChange={(e) => {
            const searchQuery = getSearchQuery(e.target.value)
            request('https://api.spacex.land/graphql/', searchQuery).then((data) => {
              setLaunches(data.launchesPast);
              setCount(0);
            });
          }} />
        </label>
      </div>

      <div className={styles.container}>
        <h1>SpaceX Launches</h1>

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
              pathname: "/post",
              query: { name: launches[count]?.mission_name }
            }}
          >
            <a>More Info</a>
          </Link>

          <div className={styles.button_container}>

            <Button variant="danger" onClick={() => {
              const index = launches.indexOf(launches[count])
              if (index > -1) {
                var x = launches;
                x.splice(index, 1);
                setLaunches(x);
                setCount(0);
                setUpdate(update + 1);
              }
            }}>Delete</Button>
          </div>

          <div className={styles.button_container}>
            <Button variant="outline-primary" onClick={() => {
              if (count > 0) {
                setCount(count - 1)
              }
            }}>Previous</Button>

            <span>{count + 1} of {launches.length}</span>

            <Button variant="outline-primary" onClick={() => {
              if (launches.length - 1 > count) {
                setCount(count + 1)
              }
            }}>Next</Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default observer(Index)