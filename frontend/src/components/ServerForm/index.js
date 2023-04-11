import { useSelector } from 'react-redux';
import { getServerFormType } from '../../store/ui';
import './ServerForm.css';
import StartServerForm from './StartServerForm';
import CreateServerForm from './CreateServerForm';
import JoinServerForm from './JoinServerForm';

const ServerForm = () => {
  const formType = useSelector(getServerFormType);

  if (formType === "create") return <CreateServerForm />
  else if (formType === "join") return <JoinServerForm />
  else return <StartServerForm />
}

export default ServerForm;