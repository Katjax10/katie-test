import '../App.scss';
import {direction, sortingType} from "../App"
import CommonTable from "./CommonDataTable"
 import { Link } from 'react-router-dom'

interface TableProps {
  data: any,
  children?: any
  setSortType: (type: sortingType) => void
  sortType: sortingType
  setSortDirection: (type: direction) => void
  sortDirection: direction
  shouldLink?: boolean
}

function GitTable(props: TableProps) {
  const getColumns =[
    {
      name: 'name',
      displayName: 'Name',
      item: props.data.map((n)=> {
        return (
          <Link to={{pathname: '/details', data: n, name: n.name}}>
            <div>{n.name}</div>
          </Link>
        )}),
    },
    {
      name: 'stargazers',
      displayName: 'Stargazers Count',
      item: props.data.map(n=> (<div>{n.stargazers_count}</div>)),
      sortType: 'stars',
      sortDirection: props.sortDirection,
      setSortDirection: props.setSortDirection,
      setSortType: props.setSortType,
      sortable: true
    },
    {
      name: 'language',
      displayName: 'Language',
      item: props.data.map(n=> (<div>{n.language !== null ? n.language : 'Not Specified'}</div>))
    },
  ]

  return (
    <CommonTable
      data={props.data}
      columns={getColumns}
    />
  );
}

export default GitTable;
