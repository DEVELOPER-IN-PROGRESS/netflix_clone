
export async function isNewUser(issuer, token) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where:{ issuer :{ _eq: ${issuer} }})
    {
      id
      email
      issuer
    }
  }
`;


const response = await queryHasuraGQL( operationsDoc,
  "isNewUser",
  {issuer } ,
   token );

  return response?.users?.length === 0 ;

}

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


