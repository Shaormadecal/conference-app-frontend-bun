import {gql} from '@apollo/client'


export const Dictionary_Query =gql`
query getDictionaries{
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
`