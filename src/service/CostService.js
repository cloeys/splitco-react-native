import * as Storage from "../storage/TokenStorage";

const BASE_URL = "http://splitcoapi-dev.eu-central-1.elasticbeanstalk.com/api";

createHeaders = () => {
  return Storage.getAuthToken().then(res => {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + res
    };
  });
};

getUser = () => {
  return createHeaders()
    .then(headers => {
      return fetch(BASE_URL + "/user", {
        method: "GET",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

getGroups = () => {
  return createHeaders()
    .then(headers => {
      return fetch(BASE_URL + "/group", {
        method: "GET",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

getGroup = id => {
  return createHeaders()
    .then(headers => {
      return fetch(BASE_URL + "/group/" + id, {
        method: "GET",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

getCostsOfGroup = groupId => {
  return createHeaders()
    .then(headers => {
      return fetch(BASE_URL + "/cost/group/" + groupId, {
        method: "GET",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

getUserShortStats = costId => {
  return createHeaders()
    .then(headers => {
      return fetch(`${BASE_URL}/cost/${costId}/stats/short`, {
        method: "GET",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

getUserFullStats = costId => {
  return createHeaders()
    .then(headers => {
      return fetch(`${BASE_URL}/cost/${costId}/stats/full`, {
        method: "GET",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

getCostStats = costId => {
  return createHeaders()
    .then(headers => {
      return fetch(`${BASE_URL}/cost/${costId}/stats/`, {
        method: "GET",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

addNewCost = newCostObject => {
  return createHeaders()
    .then(headers => {
      return fetch(`${BASE_URL}/cost/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newCostObject)
      });
    })
    .then(res => {
      return res.json();
    });
};

closeCost = costId => {
  return createHeaders()
    .then(headers => {
      return fetch(`${BASE_URL}/cost/${costId}/`, {
        method: "DELETE",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

removeCost = costId => {
  return createHeaders()
    .then(headers => {
      return fetch(`${BASE_URL}/cost/${costId}/remove`, {
        method: "DELETE",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

getContributionsOfUserOfCost = costId => {
  return createHeaders()
    .then(headers => {
      return fetch(`${BASE_URL}/contribution/cost/${costId}`, {
        method: "GET",
        headers: headers
      });
    })
    .then(res => {
      return res.json();
    });
};

addContribution = contribution => {
  return createHeaders()
    .then(headers => {
      return fetch(`${BASE_URL}/contribution/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(contribution)
      });
    })
    .then(res => {
      return res.json();
    });
};

export {
  getUser,
  getGroups,
  getGroup,
  getCostsOfGroup,
  getUserShortStats,
  getCostStats,
  getUserFullStats,
  addNewCost,
  closeCost,
  removeCost,
  getContributionsOfUserOfCost,
  addContribution
};
