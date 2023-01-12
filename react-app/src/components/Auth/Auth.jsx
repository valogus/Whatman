import { useForm } from "react-hook-form";
import './Auth.css'
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {setUsernameAC} from '../../store/reducers/actionAuth'
import { useNavigate} from 'react-router-dom';

function Auth() {
  const dispatch = useDispatch()
  const session = useSelector((session)=> session)
  console.log(localStorage)
  console.log('Сессия!!', session)
  const { register, handleSubmit, formState: {errors, isValid} } = useForm({
    mode: 'onTouched'
  });
  const { register:register2, handleSubmit:handleSubmit2, formState: {errors:errors2, isValid:isValid2} } = useForm({
    mode: 'onTouched'
  });
  const [error, setError] = useState("");
  const [errorAuth, setErrorAuth] = useState('');
  console.log(errors)
  console.log(errors2)
  const onSubmitRegister = data => {
    fetch("/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log('status', res.status)
        if (res.status === 200) {
          setError("");
          return res.json();
        } else if(res.status === 501){
          setError("Логин уже существует");
          throw new Error("Something went wrong");
        }else if(res.status === 502){
          setError("Email уже существует");
          throw new Error("Something went wrong");
        }else {
          setError("Произошла ошибка!");
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data)
         dispatch(setUsernameAC(data));
        // localStorage.setItem("userSession", JSON.stringify(data));
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName);
         navigate("/");
      });
  };
  const handleErrors = (errors) => {
    console.log(errors);
  };
  const handleErrorAuth  = (errors) => {
    console.log(errors);
  };
  const onSubmitLogin = data => {
    
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          console.log('status', res.status)
          if (res.status === 200) {
            setErrorAuth("")
            return res.json();
          }else {
            setErrorAuth("Неверный логин или пароль");
            throw new Error("Something went wrong");
          }
        })
        .then((data) => {
          console.log(data)
           dispatch(setUsernameAC(data));
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("userName", data.userName);
           navigate("/");
        });
  }
  const [isHidden, setHidden] = useState(true)

  const changeShow = () =>{
    setHidden((prev)=> !prev)
  }

  const navigate = useNavigate()


  return (
    <div className='main'>
    <article className={`parentCont ${!isHidden ? "active" : ''}`}>
    <article className="containerReg">
      <div className="blockReg">
        <section className="block_item block-item">
          <h2 className="block-item_title" >У вас уже есть аккаунт?</h2>
          <button className="block-item_btn signin-btn" onClick={changeShow}>Войти</button>
        </section>
        <section className="block_item block-item">
          <h2 className="block-item_title">У вас нет аккаунта? </h2>
          <button className="block-item_btn signup-btn" onClick={changeShow}>Зарегистрироваться</button>
        </section>
      </div>
      <div className={`form-box ${!isHidden ? "active" : ''}`}>

        <form className="form form_signin" onSubmit={handleSubmit2(onSubmitLogin, handleErrorAuth)}>
          <h3 className="form-title" >Вход</h3>
          <p>
            <input {...register2("email", {
                  required: 'Поле не заполнено' 
                 })} name="email" type="text" className="form_input" placeholder="Email" />
          </p>
          <div className="errors">{errors2?.email && <div>{errors2?.email.message || "Error"}</div> }</div>
          <p>
            <input {...register2("password", {
                  required: 'Поле не заполнено' 
                 })} name="password" type="password" className="form_input" placeholder="Пароль" />
          </p>
          <div className="errors">{errors2?.password && <div>{errors2?.password.message || "Error"}</div> }</div>
          <p>
            <button type="submit" className="form_btn form_btn_signin" style={{backgroundColor:isValid2 ? 'rgb(11, 172, 30)' :'rgb(178, 222, 183)'}}>Войти</button>
          </p>
          {errorAuth && <div style={{textAlign: "center", marginTop:'20px', position:'absolute'}}><p style={{ color: "red" }}>{errorAuth}</p></div>}
        </form>

        <form className="form form_signup" onSubmit={handleSubmit(onSubmitRegister, handleErrors)}>
          <h3 className="form-title">Регистрация</h3>
          <p>
            <input
            {...register("login", {
              required: 'Поле не заполнено',
              minLength: {
                value:4,
                message:"Минимум 4 символа"
              },
              pattern: {
                value:/[A-Za-z]\w+/,
                message:"Латинские буквы, цифры. Имя должно начинаться с буквы"
              }
             })}
              name="login"
              type="text"
              className="form_input"
              placeholder="Логин"
              required
              pattern="[A-Za-z]\w+"
              minLength={4}
              title="Латинские буквы, цифры. Имя должно начинаться с буквы"
            />
          </p>
          <div className="errors">{errors?.login && <div>{errors?.login.message || "Error"}</div> }</div>
          <p>
            <input
            {...register("password", {
                  required: 'Поле не заполнено',
                  minLength: {
                    value:5,
                    message:"Минимум 5 символов"
                  }
                 })}
              name="password"
              type="password"
              className="form_input"
              placeholder="Пароль"
              required
              minLength={5}
            />
          </p>
          <div className="errors">{errors?.password && <div>{errors?.password.message || "Error"}</div> }</div>
          <p>
            <input
            {...register("email", {
              //     //position absolute можно ещё margin top на input увеличить position relative, 
                  required: 'Поле не заполнено',
                  pattern: {
                    value:/^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z._%+-]+\.[A-Za-z]{2,}$/,
                    message:"Введите по форме test@test.com"
                  }
                 })}
              name="email"
              type="email"
              className="form_input"
              placeholder="Email"
              pattern="^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z._%+-]+\.[A-Za-z]{2,}$"
              required
            />
          </p>
          <div className="errors">{errors?.email && <div>{errors?.email.message || "Error"}</div> }</div>
          <p>
            <button type="submit"  style={{backgroundColor:isValid ? 'rgb(11, 172, 30)' :'rgb(178, 222, 183)'}} className="form_btn form_btn_signup">Зарегистрироваться</button>
          </p>
          {error && <div style={{textAlign: "center", position:'absolute'}}><p style={{ color: "red" }}>{error}</p></div>}
        </form>

      </div>
    </article>
  </article>
  </div>
  );
}

export default Auth;
