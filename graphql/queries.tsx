export const query = `
{
    launchesPast(limit: 10, offset: 0) {
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
`

export function getSearchQuery(name: string){

    const searchQuery = `
    {
        launchesPast(find: {mission_name: "${name}"}, limit: 10) {
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
    `

    return searchQuery
}