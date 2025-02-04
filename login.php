<?php
session_start();
// Conexão com o banco de dados (substitua com suas credenciais)
$host = 'localhost';
$dbname = 'nome_banco';
$user = 'usuario_banco';
$pass = 'senha_banco';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM administradores WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $user['username'];
        header('Location: admin_painel.php');
        exit;
    } else {
        $error = "Credenciais inválidas!";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login Administrativo</title>
    <style>
        /* Adicionei apenas o necessário para as mensagens de erro */
        .error {
            color: #dc3545;
            padding: 10px;
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Login Administrativo</h2>
        <?php if (!empty($error)) echo "<div class='error'>$error</div>"; ?>
        
        <form method="POST">
            <label>Usuário:</label>
            <input type="text" name="username" required>

            <label>Senha:</label>
            <input type="password" name="password" required>

            <button type="submit">Acessar</button>
        </form>
    </div>
</body>
</html>