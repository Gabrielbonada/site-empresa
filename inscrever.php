<?php
// Conexão com o banco 
$con = new mysqli("localhost", "root", "", "sistemasenai");
if ($con->connect_error) {
    die("erro na conexão: " . $con->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $senhaconfirmada = $_POST['senhaconfirmada'];

    // Se as senhas não forem iguais, PARA TUDO
    if ($senha !== $senhaconfirmada) {
        echo "As senhas não são iguais!";
        exit;
    }

    // Prossegue só se as senhas forem iguais
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    $data = date('Y-m-d');
    $hora = date('H:i:s');

    $stmt = $con->prepare('INSERT INTO cadastros(nome, email, senha, senhaconfirmada, `data`, `hora`) 
                           VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->bind_param("ssssss", $nome, $email, $senhaHash, $senhaconfirmada, $data, $hora);

    if ($stmt->execute()) {
        header("Location: paginaloginfeito.php");
        exit();
    } else {
        echo "Erro ao cadastrar: " . $stmt->error;
    }

    $stmt->close();
}
$con->close();
?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo a plataforma do senai!!</title>
    <!-- estilo da página -->
<style>
    /* Reset básico */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
    }

    body, html {
        height: 100%;
        background: linear-gradient(135deg, #0A1A3A, #154C79);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-form {
        background: #ffffff;
        padding: 40px;
        border-radius: 20px;
        width: 380px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        animation: fadeIn .6s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .box-form form {
        display: flex;
        flex-direction: column;
        gap: 18px;
        width: 100%;
    }

    label {
        font-weight: 600;
        color: #0A1A3A;
    }

    input {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: 2px solid #154C79;
        background: #eef6ff;
        font-size: 15px;
        outline: none;
        transition: .3s;
    }

    input:focus {
        border-color: #1a6bc2;
        background: #fff;
        box-shadow: 0 0 8px rgba(21, 76, 121, 0.3);
    }

    button {
        padding: 14px;
        margin-top: 10px;
        border: none;
        border-radius: 12px;
        background: #154C79;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: .3s;
    }

    button:hover {
        background: #1a6bc2;
        transform: scale(1.03);
    }
</style>
</head>

<body>



    <section class="box-form">
    <form action="" method="POST">
        <label for="nome">Nome completo:</label>
        <input type="text" name="nome" required>

        <label for="email">Email:</label>
        <input type="text" name="email" required>

        <label for="senha">Crie sua senha:</label>
        <input type="password" name="senha">

        <label for="senhaconfirmada">Confirme a senha:</label>
        <input type="password" name="senhaconfirmada" required>

        <button type="submit">Cadastrar</button>
    </form>
</section>



<script>

</script>


</body>

</html>