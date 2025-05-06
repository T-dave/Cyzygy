import react, {useState} from 'react';

const Data = ()=> {
 const [disabled, setDisabled] = useState(true);
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 return {disabled, setDisabled, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword};
}
export default Data;