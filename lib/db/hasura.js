
export async function isNewUser(issuer, token) {
  const operationsDoc = `
  query MyQuery($issuer: String!){
    users(where:{ issuer :{ _eq: $issuer }})
    {
      id
      email
      issuer
    }
  }
`;

const response = await queryHasuraGQL( operationsDoc,
  "MyQuery",
  {issuer} ,
   token );
  return response?.data?.users?.length === 0   ;

}

export async function createNewUser(token , metadata){
  console.log("dentro" , {token});
  console.log({metadata});


  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!){
    insert_users(objects: {email: $email , issuer: $issuer, publicAddress: $publicAddress }){
      returning {
        id
        email
        issuer
      }
    }
  }
`;

const { issuer, email, publicAddress } = metadata;


const response = await queryHasuraGQL(
  operationsDoc,
  "createNewUser",
  {issuer, email, publicAddress},
  token
);

console.log("what the hell" ,response) ;
return response;

};

export async function queryHasuraGQL(operationsDoc, operationName, variables , token) {
    const result = await fetch(
      process.env.NEXT_PUBLIC_HASURA_DB_URL,
      {
        method: "POST",
        headers :{
           // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN ,
            Authorization: `Bearer ${token}`,
            "Content-type": 'application/json',
            //to be dynamically generated on the server side
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );

    return await result.json();
  }


