echo -e "commit -m "
read
git init
git add .
<<<<<<< HEAD
git commit -m "$REPLY"
=======
git commit -m "commit"
>>>>>>> 88d12ba ([Chore] git rebase & update registerNewUser)
git push origin web2
