import {
  Button,
  Container,
  FormHelperText,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userState from "../recoil/userState";
import { saveLoginInfo } from "../utils/authUtils";
import { login } from "../api/authApi";

const Wrapper = styled("div")({
  height: "100vh",
  display: "flex",
  justifycontent: "center",
  alignItems: "center",
  backgroundColor: "#555",
});

const FormPaperWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3),
}));

const Spacer = styled("div")(({ theme }) => ({
  height: theme.spacing(3),
}));

const formSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/0\d{9}/, "Số điện thoại không hợp lệ")
    .required(),
  password: yup.string().min(6, "Mật khẩu phải ít nhất 6 kí tự").required(),
});

const LoginPage = () => {
  const [err, setErr] = useState();
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = (values) => {
    formSchema
      .validate(values)
      .then(async (data) => {
        setErr("");
        try {
          const loginInfo = await login(data.phoneNumber, data.password);
          console.log(loginInfo);
          setUser(loginInfo.user);
          saveLoginInfo(loginInfo.user, loginInfo.token);
          navigate("/");
        } catch (e) {
          console.log({ e });
          setErr("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
      })
      .catch((e) => {
        console.log(e.message);
        setErr(e.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  const { getFieldProps } = formik;

  return (
    <Wrapper>
      <Container maxWidth="xs">
        <FormPaperWrapper elevation={3}>
          <form onSubmit={formik.handleSubmit}>
            <h2>ĐĂNG NHẬP</h2>
            <TextField
              label="Tên đăng nhập"
              fullWidth
              variant="outlined"
              size="small"
              name="usename"
              {...getFieldProps("phoneNumber")}
            />
            <Spacer />
            <TextField
              label="Mật khẩu"
              type="password"
              fullWidth
              variant="outlined"
              size="small"
              name="password"
              {...getFieldProps("password")}
            />
            <Spacer />
            <FormHelperText error sx={{ textAlign: "center" }}>
              {err}
            </FormHelperText>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Đăng nhập
            </Button>
          </form>
        </FormPaperWrapper>
      </Container>
    </Wrapper>
  );
};

export default LoginPage;
