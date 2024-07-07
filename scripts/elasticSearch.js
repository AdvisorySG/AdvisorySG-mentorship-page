export async function elasticSearch(mentor_name) {
  var baseUrl = "https://advisorysg.ent.ap-southeast-1.aws.found.io";
  var engine = "mentorship-page";
  const ELASTIC_SEARCH_KEY = process.env.NEXT_PUBLIC_ELASTICSEARCH_KEY;
  // var payload = {
  // 	query: {
  // 		match: {
  // 			name: mentor_name,
  // 		},
  // 	},
  // };
  var payload = {
    query: {
      match_all: {},
    },
  };
  console.log("payload", payload);

  const response = await fetch(
    `${baseUrl}/api/as/v1/engines/${engine}/search.json`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${ELASTIC_SEARCH_KEY}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //redirect: "follow", // manual, *follow, error
      //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(payload), // body data type must match "Content-Type" header
    }
  )
    .then(function (response) {
      if (response.status != 200) {
        console.log("search Status code: " + response.status, response);
        return;
      }

      // examine text in response
      response.json().then(function (data) {
        console.log("elasticdata", data);
        return data;
      });
    })
    .catch(function (err) {
      console.log("Fetch error :-S", err);
    });
  return response;
}
