import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = () =>{
    let emailValidation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    let pwdValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;

    if(!email | !emailConf | !senha){
      setError("Preencha todos oscampos");
      return;
    }else if (email !== emailConf) {
      setError("Os e-mails não são iguais")
      return;
    }else if(emailValidation.test(email) == false){
      setError("E-mail inválido!")
      return;
    }else if (pwdValidation.test(senha) == false){
      setError(
        <>
          Senha inválida! <br />
          . A senha deve conter ao menos um dígito, <br />
          . deve conter ao menos 8 dos caracteres mencionados <br />
          . Deve conter ao menos uma letra minúscula, <br />
          . Deve conter ao menos uma letra maiúscula, <br />
          . Deve conter ao menos um caractere especial
        </>
      );
      
      return;
    }



    const res = signup(email, senha);

    if(res) {
      setError(res);
      return;
    }
    
    alert("Usuário cadastrado com sucesso!");
    navigate("/")
  }

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
      <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        /> 
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup}/>
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  )
}

export default Signup