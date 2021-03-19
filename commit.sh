echo -e "commit -m "
read
git init
git add .
<<<<<<< HEAD
<<<<<<< HEAD
git commit -m "$REPLY"
=======
git commit -m "commit"
>>>>>>> 88d12ba ([Chore] git rebase & update registerNewUser)
=======
git commit -m "$REPLY"
>>>>>>> 2466fcf (commit test)
git push origin web2
