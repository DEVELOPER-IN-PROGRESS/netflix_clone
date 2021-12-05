export async function isNewUser() {
  const operationsDoc = `
  query MyQuery {
    users(where:{ issuer :{ _eq: "did:ethr:0xf1C6B1E05b74eF63589a6E97F9754Ad6F039b193"}}) 
    {
      id
      email
      issuer
    }
  }
`;

const response = await queryHasuraGQL( operationsDoc,
  "MyQuery",
  {} , 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweGYxQzZCMUUwNWI3NGVGNjM1ODlhNkU5N0Y5NzU0QWQ2RjAzOWIxOTMiLCJwdWJsaWNBZGRyZXNzIjoiMHhmMUM2QjFFMDViNzRlRjYzNTg5YTZFOTdGOTc1NEFkNkYwMzliMTkzIiwiZW1haWwiOiJqb2huc2pvc2VwaGtAcG0ubWUiLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJpYXQiOjE2Mzg0NjMyNzIsImV4cCI6MTYzOTA2ODA3MiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIiwidXNlciJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4ZjFDNkIxRTA1Yjc0ZUY2MzU4OWE2RTk3Rjk3NTRBZDZGMDM5YjE5MyJ9fQ.WduRUFm7Ce8PfKlXhCUWriuzCtxuSI_T_92nflTu7zg")

  console.log({response})

}

export async function queryHasuraGQL(operationsDoc, operationName, variables , token) {
    const result = await fetch(
      process.env.NEXT_PUBLIC_HASURA_DB_URL,
      {
        method: "POST",
        headers :{
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
  
  
  
  function fetchMyQuery() {
  
    return queryHasuraGQL(
     
    );
  }
  
  export   async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log({data});
  }
  
  startFetchMyQuery();