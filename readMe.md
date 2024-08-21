…or create a new repository on the command line
echo "# recipe" >> README.md
git init
git add README.md
cdgit commit -m "first commit"
gieet branch -M main
git remote add origin https://github.com/OkekeKachi/recipe.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/OkekeKachi/recipe.git
git branch -M main
git push -u origin main