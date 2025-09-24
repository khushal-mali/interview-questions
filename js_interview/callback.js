// console.log("Callbacks");

// async function getSquare(n) {
//   await new Promise((res, rej) =>
//     setTimeout(() => {
//       return res(n * n);
//     }, 2000)
//   );
// }

// const squ4 = await getSquare(4);
// console.log(squ4);

/////////////////////////////////////////////////////////////////
// ;) IOC --> Inversion of Control

function getUserDetails(cb) {
  setTimeout(() => {
    cb({ userName: "ramesh", userId: 123 });
  }, 1000);
}

function getPosts(userId, cb) {
  setTimeout(() => {
    cb(["post1", "post2", "post3"]);
  }, 1000);
}

getUserDetails((userDetails) => {
  // new Promise()
  console.log(userDetails);
  getPosts(userDetails.userId, (posts) => {
    console.log(posts);
  });   
});
