import { Box, Divider, ListItemButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMemberProfile } from "../../../../slices/memberProfileSlice";
import { MemberInfoProps } from "../../../../interfaces/memberProps";

export const memberInfo = ({
  firstName,
  lastName,
  email,
  countryCode,
  stateCode,
  phoneNumber,
  addressLine,
  city,
  state,
  zipcode,
  memberId,
}: MemberInfoProps) => {
  const dispatch = useDispatch();

  const handle = () => {
    dispatch(
      setMemberProfile({
        firstName,
        lastName,
        email,
        countryCode,
        stateCode,
        phoneNumber,
        addressLine,
        city,
        state,
        zipcode,
        memberId,
      })
    );
  };

  return (
    <Box sx={{ width: 1 }}>
      <ListItemButton onClick={() => handle()} sx={{ width: 1 }}>
        {firstName} {lastName}
      </ListItemButton>
      <Divider />
    </Box>
  );
};

export default memberInfo;
