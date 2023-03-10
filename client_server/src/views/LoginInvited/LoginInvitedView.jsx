import { Grid, Box } from "@mui/material";

import LoginWhite from "../../assets/images/otros/landing_foto.png";
import LoginFormInvited from "../../components/LoginFormInvited";

export default function LoginInvitedView() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxHeight: "100%",
          minHeight: "560px",
          backgroundImage: `url(${LoginWhite})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems={"flex-start"}
          sx={{
            paddingTop: "184px",
            width: "100%",
            paddingLeft: "144px",
          }}
        >
          <LoginFormInvited />
        </Grid>
      </Box>
    </>
  );
}
