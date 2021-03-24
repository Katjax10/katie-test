import {useEffect, useState} from 'react';
import './App.css';
import {
  Input,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from 'semantic-ui-react'

type sortingType = 'stars' | 'bestMatch'

function App() {

  const [search, setSearch] = useState<string>('')
  const [results, setResults] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortType, setSortType] = useState<sortingType>()

  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q='${search}'${sortType === 'stars' ? '&sort=stars' : ''}`,
      {
        method: 'GET',
      },
    )
    .then(res=> res.json())
    .then(response => {
      setResults(response);
      setIsLoading(false);
    })
    .catch(error => console.log(error));
  }, [search, sortType])

  console.log('results', results)
  const getName = results?.items?.map((n) => { return (<div key={n.id}>{n.name}</div>)})
  const getStars = results?.items?.map((n) => { return (<div key={n.id}>{n.stargazers_count}</div>)})

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Input
            size={'large'}
            placeholder='search github'
            onChange={(e, value) => {
              setSearch(value.value)
            }}
          />
          {/*<Button onClick={() =>searchGithub()}>Search Github</Button>*/}
        </p>
        {isLoading && (
          <div> Loading</div>
        )}
        {<>
          <Button onClick={() => setSortType('bestMatch')}>Sort By Best Match</Button>
          <Button onClick={() => setSortType('stars')}>Sort by Stars</Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>StarGazer Count</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {getName}
                </Table.Cell>
                <Table.Cell>
                  {getStars}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
        }


      </header>
    </div>
  );
}

export default App;
