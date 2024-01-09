<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulaire</title>
</head>
<body>
  <h1>Formulaire</h1>
  <form action="/generer-pdf" method="post">
    <label for="nom">Nom:</label>
    <input type="text" id="nom" name="nom" required><br>

    <label for="prenom">Prénom:</label>
    <input type="text" id="prenom" name="prenom" required><br>

    <label for="telephone">Téléphone:</label>
    <input type="tel" id="telephone" name="telephone" required><br>

    <button type="submit">Générer PDF et Envoyer par E-mail</button>
  </form>
</body>
</html>
