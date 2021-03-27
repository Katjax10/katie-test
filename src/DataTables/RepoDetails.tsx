import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './RepoDetails.scss'
import CommonTable from "../DataTables/CommonDataTable"
import ErrorComponent from "../CommonComponents/ErorrComponent"

function RepoDetails(props) {
  const getEntries = Object.entries(props?.location?.data ?? {})
  const getColumns = [
    {
      name: 'property',
      displayName: 'Property',
      item: getEntries.map((entry) => {
        return(
          <div>
            <strong>{entry[0]}&nbsp;</strong>
          </div>
        )
      })
    },
    {
      name: 'details',
      displayName: 'Details',
      item: getEntries.map((entry) => {
        return(
          <div>
            {JSON.stringify(entry[1])}
          </div>
        )
      })
    },
  ]

  return (
    <div className={'detailsWrapper'}>
      <div className={'header'}>
        <Link to={'/'}>
          <Button className={'backButton'} color={'blue'}>
            Back to table
          </Button>
        </Link>

        <div className={'repoName'}>{`Details of ${props?.location?.name ?? 'Unknown'}`}</div>
      </div>
      {props.location.data && (
        <div>
          <CommonTable
            data={props.location.data}
            columns={getColumns}
          />
        </div>
      )}
      {!props.location.data && (
        <ErrorComponent text={'Oh no! go back to search page to get repo details'}/>
      )}
      </div>
  );
}

export default RepoDetails;
