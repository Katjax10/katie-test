import { useEffect, useState} from 'react';
import '../App.scss';
import {
  Input,
  Button,
  Dropdown
} from 'semantic-ui-react'
import GitTable from "../DataTables/GitTable"
import './Home.scss'
import ErrorComponent from "../CommonComponents/ErorrComponent"

export type sortingType = "stars" | "bestMatch" | undefined
export type direction = 'asc' | 'desc' | undefined

function Home() {

  const [search, setSearch] = useState<string>('random')
  const [results, setResults] = useState<any>([])
  const [sortType, setSortType] = useState<sortingType | string>()
  const [sortDirection, setSortDirection] = useState<direction>('asc')
  const [filterValue, setFilterValue] = useState<any>('')
  const [filteredResults, setFilteredResults] = useState([])

  useEffect(() => {
    if (search) {

      // don't run fetch on every change of search, wait until done typing
      setTimeout(() => {
        fetch(
          `https://api.github.com/search/repositories?q='${search}'
      ${sortType === 'stars' ? '&sort=stars' : ''}${`&order=${sortDirection}`}`,
          {
            method: 'GET',
          },
        )
        .then(res=> res.json())
        .then(response => {
          setResults(response.items);
        })

        // TODO: getting calls from github api as an authenticated user cause rate limit errors/403 errors.
        // Note: long search strings will cause this error to trigger
        .catch(error => console.log('this is erroring', error));
      }, 300)
    }
  }, [search, sortType, sortDirection])

  useEffect(() => {
    if(filterValue.length) {
      const filteredResults = results?.filter((fits) => {
        return fits.language === filterValue
      })
    // set new set of results when filtering so original search isn't lost
      return setFilteredResults(filteredResults)
    }

  }, [filterValue])

  // get Languages from response

  const getLanguages = results?.map((lang) => {
    return lang.language
  })


  //filter duplicates from list
  const filterDups = getLanguages?.filter((d,i) => {
   return getLanguages.indexOf(d) === i
  })

  //construct dynamic dropdown options based on results
  const options = filterDups?.map((i, index) => {
    return {
      key: index,
      value: i,
      text: i
    }
  })

  return (
    <div className="topHeader">
      <div className={"topWrapper"}>
          <Input
            size={'large'}
            placeholder='search github'
            onChange={(e, value) => {
              // clear filter when searching
              setFilterValue('')
              setFilteredResults([])
              setSearch(value.value)
            }}
            className={'searchInput'}
          />
          <Button
            onClick={() => {
              setFilterValue('')
              setFilteredResults([])
              setSortType('bestMatch')}}
            >
            Sort By Default (Best Match)
          </Button>
          <div className={'dropdownWrapper'}>
            <Dropdown
              options={options}
              button={true}
              placeholder={'Choose Language'}
              value={filterValue}
              onChange={(e, value) => {
                setFilterValue(value.value)
              }}
              className={'languageDropdown'}
            />
            {filteredResults.length > 0 && (
              <span className={'clearFilter'} onClick={() => {
                  setFilteredResults([])
                  setFilterValue('')
                }}>Clear Filter
              </span>
            )}
          </div>
      </div>
      <div>
        {!results?.length && (
          <ErrorComponent text={'No results! Try a different search term'}/>
        )}
        {results?.length && (
          <GitTable
            data={filteredResults.length ? filteredResults : results}
            setSortType={(val) => setSortType(val)}
            sortType={sortType}
            setSortDirection={(val) => setSortDirection(val)}
            sortDirection={sortDirection}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
