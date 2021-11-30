export async function queryHasuraGQL(operationsDoc, operationName, variables) {
    const result = await fetch(
      process.env.NEXT_PUBLIC_HASURA_DB_URL,
      {
        method: "POST",
        headers :{
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImpvaG4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTYzODI4Mjg4Mzk0NSwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIiwidXNlciJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImpvaG4ifX0.5meeSB7U4nay4Axq6M1RC7K9Iqhowk3kpdrgySUpF4A"
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
  
  const operationsDoc = `
      query MyQuery {
        users {
          id
          email
          issuer
          publicAddress
        }
      }
    `;
  
  function fetchMyQuery() {
  
    return queryHasuraGQL(
      operationsDoc,
      "MyQuery",
      {}
    );
  }
  
  export   async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
  }
  
  startFetchMyQuery();