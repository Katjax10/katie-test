import '../App.scss';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  Icon
} from 'semantic-ui-react'
import {
  direction,
  sortingType
} from "../App"
import './CommonTable.scss'

interface TableProps {
  data: {}[], // Would have typed this with more time
  children?: any
  columns: ColumnProps[]
}

interface ColumnProps {
  name: string
  sortType?: sortingType
  sortDirection?: direction | string | undefined
  setSortDirection?: any
  setSortType?:(type: sortingType) => void
  sortable?: boolean
  displayName: string
  item?: any
  id?: any
}

function CommonTable(props: TableProps) {
  const { columns } = props
  return (
    <div className={'tableWrapper'}>
      <Table celled>
        <TableHeader>
          <TableRow>
              {columns.map((c) => {
                const {
                  name,
                  sortType,
                  sortDirection,
                  setSortType = () => null,
                  setSortDirection,
                  sortable = false,
                  displayName
                } = c

                return (
                  <TableHeaderCell
                    key={name}
                  >
                    {displayName}

                    {sortable && (
                      <Icon
                        name={sortDirection === 'desc' ? 'caret down' : 'caret up'}
                        className={'sortIcon'}
                        onClick={() => {
                          if(sortable) {
                            setSortType(sortType)
                            setSortType(sortType)
                            if(sortDirection === 'asc') {
                              return setSortDirection?.('desc')
                            }
                            return setSortDirection?.('asc')
                          }
                        return
                      }}/>
                    )}
                  </TableHeaderCell>
                )
              })}
          </TableRow>
        </TableHeader>
        <Table.Body>
          <TableRow>
            {columns.map((c) => {
              return (
                  <TableCell key={Math.random()}>{c.item}</TableCell>
              )
            })}
          </TableRow>
        </Table.Body>
      </Table>
    </div>

  );
}

export default CommonTable;
