import usersDB from "@/data/users/user";

export default function authenticateUser({ username, password }) {
  const userDB = usersDB.find((user) => user.name === username);
  console.log(userDB);
  if (!!userDB && userDB.password === password) {
    return userDB;
  } else return null;
}
