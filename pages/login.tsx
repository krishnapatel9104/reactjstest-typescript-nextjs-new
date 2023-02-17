import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from '../src/store';
import { setUser } from '../src/store/reducers/user/user.slice';
import { UserType } from '../src/types/redux/user.type';

export default function Login() {
  const details = useSelector(state => state.UserSlice);
  const dispatch = useDispatch();
  console.log('details : ', details);

  const handleClick = () => {
    console.log('btn clicked : ');
    let newUser: UserType = {
      id: 1,
      username: 'mp',
      password: 123
    };
    dispatch(setUser(newUser));
  };
  return (
    <Box>
      <Button onClick={handleClick}>Click me</Button>
    </Box>
  );
}
