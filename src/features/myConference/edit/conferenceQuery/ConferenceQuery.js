import { gql } from '@apollo/client';
import ConferenceFragments from 'features/conferences/gql/queries/fragments'
import CommonFragments from 'features/common/fragments'
export const CONFERENCE_QUERY = gql`
query conference($id: ID!, $isNew: Boolean!) {
    conference(id: $id)@skip(if: $isNew){
    ...conference
    type {
      ...type
    }
    category {
     ...category
    }
    location {
     ...location
      city {
        ...city
      }
      county {
        ...county
      }
      country {
        ...country
      }
    }
    speakers {
    ...speaker
    }
  }
  typeList{
    id
    name
    code
  }
  categoryList{
    id
    name
    code
  }
  countryList{
    id
    name
    code
  }
  countyList{
    id
    name
    code
  }
  cityList{
    id
    name
    code
  }
}
${CommonFragments.type}
${CommonFragments.county}
${CommonFragments.country}
${CommonFragments.city}
${CommonFragments.category}
${ConferenceFragments.location}
${ConferenceFragments.conference}
${ConferenceFragments.speaker}
`