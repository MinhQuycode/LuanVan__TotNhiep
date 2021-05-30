import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink, Redirect } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { signUpAPI } from '../../redux/actions/register.action';
import Swal from 'sweetalert2';
import {useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import ErrorRgt from '../../Layouts/Error/ErrorRgt';
import Loading from "./../../Layouts/Loading/Loading";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

const [user,setUser] = useState({
    values :{
      name :"",
      email :"",
      password :"",
      password_confirmation :""
      // soDt : "",
      
    },
    errors :{
      name :"",
      email :"",
      password :"",
      password_confirmation :""
    }
});
const handleChange = (event) =>{
  let {value,name,type} = event.target;
  //  console.log(value,name);

   let newValue = {...user.values,[name]:value}
   let newError = {...user.errors};

   if(value.trim() ===""){
     newError[name]= "*Không được bỏ trống !";
    } else {
      newError[name] = '';
    }

    if(name === 'password'){
      if(value.length >= 8){
        newError[name] = '';
      } else {
        newError[name] = '*Mật khẩu có tối thiểu 8 ký tự !';
      }
    }

    if(name === 'password_confirmation'){
        if(value === newValue['password']){
          newError[name] = '';
        } else {
          newError[name] = '*Mật khẩu nhập lại chưa đúng !';
        }
      }
   if(type === "email"){
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regexEmail.test(value)){
        newError[name] = '*Vui lòng nhập đúng email !';
      } else {
        newError[name] = '';
      }
   }
   
  //  if (name === "soDt") {
  //   const parternSodt = /((09|03|07|08|05)+([0-9]{8})\b)/; 
  //     if(!parternSodt.test(value)){
  //       newError[name] ="*Số điện thoại không hợp lệ !!.(VD: 0364567890)";
  //     } else {
  //       newError[name] = '';
  //     }
  // }
   setUser ({
      values :newValue,
      errors :newError,
   });
};

const handleSubmit = (event) =>{
  event.preventDefault();
  let {values,errors} = user;
  //Biến form khi hợp lệ
  let valid = true;

  for (const key in values) {
    if (values[key] === '') {
      valid = false;
    }
  }
  for (const key in errors) {
    if (errors[key] !== '') {
      valid = false;
    }
  }
  
  console.log(props.message?.status);
  if(!valid){
    Swal.fire({
      title: 'Lỗi!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      text: 'Dữ liệu chưa hợp lệ !',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    return;
  }else {
      if(!props.message?.status === "fails"  && valid){
        Swal.fire({
          title: 'Thành công!',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          text: 'Dữ liệu hợp lệ !',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
         dispatch(signUpAPI(user.values,history));
        history.push("/login");
      }
  }
};

const userSignIn = JSON.parse(localStorage.getItem('userLogin'));

  if(props.loading) return (<Loading/>)
  return !userSignIn? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Họ Tên"
                autoFocus
                defaultValue={user.values.name}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.name}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type ="email"
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                defaultValue={user.values.email}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.email}</span>
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="soDt"
                label="Số điện thoại"
                name="soDt"
                autoComplete="soDT"
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.soDt}</span>
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="password"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="passWord"
                label="Mật khẩu"
                defaultValue={user.values.password}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.password}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="password_confirmation"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="password_confirmation"
                label="Nhập lại mật khẩu"
                defaultValue={user.values.password_confirmation}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.password_confirmation}</span>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Tôi muốn nhận thông báo mới nhất !"
                checked
              />
              {props.message?.data && <ErrorRgt message={props.message?.data}/>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{backgroundColor:'orangered'}}
          >
            Đăng ký
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            Đã có tài khoản ! 
              <NavLink to="/login" style={{color:'orangered',textDecoration:"underline"}}>
                Đăng nhập ngay
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div><br/><br/>
    </Container>
  ):(
    <Redirect to="/"/>
  );
}

const mapStateToProps = (state) =>({
  error : state.userRegister.errors,
  loading : state.userRegister.loading,
  message : state.userRegister.userRegister
})
export default connect(mapStateToProps)(SignUp)