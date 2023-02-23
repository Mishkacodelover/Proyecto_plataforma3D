import { Grid, TextField, MenuItem, Button } from "@mui/material";
import { useFormik } from "formik";
import { memberValues } from "./utils/memberValues";
import { initialValues } from "./utils/inviteMemberValues";
import { InviteMemberSchema } from "./inviteMemberSchema";
import { REGISTRATION } from "../../utilities/settings";
import { useAuthContext } from "../../contexts/AuthContext";

export default function InviteMember() {
  const { authorization } = useAuthContext();

  async function registerMember(values) {
    const invitedUser = {
      ...values,
      userCreated: authorization.id,
    };
    try {
      const response = await fetch("http://localhost:8000/user/invited", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invitedUser),
      });

      if (response.ok) {
        console.log(response);
      } else {
        console.log("error en el registro");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = (values, actions) => {
    registerMember(values);
    actions.resetForm();
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: InviteMemberSchema,
      onSubmit,
    });

  return (
    <>
      <Grid container direction={"column"} spacing={2}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={8} md={12}>
            <TextField
              fullWidth
              variant="standard"
              type="text"
              label="Nombre"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={8} md={12}>
            <TextField
              fullWidth
              variant="standard"
              type="text"
              label="Apellidos"
              name="surname"
              value={values.surname}
              onChange={handleChange}
              error={errors.surname}
              helperText={errors.surname}
            />
          </Grid>
          <Grid item xs={8} md={12}>
            <TextField
              fullWidth
              variant="standard"
              type="email"
              label="Correo electrónico"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={8} md={12}>
            <TextField
              fullWidth
              type="password"
              label="Contraseña"
              name="password"
              variant="standard"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={8} md={12}>
            <TextField
              select
              label="Rol"
              name="role"
              defaultValue="administrador"
              variant="standard"
              fullWidth
              size="medium"
              value={values.role}
              onChange={handleChange}
              error={errors.role}
              helperText={errors.role}
            >
              {memberValues.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={8} md={12} sx={{ paddingTop: "8px" }}>
            <Button
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundImage: "linear-gradient(#0A0A0A ,#282829)",

                color: "var(--blanco)",
                p: "16px 24px",
              }}
            >
              Invitar miembro
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
