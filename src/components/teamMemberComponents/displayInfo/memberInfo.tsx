import { Box, Divider, ListItemButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMemberProfile } from "../../../../slices/memberProfileSlice";
import { TeamMemberInfo } from "../../../../ts/interfaces/teamMember.interfaces";

export const memberInfo = ({
  first_name,
  last_name,
  email,
  country_code,
  state_code,
  phone_number,
  id,
}: TeamMemberInfo) => {
  const dispatch = useDispatch();

  const handle = () => {
    dispatch(
      setMemberProfile({
        first_name,
        last_name,
        email,
        country_code,
        state_code,
        phone_number,
        id,
      })
    );
  };

  return (
    <Box sx={{ width: 1 }}>
      <ListItemButton onClick={() => handle()} sx={{ width: 1 }}>
        {first_name} {last_name}
      </ListItemButton>
      <Divider />
    </Box>
  );
};

export default memberInfo;
