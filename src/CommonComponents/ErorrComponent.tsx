import './Error.scss'
interface Props {
  text: string
}
function ErrorComponent(props: Props) {
  return (
    <div className={'error'}>
      {props.text}
    </div>
  )
}

export default ErrorComponent;
