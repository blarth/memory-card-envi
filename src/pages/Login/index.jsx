import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Form, Input, Button } from "../../components/formsComponents";
import Container from "../../components/Container";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const val = validate(name)
    if(val) {
      alert(val)
      return
    }
    
    login(name);
    navigate("/home");
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="name"
          placeholder="Digite o nome do grupo participante!"
          name="name"
          onChange={(e) => setName(e.target.value)}  
          value={name}
          required
        />
        <Button type="submit">Prosseguir para o jogo!</Button>
      </Form>
    </Container>
  );
}

function validate(name) {
  // Verifica se o nome do grupo não está vazio ou contém apenas espaços em branco
  if (name.trim() === "") {
    return "O nome do grupo não pode estar vazio.";
  }

  // Verifica se o nome do grupo possui mais de 3 caracteres
  if (name.length < 3) {
    return "O nome do grupo deve ter no mínimo 3 caracteres.";
  }

  // Verificação adicional ou personalizada pode ser adicionada aqui, conforme necessário

  // Retorna null se o nome do grupo for válido
  return null;
}