import { types, cast } from 'mobx-state-tree'

export interface launchesPast {
    mission_name: string;
    launch_date_local: string;
    launch_site: LaunchSite;
    links: Links;
    rocket: Rocket;
    ships: Ship[];
  }
  
  export interface LaunchSite {
    site_name_long: string;
  }
  
  export interface Links {
    article_link: string;
    video_link: string;
  }
  
  export interface Rocket {
    rocket_name: string;
    first_stage: FirstStage;
  }
  
  export interface FirstStage {
    cores: Core[];
  }
  
  export interface Core {
    flight: number;
    core: Core2;
  }
  
  export interface Core2 {
    reuse_count: number;
    status: string;
  }
  
  export interface Ship {
    name: string;
    home_port: string;
    image: string;
  }
  

// const launchesPast = 
//     types.model({
//         mission_name: types.string,
//         launch_date_local: types.string,
//         launch_site: types.model({
//             site_name_long: types.string
//         }),
//         links: types.model({
//             article_link: types.string,
//             video_link: types.string
//         }),
//         rocket: types.model({
//             rocket_name: types.string,
//             first_stage: types.model({
//                 cores: types.array(
//                     types.model({
//                         flight: types.number,
//                         core: types.model({
//                             reuse_count: types.number,
//                             status: types.string
//                         })
//                     })
//                 )
//             })
//         }),
//         ships: types.array(
//             types.model({
//                 name: types.string,
//                 home_port: types.string,
//                 image: types.string
//             })
//         )
//     })
// );

const missionDetail = types.model({
    mission_name: types.string,
    launch_date_local: types.string,
    launch_site: types.model({
        site_name_long: types.string
    }),
    links: types.model({
        article_link: types.maybeNull(types.string),
        video_link: types.string
    }),
    rocket: types.model({
        rocket_name: types.string,
        first_stage: types.model({
        cores: types.array(
            types.model({
            flight: types.number,
            core: types.model({
                reuse_count: types.number,
                status: types.string
            })
            })
        )
        })
    }),
    ships: types.array(
        types.model({
            name: types.string,
            home_port: types.string,
            image: types.string
        })
    )
});
  
const launchesPasts = types
.model({
    launchesPast: types.array(missionDetail)
})
.actions((self) => ({
    setData(data: Array<launchesPast>) {
        self.launchesPast = cast(data);
    }
}))
.views(self => ({
    showAll() {
        return self.launchesPast;
    }
}));

export default launchesPasts;