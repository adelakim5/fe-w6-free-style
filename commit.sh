echo -e "commit -m "
read
git init
git add .
<<<<<<< HEAD
git commit -m "commit"
git push origin web
=======
git commit -m "$REPLY"
git push origin web2
>>>>>>> 07725e0ffed6094547170ceafb20b6135ccfb4d6
